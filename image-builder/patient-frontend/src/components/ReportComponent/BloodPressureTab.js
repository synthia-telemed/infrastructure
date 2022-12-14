import PrimaryButton from "../Appointment/PrimaryButton";
import useAPIMeasureMent from "../../hooks/useApiMeasurement";
import { useForm } from "react-hook-form";
const BloodPressureTab = ({ dateTime, setShowModal }) => {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm();
  const [apiDefault] = useAPIMeasureMent();
  const submitBloodPressure = async value => {
    const body = {
      dateTime: dateTime.toISOString(),
      diastolic: parseInt(value.DIA),
      pulse: parseInt(value.Palserate),
      systolic: parseInt(value.SYS)
    };
    console.log(body);
    const res = await apiDefault.post(`/blood-pressure`, body);
    console.log(res);
    setShowModal();
  };
  return (
    <div>
      <form onSubmit={handleSubmit(submitBloodPressure)}>
        <h1 className="mt-[36px] typographyTextMdSemibold">Blood pressure</h1>
        <div className="flex mt-[5px]">
          <div className="flex flex-col items-center justify-center w-[64px] ">
            <h1 className="text-gray-500 typographyTextXsMedium mb-[2px]">SYS</h1>
            <input
              type="tel"
              {...register("SYS", {
                required: "Invalid SYS"
              })}
              className="border-[1px] border-solid border-gray-300 rounded-[4px] w-[64px] h-[40px] px-[8px]"
            />
          </div>
          <div className="flex items-center">
            <h1 className="typographyHeadingSmMedium mx-[15px] mt-[15px] text-gray-500">
              /
            </h1>
          </div>
          <div className="flex flex-col items-center justify-center w-[64px]">
            <h1 className="typographyTextXsMedium text-gray-500 mb-[2px]">DIA</h1>
            <input
              {...register("DIA", {
                required: "Invalid DIA"
              })}
              type="number"
              className="border-[1px] border-solid border-gray-300 rounded-[4px] w-[64px] h-[40px] mt-[6px] px-[8px]"
            />
          </div>
          <div className="flex items-center">
            <h1 className="typographyTextMdRegular mx-[15px] mt-[15px] text-gray-500">
              mmHg
            </h1>
          </div>
        </div>
        <div>
          <h1 className="text-gray-700 typographyTextSmMedium mt-[36px]">Pulse Rate</h1>
          <input
            {...register("Palserate", {
              required: "Invalid Palse Rate"
            })}
            type="number"
            className="rounded-[8px] border-[1px] border-solid border-gray-300 h-[40px] w-[342px] px-[8px]"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            value="submit"
            className="mt-[24px] bg-[#303ED9] typographyTextMdMedium text-base-white w-[235px] h-[44px] rounded-[8px]"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default BloodPressureTab;
