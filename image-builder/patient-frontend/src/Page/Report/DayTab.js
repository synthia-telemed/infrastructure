import GraphBarReport from "../../components/Report/GraphBarReport";
import EmptyGraph from "../../Assets/Report/empty_graph.svg";
const DayTab = ({ bloodPressureData, pulseData, glucoseData }) => {
  return (
    <div className="px-[16px] mt-[16px] mb-[150px]">
      {bloodPressureData &&
      bloodPressureData?.data &&
      bloodPressureData?.data.length === 0 &&
      pulseData &&
      pulseData?.data &&
      pulseData?.data.length === 0 &&
      glucoseData &&
      glucoseData?.data &&
      glucoseData?.data.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-[50vh]">
          {" "}
          <img src={EmptyGraph} width="218px" height="148px" alt="" />{" "}
          <h1 className="typographyTextXsMedium text-gray-800">
            {" "}
            You haven’t submited any measurement result.
          </h1>
        </div>
      ) : (
        <></>
      )}
      {glucoseData && glucoseData.data && glucoseData?.data.length ? (
        <GraphBarReport
          data={glucoseData}
          name="Glucose Level"
          isLegend={false}
          detailGraph="Latest result"
          isHaveLastLabelList={false}
          isHaveTopLabelList={true}
          isToolTip={false}
          panel="Day"
          summaryValue={Math.round(glucoseData?.summary?.value) + " "}
        />
      ) : (
        <></>
      )}
      {bloodPressureData && bloodPressureData.data && bloodPressureData?.data.length ? (
        <GraphBarReport
          data={bloodPressureData}
          name="Blood Pressure"
          isLegend={false}
          isToolTip={false}
          detailGraph="Latest result"
          isHaveLastLabelList={true}
          isHaveTopLabelList={true}
          panel="Day"
          summaryValue={
            Math.round(bloodPressureData?.summary?.systolic) +
            " / " +
            Math.round(bloodPressureData?.summary?.diastolic) +
            " "
          }
        />
      ) : (
        <></>
      )}

      {pulseData && pulseData.data && pulseData?.data.length ? (
        <GraphBarReport
          data={pulseData}
          name="Pulse"
          isLegend={false}
          panel="Day"
          isToolTip={false}
          isHaveLastLabelList={false}
          isHaveTopLabelList={true}
          summaryValue={Math.round(pulseData?.summary?.pulse) + " "}
          detailGraph="Latest result"
        />
      ) : (
        <></>
      )}

      {/* <GraphBarReport bloodPressureData={bloodPressureData} name="Pulse" /> */}
    </div>
  );
};
export default DayTab;
