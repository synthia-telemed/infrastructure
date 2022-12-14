import NotificationHeader from "../../components/Notification/notificationHeader";
import DatepickerIcon from "../../Assets/NotificationIcon/datepicker.svg";
import WalletIcon from "../../Assets/NotificationIcon/wallet.svg";
import NotificationCard from "../../components/Notification/notificationCard";
import useAPI from "../../hooks/useAPI";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const NotificationPage = () => {
  const [notifications, setNotification] = useState([]);
  const [api] = useAPI();

  useEffect(() => {
    api.get("/notification").then(({ data }) => {
      setNotification(data);
    });
  }, []);

  const onSetAllAsRead = () => {
    setNotification(notifications.map(noti => ({ ...noti, is_read: true })));
  };

  return (
    <div>
      <NotificationHeader onSetAllAsRead={onSetAllAsRead} />
      {notifications.map(noti => {
        return (
          <NotificationCard
            title={noti.title}
            url={DatepickerIcon}
            statusNew={!noti.is_read}
            time={dayjs(noti.created_at).fromNow()}
            detail={noti.body}
          />
        );
      })}
    </div>
  );
};
export default NotificationPage;
