// Code generated by MockGen. DO NOT EDIT.
// Source: pkg/datastore/credit_card.go

// Package mock_datastore is a generated GoMock package.
package mock_datastore

import (
	reflect "reflect"

	gomock "github.com/golang/mock/gomock"
	datastore "github.com/synthia-telemed/backend-api/pkg/datastore"
)

// MockCreditCardDataStore is a mock of CreditCardDataStore interface.
type MockCreditCardDataStore struct {
	ctrl     *gomock.Controller
	recorder *MockCreditCardDataStoreMockRecorder
}

// MockCreditCardDataStoreMockRecorder is the mock recorder for MockCreditCardDataStore.
type MockCreditCardDataStoreMockRecorder struct {
	mock *MockCreditCardDataStore
}

// NewMockCreditCardDataStore creates a new mock instance.
func NewMockCreditCardDataStore(ctrl *gomock.Controller) *MockCreditCardDataStore {
	mock := &MockCreditCardDataStore{ctrl: ctrl}
	mock.recorder = &MockCreditCardDataStoreMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockCreditCardDataStore) EXPECT() *MockCreditCardDataStoreMockRecorder {
	return m.recorder
}

// Count mocks base method.
func (m *MockCreditCardDataStore) Count(patientID uint) (int, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Count", patientID)
	ret0, _ := ret[0].(int)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// Count indicates an expected call of Count.
func (mr *MockCreditCardDataStoreMockRecorder) Count(patientID interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Count", reflect.TypeOf((*MockCreditCardDataStore)(nil).Count), patientID)
}

// Create mocks base method.
func (m *MockCreditCardDataStore) Create(card *datastore.CreditCard) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Create", card)
	ret0, _ := ret[0].(error)
	return ret0
}

// Create indicates an expected call of Create.
func (mr *MockCreditCardDataStoreMockRecorder) Create(card interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Create", reflect.TypeOf((*MockCreditCardDataStore)(nil).Create), card)
}

// Delete mocks base method.
func (m *MockCreditCardDataStore) Delete(id uint) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Delete", id)
	ret0, _ := ret[0].(error)
	return ret0
}

// Delete indicates an expected call of Delete.
func (mr *MockCreditCardDataStoreMockRecorder) Delete(id interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Delete", reflect.TypeOf((*MockCreditCardDataStore)(nil).Delete), id)
}

// FindByID mocks base method.
func (m *MockCreditCardDataStore) FindByID(id uint) (*datastore.CreditCard, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "FindByID", id)
	ret0, _ := ret[0].(*datastore.CreditCard)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// FindByID indicates an expected call of FindByID.
func (mr *MockCreditCardDataStoreMockRecorder) FindByID(id interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "FindByID", reflect.TypeOf((*MockCreditCardDataStore)(nil).FindByID), id)
}

// FindByPatientID mocks base method.
func (m *MockCreditCardDataStore) FindByPatientID(patientID uint) ([]datastore.CreditCard, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "FindByPatientID", patientID)
	ret0, _ := ret[0].([]datastore.CreditCard)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// FindByPatientID indicates an expected call of FindByPatientID.
func (mr *MockCreditCardDataStoreMockRecorder) FindByPatientID(patientID interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "FindByPatientID", reflect.TypeOf((*MockCreditCardDataStore)(nil).FindByPatientID), patientID)
}

// IsOwnCreditCard mocks base method.
func (m *MockCreditCardDataStore) IsOwnCreditCard(patientID, cardID uint) (bool, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "IsOwnCreditCard", patientID, cardID)
	ret0, _ := ret[0].(bool)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// IsOwnCreditCard indicates an expected call of IsOwnCreditCard.
func (mr *MockCreditCardDataStoreMockRecorder) IsOwnCreditCard(patientID, cardID interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "IsOwnCreditCard", reflect.TypeOf((*MockCreditCardDataStore)(nil).IsOwnCreditCard), patientID, cardID)
}

// SetAllToNonDefault mocks base method.
func (m *MockCreditCardDataStore) SetAllToNonDefault(patientID uint) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "SetAllToNonDefault", patientID)
	ret0, _ := ret[0].(error)
	return ret0
}

// SetAllToNonDefault indicates an expected call of SetAllToNonDefault.
func (mr *MockCreditCardDataStoreMockRecorder) SetAllToNonDefault(patientID interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "SetAllToNonDefault", reflect.TypeOf((*MockCreditCardDataStore)(nil).SetAllToNonDefault), patientID)
}

// SetIsDefault mocks base method.
func (m *MockCreditCardDataStore) SetIsDefault(cardID uint, isDefault bool) error {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "SetIsDefault", cardID, isDefault)
	ret0, _ := ret[0].(error)
	return ret0
}

// SetIsDefault indicates an expected call of SetIsDefault.
func (mr *MockCreditCardDataStoreMockRecorder) SetIsDefault(cardID, isDefault interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "SetIsDefault", reflect.TypeOf((*MockCreditCardDataStore)(nil).SetIsDefault), cardID, isDefault)
}
