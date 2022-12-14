const NotificationCard = ({ url, title, time, detail, statusNew }) => {
  return (
    <div
      className={`flex flex-col p-[16px] ${
        statusNew ? "bg-primary-50" : ""
      } border-b-[1px] border-gray-300 border-solid`}
    >
      <div className="flex relative">
        <img src={url} alt="" />
        <div className="flex flex-col ml-[16px] ">
          <h1 className="typographyTextSmSemibold">{title}</h1>
          <h2 className="text-gray-600 typographyTextXsRegular">{time}</h2>
        </div>
        {statusNew ? (
          <div className="absolute top-[0%] right-[0%] w-[52px] h-[32px] rounded-[16px] px-[2px] py-[8px] bg-secondary-100 text-center">
            <h1 className="flex items-center justify-center w-full h-full text-primary-500 typographyTextXsMedium">
              New
            </h1>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="mt-[13px]">
        <h2 className="typographyTextXsMedium text-gray-900">{detail}</h2>
      </div>
    </div>
  );
};
export default NotificationCard;
