import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Preferences } from "@capacitor/preferences";
import { PushNotifications } from "@capacitor/push-notifications";
import { Capacitor } from "@capacitor/core";
import useAPI from "../hooks/useAPI";

const IndexPage = () => {
  const [api] = useAPI();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loadSavedToken = async () => {
    const token = await Preferences.get({ key: "token" });
    if (token.value) {
      dispatch.user.setToken(token.value);
      return token.value;
    }
    return null;
  };

  const checkUserLogin = async () => {
    const token = await loadSavedToken();
    if (token) {
      if (Capacitor.isNativePlatform()) await registerPushnotificationListener();
      return navigate(`/home`);
    }
    return navigate(`/login`);
  };

  const registerPushnotificationListener = async () => {
    await PushNotifications.addListener("pushNotificationReceived", notification => {
      console.log("Push notification received: ", notification.title);
    });

    await PushNotifications.addListener(
      "pushNotificationActionPerformed",
      async ({ notification }) => {
        const { appointmentID, notificationID } = notification.data;
        const token = await loadSavedToken();
        if (!token) return navigate("/login");
        try {
          await api.patch(`/notification/${notificationID}`, null, {
            headers: { Authorization: `Bearer ${token}` }
          });
        } catch (error) {
          console.error(
            "read notification error",
            error.response.status,
            JSON.stringify(error.response.data)
          );
        }
        if (appointmentID) {
          return navigate("/appointment/detail", { state: { appointmentID } });
        }
        return navigate("/home");
      }
    );
  };

  useEffect(() => {
    checkUserLogin();
  }, []);

  return <div></div>;
};

export default IndexPage;
