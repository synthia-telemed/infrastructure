const StatusAlert = () => {
  const ArrorwAlertIcon = () => {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.3335 10H16.6668M16.6668 10L11.6668 5M16.6668 10L11.6668 15"
          stroke="#D92D20"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };
  const AlertIcon = () => {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_6597_127589)">
          <path
            d="M9.99984 6.66666V9.99999M9.99984 13.3333H10.0082M18.3332 9.99999C18.3332 14.6024 14.6022 18.3333 9.99984 18.3333C5.39746 18.3333 1.6665 14.6024 1.6665 9.99999C1.6665 5.39762 5.39746 1.66666 9.99984 1.66666C14.6022 1.66666 18.3332 5.39762 18.3332 9.99999Z"
            stroke="#D92D20"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_6597_127589">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  };
  return (
    <div className="w-full h-[150px] border-[1px] border-solid border-error-300 bg-error-25 rounded-[8px] px-[8px] py-[16px]">
      <AlertIcon />
      <h1 className="typographyTextSmSemibold mt-[8px] text-error-700">
        Your glucose level is too high.{" "}
      </h1>
      <h1 className="typographyTextSmRegular mt-[4px] text-error-700">
        The quickest way to reduce the glucose level is taking fast-acting insulin.{" "}
      </h1>
      <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">
        <h1 className="flex typographyTextSmSemibold text-error-700 justify-between w-[120px] mt-[8px] mb-[8px]">
          Learn more <ArrorwAlertIcon />
        </h1>
      </a>
    </div>
  );
};
export default StatusAlert;
