import "./App.css";
import { useState } from "react";
import AuthService from "../services/auth.service";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user-token"));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ username, password }) => {
    try {
      setLoading(true);
      await AuthService.login(username, password);
      navigate("/adminProfile");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading && <div>Loading...</div>}
      {!loading && !user && (
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
      )}
    </>
  );
}

export default App;
