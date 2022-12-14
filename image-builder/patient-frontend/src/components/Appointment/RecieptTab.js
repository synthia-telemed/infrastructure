import RecieptDetailCard from "./RecieptDetailCard";
import CardTotalCharges from "./CardTotalCharges";
import CreditCardBox from "../SettingPanel/CreditCardBox";
import MasterCardIcon from "../../Assets/Payment/mastercard.svg";
import JCBIcon from "../../Assets/Payment/jcb.svg";
import VisaIcon from "../../Assets/Payment/visa.svg";
const RecieptTab = (detailAppointment) => {
  console.log(detailAppointment.data?.payment.credit_card.brand);
  return (
    <>
      <h1 className="typographyTextMdSemibold mt-[16px]">
        Summary Expense
      </h1>
      <RecieptDetailCard data={detailAppointment.data.invoice} />
      <h1 className="typographyTextMdSemibold mt-[16px]">
        Total Charges
      </h1>
      <CardTotalCharges detailAppointment={detailAppointment.data} />
      <h1 className="typographyTextMdSemibold mt-[16px]">
        Payment methods
      </h1>
      {detailAppointment.data?.payment?.credit_card.brand === "Visa" ? (
        <CreditCardBox
          isDefault={detailAppointment.data?.payment?.credit_card.is_default}
          key={detailAppointment.data?.payment?.credit_card.id}
          icon={VisaIcon}
          numberCard={`***${detailAppointment.data?.payment?.credit_card.last_4_digits}`}
          expireDate={detailAppointment.data?.payment?.credit_card.expiry}
        />
      ) : detailAppointment?.data?.payment?.credit_card
          .brand === "MasterCard" ? (
        <CreditCardBox
          isDefault={detailAppointment.data?.payment?.credit_card.is_default}
          key={detailAppointment.data?.payment?.credit_card.id}
          icon={MasterCardIcon}
          numberCard={`***${detailAppointment.data?.payment?.credit_card.last_4_digits}`}
          expireDate={detailAppointment.data?.payment?.credit_card.expiry}
        />
      ) : (
        <CreditCardBox
          isDefault={detailAppointment?.data?.payment?.credit_card.is_default}
          key={detailAppointment?.data?.payment?.credit_card.id}
          icon={JCBIcon}
          numberCard={`***${detailAppointment?.data?.payment?.credit_card.last_4_digits}`}
          expireDate={detailAppointment?.data?.payment?.credit_card.expiry}
        />
      )}
    </>
  );
};
export default RecieptTab;
