const PaymentMethod = ({
  icon,
  numberCard,
  isDefault,
  expireDate,
  onChange,
  id,
  onSelect,
  onClick
}) => {
  return (
    <div
      className={`border-[1px] border-solid ${
        onSelect===id ? "border-primary-400" : "border-gray-300"
      } flex items-center p-[16px] mx-[16px] rounded-[8px] mt-[24px]`}
      onClick={() => onClick(id)}
    >
      <input
        checked={onSelect === id ? true : false}
        type="radio"
        value={id}
        className="mr-[24px] accent-primary-500 rounded-full w-[20px] h-[20px]"
      />
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

export default PaymentMethod;
