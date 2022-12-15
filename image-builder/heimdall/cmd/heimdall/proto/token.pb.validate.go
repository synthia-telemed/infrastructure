// Code generated by protoc-gen-validate. DO NOT EDIT.
// source: token.proto

package proto

import (
	"bytes"
	"errors"
	"fmt"
	"net"
	"net/mail"
	"net/url"
	"regexp"
	"sort"
	"strings"
	"time"
	"unicode/utf8"

	"google.golang.org/protobuf/types/known/anypb"
)

// ensure the imports are used
var (
	_ = bytes.MinRead
	_ = errors.New("")
	_ = fmt.Print
	_ = utf8.UTFMax
	_ = (*regexp.Regexp)(nil)
	_ = (*strings.Reader)(nil)
	_ = net.IPv4len
	_ = time.Duration(0)
	_ = (*url.URL)(nil)
	_ = (*mail.Address)(nil)
	_ = anypb.Any{}
	_ = sort.Sort
)

// Validate checks the field values on GenerateTokenRequest with the rules
// defined in the proto definition for this message. If any rules are
// violated, the first error encountered is returned, or nil if there are no violations.
func (m *GenerateTokenRequest) Validate() error {
	return m.validate(false)
}

// ValidateAll checks the field values on GenerateTokenRequest with the rules
// defined in the proto definition for this message. If any rules are
// violated, the result is a list of violation errors wrapped in
// GenerateTokenRequestMultiError, or nil if none found.
func (m *GenerateTokenRequest) ValidateAll() error {
	return m.validate(true)
}

func (m *GenerateTokenRequest) validate(all bool) error {
	if m == nil {
		return nil
	}

	var errors []error

	if m.GetUserID() < 1 {
		err := GenerateTokenRequestValidationError{
			field:  "UserID",
			reason: "value must be greater than or equal to 1",
		}
		if !all {
			return err
		}
		errors = append(errors, err)
	}

	if utf8.RuneCountInString(m.GetRole()) < 1 {
		err := GenerateTokenRequestValidationError{
			field:  "Role",
			reason: "value length must be at least 1 runes",
		}
		if !all {
			return err
		}
		errors = append(errors, err)
	}

	if len(errors) > 0 {
		return GenerateTokenRequestMultiError(errors)
	}

	return nil
}

// GenerateTokenRequestMultiError is an error wrapping multiple validation
// errors returned by GenerateTokenRequest.ValidateAll() if the designated
// constraints aren't met.
type GenerateTokenRequestMultiError []error

// Error returns a concatenation of all the error messages it wraps.
func (m GenerateTokenRequestMultiError) Error() string {
	var msgs []string
	for _, err := range m {
		msgs = append(msgs, err.Error())
	}
	return strings.Join(msgs, "; ")
}

// AllErrors returns a list of validation violation errors.
func (m GenerateTokenRequestMultiError) AllErrors() []error { return m }

// GenerateTokenRequestValidationError is the validation error returned by
// GenerateTokenRequest.Validate if the designated constraints aren't met.
type GenerateTokenRequestValidationError struct {
	field  string
	reason string
	cause  error
	key    bool
}

// Field function returns field value.
func (e GenerateTokenRequestValidationError) Field() string { return e.field }

// Reason function returns reason value.
func (e GenerateTokenRequestValidationError) Reason() string { return e.reason }

// Cause function returns cause value.
func (e GenerateTokenRequestValidationError) Cause() error { return e.cause }

// Key function returns key value.
func (e GenerateTokenRequestValidationError) Key() bool { return e.key }

// ErrorName returns error name.
func (e GenerateTokenRequestValidationError) ErrorName() string {
	return "GenerateTokenRequestValidationError"
}

// Error satisfies the builtin error interface
func (e GenerateTokenRequestValidationError) Error() string {
	cause := ""
	if e.cause != nil {
		cause = fmt.Sprintf(" | caused by: %v", e.cause)
	}

	key := ""
	if e.key {
		key = "key for "
	}

	return fmt.Sprintf(
		"invalid %sGenerateTokenRequest.%s: %s%s",
		key,
		e.field,
		e.reason,
		cause)
}

var _ error = GenerateTokenRequestValidationError{}

var _ interface {
	Field() string
	Reason() string
	Key() bool
	Cause() error
	ErrorName() string
} = GenerateTokenRequestValidationError{}

// Validate checks the field values on TokenResponse with the rules defined in
// the proto definition for this message. If any rules are violated, the first
// error encountered is returned, or nil if there are no violations.
func (m *TokenResponse) Validate() error {
	return m.validate(false)
}

// ValidateAll checks the field values on TokenResponse with the rules defined
// in the proto definition for this message. If any rules are violated, the
// result is a list of violation errors wrapped in TokenResponseMultiError, or
// nil if none found.
func (m *TokenResponse) ValidateAll() error {
	return m.validate(true)
}

func (m *TokenResponse) validate(all bool) error {
	if m == nil {
		return nil
	}

	var errors []error

	// no validation rules for Token

	if len(errors) > 0 {
		return TokenResponseMultiError(errors)
	}

	return nil
}

// TokenResponseMultiError is an error wrapping multiple validation errors
// returned by TokenResponse.ValidateAll() if the designated constraints
// aren't met.
type TokenResponseMultiError []error

// Error returns a concatenation of all the error messages it wraps.
func (m TokenResponseMultiError) Error() string {
	var msgs []string
	for _, err := range m {
		msgs = append(msgs, err.Error())
	}
	return strings.Join(msgs, "; ")
}

// AllErrors returns a list of validation violation errors.
func (m TokenResponseMultiError) AllErrors() []error { return m }

// TokenResponseValidationError is the validation error returned by
// TokenResponse.Validate if the designated constraints aren't met.
type TokenResponseValidationError struct {
	field  string
	reason string
	cause  error
	key    bool
}

// Field function returns field value.
func (e TokenResponseValidationError) Field() string { return e.field }

// Reason function returns reason value.
func (e TokenResponseValidationError) Reason() string { return e.reason }

// Cause function returns cause value.
func (e TokenResponseValidationError) Cause() error { return e.cause }

// Key function returns key value.
func (e TokenResponseValidationError) Key() bool { return e.key }

// ErrorName returns error name.
func (e TokenResponseValidationError) ErrorName() string { return "TokenResponseValidationError" }

// Error satisfies the builtin error interface
func (e TokenResponseValidationError) Error() string {
	cause := ""
	if e.cause != nil {
		cause = fmt.Sprintf(" | caused by: %v", e.cause)
	}

	key := ""
	if e.key {
		key = "key for "
	}

	return fmt.Sprintf(
		"invalid %sTokenResponse.%s: %s%s",
		key,
		e.field,
		e.reason,
		cause)
}

var _ error = TokenResponseValidationError{}

var _ interface {
	Field() string
	Reason() string
	Key() bool
	Cause() error
	ErrorName() string
} = TokenResponseValidationError{}