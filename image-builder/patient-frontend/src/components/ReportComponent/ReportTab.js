import { useState } from "react";
import BloodPressureTab from "./BloodPressureTab";
import GlucoseTab from "./GlucoseTab";
const ReportTab = ({selectedDate,setShowModal}) => {
  const [panel, setPanel] = useState("Blood pressure/Pulse");
  const Panel = () => {
    return (
      <div className="flex w-full justify-center ">
        <ButtonPanel text="Blood pressure/Pulse" />
        <ButtonPanel text="Glucose level" />
      </div>
    );
  };
  const ButtonPanel = ({ text }) => {
    return (
      <div
        className={`w-[167px] h-[36px] mx-[0.5rem] text-center ${
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
  return (
    <div className="mt-[12px]">
      <Panel />
      {panel === "Blood pressure/Pulse" ? (
        <BloodPressureTab dateTime={selectedDate} setShowModal={setShowModal} />
      ) : panel === "Glucose level" ? (
        <GlucoseTab dateTime={selectedDate} setShowModal={setShowModal}/>
      ) : (
        <>Error 404</>
      )}
    </div>
  );
};

export default ReportTab;
