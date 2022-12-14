import axios from "axios";
import { useSelector } from "react-redux";

const useAPIMeasureMent = () => {
  const { tokenJWT } = useSelector(state => state.user);
  const instance = axios.create({
    baseURL: "https://api.synthia.tech/measurement/api",
    withCredentials: false
  });
  if (tokenJWT) instance.defaults.headers.Authorization = "Bearer " + tokenJWT;
  return [instance];
};

export default useAPIMeasureMent;
