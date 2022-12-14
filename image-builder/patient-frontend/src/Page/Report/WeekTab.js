import GraphBarReport from "../../components/Report/GraphBarReport";
import GraphLineReport from "../../components/Report/GraphLineReport";
import EmptyGraph from "../../Assets/Report/empty_graph.svg";
const WeekTab = ({ bloodPressureData, pulseData, glucoseData }) => {
  return (
    <div className="px-[16px] mt-[16px] mb-[150px]">
      {/* <GraphLineReport data={bloodPressureData} name="Glucose" /> */}
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
          detailGraph=""
          isHaveLastLabelList={false}
          isToolTip={true}
          isHaveTopLabelList={true}
          panel="Week"
        />
      ) : (
        <></>
      )}
      {bloodPressureData?.data?.length ? (
        <GraphBarReport
          data={bloodPressureData}
          name="Blood Pressure"
          isLegend={false}
          isToolTip={false}
          detailGraph=""
          isHaveLastLabelList={true}
          isHaveTopLabelList={true}
          panel="Week"
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
      {pulseData?.data?.length ? (
        <GraphBarReport
          data={pulseData}
          name="Pulse"
          isLegend={false}
          isToolTip={false}
          panel="Week"
          isHaveLastLabelList={false}
          isHaveTopLabelList={true}
          summaryValue={Math.round(pulseData?.summary?.pulse) + " "}
          detailGraph=""
        />
      ) : (
        <></>
      )}
    </div>
  );
};
export default WeekTab;
