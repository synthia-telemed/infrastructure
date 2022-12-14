const BadgeStatus = ({ text, style }) => {
  return (
    <div
      className={`w-[76px] h-[22px] flex justify-center items-center py-[8px] rounded-[16px] px-[2px] ${style}`}
    >
      <h1 className="typographyTextXsMedium"> {text}</h1>
    </div>
  );
};
export default BadgeStatus;
