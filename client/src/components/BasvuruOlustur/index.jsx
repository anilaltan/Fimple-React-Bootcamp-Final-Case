import { useForm } from "react-hook-form";
import UserService from "../../services/user.service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import styles from "./styles.module.css";

const isFilesLessThanThree = (fileList) => {
  return fileList.length < 3;
};

const schema = yup.object().shape({
  name: yup.string().required("İsim zorunludur"),
  surname: yup.string().required("Soyisim zorunludur"),
  age: yup.number().integer("Yaş tam sayı olmalı").required("Yaş zorunludur"),
  TC: yup
    .number()
    .typeError("TC Kimlik numarası tam sayı olmalı")
    .integer("TC Kimlik numarası tam sayı olmalı")
    .min(10000000000, "TC Kimlik numarası 11 haneli olmalı")
    .max(99999999999, "TC Kimlik numarası 11 haneli olmalı")
    .required("TC Kimlik numarası zorunludur"),
  basvuruNedeni: yup.string().required("Başvuru nedeni zorunludur"),
  address: yup.string().required("Adres zorunludur"),
  ticketImages: yup
    .mixed()
    .test(
      "is-valid-amount",
      "En fazla 2 dosya yüklenebilir",
      (value) => value.length < 3
    ),
});

const BasvuruOlustur = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [ticket, setTicket] = useState();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      surname: "",
      age: "",
      TC: 0,
      basvuruNedeni: "",
      address: "",
      ticketImages: [],
    },
  });

  const nextStep = async () => {
    const fieldsToValidate = {
      1: ["name", "surname", "age"],
      2: ["tc", "address"],
      3: ["basvuruNedeni", "ticketImages"],
    };

    const result = await trigger(fieldsToValidate[step]);
    console.log(result);

    if (result === true) {
      setStep((prevStep) => prevStep + 1);
    }
  };
  const prevStep = () => setStep((prevStep) => prevStep - 1);

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

      // console.log(isFilesLessThanThree(data.ticketImages));
      // console.log(formData);
      if (step === 3) {
        console.log("data: ", data);
      }

      // const newTicket = await UserService.postNewTicket(formData);
      // if (newTicket) {
      //   setTicket(newTicket.data);
      //   console.log(ticket);
      //   const basvuruNo = newTicket.data._id;
      //   navigate("/basvuru-basarili", {
      //     state: { basvuruNo: basvuruNo, ticket: newTicket.data },
      //   });
      // }
    } catch (error) {
      console.error("Ticket create error:", error);
    }
  };

  const renderFormStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <label className={styles.label}>name</label>
            <input
              type="text"
              id="name"
              required
              {...register("name", { required: true })}
              className={styles.input}
            />
            <p>{errors && errors.name?.message}</p>

            <label htmlFor="surname" className={styles.label}>
              surname
            </label>
            <input
              type="text"
              id="surname"
              {...register("surname", { required: true })}
              className={styles.input}
            />

            <p>{errors && errors.surname?.message}</p>

            <label htmlFor="age" className={styles.label}>
              age
            </label>
            <input
              type="text"
              id="age"
              {...register("age", { required: true })}
              className={styles.input}
            />
            <p>{errors && errors.age?.message}</p>

            <button type="button" onClick={nextStep}>
              Next
            </button>
          </>
        );
      case 2:
        return (
          <>
            <label htmlFor="TC" className={styles.label}>
              TC
            </label>
            <input
              type="text"
              id="TC"
              {...register("TC", { required: true })}
              className={styles.input}
            />
            <p>{errors && errors.TC?.message}</p>

            <label htmlFor="address" className={styles.label}>
              address
            </label>
            <input
              type="text"
              id="address"
              {...register("address", { required: true })}
              className={styles.input}
            />
            <p>{errors && errors.address?.message}</p>

            <button type="button" onClick={prevStep}>
              Previous
            </button>
            <button type="button" onClick={nextStep}>
              Next
            </button>
          </>
        );
      case 3:
        return (
          <>
            <label htmlFor="basvuruNedeni" className={styles.label}>
              description
            </label>
            <input
              type="text"
              id="basvuruNedeni"
              {...register("basvuruNedeni", { required: true })}
              className={styles.input}
            />
            <p>{errors && errors.basvuruNedeni?.message}</p>

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
            <p>{errors && errors.ticketImages?.message}</p>

            <button type="button" onClick={prevStep}>
              Previous
            </button>
            <input type="submit" />
          </>
        );
      default:
        return null;
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
          {renderFormStep()}

          {/* Display errors */}
          {/* {errors.exampleRequired && (
            <span className={styles.span}>This field is required</span>
          )} */}
        </form>
      </div>
    </div>
  );

  // return (
  //   <div className={styles.container}>
  //     <div className={styles.card}>
  //       <h1 className={styles.success}>Yeni Başvuru Oluştur</h1>
  //       <form
  //         onSubmit={handleSubmit(onSubmit)}
  //         className={styles.formContainer}
  //       >
  //         <label htmlFor="name" className={styles.label}>
  //           name
  //         </label>
  //         <input
  //           type="text"
  //           id="name"
  //           {...register("name", { required: true })}
  //           className={styles.input}
  //         />
  //         <label htmlFor="surname" className={styles.label}>
  //           surname
  //         </label>
  //         <input
  //           type="text"
  //           id="surname"
  //           {...register("surname", { required: true })}
  //           className={styles.input}
  //         />
  //         <label htmlFor="age" className={styles.label}>
  //           age
  //         </label>
  //         <input
  //           type="text"
  //           id="age"
  //           {...register("age", { required: true })}
  //           className={styles.input}
  //         />
  //         <label htmlFor="TC" className={styles.label}>
  //           TC
  //         </label>
  //         <input
  //           type="text"
  //           id="TC"
  //           {...register("TC", { required: true })}
  //           className={styles.input}
  //         />
  //         <label htmlFor="basvuruNedeni" className={styles.label}>
  //           description
  //         </label>
  //         <input
  //           type="text"
  //           id="basvuruNedeni"
  //           {...register("basvuruNedeni", { required: true })}
  //           className={styles.input}
  //         />
  //         <label htmlFor="address" className={styles.label}>
  //           address
  //         </label>
  //         <input
  //           type="text"
  //           id="address"
  //           {...register("address", { required: true })}
  //           className={styles.input}
  //         />
  //         <label htmlFor="ticketImages" className={styles.label}>
  //           photos
  //         </label>
  //         <input
  //           type="file"
  //           id="ticketImages"
  //           {...register("ticketImages")}
  //           multiple
  //           className={styles.input}
  //         />

  //         {/* errors will return when field validation fails  */}
  //         {errors.exampleRequired && (
  //           <span className={styles.span}>This field is required</span>
  //         )}
  //         <input type="submit" />
  //       </form>
  //     </div>
  //   </div>
  // );
};

export default BasvuruOlustur;
