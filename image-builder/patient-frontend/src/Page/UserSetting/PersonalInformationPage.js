import { useEffect, useState } from "react";
import HeaderWithBack from "../../components/HeaderWithBack";
import useAPI from "../../hooks/useAPI";
import PersonalInformationCard from "../../components/SettingPanel/PersonalInformationCard";
import LoadingIcon from "../../components/LoadingIcon.js";
import dayjs from "dayjs";

const PersonalInformationPage = () => {
  const [informationUser, setInformationUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiDefault] = useAPI();

  useEffect(() => {
    fetchInformationUser().then(() => setLoading(false));
  }, []);
  const fetchInformationUser = async () => {
    const res = await apiDefault.get("/info");
    setInformationUser(res.data);
  };

  return loading ? (
    <LoadingIcon />
  ) : (
    <div>
      <HeaderWithBack textHeader="Personal Information" path="/setting" />
      <PersonalInformationCard
        title="Name"
        value={
          informationUser?.name_en?.firstname + " " + informationUser?.name_en?.lastname
        }
      />
      <PersonalInformationCard
        title="Birthdate"
        value={dayjs(informationUser?.birth_date).format("YYYY-MM-DD")}
      />
      <PersonalInformationCard title="Patient Number" value={informationUser?.id} />
      <PersonalInformationCard
        title="National ID Number"
        value={informationUser?.national_id}
      />
      <PersonalInformationCard title="Nationality" value={informationUser?.nationality} />
      <PersonalInformationCard title="Weight" value={informationUser?.weight} />
      <PersonalInformationCard title="Height" value={informationUser?.height} />
      <PersonalInformationCard title="Blood Type" value="A" />
    </div>
  );
};
export default PersonalInformationPage;
