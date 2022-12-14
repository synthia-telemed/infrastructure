const RecieptDetailCard = ({ data, title }) => {
  return (
    <div className="flex justify-center mt-[8px]">
      <div className="w-full rounded-[8px] p-[16px] shadow-[0px_1px_3px_rgba(16,24,40,0.1)] bg-base-white border-[1px] border-solid border-gray-200">
        <div className="flex flex-col w-full">
          {data?.invoice_items.map((data) => {
            return (
              <div className="flex justify-between text-gray-700 w-full typographyTextSmMedium mt-[8px] " key={data.name}>
                {data?.name} <span>$ {data?.price}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default RecieptDetailCard;
