import { useForm } from "react-hook-form";
import UserService from "../../services/user.service";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import styles from "./styles.module.css";

const schema = yup.object().shape({
  name: yup.string().required("İsim zorunludur"),
  surname: yup.string().required("Soyisim zorunludur"),
  age: yup
    .number()
    .typeError("Yaş tam sayı olmalı")
    .integer("Yaş tam sayı olmalı")
    .required("Yaş zorunludur"),
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
      (value) => value && value.length < 3
    )
    .test("fileSize", "En fazla 1MB boyutunda dosya yüklenebilir", (value) => {
      const maxSize = 1 * 1024 * 1024;
      if (value && value[0]) {
        return value[0].size < maxSize;
      }
      if (value && value[1]) {
        return value[1].size < maxSize;
      }
    }),
});

const BasvuruOlustur = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    let defaultValues = {};
    defaultValues.name = getValues().name ? getValues().name : null;
    defaultValues.surname = getValues().surname ? getValues().surname : null;
    defaultValues.age = getValues().age ? getValues().age : null;
    defaultValues.TC = getValues().TC ? getValues().TC : null;
    defaultValues.address = getValues().address ? getValues().address : null;
    defaultValues.basvuruNedeni = getValues().basvuruNedeni
      ? getValues().basvuruNedeni
      : null;
    reset({ ...defaultValues });
  }, [step]);

  const nextStep = async () => {
    try {
      const fieldsToValidate = {
        1: ["name", "surname", "age"],
        2: ["TC", "address"],
        3: ["basvuruNedeni", "ticketImages"],
      };

      const result = await trigger(fieldsToValidate[step]);

      if (result === true) {
        setStep((prevStep) => prevStep + 1);
      }
    } catch (validationErrors) {
      console.error("Validation error:", validationErrors);
    }
  };
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  const onSubmit = async (data) => {
    try {
      setButtonDisabled((prev) => !prev);
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
        const basvuruNo = newTicket.data._id;
        navigate("/basvuru-basarili", {
          state: { basvuruNo: basvuruNo, ticket: newTicket.data },
        });
      }
    } catch (error) {
      console.error("Ticket create error:", error);
    }
  };

  const renderFormStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "baseline",
              }}
            >
              <label
                className={styles.label}
                style={{
                  color: "#020826",
                  fontWeight: "bold",
                  fontSize: "20px",
                  marginBottom: "5px",
                }}
              >
                İsim
              </label>
              <input
                type="text"
                id="name"
                placeholder="isim"
                required
                {...register("name", { required: true })}
                className={styles.input}
              />
            </div>
            <p className={styles.error}>{errors && errors.name?.message}</p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "baseline",
              }}
            >
              <label
                htmlFor="surname"
                className={styles.label}
                style={{
                  color: "#020826",
                  fontWeight: "bold",
                  fontSize: "20px",
                  marginBottom: "5px",
                }}
              >
                Soyisim
              </label>
              <input
                type="text"
                id="surname"
                placeholder="Soyisim"
                {...register("surname", { required: true })}
                className={styles.input}
              />
            </div>
            <p className={styles.error}>{errors && errors.surname?.message}</p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "baseline",
              }}
            >
              <label
                htmlFor="age"
                className={styles.label}
                style={{
                  color: "#020826",
                  fontWeight: "bold",
                  fontSize: "20px",
                  marginBottom: "5px",
                }}
              >
                Yaş
              </label>
              <input
                type="number"
                id="age"
                placeholder="Yaş"
                required
                {...register("age", { required: true })}
                className={styles.input}
              />
            </div>
            <p className={styles.error}>{errors && errors.age?.message}</p>

            <button
              type="button"
              onClick={nextStep}
              className={styles.submitBtn}
            >
              İleri
            </button>
          </>
        );
      case 2:
        return (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "baseline",
              }}
            >
              <label
                htmlFor="TC"
                className={styles.label}
                style={{
                  color: "#020826",
                  fontWeight: "bold",
                  fontSize: "20px",
                  marginBottom: "5px",
                }}
              >
                TC Numarası
              </label>
              <input
                type="number"
                id="TC"
                placeholder="TC Numarası"
                required
                {...register("TC", { required: true })}
                className={styles.input}
              />
            </div>
            <p className={styles.error}>{errors && errors.TC?.message}</p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "baseline",
              }}
            >
              <label
                htmlFor="address"
                className={styles.label}
                style={{
                  color: "#020826",
                  fontWeight: "bold",
                  fontSize: "20px",
                  marginBottom: "5px",
                }}
              >
                Adres
              </label>
              <input
                type="text"
                id="address"
                placeholder="Adres"
                required
                {...register("address", { required: true })}
                className={styles.input}
              />
            </div>
            <p className={styles.error}>{errors && errors.address?.message}</p>

            <button
              type="button"
              onClick={prevStep}
              className={styles.submitBtn}
            >
              Önceki
            </button>
            <button
              type="button"
              onClick={nextStep}
              className={styles.submitBtn}
            >
              Sonraki
            </button>
          </>
        );
      case 3:
        return (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "baseline",
              }}
            >
              <label
                htmlFor="basvuruNedeni"
                className={styles.label}
                style={{
                  color: "#020826",
                  fontWeight: "bold",
                  fontSize: "20px",
                  marginBottom: "5px",
                }}
              >
                Başvuru Nedeni
              </label>
              <input
                type="text"
                id="basvuruNedeni"
                placeholder="Başvuru Nedeni"
                {...register("basvuruNedeni", { required: true })}
                className={styles.input}
              />
            </div>
            <p className={styles.error}>
              {errors && errors.basvuruNedeni?.message}
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "baseline",
              }}
            >
              <label
                htmlFor="ticketImages"
                className={styles.label}
                style={{
                  color: "#020826",
                  fontWeight: "bold",
                  fontSize: "20px",
                  marginBottom: "5px",
                }}
              >
                Foroğraflar
              </label>
              <input
                type="file"
                id="ticketImages"
                placeholder="Foroğraflar"
                {...register("ticketImages")}
                multiple
                className={styles.input}
              />
            </div>
            <p className={styles.error}>
              {errors && errors.ticketImages?.message}
            </p>
            <button
              type="button"
              onClick={prevStep}
              className={styles.submitBtn}
              disabled={isButtonDisabled}
            >
              Önceki
            </button>

            <input
              type="submit"
              className={`${styles.submitBtn} ${
                !isButtonDisabled ? null : styles.disabledButton
              }`}
              disabled={isButtonDisabled}
            />
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
          <div className={styles.inputContainer}>{renderFormStep()}</div>
        </form>
      </div>
    </div>
  );
};

export default BasvuruOlustur;
