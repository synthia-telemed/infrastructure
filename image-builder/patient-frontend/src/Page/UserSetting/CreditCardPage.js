import { useEffect, useState } from "react";
import { connect } from "react-redux";
import HeaderWithBack from "../../components/HeaderWithBack";
import AddCreditCardButton from "../../components/SettingPanel/AddCreditCardButton";
import CreditCardBox from "../../components/SettingPanel/CreditCardBox";
import MasterCardIcon from "../../Assets/Payment/mastercard.svg";
import JCBIcon from "../../Assets/Payment/jcb.svg";
import VisaIcon from "../../Assets/Payment/visa.svg";
import useAPI from "../../hooks/useAPI";
import LoadingIcon from "../../components/LoadingIcon";

const mapState = state => ({
  user: state.user
});

const CreditCardPage = props => {
  useEffect(() => {
    getListPaymentCreditCard().then(() => setLoading(false));
  }, []);

  const [paymentList, setPaymentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiDefault] = useAPI();

  const getListPaymentCreditCard = async () => {
    const res = await apiDefault.get("/payment/credit-card");
    setPaymentList(res.data);
  };

  return loading ? (
    <LoadingIcon />
  ) : (
    <div>
      <HeaderWithBack textHeader="Credit cards" path="/setting" />
      <div className="mx-[16px]">
        {paymentList.map(data =>
          data.brand === "Visa" ? (
            <CreditCardBox
              id={data.id}
              isDefault={data.is_default}
              key={data.id}
              icon={VisaIcon}
              numberCard={`**** ${data.last_4_digits}`}
              expireDate={data.expiry}
            />
          ) : data.brand === "MasterCard" ? (
            <CreditCardBox
              id={data.id}
              isDefault={data.is_default}
              key={data.id}
              icon={MasterCardIcon}
              numberCard={`**** ${data.last_4_digits}`}
              expireDate={data.expiry}
            />
          ) : (
            <CreditCardBox
              id={data.id}
              isDefault={data.is_default}
              key={data.id}
              icon={JCBIcon}
              numberCard={`**** ${data.last_4_digits}`}
              expireDate={data.expiry}
            />
          )
        )}
      </div>
      <AddCreditCardButton />
    </div>
  );
};
export default connect(mapState)(CreditCardPage);
