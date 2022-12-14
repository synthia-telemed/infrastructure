import ArrowLeftIcon from "../Assets/arrow-left.svg";
import { useNavigate } from "react-router-dom";
const HeaderWithBack = ({ textHeader,path }) => {
  const navigate = useNavigate();
  return (
    <div className="typographyHeadingXsSemibold w-[95vw] mt-[61px] flex ml-[16px]">
      <img src={ArrowLeftIcon} alt="" onClick={() => navigate(path)} />
      <h1 className="ml-[16px]">{textHeader}</h1>
    </div>
  );
};
export default HeaderWithBack;
