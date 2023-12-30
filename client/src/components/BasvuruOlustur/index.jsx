import { useForm } from "react-hook-form";
import UserService from "../../services/user.service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const BasvuruOlustur = () => {
  const navigate = useNavigate();
  const [ticket, setTicket] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //TODO Hatali giris yazdir ve form valid yap(yup)
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("surname", data.surname);
      formData.append("age", data.age);
      formData.append("TC", data.TC);
      formData.append("basvuruNedeni", data.basvuruNedeni);
      formData.append("address", data.address);
      for (const file of data.ticketImages) {
        formData.append("ticketImages", file);
      }
      const newTicket = await UserService.postNewTicket(formData);
      if (newTicket) {
        setTicket(newTicket.data);
        console.log(ticket);
        const basvuruNo = newTicket.data._id;
        navigate("/basvuru-basarili", {
          state: { basvuruNo: basvuruNo, ticket: newTicket.data },
        });
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.success}>Yeni Başvuru Oluştur</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.formContainer}
        >
          <label htmlFor="name" className={styles.label}>
            name
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: true })}
            className={styles.input}
          />
          <label htmlFor="surname" className={styles.label}>
            surname
          </label>
          <input
            type="text"
            id="surname"
            {...register("surname", { required: true })}
            className={styles.input}
          />
          <label htmlFor="age" className={styles.label}>
            age
          </label>
          <input
            type="text"
            id="age"
            {...register("age", { required: true })}
            className={styles.input}
          />
          <label htmlFor="TC" className={styles.label}>
            TC
          </label>
          <input
            type="text"
            id="TC"
            {...register("TC", { required: true })}
            className={styles.input}
          />
          <label htmlFor="basvuruNedeni" className={styles.label}>
            description
          </label>
          <input
            type="text"
            id="basvuruNedeni"
            {...register("basvuruNedeni", { required: true })}
            className={styles.input}
          />
          <label htmlFor="address" className={styles.label}>
            address
          </label>
          <input
            type="text"
            id="address"
            {...register("address", { required: true })}
            className={styles.input}
          />
          <label htmlFor="ticketImages" className={styles.label}>
            photos
          </label>
          <input
            type="file"
            id="ticketImages"
            {...register("ticketImages")}
            multiple
            className={styles.input}
          />

          {/* errors will return when field validation fails  */}
          {errors.exampleRequired && (
            <span className={styles.span}>This field is required</span>
          )}
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default BasvuruOlustur;
