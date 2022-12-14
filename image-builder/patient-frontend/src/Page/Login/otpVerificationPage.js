import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Preferences } from "@capacitor/preferences";
import OtpInput from "react-otp-input";
import { connect } from "react-redux";
import useAPI from "../../hooks/useAPI";

const mapDispatch = dispatch => ({
  setToken: value => dispatch.user.setToken(value)
});

const mapState = state => ({
  name: state.user.name
});

const OtpVerificationPage = props => {
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [api] = useAPI();

  const handleChange = otp => {
    setOtp(otp);
  };
  const saveToken = async token => {
    props.setToken(token);
    await Preferences.set({ key: "token", value: token });
  };
  const resendVerification = async () => {
    try {
      const body = { credential: location.state?.citizenNumber };
      const res = await api.post("/auth/signin", body);
    } catch (error) {
      setErrorMessage("Invalid PIN. Please try again");
      console.log(error);
    }
  };
  const submitVerfication = async () => {
    try {
      if (otp.length !== 6) {
        setErrorMessage("Invalid PIN. Please try again");
      } else {
        const body = { otp: otp };
        const res = await api.post("/auth/verify", body);
        await saveToken(res.data.token);
        navigate(`/verified-success`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-screen h-screen">
      <div className="absolute left-[50%] top-[30vh] translate-x-[-50%] w-screen">
        <h1 className="text-center font-body text-[24px]">Enter Verification Code</h1>
        <h2 className="text-center font-body text-[12px]">
          The verification code is sent to {location.state.mobile.phone_number}
        </h2>
        <div className="flex justify-center w-screen mt-[80px] ">
          <OtpInput
            value={otp}
            onChange={handleChange}
            numInputs={6}
            isInputNum={true}
            inputStyle={{
              width: "50.5px",
              height: "3rem",
              margin: "3px",
              borderRadius: "8px",
              border: "1px solid #838BE8",
              color: "#303ed9",
              fontSize: "2.5rem",
              fontFamily: "Poppins",
              fontWeight: 600
            }}
          />
        </div>
        <h1 className=" font-body text-error_600 mx-[2.5rem] ">{errorMessage}</h1>

        <div className="mt-[80px] flex justify-center">
          <button
            className="w-[315px] bg-primary-500 text-base-white h-[48px] rounded-[8px] typographyTextMdMedium"
            onClick={submitVerfication}
          >
            Submit
          </button>
        </div>
        <h2 className="text-gray-400 text-center mt-[30px] typographyTextXsSemibold">
          Didn’t recieve?{" "}
          <span className="text-primary-600" onClick={resendVerification}>
            Resend
          </span>
        </h2>
      </div>
    </div>
  );
};
export default connect(mapState, mapDispatch)(OtpVerificationPage);
