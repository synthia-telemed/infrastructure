import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import DefaultProfile from "../Assets/default_profile.png";
import AppointmentDetailCard from "../components/Appointment/AppointmentDetailCard";
import LoadingIcon from "../components/LoadingIcon";
import Navbar from "../components/Navbar";
import useAPI from "../hooks/useAPI";
import LatestCardResult from "../components/LatestCardResult";
import useAPIMeasureMent from "../hooks/useApiMeasurement";
import EmptyStatusIcon from "../Assets/Home/EmptyStatus.svg";

const mapState = state => ({
  user: state.user
});

const mapDispatch = dispatch => ({
  setProfile: value => dispatch.user.setProfile(value)
});

const NotificationIcon = () => {
  return (
    <>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 17.8476C17.6392 17.8476 20.2481 17.1242 20.5 14.2205C20.5 11.3188 18.6812 11.5054 18.6812 7.94511C18.6812 5.16414 16.0452 2 12 2C7.95477 2 5.31885 5.16414 5.31885 7.94511C5.31885 11.5054 3.5 11.3188 3.5 14.2205C3.75295 17.1352 6.36177 17.8476 12 17.8476Z"
          stroke="#303ED9"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.3887 20.8572C13.0246 22.372 10.8966 22.3899 9.51941 20.8572"
          stroke="#303ED9"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};

const HomePage = props => {
  dayjs.extend(utc);
  const navigate = useNavigate();
  const [apiDefault] = useAPI();
  const [apiMeasurement] = useAPIMeasureMent();
  const [detailYourAppointment, setDetailYourAppointment] = useState([]);
  const [latestMeasurement, setLatestMeasurement] = useState([]);
  const [isLoadingLatestResult, setIsLoadingLatestResult] = useState(true);
  useEffect(() => {
    getNextAppointment();
    getName();
    getLastMeasurementResult();
  }, []);
  console.log(latestMeasurement, " Lates");
  const getLastMeasurementResult = async () => {
    const res = await apiMeasurement.get("/home/latest");
    setLatestMeasurement(res.data);
    setIsLoadingLatestResult(false);
  };
  const getNextAppointment = async () => {
    const res = await apiDefault.get("/appointment/next");
    setDetailYourAppointment(res.data);
  };
  const getName = async () => {
    const { data } = await apiDefault.get("/info");
    props.setProfile({
      firstname: data.name_en.firstname,
      fullname: data.name_en.full_name,
      pictureURL: data.profile_pic_url
    });
  };
  return (
    <div className="">
      <div>
        <div className=" flex justify-between mt-[56px] px-[17px] w-full">
          <div className="w-[173px]">
            <h1 className="typographyTextSmMedium text-primary-500">Welcome Back</h1>
            <h1 className="typographyHeadingXsMedium">{props.user.firstname} &#9996;</h1>
          </div>
          <div
            className="w-[45px] h-[45px] p-[5px] rounded-[15px] bg-primary-50 flex justify-center items-center "
            onClick={() => navigate("/notification")}
          >
            <NotificationIcon />
          </div>
        </div>
      </div>
      <h1 className="px-[17px] typographyTextMdSemibold mt-[17px]">Your Appointment</h1>
      <AppointmentDetailCard
        picture={detailYourAppointment?.doctor?.profile_pic_url}
        name={detailYourAppointment?.doctor?.full_name}
        position={detailYourAppointment?.doctor?.position}
        date={dayjs(detailYourAppointment?.start_date_time).format("DD MMMM YYYY")}
        time={
          dayjs(detailYourAppointment?.start_date_time).utcOffset(7).format("HH:mm") +
          "-" +
          dayjs(detailYourAppointment?.end_date_time).utcOffset(7).format("HH:mm")
        }
        onClick={() => {
          navigate("/appointment/detail", {
            state: { appointmentID: detailYourAppointment.id }
          });
        }}
        isButton={true}
      />
      <Navbar />
      <div className="mt-[30px] px-[16px] ">
        <h1 className="typographyTextMdSemibold">Latest measurement result</h1>
        {isLoadingLatestResult ? (
          <LoadingIcon />
        ) : Object.keys(latestMeasurement).length === 0 ? (
          <div className="flex flex-col justify-center items-center h-[300px] ">
            <img src={EmptyStatusIcon} alt="" width="200px" height="148px" />
            <h1 className="typographyTextXsMedium mt-[8px] w-[200px] text-center">
              You haven’t submited any measurement result.{" "}
            </h1>
          </div>
        ) : (
          <div className="flex flex-col mb-[150px]">
            {latestMeasurement?.glucose ? (
              <LatestCardResult
                status={latestMeasurement?.glucose?.fasting?.status}
                value={latestMeasurement?.glucose?.fasting?.value}
                unit={latestMeasurement?.glucose?.fasting?.unit}
                dateTime={latestMeasurement?.glucose?.fasting?.dateTime}
                secondValue={true}
                status2={latestMeasurement?.glucose?.beforeMeal?.status}
                value2={latestMeasurement?.glucose?.beforeMeal?.value}
                unit2={latestMeasurement?.glucose?.beforeMeal?.unit}
                name="Glucose Level"
              />
            ) : (
              <></>
            )}
            {latestMeasurement?.bloodPressure ? (
              <LatestCardResult
                status={latestMeasurement?.bloodPressure?.status}
                value={
                  latestMeasurement?.bloodPressure?.systolic +
                  " / " +
                  latestMeasurement?.bloodPressure?.diastolic
                }
                secondValue={false}
                unit={latestMeasurement?.bloodPressure?.unit}
                dateTime={latestMeasurement?.bloodPressure?.dateTime}
                name="BloodPressure"
              />
            ) : (
              <></>
            )}
            {latestMeasurement?.pulse ? (
              <LatestCardResult
                status={latestMeasurement?.pulse?.status}
                value={latestMeasurement?.pulse?.value}
                unit={latestMeasurement?.pulse?.unit}
                secondValue={false}
                dateTime={latestMeasurement?.pulse?.dateTime}
                name="Pulse"
              />
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default connect(mapState, mapDispatch)(HomePage);
