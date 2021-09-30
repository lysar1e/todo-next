import React from "react";
import Link from "next/link";
import axios from "axios";
import {URL} from "../constants/url";
import {useRouter} from "next/router";
type Props = {
    isLogin: boolean;
}
export const Navbar: React.FC<Props> = ({isLogin}) => {
    const router = useRouter();
    const logout = async () => {
        try {
           await axios.post(`${URL}/auth/logout`, {}, {withCredentials: true});
           router.reload();
        } catch (e) {
            alert("Ошибка при выходе!");
        }
    }
  return (
    <nav>
      <div className="nav-wrapper navbar blue">
        <Link href="/">
          <a className="brand-logo">MERN Todo app</a>
        </Link>
        {isLogin ? (
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <Link href="/">
                <a onClick={() => logout()}>Выйти</a>
              </Link>
            </li>
          </ul>
        ) : (
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <Link href="/">
                <a>Войти</a>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};
