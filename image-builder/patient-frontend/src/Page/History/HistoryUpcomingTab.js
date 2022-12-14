import HistoryCardWithDayjs from "../../components/History/HistoryCardWithDayjs";
const HistoryUpcomingTab = ({ data , loading }) => {
  return (
    <div>
      <HistoryCardWithDayjs data={data} loading={loading} />
    </div>
  );
};
export default HistoryUpcomingTab;
