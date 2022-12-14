import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeaderWithBack from "../../components/HeaderWithBack";
import Switch from "react-switch";
import { useNavigate } from "react-router-dom";
import { css } from "styled-components";
import { PaymentInputsWrapper, usePaymentInputs } from "react-payment-inputs";
import useAPI from "../../hooks/useAPI";
import images from "react-payment-inputs/images";
const CreditCardDetail = () => {
  const {
    meta,
    wrapperProps,
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps
  } = usePaymentInputs();
  const { state } = useLocation();
  const [checked, setChecked] = useState(state.isDefault);
  const [apiDefault] = useAPI();
  const navigate = useNavigate();
  useEffect(() => {
    if (checked !== state.isDefault) {
      setDefault();
    }
  }, [checked]);

  const setDefault = async () => {
    const body = { is_default: checked };
    const res = await apiDefault.patch(`/payment/credit-card/${state.id}`, body);
  };
  const handleChange = nextChecked => {
    setChecked(nextChecked);
  };
  const onClick = async () => {
    const res = await apiDefault.delete(`/payment/credit-card/${state.id}`);
    navigate("/setting/credit-card");
  };
  return (
    <div>
      <HeaderWithBack textHeader="Credit card" path="/setting/credit-card" />
      <div className="px-[16px]">
        <h1 className="mt-[16px] mb-[6px] typographyTextSmMedium text-gray-700">
          Card Number
        </h1>
        <PaymentInputsWrapper
          {...wrapperProps}
          styles={{
            inputWrapper: {
              base: css`
                border-radius: 8px;
              `
            },
            input: {
              cardNumber: css`
                width: 100rem;
              `
            }
          }}
        >
          <img src={state.icon} width="34px" height="24px" className="mr-[16px]" />
          <input
            id="cardnumber"
            name="cardnumber"
            maxLength={19}
            disabled
            value={`**** **** ****${state.numberCard.replaceAll("*", " ")}`}
            className="w-full"
          />
        </PaymentInputsWrapper>
        <div className="flex mt-[39px] items-center">
          <h1 className="text-primary-500 typographyTextXsMedium mr-[16px]">
            Set as default card
          </h1>
          <Switch
            onChange={handleChange}
            checked={checked}
            checkedIcon={false}
            uncheckedIcon={false}
            onColor="#303ED9"
            offColor="#EAECF0"
          />
        </div>
        <div
          className={`flex justify-center w-full items-center mt-[120px] mb-[30px]`}
          onClick={onClick}
        >
          <div
            className={` border-[1px] border-solid border-primary-500 bg-base-white  w-[235px] rounded-[8px]  h-full flex justify-center items-center min-h-[44px]`}
          >
            <h1 className="typographyTextSmMedium text-primary-500 text-center">
              Delete
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreditCardDetail;
