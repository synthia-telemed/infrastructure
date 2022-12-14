import default_profile from "../../Assets/default_profile.png";
import RightArrowIcon from "../../Assets/right_arrow_icon.svg";
import DatepickerIcon from "../../Assets/datepicker.svg";
import TimerIcon from "../../Assets/time.svg";

const HistoryCard = ({ name, position, date, startTime, onClick, picture,endTime }) => {
  return (
    <div className="relative pb-[20px] w-[90vw]" onClick={onClick}>
      <div className="border-y-[1px] border-t-[0px] border-gray-200 w-screen absolute bottom-[0%] left-[-4%]"></div>
      <div className="flex mt-[32px] w-full relative ">
        <img
          className="min-w-[48px] min-h-[48px] max-h-[48px] object-contain rounded-[50%]"
          src={picture}
          width="48px"
          height="48px"
          alt=""
        />{" "}
        <div className="flex flex-col w-[80vw] ml-[20px] ">
          <div className="flex w-[80vw]">
            <div className="flex flex-col w-[80vw] typographyTextSmMedium">
              <h1 className="text-start w-[70vw] typographyTextMdMedium ">
                {name}
              </h1>
              <h1 className="text-start text-gray-500 mt-[8px]">
                Internist : {position}
              </h1>
              <div className="flex items-center mt-[8px]">
                <img src={DatepickerIcon} alt="" />
                <h1 className="ml-[7px]">{date}</h1>
              </div>
              <div className="flex items-center">
                <img src={TimerIcon} alt="" />
                <h1 className="ml-[7px] ">{startTime + "-" +endTime}</h1>
              </div>
            </div>
            <div className="flex justify-end items-start w-full mr-[16px] ">
              <img src={RightArrowIcon} width="24px" height="24px" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HistoryCard;
