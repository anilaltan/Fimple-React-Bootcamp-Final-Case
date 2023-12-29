import { useParams } from "react-router-dom";
const EditBasvuru = () => {
  const { basvuruNo } = useParams();
  return <div>EditBasvuru{basvuruNo}</div>;
};

export default EditBasvuru;
