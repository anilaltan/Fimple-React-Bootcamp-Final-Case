import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { FaSearch } from "react-icons/fa";

const BasvuruSorgula = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // console.log(data);
    navigate(`/basvuru/${data.takipNo}`);
  };
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.success}>Başvuru Sorgula</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            id="takipNo"
            className={styles.input}
            placeholder="Takip Numarası"
            {...register("takipNo", { required: true })}
          />

          <input
            type="submit"
            value="Sorgula"
            className={styles.submitBtn}
          ></input>
          <FaSearch className={styles.searchIcon} />

          {/* errors will return when field validation fails  */}
          {errors.takipNo && <div>This field is required</div>}
        </form>
      </div>
    </div>
  );
};

export default BasvuruSorgula;
