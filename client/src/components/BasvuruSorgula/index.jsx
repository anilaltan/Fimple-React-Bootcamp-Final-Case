import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const BasvuruSorgula = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    navigate(`/basvuru/${data.takipNo}`);
  };
  return (
    <div>
      BasvuruSorgula
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="takipNo">Takip No</label>
        <input
          type="text"
          id="takipNo"
          {...register("takipNo", { required: true })}
        />
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}
        <input type="submit" />
      </form>
    </div>
  );
};

export default BasvuruSorgula;
