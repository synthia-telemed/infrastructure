import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  ReferenceLine,
  Legend,
  Cell
} from "recharts";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import BadgeStatus from "../Appointment/BadgeStatus";
import StatusAlert from "./StatusAlert";
const GraphBarReport = ({
  data,
  name,
  isLegend,
  detailGraph,
  summaryValue,
  isHaveLastLabelList,
  isHaveTopLabelList,
  panel,
  isToolTip
}) => {
  const [valueGraph, setValueGraph] = useState("");
  const [label, setLabel] = useState("");
  // const [colorGraph, setColorGraph] = useState("");
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      setLabel(payload[0]?.payload?.label);
      setValueGraph(payload[0].value);
      // setColorGraph(payload[0].payload.period === "Fasting" ? "#131957" : "#303ed9");
      return <div className=""></div>;
    }
    return null;
  };

  return (
    <div className=" mt-[24px]">
      <h1 className="typographyTextXlSemibold">{name}</h1>
      <>
        {label ? (
          <></>
        ) : (
          <h1 className="typographyTextSmMedium text-gray-600">{detailGraph}</h1>
        )}
        <div className="flex flex-col justify-center mt-[5px]">
          {panel === "Month" ? (
            label ? (
              <h1 className="typographyTextXsRegular text-gray-600">
                {dayjs.unix(label).format("dddd , DD MMM YYYY")}
              </h1>
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
          <div className="flex items-center">
            <h1
              className={`typographyHeadingXsSemibold ${
                data?.summary?.status === "Normal"
                  ? "text-success-700"
                  : data?.summary?.status === "Abnormal"
                  ? "text-error-700"
                  : data?.summary?.status === "Warning"
                  ? "text-warning-700"
                  : "text-primary-700"
              } mr-[16px]`}
            >
              {valueGraph[0] && valueGraph[1]
                ? Math.round(valueGraph[1]) + " / " + Math.round(valueGraph[0]) + " "
                : summaryValue}
              <span className="typographyTextSmMedium text-gray-600">{data?.unit}</span>
            </h1>
            {data?.summary?.status === "Normal" ? (
              <BadgeStatus text="Normal" style="bg-success-50 text-success-700" />
            ) : data?.summary?.status === "Abnormal" ? (
              <BadgeStatus text="Abnormal" style="bg-error-50 text-error-700" />
            ) : data?.summary?.status === "Warning" ? (
              <BadgeStatus text="Warning" style="bg-warning-50 text-warning-700" />
            ) : (
              <BadgeStatus text="New" style="bg-primary-50 text-primary-700" />
            )}
          </div>
        </div>
      </>

      {/* {isToolTip ? (
        <div>
          <h1 className="typographyTextSmMedium text-gray-600">
            Diastolic{" "}
            <span className="typographyHeadingXsSemibold text-success-700">
              {" "}
              {valueGraph ? Math.round(valueGraph[0]) : "-"}
            </span>
            {" " + data?.unit}
          </h1>
          <h1 className="typographyTextSmMedium text-gray-600">
            Systolic{" "}
            <span className="typographyHeadingXsSemibold text-success-700">
              {" "}
              {valueGraph ? Math.round(valueGraph[1]) : "-"}
            </span>
            {" " + data?.unit}
          </h1>
        </div>
      ) : (
        <></>
      )} */}
      {/* <StatusAlert/> */}
      <ResponsiveContainer width="100%" height={240} className="ml-[-5px]">
        <BarChart width={830} height={250} data={data?.data} className="mt-[5px]">
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="label"
            interval="preserveStartEnd"
            ticks={data?.ticks}
            axisLine={false}
            domain={data?.domain}
            className="typographyTextXsMedium"
            type="number"
            tick={{ fontSize: 12 }}
            tickFormatter={
              panel === "Day"
                ? t => dayjs.unix(t).format("HH:mm")
                : panel === "Week"
                ? t => dayjs.unix(t).format("ddd")
                : t => dayjs.unix(t).format("DD MMM")
            }
            // type={bloodPressureData.isNumerical ? "number" : "category"}
          />
          {name === "Blood Pressure" || name === "Pulse" ? (
            <>
              <ReferenceLine y={150} stroke="red" />
              <ReferenceLine y={60} stroke="red" />
            </>
          ) : (
            <></>
          )}
          <YAxis
            domain={[0, 240]}
            tick={{ fontSize: 12, dx: -5 }}
            axisLine={false}
            style={{ textAnchor: "end" }}
            label={{
              value: data?.unit,
              angle: -90,
              position: "insideLeft",
              fontFamily: "Poppins",
              fontWeight: 500,
              fontSize: "12px",
              fill: "#475467"
            }}
            // label={data?.unit}
          />
          {isToolTip ? (
            <Tooltip
              wrapperStyle={{ top: 0, left: -20 }}
              content={<CustomTooltip />}
              active={false}
            />
          ) : (
            <></>
          )}
          {isLegend ? (
            <Legend
              layout="horizontal"
              verticalAlign="top"
              align="right"
              iconType="circle"
            />
          ) : (
            <></>
          )}
          <Bar
            barSize={10}
            data={name === "Glucose Level" ? data?.data : ""}
            dataKey={name === "Glucose Level" ? "value" : "values"}
            isAnimationActive={false}
            radius={name === "Blood Pressure" ? 30 : 0}
            // wrapperStyle={{ borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}
          >
            {/* {name === "Glucose Level" &&
              data &&
              data.data &&
              data.data.beforeMeal &&
              data?.data?.beforeMeal.map((entry, index) => (
                <Cell
                  fill={
                    data &&
                    data?.data &&
                    data?.data?.beforeMeal &&
                    data?.data?.beforeMeal[index].color
                  }
                />
              ))} */}
            {data &&
              data.data &&
              Array.isArray(data.data) &&
              data.data.map((entry, index) => (
                // entry.label&&
                <Cell
                  fill={
                    name === "Glucose Level"
                      ? data?.data[index]?.period === "Fasting"
                        ? "#131957"
                        : data?.data[index]?.period === "Before Meal"
                        ? "#303ed9"
                        : ""
                      : data?.data[index]?.color
                  }
                />
              ))}

            {isHaveTopLabelList ? (
              name === "Pulse" ? (
                <LabelList
                  className="typographyTextXsMedium"
                  width={20}
                  dataKey="values"
                  formatter={
                    v => Math.round(v)
                    // v => `${Math.round(v[1])}`
                  }
                  position="top"
                />
              ) : name === "Glucose Level" ? (
                <LabelList
                  className="typographyTextXsMedium"
                  width={20}
                  dataKey="value"
                  formatter={
                    v => Math.round(v)
                    // v => `${Math.round(v[1])}`
                  }
                  position="top"
                />
              ) : (
                <LabelList
                  className="typographyTextXsMedium"
                  width={20}
                  dataKey="values"
                  formatter={
                    data &&
                    data?.data &&
                    data?.data.length &&
                    data?.data[0].values === parseInt(data?.data[0].values)
                      ? v => Math.round(v)
                      : v => `${Math.round(v[1])}`
                  }
                  position="top"
                />
              )
            ) : (
              <></>
            )}
            {isHaveLastLabelList ? (
              <LabelList
                className="typographyTextXsMedium"
                width={20}
                dataKey="values"
                formatter={v => `${Math.round(v[0])}`}
                position="bottom"
              />
            ) : (
              <></>
            )}
          </Bar>
          ;
        </BarChart>
      </ResponsiveContainer>
      <h1 className="typographyTextXsMedium text-gray-500 text-center">{data?.xLabel}</h1>
    </div>
  );
};
export default GraphBarReport;
