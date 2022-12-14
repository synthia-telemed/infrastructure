import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./Page/Login";
import OtpVerificationPage from "./Page/Login/otpVerificationPage";
import VerifiedSuccesPage from "./Page/Login/VerifiedSuccesPage";
import NotificationPage from "./Page/Notification";
import HistoryPage from "./Page/History/index";
import UserSettingPage from "./Page/UserSetting/index";
import PersonalInformationPage from "./Page/UserSetting/PersonalInformationPage";
import PrivacyPage from "./Page/UserSetting/PrivacyPage";
import AgreementPage from "./Page/UserSetting/AgreementPage";
import CreditcardPage from "./Page/UserSetting/CreditCardPage";
import CreditCardDetail from "./Page/UserSetting/CreditCardDetail";
import AddCardPage from "./Page/UserSetting/AddCardPage";
import HomePage from "./Page/home";
import AppointmentDetailPage from "./Page/Appointment/AppointmentDetailPage";
import SummaryReciept from "./Page/Appointment/SummaryReciept";
import PaymentSuccessFully from "./Page/Appointment/PaymentSuccessFully";
import VideoCallPage from "./Page/Appointment/videoCallPage";
import ReportPage from "./Page/Report";
import IndexPage from "./Page";

function App() {
  // const Login = lazy(() => import("./Page/Login"));

  return (
    <BrowserRouter>
      <Routes>
        {/* Login Section */}
        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/otp-verification" element={<OtpVerificationPage />} />
        <Route path="/verified-success" element={<VerifiedSuccesPage />} />
        <Route path="/notification" element={<NotificationPage />} />

        {/* Setting */}
        <Route path="/setting" element={<UserSettingPage />} />
        <Route
          path="/setting/personal-information"
          element={<PersonalInformationPage />}
        />
        <Route path="/setting/agreement" element={<AgreementPage />} />
        <Route path="/setting/privacy" element={<PrivacyPage />} />
        <Route path="/setting/credit-card" element={<CreditcardPage />} />
        <Route path="/setting/credit-card/detail" element={<CreditCardDetail />} />
        <Route path="/setting/add-card" element={<AddCardPage />} />
        {/* Hometab */}
        <Route path="/appointment/detail" element={<AppointmentDetailPage />} />
        <Route path="/appointment/summary-reciept" element={<SummaryReciept />} />
        <Route path="/appointment/video-call" element={<VideoCallPage />} />
        <Route path="/appointment/payment-succeed" element={<PaymentSuccessFully />} />

        <Route path="/history" element={<HistoryPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/index" element={<IndexPage />} />
        <Route path="*" element={<Navigate to="/index" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
