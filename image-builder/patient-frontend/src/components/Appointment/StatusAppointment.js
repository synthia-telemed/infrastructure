const StatusAppointment = ({ textStatus, bgColor, colorText }) => {
  return (
    <div className="w-full flex justify-center mt-[16px] ">
      <div
        className={`w-[300px] rounded-[8px] text-center p-[8px] ${bgColor} ${colorText}`}
      >
        <h1 className="typographyTextXsMedium">{textStatus}</h1>
      </div>
    </div>
  );
};
export default StatusAppointment;
