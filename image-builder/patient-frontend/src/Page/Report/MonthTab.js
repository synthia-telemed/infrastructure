import GraphBarReport from "../../components/Report/GraphBarReport";
import GraphLineReport from "../../components/Report/GraphLineReport";
import EmptyGraph from "../../Assets/Report/empty_graph.svg";
const MonthTab = ({ bloodPressureData, pulseData, glucoseData }) => {
  console.log(bloodPressureData, "BloodPressure Data");
  console.log(pulseData, "Pulse Data");
  console.log(glucoseData, "Glucose Data");
  return (
    <div className="px-[16px] mt-[16px] mb-[150px]">
      {pulseData &&
      pulseData.data &&
      bloodPressureData &&
      bloodPressureData.data &&
      bloodPressureData?.data.length &&
      pulseData?.data.length &&
      !Array.isArray(glucoseData?.data) ? (
        <></>
      ) : (
        <div className="flex flex-col justify-center items-center h-[50vh]">
          {" "}
          <img src={EmptyGraph} width="218px" height="148px" alt="" />{" "}
          <h1 className="typographyTextXsMedium text-gray-800">
            {" "}
            You haven’t submited any measurement result.
          </h1>
        </div>
      )}
      {!Array.isArray(glucoseData?.data) &&
      glucoseData?.data?.afterMeal.length &&
      glucoseData?.data?.beforeMeal.length &&
      glucoseData?.data?.fasting.length ? (
        <GraphLineReport
          data={glucoseData}
          name="Glucose Level"
          isLegend={false}
          detailGraph="Total avg this month"
          isHaveLastLabelList={false}
          isHaveTopLabelList={true}
          panel=" Month"
        />
      ) : (
        <></>
      )}
      {bloodPressureData?.data.length ? (
        <GraphBarReport
          data={bloodPressureData}
          name="Blood Pressure"
          isLegend={false}
          isToolTip={true}
          detailGraph="Total avg this month"
          isHaveLastLabelList={false}
          isHaveTopLabelList={false}
          panel="Month"
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
      {pulseData?.data.length ? (
        <GraphLineReport
          data={pulseData}
          name="Pulse"
          isLegend={false}
          panel="Month"
          isHaveLastLabelList={false}
          isHaveTopLabelList={false}
          summaryValue={Math.round(pulseData?.summary?.pulse) + " "}
          detailGraph="Total avg this month"
        />
      ) : (
        <></>
      )}
      {/* <GraphBarReport data={bloodPressureData} name="Pulse" /> */}
    </div>
  );
};
export default MonthTab;
