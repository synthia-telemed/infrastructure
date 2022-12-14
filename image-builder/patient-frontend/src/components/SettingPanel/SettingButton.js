import RightArrowIcon from "../../Assets/right-arrow.svg";
import { useNavigate } from "react-router-dom";
const SettingButton = ({ title, icon, path }) => {
  const navigate = useNavigate();
  return (
    <div
      className="border-[1px] border-solid border-gray-200 h-[72px] w-screen ml-[-16px] "
      onClick={() => navigate(path)}
    >
      <div className="flex justify-between items-center h-full">
        <div className="flex ml-[16px]">
          <img src={icon} width="24px" height="24px" alt="" />{" "}
          <h1 className="typographyTextMdMedium ml-[8px]">{title}</h1>
        </div>
        <img src={RightArrowIcon} alt="" />
      </div>
    </div>
  );
};
export default SettingButton;
