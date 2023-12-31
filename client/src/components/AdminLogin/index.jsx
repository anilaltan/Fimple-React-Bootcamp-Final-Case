import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useUser } from "../../context/userContext";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Loading from "../Loading";
import styles from "./styles.module.css";
// import { withLoading } from "../../hocs/withLoading ";
// import AuthService from "../../services/auth.service";

const schema = yup.object().shape({
  username: yup.string().required("Kullanıcı Adı zorunlu"),
  password: yup.string().required("Şifre zorunlu"),
});

const AdminLogin = () => {
  // const navigate = useNavigate();
  const { token, loginUser, loading, loginError } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  if (token) {
    return <Navigate to="/admin/basvuru-listesi" replace />;
  }

  const onSubmit = ({ username, password }) => {
    loginUser(username, password);
  };

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
            <h1 className={styles.success}>Admin Girişi</h1>
            {loginError && <div className={styles.error}>{loginError}</div>}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.inputContainer}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "baseline",
                  }}
                >
                  <label
                    htmlFor="username"
                    style={{
                      color: "#020826",
                      fontWeight: "bold",
                      fontSize: "20px",
                      marginBottom: "5px",
                    }}
                  >
                    Kullanıcı Adı
                  </label>
                  <input
                    placeholder="Kullanıcı Adı"
                    name="username"
                    className={styles.input}
                    {...register("username", { required: true })}
                  />
                  {errors.username && (
                    <p className={styles.error}>{errors.username.message}</p>
                  )}
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "baseline",
                    marginLeft: "30px",
                  }}
                >
                  <label
                    htmlFor="password"
                    style={{
                      color: "#020826",
                      fontWeight: "bold",
                      fontSize: "20px",
                      marginBottom: "5px",
                    }}
                  >
                    Şifre
                  </label>
                  <input
                    placeholder="Şifre"
                    name="password"
                    className={styles.input}
                    type="password"
                    {...register("password", { required: true })}
                  />
                  {errors.password && (
                    <p className={styles.error}>{errors.password.message}</p>
                  )}
                </div>

                {/* errors will return when field validation fails  */}
                {errors.exampleRequired && <span>This field is required</span>}
              </div>
              <div className={styles.submitDiv}>
                <input type="submit" className={styles.submitBtn} />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminLogin;
