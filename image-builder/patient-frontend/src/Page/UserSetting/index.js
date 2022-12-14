import { Preferences } from "@capacitor/preferences";
import ProfileUserIcon from "../../Assets/profileuser.png";
import SettingButton from "../../components/SettingPanel/SettingButton";
import PeopleIcon from "../../Assets/UserSetting/peopleIcon.svg";
import CreditcardIcon from "../../Assets/UserSetting/creditcard.svg";
import AgreementIcon from "../../Assets/UserSetting/agreement.svg";
import PrivacyIcon from "../../Assets/UserSetting/privacy.svg";
import useAPI from "../../hooks/useAPI";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const UserSettingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const onLogout = () => {
    Preferences.remove({ key: "token" }).then(() => {
      dispatch.user.removeToken();
      navigate("/login");
    });
  };

  return (
    <div>
      <div className="mt-[71px]">
        <div className="px-[16px] h-[80vh]">
          <div className="flex h-[75px]">
            <img src={user.pictureURL} className="rounded-[48px]" alt="" />
            <div className="flex flex-col ml-[16px] justify-center">
              <h1 className="typographyTextMdSemibold">{user.fullname}</h1>
              <h2 className="typographyTextXsMedium text-gray-700">
                Siriraj Piyamaharajkarun Hospital
              </h2>
            </div>
          </div>
          <div className="mt-[24px]">
            <SettingButton
              icon={PeopleIcon}
              title="Personal information"
              path="/setting/personal-information"
            />
            <SettingButton
              icon={CreditcardIcon}
              title="Credit cards"
              path="/setting/credit-card"
            />
            <SettingButton
              icon={AgreementIcon}
              title="Agreement"
              path="/setting/agreement"
            />
            <SettingButton icon={PrivacyIcon} title="Privacy" path="/setting/privacy" />
          </div>
          <div className="flex items-center">
            <button
              onClick={onLogout}
              className="w-[235px] h-[44px] border-solid border-[1.5px] border-primary-500 rounded-[8px] text-primary-500 absolute bottom-[20%] left-[23%]"
            >
              <h1 className="typographyTextMdMedium"> Logout</h1>
            </button>
          </div>
        </div>
        <Navbar />
      </div>
    </div>
  );
};
export default UserSettingPage;
