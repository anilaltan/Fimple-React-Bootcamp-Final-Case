import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useUser } from "../../context/userContext";
// import { withLoading } from "../../hocs/withLoading ";
// import AuthService from "../../services/auth.service";

const AdminLogin = () => {
  // const navigate = useNavigate();
  const { token, loginUser, logoutUser } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (token) {
    return <Navigate to="/admin/basvuru-listesi" replace />;
  }

  const onSubmit = ({ username, password }) => {
    loginUser(username, password);
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <input
            placeholder="username"
            {...register("username", { required: true })}
          />

          {/* include validation with required or other standard HTML validation rules */}
          <input
            placeholder="password"
            type="password"
            {...register("password", { required: true })}
          />
          {/* errors will return when field validation fails  */}
          {errors.exampleRequired && <span>This field is required</span>}

          <input type="submit" />
        </form>
      </div>

      {/* <button onClick={logoutUser}>Log Out</button> */}
    </>
  );
};

export default AdminLogin;
