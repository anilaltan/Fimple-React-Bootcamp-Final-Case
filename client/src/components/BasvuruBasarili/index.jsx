import { useLocation } from "react-router-dom";
const BasvuruBasarili = () => {
  const location = useLocation();
  const { state } = location;
  return (
    <div>
      Basvuru Basarili
      <p>
        Başvurunuz başarıyla alındı. Başvuru Kodu: {state && state.ticketNo}
      </p>
    </div>
  );
};

export default BasvuruBasarili;
