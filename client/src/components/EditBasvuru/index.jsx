import { useParams } from "react-router-dom";
//TODO Hatali giris yazdir ve form valid yap(yup)
const EditBasvuru = () => {
  const { basvuruNo } = useParams();
  return <div>EditBasvuru{basvuruNo}</div>;
};

export default EditBasvuru;
