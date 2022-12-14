import { useNavigate } from "react-router-dom";
import BackArrowIcon from "../../Assets/back-arrow.svg";
import useAPI from "../../hooks/useAPI";
const NotificationHeader = ({ onSetAllAsRead }) => {
  const [api] = useAPI();
  const readAllNotification = async () => {
    try {
      await api.patch("/notification");
      onSetAllAsRead();
    } catch (error) {
      console.error(error.response);
    }
  };
  const navigate = useNavigate();
  return (
    <div className="typographyHeadingXsSemibold w-full mt-[61px] pb-[16px] flex justify-between items-center px-[16px] border-b-[1px] border-gray-300 border-solid">
      <div className="flex">
        <img src={BackArrowIcon} alt="" onClick={() => navigate("/home")} />
        <h1 className=" ml-[16px] ">Notification</h1>
      </div>
      <h1 className="typographyTextXsMedium text-gray-500" onClick={readAllNotification}>
        Read All
      </h1>
    </div>
  );
};
export default NotificationHeader;
