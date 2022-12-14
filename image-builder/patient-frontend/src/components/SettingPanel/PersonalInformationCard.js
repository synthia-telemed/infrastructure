const PersonalInformationCard = ({ title, value }) => {
  return (
    <div className="flex flex-col ml-[16px] mt-[16px] mb-[24px]">
      <h1 className="typographyTextSmMedium text-gray-700">{title}</h1>
      <input
        type="text"
        className="w-[90vw] rounded-[8px] p-[8px] bg-gray-50 border-[1px] border-solid border-gray-300 mt-[6px] typographyTextMdRegular placeholder:text-gray-700"
        disabled={true}
        placeholder={value}
      />
    </div>
  );
};
export default PersonalInformationCard;
