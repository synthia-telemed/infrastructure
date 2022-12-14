package handler_test

import (
	"encoding/json"
	"errors"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/golang/mock/gomock"
	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
	"github.com/synthia-telemed/heimdall/cmd/heimdall/handler"
	"github.com/synthia-telemed/heimdall/pkg/config"
	"github.com/synthia-telemed/heimdall/test/mock_token"
	"go.uber.org/zap"
	"net/http"
	"net/http/httptest"
	"reflect"
	"strings"
	"time"
)

var _ = Describe("TokenHandler", func() {
	var (
		mockCtrl         *gomock.Controller
		c                *gin.Context
		rec              *httptest.ResponseRecorder
		h                *handler.TokenHandler
		handlerFunc      gin.HandlerFunc
		mockTokenManager *mock_token.MockManager
		payload          *config.Payload
	)

	BeforeEach(func() {
		mockCtrl = gomock.NewController(GinkgoT())
		mockTokenManager = mock_token.NewMockManager(mockCtrl)
		h = handler.NewTokenHandler(zap.NewNop().Sugar(), mockTokenManager, time.Hour)
		rec = httptest.NewRecorder()
		gin.SetMode(gin.TestMode)
		c, _ = gin.CreateTestContext(rec)
		payload = &config.Payload{
			CustomPayload: config.CustomPayload{UserID: 99},
			MetadataPayload: config.MetadataPayload{
				IssuedAt:  time.Now(),
				ExpiredAt: time.Now().Add(time.Hour),
			},
		}

	})

	JustBeforeEach(func() {
		handlerFunc(c)
	})

	AfterEach(func() {
		mockCtrl.Finish()
	})

	Context("GenerateToken", func() {
		BeforeEach(func() {
			handlerFunc = h.GenerateToken
		})

		When("Correct request body", func() {
			BeforeEach(func() {
				reqBody := strings.NewReader(`{"user_id": 99, "role": "doctor"}`)
				c.Request, _ = http.NewRequest(http.MethodPost, "/", reqBody)
				mockTokenManager.EXPECT().Generate(gomock.Any()).Return("token", nil).Times(1)
			})

			It("should return 201 with token", func() {
				Expect(rec.Code).To(Equal(http.StatusCreated))
				Expect(rec.Body.String()).To(Equal(`{"token":"token"}`))
			})
		})

		When("Incorrect request body", func() {
			BeforeEach(func() {
				reqBody := strings.NewReader(`{"non-user-id": true}`)
				c.Request, _ = http.NewRequest(http.MethodPost, "/", reqBody)
			})

			It("should return 400", func() {
				assertError(rec, c, http.StatusBadRequest, handler.BadRequestBodyError)

			})
		})

		When("Token generation error", func() {
			BeforeEach(func() {
				reqBody := strings.NewReader(`{"user_id": 99, "role": "doctor"}`)
				c.Request, _ = http.NewRequest(http.MethodPost, "/", reqBody)
				mockTokenManager.EXPECT().Generate(gomock.Any()).Return("", errors.New("some error")).Times(1)
			})

			It("should return 500", func() {
				assertError(rec, c, http.StatusInternalServerError, handler.TokenGenerationError)
			})
		})
	})

	Context("Verify and parse payload to body", func() {
		BeforeEach(func() {
			handlerFunc = h.ParsePayload
			c.Request, _ = http.NewRequest(http.MethodGet, "/", nil)
		})

		When("No error getting payload", func() {
			BeforeEach(func() {
				c.Set("payload", payload)
			})

			It("should return 200", func() {
				payloadJSON, err := json.Marshal(payload)
				Expect(err).To(BeNil())
				Expect(rec.Code).To(Equal(http.StatusOK))
				Expect(rec.Body.String()).To(Equal(string(payloadJSON)))
			})
		})

		When("Payload is missing", func() {
			It("should return 500", func() {
				assertError(rec, c, http.StatusInternalServerError, handler.GetPayloadFromContextError)
			})
		})

		When("Payload type casting error", func() {
			var payload *config.CustomPayload
			BeforeEach(func() {
				payload = &config.CustomPayload{UserID: 99}
				c.Set("payload", payload)
			})

			It("should return 500", func() {
				assertError(rec, c, http.StatusInternalServerError, handler.PayloadTypeCastingError)
			})
		})
	})

	Context("Verify and parse payload to header", func() {
		BeforeEach(func() {
			handlerFunc = h.ParsePayloadAndSetHeader
			c.Request, _ = http.NewRequest(http.MethodGet, "/", nil)
		})

		When("No error getting payload", func() {
			BeforeEach(func() {
				c.Set("payload", payload)
			})

			It("should return 200 and set correct headers", func() {
				Expect(rec.Code).To(Equal(http.StatusOK))

				for i := 0; i < reflect.TypeOf(payload.CustomPayload).NumField(); i++ {
					field := reflect.TypeOf(payload.CustomPayload).Field(i)
					headerName := field.Tag.Get("header")
					if len(headerName) > 0 {
						val := fmt.Sprintf("%v", reflect.ValueOf(payload.CustomPayload).Field(i))
						Expect(rec.Header().Get(headerName)).To(Equal(val))
					}
				}
			})
		})

		When("Payload is missing", func() {
			It("should return 500", func() {
				assertError(rec, c, http.StatusInternalServerError, handler.GetPayloadFromContextError)
			})
		})

		When("Payload type casting error", func() {
			var payload *config.CustomPayload
			BeforeEach(func() {
				payload = &config.CustomPayload{UserID: 99}
				c.Set("payload", payload)
			})

			It("should return 500", func() {
				assertError(rec, c, http.StatusInternalServerError, handler.PayloadTypeCastingError)
			})
		})
	})

	Context("AuthenticateToken", func() {
		BeforeEach(func() {
			handlerFunc = h.AuthenticateToken
			c.Request, _ = http.NewRequest(http.MethodGet, "/", nil)
		})

		When("Token is valid", func() {
			BeforeEach(func() {
				token := "really.valid.token"
				c.Request.Header.Set("Authorization", "Bearer "+token)
				mockTokenManager.EXPECT().Parse(token).Return(payload, nil).Times(1)
			})

			Context("Access doctor protected route", func() {
				BeforeEach(func() {
					c.Request.Header.Set("X-Forwarded-Uri", "/doctor/api/protected/test")
				})
				When("User is doctor", func() {
					BeforeEach(func() {
						payload.Role = "Doctor"
					})
					It("should set the payload", func() {
						assertPayload(payload, rec, c)
					})
				})
				When("User is patient", func() {
					BeforeEach(func() {
						payload.Role = "Patient"
					})
					It("should return unauthorized error", func() {
						assertError(rec, c, http.StatusUnauthorized, handler.UnauthorizedError)
					})
				})
			})

			Context("Access patient protected route", func() {
				BeforeEach(func() {
					c.Request.Header.Set("X-Forwarded-Uri", "/patient/api/protected/test")
				})
				When("User is doctor", func() {
					BeforeEach(func() {
						payload.Role = "Doctor"
					})
					It("should return unauthorized error", func() {
						assertError(rec, c, http.StatusUnauthorized, handler.UnauthorizedError)
					})
				})
				When("User is patient", func() {
					BeforeEach(func() {
						payload.Role = "Patient"
					})
					It("should set the payload", func() {
						assertPayload(payload, rec, c)
					})
				})
			})

			Context("Access unchecked service protected route", func() {
				BeforeEach(func() {
					c.Request.Header.Set("X-Forwarded-Uri", "/not-check/api/protected/test")
				})
				When("User is doctor", func() {
					BeforeEach(func() {
						payload.Role = "Doctor"
					})
					It("should set the payload", func() {
						assertPayload(payload, rec, c)
					})
				})
				When("User is patient", func() {
					BeforeEach(func() {
						payload.Role = "Patient"
					})
					It("should set the payload", func() {
						assertPayload(payload, rec, c)
					})
				})
			})

		})

		When("Token is expired", func() {
			BeforeEach(func() {
				token := "valid.expired.token"
				c.Request.Header.Set("Authorization", "Bearer "+token)
				payload.ExpiredAt = time.Now().Add(-time.Hour)
				mockTokenManager.EXPECT().Parse(token).Return(payload, nil).Times(1)
			})

			It("should return unauthorized status with error", func() {
				assertError(rec, c, http.StatusUnauthorized, handler.TokenExpiredError)
			})
		})

		When("Token valid time is indefinite", func() {
			BeforeEach(func() {
				token := "valid.expired.token"
				c.Request.Header.Set("X-Forwarded-Uri", "/not-tested/api")
				c.Request.Header.Set("Authorization", "Bearer "+token)
				payload.ExpiredAt = time.Now().Add(-time.Hour)
				mockTokenManager.EXPECT().Parse(token).Return(payload, nil).Times(1)
				h = handler.NewTokenHandler(zap.NewNop().Sugar(), mockTokenManager, 0)
				handlerFunc = h.AuthenticateToken
			})

			It("should set the payload properly", func() {
				assertPayload(payload, rec, c)
			})
		})

		When("Token format is incorrect", func() {
			BeforeEach(func() {
				token := "bad.formatToken123"
				c.Request.Header.Set("Authorization", "Bearer "+token)
			})

			It("should return unauthorized status with error", func() {
				assertError(rec, c, http.StatusUnauthorized, handler.TokenFormatError)
			})
		})

		When("Token is invalid", func() {
			BeforeEach(func() {
				token := "invalid.token.123"
				c.Request.Header.Set("Authorization", "Bearer "+token)
				mockTokenManager.EXPECT().Parse(token).Return(nil, errors.New("invalid token")).Times(1)
			})

			It("should return unauthorized status with error", func() {
				assertError(rec, c, http.StatusUnauthorized, handler.TokenParsingError)
			})
		})
	})

})

func assertPayload(payload *config.Payload, rec *httptest.ResponseRecorder, c *gin.Context) {
	Expect(rec.Code).To(Equal(http.StatusOK))
	settledPayloadValue, ok := c.Get("payload")
	Expect(ok).To(BeTrue())
	settledPayload, ok := settledPayloadValue.(*config.Payload)
	Expect(ok).To(BeTrue())
	Expect(&settledPayload).To(Equal(&payload))
}

func assertError(rec *httptest.ResponseRecorder, c *gin.Context, expectedCode int, expectedError error) {
	Expect(rec.Code).To(Equal(expectedCode))
	Expect(c.Errors.Last().Err).To(Equal(expectedError))
}
