import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import authApi, { type LoginPayload } from "@/services/authService";
import { useAlert } from "@/hooks/useAlert";
import Alert from "@/components/Alert";
import styles from "./Login.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Login = () => {
  const { alert, showAlert, clearAlert } = useAlert();
  const { login: contextLogin } = useAuth();
  const [formLogin, setFormLogin] = useState<LoginPayload>({
    username: "",
    password: "",
  });

  //---------------------------- Handle ----------------------------
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormLogin((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await authApi.login(formLogin);
      await contextLogin(res.token);
    } catch {
      showAlert({
        type: "error",
        title: "Đăng nhập thất bại",
        content: "Username hoặc password không đúng!",
      });
    }
  };

  //---------------------------- Render ----------------------------
  return (
    <div className={cx("login")}>
      {/* Login Form */}
      <form className={cx("login__form")} onSubmit={handleSubmit}>
        <h1 className={cx("login__form--title")}>Đăng nhập</h1>

        <div className={cx("login__form--fields")}>
          <div className={cx("field")}>
            <label htmlFor="username" className={cx("field__label")}>
              Username
            </label>
            <input
              className={cx("field__input")}
              type="text"
              id="username"
              value={formLogin.username}
              onChange={handleChange}
              placeholder="Enter username"
              required
              autoComplete="username"
            />
          </div>

          <div className={cx("field")}>
            <label htmlFor="password" className={cx("field__label")}>
              Password
            </label>
            <input
              className={cx("field__input")}
              type="password"
              id="password"
              value={formLogin.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
              autoComplete="current-password"
            />
          </div>
        </div>

        <button type="submit" className={cx("login__form--btn")}>
          Sign In
        </button>
      </form>

      {/* Alert */}
      {alert && <Alert alert={alert} clearAlert={clearAlert} />}
    </div>
  );
};

export default Login;
