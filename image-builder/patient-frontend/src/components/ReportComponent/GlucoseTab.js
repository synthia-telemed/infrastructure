import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Switch from "react-switch";
import useAPIMeasureMent from "../../hooks/useApiMeasurement";
import BeforeMealIcon from "../../Assets/Report/before_meal.svg";
import AfterMealIcon from "../../Assets/Report/after_meal.svg";
import DinnerIcon from "../../Assets/Report/dinner.svg";
import LunchIcon from "../../Assets/Report/lunch-bag.svg";
import RamenIcon from "../../Assets/Report/ramen.svg";
const GlucoseTab = ({ dateTime, setShowModal }) => {
  const [period, setPeriod] = useState("BEFORE_MEAL");
  const [apiDefault] = useAPIMeasureMent();
  const [checked, setChecked] = useState(false);
  // const [period, c] = useState("breakfast");
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm();
  const handleChange = nextChecked => {
    setChecked(nextChecked);
  };
  const submitGlucose = async value => {
    const body = {
      dateTime: dateTime.toISOString(),
      value: parseInt(value.Glucose),
      period: period
    };
    console.log(body);
    const res = await apiDefault.post(`/glucose`, body);
    setShowModal();
  };
  useEffect(() => {
    if (checked) {
      setPeriod("FASTING");
    }
  }, [checked]);
  useEffect(() => {
    if (period === "AFTER_MEAL") {
      setChecked(false);
    }
  }, [period]);
  return (
    <div className="mt-[14px] bg-base-white h-[200px]">
      <form onSubmit={handleSubmit(submitGlucose)}>
        <h1 className="typographyTextMdSemibold text-grey-700 mb-[6px]">Glucose</h1>
        <input
          {...register("Glucose", {
            required: "Invalid Glucose"
          })}
          type="tel"
          className="border-[1px] border-solid border-gray-300 rounded-[4px] h-[40px] mt-[6px] px-[8px] w-[342px]"
        />
        <h1 className="typographyTextMdSemibold text-grey-700 mt-[16px] mb-[8px]">
          Meal
        </h1>
        <div className="flex w-full justify-center px-[16px]">
          <div
            onClick={() => setPeriod("BEFORE_MEAL")}
            className={`p-[8px] ${
              period === "BEFORE_MEAL"
                ? "bg-gray-200 border-[1.5px] border-solid border-gray-300"
                : ""
            } w-[102px] h-[104px] flex justify-center items-center flex-col rounded-[8px]  mr-[64px]`}
          >
            <img src={BeforeMealIcon} alt="" />
            <h1 className="typographyTextSmMedium text-gray-800 mt-[20px]">
              Before Meal
            </h1>
          </div>
          <div
            onClick={() => setPeriod("AFTER_MEAL")}
            className={`p-[8px] ${
              period === "AFTER_MEAL"
                ? "bg-gray-200 border-[1.5px] border-solid border-gray-300"
                : ""
            } w-[102px] h-[104px] flex justify-center items-center flex-col rounded-[8px]`}
          >
            <img src={AfterMealIcon} alt="" />
            <h1 className="typographyTextSmMedium text-gray-800 mt-[20px]">After Meal</h1>
          </div>
        </div>
        {period === "AFTER_MEAL" ? (
          <></>
        ) : (
          <>
            <div className="flex justify-between mt-[16px]">
              <h1 className="typographyTextMdSemibold ">Fasting</h1>
              <Switch
                onChange={handleChange}
                checked={checked}
                checkedIcon={false}
                uncheckedIcon={false}
                onColor="#303ED9"
                offColor="#EAECF0"
              />
            </div>
            <h1 className="typographyTextXsRegular">
              (Test in the morning before food or water)
            </h1>
          </>
        )}

        <div className="flex justify-center">
          <button
            type="submit"
            value="submit"
            className="mt-[24px] bg-[#303ED9] typographyTextMdMedium text-base-white w-[235px] h-[44px] rounded-[8px] mb-[32px]"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default GlucoseTab;
