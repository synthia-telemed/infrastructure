import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderWithBack from "../../components/HeaderWithBack";
import RecieptDetailCard from "../../components/Appointment/RecieptDetailCard";
import PaymentMethod from "../../components/Appointment/PaymentMethod";
import AddCreditCardButton from "../../components/SettingPanel/AddCreditCardButton";
import PrimaryButton from "../../components/Appointment/PrimaryButton";
import CardTotalCharges from "../../components/Appointment/CardTotalCharges";

import MasterCardIcon from "../../Assets/Payment/mastercard.svg";
import JCBIcon from "../../Assets/Payment/jcb.svg";
import VisaIcon from "../../Assets/Payment/visa.svg";
import useAPI from "../../hooks/useAPI";

const SummaryReciept = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [detailAppointment, setDetailAppointment] = useState({});
  const [paymentList, setPaymentList] = useState([]);
  const [selectPaymentID, setSelectPaymentID] = useState("");
  const [apiDefault] = useAPI();

  useEffect(() => {
    getDetailAppointment();
    getListPaymentCreditCard();
  }, []);

  useEffect(() => {
    checkDefaultPayment();
  }, [paymentList]);

  const checkDefaultPayment = () => {
    paymentList.forEach(data => {
      if (data.is_default === true) {
        setSelectPaymentID(data.id);
      }
    });
  };

  const getListPaymentCreditCard = async () => {
    const res = await apiDefault.get("/payment/credit-card");
    setPaymentList(res.data);
  };
  const getDetailAppointment = async () => {
    const res = await apiDefault.get(`/appointment/${state.appointmentID}`);
    setDetailAppointment(res.data);
  };
  const selectPayment = id => {
    setSelectPaymentID(id);
  };
  const onSubmitPayNow = async () => {
    const res = await apiDefault.post(
      `/payment/pay/${detailAppointment.invoice.id}/credit-card/${selectPaymentID}`
    );
    navigate("/appointment/payment-succeed", {
      state: { appointmentID: detailAppointment.id }
    });
  };

  return (
    <div>
      <HeaderWithBack textHeader="Your invoice" path={-1} />
      <h1 className="typographyTextMdSemibold mx-[16px] mt-[16px]">Expense</h1>
      <div className="mx-[16px]">
        <RecieptDetailCard data={detailAppointment.invoice} />
      </div>
      <h1 className="typographyTextMdSemibold mx-[16px] mt-[16px]">Total Charges</h1>
      <div className="mx-[16px]">
        <CardTotalCharges detailAppointment={detailAppointment} />
      </div>

      {paymentList.map(data =>
        data.brand === "Visa" ? (
          <PaymentMethod
            isDefault={data.is_default}
            onSelect={selectPaymentID}
            key={data.id}
            value={data.id}
            id={data.id}
            icon={VisaIcon}
            onClick={selectPayment}
            numberCard={`***${data.last_4_digits}`}
            expireDate={data.expiry}
          />
        ) : data.brand === "MasterCard" ? (
          <PaymentMethod
            isDefault={data.is_default}
            onSelect={selectPaymentID}
            id={data.id}
            key={data.id}
            value={data.id}
            icon={MasterCardIcon}
            onClick={selectPayment}
            numberCard={`***${data.last_4_digits}`}
            expireDate={data.expiry}
          />
        ) : (
          <PaymentMethod
            isDefault={data.is_default}
            onSelect={selectPaymentID}
            id={data.id}
            key={data.id}
            value={data.id}
            onClick={selectPayment}
            icon={JCBIcon}
            numberCard={`***${data.last_4_digits}`}
            expireDate={data.expiry}
          />
        )
      )}
      <AddCreditCardButton />
      <PrimaryButton
        text="Pay"
        onClick={onSubmitPayNow}
        width="235px"
        height="48px"
        marginTop="56px"
      />
    </div>
  );
};
export default SummaryReciept;
