import DatepickerIcon from "../../Assets/datepicker.svg";
import TimerIcon from "../../Assets/time.svg";
const NextAppointment = ({ date, time }) => {
  return (
    <div className="">
      <h1 className="mt-[16px] typographyTextLgSemibold">Next Appointment</h1>
      <div className="px-[16px] mt-[8px] typographyTextSmMedium h-[96px] shadow-[0px_1px_3px_rgba(16,24,40,0.1)] bg-base-white border-[1px] border-solid border-gray-200 rounded-[8px] flex flex-col justify-center">
        <div className="flex items-center mt-[8px]">
          <img src={DatepickerIcon} alt="" />
          <h1 className="ml-[7px]">{date}</h1>
        </div>
        <div className="flex items-center">
          <img src={TimerIcon} alt="" />
          <h1 className="ml-[7px] ">{time}</h1>
        </div>
      </div>
    </div>
  );
};
export default NextAppointment;
