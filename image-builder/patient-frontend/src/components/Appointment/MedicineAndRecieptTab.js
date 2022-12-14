import { useState } from "react";
import MedicineTab from "./MedicineTab";
import RecieptTab from "./RecieptTab";
const MedicineAndRecieptTab = ({ data }) => {
  console.log(data);
  const [panel, setPanel] = useState("Prescriptions");
  const Panel = () => {
    return (
      <div className="flex w-full justify-center ">
        <ButtonPanel text="Prescriptions" />
        <ButtonPanel text="Invoice" />
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
    <div>
      <Panel />
      {panel === "Prescriptions" ? (
        <MedicineTab data={data} />
      ) : panel === "Invoice" ? (
        <RecieptTab data={data} />
      ) : (
        <>Error 404</>
      )}
    </div>
  );
};

export default MedicineAndRecieptTab;
