import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import AppointmentDetailCard from "../../components/Appointment/AppointmentDetailCard";
import StatusAppointment from "../../components/Appointment/StatusAppointment";
import HeaderWithBack from "../../components/HeaderWithBack";
import PrimaryButton from "../../components/Appointment/PrimaryButton";
import BadgeStatus from "../../components/Appointment/BadgeStatus";
import Prescription from "../../components/Appointment/Prescription";
import AppointmentWaitingIcon from "../../Assets/Appointment/appointment_waiting.svg";
import NextAppointment from "../../components/Appointment/NextAppointment";
import MedicineAndRecieptTab from "../../components/Appointment/MedicineAndRecieptTab";
import useAPI from "../../hooks/useAPI";
const AppointmentDetailPage = () => {
  dayjs.extend(utc);
  const { state } = useLocation();
  const [detailAppointment, setDetailAppointment] = useState({});
  const [showButton, setShowButton] = useState(false);
  const [roomID, setRoomID] = useState("");
  const [apiDefault] = useAPI();
  const navigate = useNavigate();
  useEffect(() => {
    getDetailAppointment();
    showJoinButtonAppointment();
  }, []);
  console.log(detailAppointment);

  const getDetailAppointment = async () => {
    const res = await apiDefault.get(`/appointment/${state.appointmentID}`);
    setDetailAppointment(res.data);
  };
  const showJoinButtonAppointment = async () => {
    try {
      const res = await apiDefault.get(`/appointment/${state.appointmentID}/roomID`);
      setRoomID(res.data.room_id);
      setShowButton(res.status === 200 ? true : false);
    } catch (error) {
      console.log(error);
    }
  };
  const renderScheduleAppointmentStatusMessage = () => {
    const now = dayjs();
    const startDateTime = dayjs(detailAppointment?.start_date_time);
    if (now.isAfter(startDateTime) && now.diff(startDateTime, "hour") < 3)
      return (
        <StatusAppointment
          textStatus="Please wait until the doctor open the room"
          bgColor="bg-primary-50"
          colorText="text-primary-500"
        />
      );
    return null;
  };
  return (
    <div>
      <div className="mb-[24px]">
        <HeaderWithBack textHeader="Appointment detail" path="/history" />
        <AppointmentDetailCard
          picture={detailAppointment?.doctor?.profile_pic_url}
          name={detailAppointment?.doctor?.full_name}
          position={detailAppointment?.doctor?.position}
          date={dayjs(detailAppointment?.start_date_time).format("DD MMMM YYYY")}
          time={
            dayjs(detailAppointment?.start_date_time).utcOffset(7).format("HH:mm A") +
            "-" +
            dayjs(detailAppointment?.end_date_time).utcOffset(7).format("HH:mm A")
          }
          duration={detailAppointment?.duration}
        />
        {detailAppointment.status === "SCHEDULED" ? (
          <>
            {showButton ? (
              <div className="mt-[24px] ">
                <PrimaryButton
                  text="Join appointment"
                  width="235px"
                  height="48px"
                  onClick={() => {
                    navigate("/appointment/video-call", {
                      state: { roomID: roomID, appointmentID: state.appointmentID }
                    });
                  }}
                />
              </div>
            ) : (
              renderScheduleAppointmentStatusMessage()
            )}
            <div className="mt-[16px] mx-[16px]">
              <h1 className="typographyTextLgSemibold">Details</h1>
              <h2 className="typographyTextSmRegular font-[400]">
                {detailAppointment?.detail}
              </h2>
            </div>
          </>
        ) : detailAppointment.status === "COMPLETED" &&
          detailAppointment.invoice === null ? (
          <>
            <StatusAppointment
              textStatus="You can pay the invoice after the hospital finish processing your appointment."
              bgColor="bg-primary-50"
              colorText="text-primary-500"
            />
            <div className="mt-[16px] mx-[16px]">
              <h1 className="typographyTextLgSemibold">Details</h1>
              <h2 className="typographyTextSmRegular font-[400]">
                {detailAppointment?.detail}
              </h2>
            </div>
            <div className="mt-[16px] flex flex-col w-full items-center">
              <img src={AppointmentWaitingIcon} alt="" />
              <h1 className="typographyTextSmMedium w-[211px] mt-[8px]">
                Waiting for the invoice and presciption from the hospital.
              </h1>
            </div>
          </>
        ) : detailAppointment.status === "COMPLETED" &&
          detailAppointment.invoice &&
          detailAppointment.payment === null ? (
          <>
            <StatusAppointment
              textStatus="Pay the bill for check out on the button bellow."
              bgColor="bg-success-50"
              colorText="text-success-700"
            />
            <div className="mx-[16px] mt-[20px]">
              <NextAppointment
                date={dayjs(detailAppointment?.next_appointment).format("DD MMMM YYYY")}
                time={
                  dayjs(detailAppointment?.next_appointment)
                    .utcOffset(7)
                    .format("HH:mm A") +
                  " - " +
                  dayjs(detailAppointment?.next_appointment)
                    .add(30, "minute")
                    .utcOffset(7)
                    .format("HH:mm A")
                }
              />
            </div>
            <h1 className="typographyTextLgSemibold mx-[16px] mt-[16px]">
              Prescriptions
            </h1>
            {detailAppointment?.prescriptions?.map(data => (
              <Prescription
                medicine={data?.name}
                description={data?.description}
                tables={data?.amount}
                picture={data.picture_url}
                key={data.index}
              />
            ))}
            <div className="mt-[40px]">
              <PrimaryButton
                text="Pay invoice"
                width="235px"
                height="48px"
                onClick={() => {
                  navigate("/appointment/summary-reciept", {
                    state: { appointmentID: state.appointmentID }
                  });
                }}
              />
            </div>
          </>
        ) : detailAppointment.status === "COMPLETED" &&
          detailAppointment.invoice &&
          detailAppointment.payment ? (
          <div className="mx-[16px] mt-[10px] ">
            <div className="flex items-center">
              <h1 className=" flex typographyTextXsMedium text-gray-600 mr-[10px]">
                Your appointment is
              </h1>
              <BadgeStatus text="Complete" style="bg-success-50 text-success-700" />
            </div>
            <NextAppointment
              date={dayjs(detailAppointment?.next_appointment).format("DD MMMM YYYY")}
              time={
                dayjs(detailAppointment?.next_appointment)
                  .utcOffset(7)
                  .format("HH:mm A") +
                " - " +
                dayjs(detailAppointment?.next_appointment)
                  .add(30, "minute")
                  .utcOffset(7)
                  .format("HH:mm A")
              }
            />
            <h1 className="typographyTextLgSemibold mt-[16px]">
              Prescriptions and invoice
            </h1>
            <MedicineAndRecieptTab data={detailAppointment} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default AppointmentDetailPage;
