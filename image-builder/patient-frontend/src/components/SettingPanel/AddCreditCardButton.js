import PlusIcon from "../../Assets/UserSetting/Plus.svg";
import { useNavigate } from "react-router-dom";
const AddCreditCardButton = () => {
  const navigate = useNavigate();
  return (
    <div
      className="px-[16px] flex justify-center mt-[24px] mb-[20px]"
      onClick={() => navigate("/setting/add-card")}
    >
      <div className="border-[1px] border-solid border-gray-300 w-[93vw] bg-gray-50 h-[56px] rounded-[8px] flex justify-center items-center typographyTextSmSemibold">
        <img src={PlusIcon} alt="" className="mr-[8px]" /> Add new credit card
      </div>
    </div>
  );
};
export default AddCreditCardButton;
