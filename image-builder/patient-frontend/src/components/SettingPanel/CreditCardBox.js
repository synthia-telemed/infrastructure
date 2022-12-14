import { useNavigate } from "react-router-dom";
const CreditCardBox = ({ icon, numberCard, expireDate, isDefault, id }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() =>
        navigate("/setting/credit-card/detail", {
          state: { numberCard: numberCard, isDefault: isDefault, icon: icon, id: id }
        })
      }
      className="border-[1px] border-solid border-gray-300 flex items-center p-[16px] rounded-[8px] mt-[24px]"
    >
      <img src={icon} alt="" />
      <div className="flex flex-col ml-[24px]">
        <div className="flex">
          <h1 className="typographyTextSmMedium">{numberCard}</h1>
          {isDefault ? (
            <h1 className="typographyTextSmMedium text-primary-500 ml-[8px]">
              (Default)
            </h1>
          ) : (
            <></>
          )}
        </div>
        <h2 className="typographyTextXsRegular text-gray-600 mt-[10px]">
          Expires on {expireDate}
        </h2>
      </div>
    </div>
  );
};
export default CreditCardBox;
