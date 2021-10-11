import Link from "next/link";
import React, { useState } from "react";
import {URL} from "../constants/url";
import {useRouter} from "next/router";
import axios from "axios";
import {Loader} from "./Loader";

export const SignInComponent: React.FC = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errMessage, setErrMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const loginHandler = async () => {
    try {
      setIsLoading(true);
      await axios
          .post(
              `${URL}/auth/sign-in`,
              { ...form },
              {
                withCredentials: true,
              }
          )
          .then(() => {
            // router.reload();
            setIsLoading(false);
            router.push("/");
          })
          .catch((err) => {
            setIsLoading(false);
            setErrMessage(err.response.data.message);
          });
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };
  return (
    <div className="container">
      <h3>Авторизация</h3>
      {
        isLoading ? <Loader/> :
            <form className="form form-login" onSubmit={(e) => e.preventDefault()}>
              <div className="row">
                <div className="input-field col s12">
                  <input
                      type="email"
                      name="email"
                      className="validate"
                      onChange={changeHandler}
                  />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="input-field col s12">
                  <input
                      type="password"
                      name="password"
                      className="validate"
                      onChange={changeHandler}
                  />
                  <label htmlFor="password">Password</label>
                </div>
              </div>
              <div className="row">
                <button
                    className="waves-effect waves-light btn blue"
                    onClick={() => loginHandler()}
                >
                  Войти
                </button>
                <Link href="/registration">
                  <a className="btn-outline btn-reg">Нет аккаунта ?</a>
                </Link>
              </div>
            </form>
      }
    </div>
  );
};
