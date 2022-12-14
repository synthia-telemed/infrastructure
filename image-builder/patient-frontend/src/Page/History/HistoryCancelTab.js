import HistoryCardWithDayjs from "../../components/History/HistoryCardWithDayjs";
const HistoryCancelTab = ({ data,loading }) => {
  return (
    <div>
      <HistoryCardWithDayjs data={data} loading={loading} />
    </div>
  );
};
export default HistoryCancelTab;
