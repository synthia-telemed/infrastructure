import { useState, React, useEffect } from "react";
import Navbar from "../../components/Navbar";
import HeaderReport from "../../components/ReportComponent/HeaderReport";
import { DateTimePicker } from "@material-ui/pickers";
import ReportTab from "../../components/ReportComponent/ReportTab";
import dayjs from "dayjs";
import useApiMeasurement from "../../hooks/useApiMeasurement";
import LeftArrow from "../../Assets/arrow-left.svg";
import RightArrow from "../../Assets/right_arrow_icon.svg";
import DayTab from "./DayTab";
import WeekTab from "./WeekTab";
import MonthTab from "./MonthTab";

const ReportPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [panel, setPanel] = useState("Day");
  const [bloodPressureData, setBloodPressureData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [glucoseData, setGlucoseData] = useState([]);
  const [pulseData, setPulseData] = useState([]);
  const [apiDefault] = useApiMeasurement();
  const current = new Date();
  const [selectedDate, handleDateChange] = useState(new Date(current));
  const onClickReportMeasure = () => {
    setShowModal(true);
  };
  const onClickCloseModal = () => {
    setShowModal(false);
  };
  const fetchAll = async () => {
    setLoading(true);
    await fetchGlucose();
    await fetchBloodPressure();
    await fetchPulsePressure();
    setLoading(false);
  };
  const fetchGlucose = async () => {
    const query = { granularity: panel.toLowerCase(), date: selectedDate.toISOString() };
    const res = await apiDefault.get("/glucose/visualization/patient", {
      params: query
    });
    setGlucoseData(res.data);
  };

  const fetchBloodPressure = async () => {
    const query = { granularity: panel.toLowerCase(), date: selectedDate.toISOString() };
    const res = await apiDefault.get("/blood-pressure/visualization/patient", {
      params: query
    });
    setBloodPressureData(res.data);
  };
  const fetchPulsePressure = async () => {
    const query = { granularity: panel.toLowerCase(), date: selectedDate.toISOString() };
    const res = await apiDefault.get("/pulse/visualization/patient", {
      params: query
    });
    setPulseData(res.data);
  };
  const addDate = () => {
    handleDateChange(dayjs(selectedDate).add(1, "day"));
  };
  const subtractDate = () => {
    handleDateChange(dayjs(selectedDate).subtract(1, "day"));
  };
  const addWeekDate = () => {
    handleDateChange(dayjs(selectedDate).add(6, "day"));
  };
  const subtractWeekDate = () => {
    handleDateChange(dayjs(selectedDate).subtract(6, "day"));
  };
  const addMonthDate = () => {
    handleDateChange(dayjs(selectedDate).add(30, "day"));
  };
  const subtractMonthDate = () => {
    handleDateChange(dayjs(selectedDate).subtract(30, "day"));
  };
  const ButtonPanel = ({ text }) => {
    return (
      <div
        className={`w-[109px] h-[36px] mx-[0.5rem] text-center ${
          panel === text
            ? "bg-primary-50 text-primary-500"
            : "bg-base-white text-gray-500"
        } rounded-[6px] mt-[16px]`}
        onClick={() => setPanel(text)}
      >
        <h1 className="flex items-center w-full h-full justify-center typographyTextSmSemibold ">
          {text}
        </h1>
      </div>
    );
  };
  const PanelReport = () => {
    return (
      <div className="flex w-full justify-center ">
        <ButtonPanel text="Day" />
        <ButtonPanel text="Week" />
        <ButtonPanel text="Month" />
      </div>
    );
  };
  const formatTodayDayjs = () => {
    const formatter = dayjs(selectedDate).isSame(current, "day") ? "[Today], D MMM YYYY" : "D MMM YYYY"
    return dayjs(selectedDate).format(formatter);
  };
  const formatTodayWeekjs = () => {
    const fromDate = dayjs(selectedDate).subtract(6, "day").format("D MMM YYYY")
    const toDate = dayjs(selectedDate).format("D MMM YYYY")
    return `${fromDate} - ${toDate}`
  };
  const formatTodayMonthjs = () => {
    const fromDate = dayjs(selectedDate).subtract(1, 'month').add(1, 'day').format("D MMM YYYY")
    const toDate = dayjs(selectedDate).format("D MMM YYYY")
    return `${fromDate} - ${toDate}`
  };
  useEffect(() => {
    fetchAll();
  }, []);
  useEffect(() => {
    fetchAll();
  }, [showModal, selectedDate, panel]);

  useEffect(() => {
    handleDateChange(current);
  }, [panel]);

  const renderPanel = () => {
    if (loading) {
      return (
        <div className="text-center h-[50vh] flex items-center justify-center">
          <div role="status">
            <svg
              class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-primary-500"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    } else {
      return panel === "Day" ? (
        <DayTab
          bloodPressureData={bloodPressureData}
          pulseData={pulseData}
          glucoseData={glucoseData}
        />
      ) : panel === "Week" ? (
        <WeekTab
          bloodPressureData={bloodPressureData}
          pulseData={pulseData}
          glucoseData={glucoseData}
        />
      ) : panel === "Month" ? (
        <MonthTab
          bloodPressureData={bloodPressureData}
          pulseData={pulseData}
          glucoseData={glucoseData}
        />
      ) : (
        <>Error 404</>
      );
    }
  };

  return (
    <div>
      <div className={bloodPressureData ? "" : `overflow-auto h-[1000px]`}>
        <HeaderReport />
        <Navbar />
        {/* <FloatingButton onClick={onClickReportMeasure} /> */}
        <div className="flex width-[100vw] justify-between mt-[18px] px-[16px]">
          <img
            src={LeftArrow}
            alt=""
            onClick={() => {
              panel === "Week"
                ? subtractWeekDate()
                : panel === "Month"
                ? subtractMonthDate()
                : subtractDate();
            }}
          />
          <h1 className="text-gray-600 typographyTextSmMedium">
            {" "}
            {panel === "Week"
              ? formatTodayWeekjs()
              : panel === "Month"
              ? formatTodayMonthjs()
              : formatTodayDayjs()}
          </h1>
          <img
            src={RightArrow}
            alt=""
            onClick={() => {
              panel === "Week"
                ? addWeekDate()
                : panel === "Month"
                ? addMonthDate()
                : addDate();
            }}
          />
        </div>
        <PanelReport />
        {renderPanel()}
        {showModal ? (
          <>
            {" "}
            <div className="fixed inset-0 z-50 outline-none focus:outline-none overflow-auto">
              <div className="absolute bottom-[0%] w-auto mx-auto max-w-3xl ">
                {/*content*/}
                <div className="bg-base-white h-[600px] w-screen px-[16px] py-[24px] rounded-tl-[20px] rounded-tr-[20px]">
                  <div className="flex justify-between">
                    <h1 className="typographyTextLgSemibold">
                      Report Measurement Result
                    </h1>
                    <span
                      className="w-[24px] h-[24px] text-gray-600 text-[24px] flex justify-center items-center"
                      onClick={() => setShowModal(false)}
                    >
                      ×
                    </span>
                  </div>
                  <div className="mt-[12px] ">
                    <div className="flex items-center ">
                      <h1 className="typographyTextSmMedium">Date & Time</h1>
                      <div className="ml-[5px]">
                        <DateTimePicker
                          value={selectedDate}
                          onChange={handleDateChange}
                          inputVariant="outlined"
                        />
                      </div>
                    </div>
                    <ReportTab
                      selectedDate={selectedDate}
                      setShowModal={onClickCloseModal}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-50 fixed inset-0 z-40 bg-base-white"></div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default ReportPage;
