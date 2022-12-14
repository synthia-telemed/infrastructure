import Prescription from "./Prescription";
const MedicineTab = (detailAppointment ) => {
  return (
    <>
      {" "}
      {detailAppointment.data?.prescriptions?.map((data) => (
        <Prescription
          medicine={data?.name}
          description={data?.description}
          tables={data?.amount}
          picture={data.picture_url}
          key={data.index}
        />
      ))}
    </>
  );
};
export default MedicineTab;
