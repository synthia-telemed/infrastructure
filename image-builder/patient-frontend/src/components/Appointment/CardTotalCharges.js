import { useState, useEffect } from "react";
const CardTotalCharges = ({ detailAppointment }) => {
  const [discountAmount, setDiscountAmount] = useState(0);
  useEffect(() => {
    if (detailAppointment?.invoice?.invoice_discounts.length !== 0) {
      const totalDiscount = detailAppointment?.invoice?.invoice_discounts
        ?.map((d) => d.amount)
        ?.reduce((acc, prev) => acc + prev);

      setDiscountAmount(detailAppointment?.invoice?.total - totalDiscount);
    } else {
      setDiscountAmount(detailAppointment?.invoice?.total);
    }
  }, [detailAppointment]);
  return (
    <div className="flex justify-center mt-[8px]">
      <div className="w-full rounded-[8px] p-[16px] shadow-[0px_1px_3px_rgba(16,24,40,0.1)] bg-base-white border-[1px] border-solid border-gray-200">
        <div className="flex flex-col w-full">
          <div className="flex justify-between text-gray-700 w-full typographyTextSmMedium ">
            Amount <span>$ {detailAppointment?.invoice?.total}</span>
          </div>
          {detailAppointment?.invoice?.invoice_discounts?.map((data) => (
            <div className="flex justify-between text-gray-700 w-full typographyTextSmMedium mt-[8px] ">
              {data.name}{" "}
              <span className="text-error-600">$ -{data.amount}</span>
            </div>
          ))}
          <div className="flex justify-between text-gray-700 w-full mt-[10px] ">
            <h1 className="typographyTextMdSemibold text-primary-500">
              Net Amount
            </h1>
            <h1 className="typographyTextMdSemibold text-primary-500">
              $ {discountAmount}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CardTotalCharges;
