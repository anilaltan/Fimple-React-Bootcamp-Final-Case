import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTickets } from "../../context/ticketContext";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import styles from "./styles.module.css";

//TODO Hatali giris yazdir ve form valid yap(yup)

const EditBasvuru = () => {
  const { basvuruNo } = useParams();
  const { loading, updateTicket, getTicketByTicketNo } = useTickets();
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: {} });
  // {
  //     resolver: yupResolver(schema),
  //   }
  const onSubmit = ({ status, response }) => {
    setButtonDisabled((prev) => !prev);
    updateTicket(basvuruNo, status, response);
    navigate("/admin");
  };

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        const ticketData = await getTicketByTicketNo(basvuruNo);
        setValue("status", ticketData.status || "");
        setValue("response", ticketData.response || "");
      } catch (error) {
        console.error("Error fetching ticket details:", error);
      }
    };

    fetchTicketDetails();
  }, [basvuruNo, setValue]);

  return (
    <>
      {loading && (
        <div className={styles.loadingContainer}>
          <Loading />
        </div>
      )}
      {!loading && (
        <div className={styles.container}>
          <div className={styles.card}>
            <h1 className={styles.success}>
              {basvuruNo} No'lu Başvuru Güncelle
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={styles.formContainer}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "baseline",
                  }}
                >
                  <label
                    htmlFor="status"
                    style={{
                      color: "#020826",
                      fontWeight: "bold",
                      fontSize: "20px",
                      marginBottom: "5px",
                    }}
                  >
                    Başvuru Durumu
                  </label>
                  <select
                    className={`${styles.customSelect} round`}
                    name="status"
                    {...register("status", { required: true })}
                  >
                    <option value="Beklemede">Beklemede</option>
                    <option value="İşleniyor">İşleniyor</option>
                    <option value="Tamamlandı">Tamamlandı</option>
                  </select>
                  {errors.status && (
                    <p className={styles.error}>{errors.status.message}</p>
                  )}
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "baseline",
                  }}
                >
                  <label
                    htmlFor="response"
                    style={{
                      color: "#020826",
                      fontWeight: "bold",
                      fontSize: "20px",
                      marginBottom: "5px",
                    }}
                  >
                    Başvuru Cevap
                  </label>
                  <textarea
                    {...register("response")}
                    placeholder="response"
                    name="response"
                    className={styles.textArea}
                  />
                  {errors.response && (
                    <p className={styles.error}>{errors.response.message}</p>
                  )}
                </div>
              </div>
              <div className={styles.submitDiv}>
                <input
                  type="submit"
                  className={`${styles.submitBtn} ${
                    !isButtonDisabled ? null : styles.disabledButton
                  }`}
                  disabled={isButtonDisabled}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditBasvuru;
