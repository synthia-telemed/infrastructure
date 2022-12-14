import default_profile from "../../Assets/default_profile.png";
import RightArrowIcon from "../../Assets/right_arrow_icon.svg";
import DatepickerIcon from "../../Assets/datepicker.svg";
import TimerIcon from "../../Assets/time.svg";

const AppointmentDetailCard = ({
  name,
  position,
  picture,
  date,
  time,
  isButton,
  onClick,
  duration
}) => {
  return (
    <div className="relative pb-[20px] w-[90vw] mx-[16px] shadow-[0px_1px_3px_rgba(16,24,40,0.1)] bg-base-white border-[1px] border-solid border-gray-200 rounded-[8px] mt-[16px]">
      <div className="flex mt-[32px] w-[75px] h-full relative ">
        <img
          className="min-w-[75px] min-h-[75px] max-h-[75px] object-contain mx-[16px] rounded-[50%]"
          src={picture}
          width="75px"
          height="75px"
          alt=""
        />{" "}
        <div className="flex flex-col w-[60vw] ml-[20px] ">
          <div className="flex w-[60vw]">
            <div className="flex flex-col w-[60vw] typographyTextSmMedium">
              <h1 className="text-start w-[60vw] typographyTextMdMedium ">{name}</h1>
              <h1 className="text-start text-gray-500 mt-[8px]">
                Internist : {position}
              </h1>
              <div className="flex items-center mt-[8px]">
                <img src={DatepickerIcon} alt="" />
                <h1 className="ml-[7px]">{date}</h1>
              </div>
              <div className="flex items-center">
                <img src={TimerIcon} alt="" />
                <h1 className="ml-[7px] ">{time}</h1>
              </div>
              {duration ? (
                <div className="mt-[8px]">
                  <h1 className="typographyTextXsMedium text-gray-600">
                    {" "}
                    Duration Time : {duration} minutes
                  </h1>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
      {isButton ? (
        <div className="flex justify-center mt-[8px]">
          <button
            className="w-[320px] border-[1px] border-solid border-gray-300 rounded-[8px] h-[40px]"
            onClick={onClick}
          >
            <h1 className="typographyTextSmMedium text-gray-700">Detail</h1>
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
export default AppointmentDetailCard;
