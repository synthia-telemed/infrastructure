import DefaultProfile from "../../Assets/default_profile.png";
const Prescription = ({ medicine, tables, description, picture }) => {
  return (
    <div className="flex mx-[16.5px] bg-secondary-50 mt-[16px] px-[15px] rounded-[10px]">
      <div className="max-w-[50px] min-w-[40px] min-h-[40px] h-full flex justify-center mt-[10px]">
        <img src={picture} alt="" width="40px" height="40px" />
      </div>
      <div className="flex flex-col py-[10px] max-w-[300px] ml-[16px]">
        <h1 className="typographyTextMdSemibold">{medicine}</h1>
        <h2 className="typographyTextXsMedium mt-[4px]">{tables} tables</h2>
        <h2 className="typographyTextXsRegular mt-[4px]">
          Description : {description}
        </h2>
      </div>
    </div>
  );
};
export default Prescription;
