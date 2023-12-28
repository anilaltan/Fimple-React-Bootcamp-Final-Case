import { useForm } from "react-hook-form";
import UserService from "../../../services/user.service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BasvuruOlustur = () => {
  const navigate = useNavigate();
  const [ticket, setTicket] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
        const ticketNo = ticket._id;
        navigate("/basvuru-basarili", { state: { ticketNo: ticketNo } });
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">name</label>
        <input
          type="text"
          id="name"
          {...register("name", { required: true })}
        />
        <label htmlFor="surname">surname</label>
        <input
          type="text"
          id="surname"
          {...register("surname", { required: true })}
        />
        <label htmlFor="age">age</label>
        <input type="text" id="age" {...register("age", { required: true })} />
        <label htmlFor="TC">TC</label>
        <input type="text" id="TC" {...register("TC", { required: true })} />
        <label htmlFor="basvuruNedeni">description</label>
        <input
          type="text"
          id="basvuruNedeni"
          {...register("basvuruNedeni", { required: true })}
        />
        <label htmlFor="address">address</label>
        <input
          type="text"
          id="address"
          {...register("address", { required: true })}
        />
        <label htmlFor="ticketImages">photos</label>
        <input
          type="file"
          id="ticketImages"
          {...register("ticketImages")}
          multiple
        />

        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}
        <input type="submit" />
      </form>
    </div>
  );
};

export default BasvuruOlustur;
