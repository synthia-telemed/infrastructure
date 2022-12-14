import dayjs from "dayjs";
import BadgeStatus from "../components/Appointment/BadgeStatus";
const LatestCardResult = ({
  status,
  dateTime,
  name,
  value,
  unit,
  secondValue,
  status2,
  value2,
  unit2
}) => {
  const BloodPressure = () => {
    return (
      <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.5 19.45C13.6381 20.2209 12.5718 20.7264 11.4293 20.9055C10.2869 21.0846 9.11708 20.9298 8.06059 20.4596C7.00409 19.9895 6.10596 19.2241 5.47428 18.2555C4.84259 17.2869 4.50426 16.1564 4.5 15C4.5 11 6.5 10 10.5 3C12.58 6.63 14.11 8.65 15.11 10.3"
          stroke="#303ED9"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.5 8C13.83 12.67 12.5 13.33 12.5 16C12.5 17.0609 12.9214 18.0783 13.6716 18.8284C14.4217 19.5786 15.4391 20 16.5 20C17.5609 20 18.5783 19.5786 19.3284 18.8284C20.0786 18.0783 20.5 17.0609 20.5 16C20.5 13.33 19.17 12.67 16.5 8Z"
          stroke="#303ED9"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };
  const PulseIcon = () => {
    return (
      <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.5 11.9999H10.5L11.5 8.99988L13.5 14.9999L14.5 11.9999H16.5M19.5 14.0699C17.5383 16.7273 15.177 19.065 12.5 20.9999C9.82299 19.065 7.46169 16.7273 5.5 14.0699C3.28 11.0699 2.74 6.81988 4.97 4.61988C8.97 0.619881 12.54 5.22988 12.54 5.22988C12.54 5.22988 16.09 0.649881 20.11 4.61988C22.3 6.81988 21.76 11.0899 19.5 14.0699Z"
          stroke="#303ED9"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };
  const GlucoseIcon = () => {
    return (
      <>
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.7464 8.89224L18.0609 9.33118C18.1565 9.46462 18.2249 9.61559 18.2622 9.77547C18.2995 9.93534 18.3049 10.101 18.2782 10.263C18.2514 10.4249 18.193 10.5801 18.1064 10.7195C18.0197 10.8589 17.9064 10.9798 17.7729 11.0755L17.1416 11.5279C17.0068 11.6244 16.8393 11.6635 16.6757 11.6365C16.5121 11.6095 16.366 11.5186 16.2694 11.3839L12.3637 5.93342C12.2671 5.79867 12.2281 5.63109 12.2551 5.46753C12.2821 5.30397 12.3729 5.15784 12.5077 5.06128L13.139 4.60887C13.2725 4.51324 13.4234 4.44484 13.5833 4.40756C13.7432 4.37029 13.9088 4.36486 14.0708 4.3916C14.2328 4.41834 14.3879 4.47673 14.5273 4.56342C14.6667 4.65011 14.7877 4.7634 14.8833 4.89684L15.1978 5.33579L17.6756 3.56022C18.6446 2.86589 20.008 3.03866 20.7286 3.9882C20.9056 4.22104 21.0341 4.48701 21.1065 4.77037C21.1789 5.05373 21.1937 5.34873 21.1501 5.63792C21.1065 5.92712 21.0054 6.20464 20.8527 6.45408C20.7 6.70352 20.4989 6.91981 20.2611 7.09016L17.7464 8.89224Z"
            stroke="#303ED9"
            strokeWidth="1.63277"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.773 10.691L10.7434 14.2951C10.3867 14.5509 9.96897 14.7083 9.53215 14.7514C9.09532 14.7945 8.65486 14.7218 8.25507 14.5405L6.32104 15.0302C6.19925 15.0611 6.07099 15.0545 5.95299 15.0114C5.83499 14.9682 5.73273 14.8905 5.65955 14.7884V14.7884C5.60701 14.7151 5.57779 14.6276 5.57569 14.5374C5.57359 14.4473 5.59872 14.3585 5.64779 14.2829L6.79858 12.508C6.75549 12.0712 6.8282 11.6307 7.00941 11.2309C7.19061 10.8311 7.47392 10.4861 7.83082 10.2306L12.8604 6.62645"
            stroke="#303ED9"
            strokeWidth="1.63277"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 17C3.99875 18.9458 3.5 19.2208 3.5 20.3333C3.5 20.7754 3.65804 21.1993 3.93934 21.5118C4.22064 21.8244 4.60218 22 5 22C5.39782 22 5.77936 21.8244 6.06066 21.5118C6.34196 21.1993 6.5 20.7754 6.5 20.3333C6.5 19.2208 6.00125 18.9458 5 17Z"
            fill="#303ED9"
            stroke="#303ED9"
            strokeWidth="0.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </>
    );
  };
  return (
    <div className="w-full bg-base-white flex flex-col h-full p-[16px] rounded-[10px] shadow-md mt-[16px] ">
      <div className="flex flex-col w-[100%] justify-between ">
        <div className="flex items-center justify-between w-[100%]">
          <div className="flex items-center ">
            {name === "BloodPressure" ? (
              <BloodPressure />
            ) : name === "Glucose Level" ? (
              <GlucoseIcon />
            ) : (
              <PulseIcon />
            )}
            <h1 className="ml-[4px] typographyTextMdSemibold ">{name}</h1>
          </div>
          <h1 className="typographyTextXsMedium text-gray-600">
            Last monitoring at {dayjs(dateTime).format("H:mm A")}
          </h1>
        </div>
        <div className="flex items-center mt-[11px]">
          <h1 className="typographyTextXsRegular text-gray-600">
            Fasting{" "}
            <span
              className={`typographyTextMdSemibold ${
                status === "Normal"
                  ? "text-success-700"
                  : status === "Abnormal"
                  ? "text-error-700"
                  : status === "Warning"
                  ? "text-warning-700"
                  : "text-primary-700"
              } ml-[4px]`}
            >
              {" "}
              {value}{" "}
            </span>
            <span className="typographyTextXsRegular ml-[4px] mr-[4px] text-gray-600">{unit}</span>
          </h1>
          {status === "Normal" ? (
            <BadgeStatus text="Normal" style="bg-success-50 text-success-700" />
          ) : status === "Abnormal" ? (
            <BadgeStatus text="Abnormal" style="bg-error-50 text-error-700" />
          ) : status === "Warning" ? (
            <BadgeStatus text="Warning" style="bg-warning-50 text-warning-700" />
          ) : (
            <BadgeStatus text="New" style="bg-primary-50 text-primary-700" />
          )}
        </div>
        {secondValue ? (
          <div className="flex items-center mt-[11px]">
            <h1 className="typographyTextXsRegular text-gray-600">
              Before meal{" "}
              <span className="typographyTextMdSemibold text-success-700 ml-[4px]">
                {" "}
                {value2}{" "}
              </span>
              <span className="typographyTextXsRegular ml-[4px] mr-[4px] text-gray-600">
                {unit2}
              </span>
            </h1>
            {status2 === "Normal" ? (
              <BadgeStatus text="Normal" style="bg-success-50 text-success-700" />
            ) : status2 === "Abnormal" ? (
              <BadgeStatus text="Abnormal" style="bg-error-50 text-error-700" />
            ) : status2 === "Warning" ? (
              <BadgeStatus text="Warning" style="bg-warning-50 text-warning-700" />
            ) : (
              <BadgeStatus text="New" style="bg-primary-50 text-primary-700" />
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default LatestCardResult;
