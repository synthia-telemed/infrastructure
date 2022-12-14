import axios from "axios";
import { useSelector } from "react-redux";

const useAPI = () => {
  const { tokenJWT } = useSelector(state => state.user);
  const instance = axios.create({
    baseURL: "https://api.synthia.tech/patient/api",
    withCredentials: false
  });
  if (tokenJWT) instance.defaults.headers.Authorization = "Bearer " + tokenJWT;
  return [instance];
};

export default useAPI;
