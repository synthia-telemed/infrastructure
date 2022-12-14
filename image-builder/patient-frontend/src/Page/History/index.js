import { useState, useEffect } from "react";
import Header from "../../components/Header";
import HistoryUpcomingTab from "./HistoryUpcomingTab";
import HistoryCompleteTab from "./HistoryCompleteTab";
import HistoryCancelTab from "./HistoryCancelTab";
import Navbar from "../../components/Navbar";
import useAPI from "../../hooks/useAPI";

const HistoryPage = () => {
  const [panel, setPanel] = useState("Upcoming");
  const [listAppointment, setListAppointment] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiDefault] = useAPI();
  useEffect(() => {
    getListAppointment();
  }, []);

  const getListAppointment = async () => {
    setLoading(true);
    const res = await apiDefault.get("/appointment");
    setListAppointment(res.data);
    setLoading(false);
  };

  const ButtonPanel = ({ text }) => {
    return (
      <div
        className={`w-[109px] h-[36px] mx-[0.5rem] text-center ${
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
  const Panel = () => {
    return (
      <div className="flex w-full justify-center ">
        <ButtonPanel text="Upcoming" />
        <ButtonPanel text="Completed" />
        <ButtonPanel text="Cancelled" />
      </div>
    );
  };
  return (
    <div>
    <div className="pb-[150px]">
      <div className="px-[16px]">
        <Header textHeader="Appointment history" />
        <Panel />
        {panel === "Completed" ? (
          <HistoryCompleteTab data={listAppointment.completed} loading={loading} />
        ) : panel === "Cancelled" ? (
          <HistoryCancelTab data={listAppointment.cancelled} loading={loading} />
        ) : panel === "Upcoming" ? (
          <HistoryUpcomingTab data={listAppointment.scheduled} loading={loading} />
        ) : (
          <>Error 404</>
        )}
      </div>
      <Navbar />
    </div>
    </div>
  );
};
export default HistoryPage;
