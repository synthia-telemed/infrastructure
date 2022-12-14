import { useEffect } from "react";
import { ReactComponent as VerifiedIcon } from "../../Assets/Login/verified_success.svg";
import { useLocation, useNavigate } from "react-router-dom";
const PaymentSuccessFully = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  useEffect(() => {
    setTimeout(() => {
      navigate("/appointment/detail", {
        state: { appointmentID: state.appointmentID },
      });
    }, 3000);
  }, []);
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <VerifiedIcon width="56px" height="56px" />
      <h1 className="mt-[22px] typographyHeadingSmMedium">Payment Succeed</h1>
    </div>
  );
};
export default PaymentSuccessFully;
