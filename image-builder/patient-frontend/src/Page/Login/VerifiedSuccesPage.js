import { useEffect } from "react";
import useAPI from "../../hooks/useAPI";
import { PushNotifications } from "@capacitor/push-notifications";
import { ReactComponent as VerifiedIcon } from "../../Assets/Login/verified_success.svg";
import { useNavigate } from "react-router-dom";

const VerifiedSuccesPage = () => {
  const navigate = useNavigate();
  const [api] = useAPI();

  const registerNotifications = async () => {
    let permStatus = await PushNotifications.checkPermissions();
    if (permStatus.receive === "prompt")
      permStatus = await PushNotifications.requestPermissions();
    if (permStatus.receive !== "granted") throw new Error("User denied permissions!");

    await PushNotifications.addListener("registration", async token => {
      await api.post("/notification/token", { token: token.value });
    });

    await PushNotifications.addListener("registrationError", err => {
      console.error("Registration error: ", err.error);
    });

    await PushNotifications.register();
  };

  useEffect(() => {
    registerNotifications();
    setTimeout(() => {
      navigate("/home");
    }, 2000);
  }, []);
  return (
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <VerifiedIcon width="56px" height="56px" />
        <h1 className="mt-[22px] typographyHeadingSmMedium">Welcome to Synthia</h1>
      </div>
  );
};
export default VerifiedSuccesPage;
