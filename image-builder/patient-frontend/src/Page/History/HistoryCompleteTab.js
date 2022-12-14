import HistoryCardWithDayjs from "../../components/History/HistoryCardWithDayjs";
const HistoryCompleteTab = ({ data,loading }) => {
  return (
    <div>
      <HistoryCardWithDayjs data={data} loading={loading} />
    </div>
  );
};
export default HistoryCompleteTab;
