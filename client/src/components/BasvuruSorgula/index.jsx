import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { FaSearch } from "react-icons/fa";

import styles from "./styles.module.css";

const schema = yup.object().shape({
  takipNo: yup.string().required("Takip Numarası zorunlu"),
});

const BasvuruSorgula = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    navigate(`/basvuru/${data.takipNo}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.success}>Başvuru Sorgula</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.submitDiv}>
            <input
              type="text"
              id="takipNo"
              className={styles.input}
              placeholder="Takip Numarası"
              {...register("takipNo", { required: true })}
            />
            <FaSearch className={styles.searchIcon} />
          </div>

          <div className={styles.submitDiv}>
            <input type="submit" value="Sorgula" className={styles.submitBtn} />
          </div>

          {errors.takipNo && (
            <p className={styles.error}>{errors.takipNo.message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default BasvuruSorgula;
