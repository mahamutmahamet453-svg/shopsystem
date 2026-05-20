import {
  useState,
} from "react";

import API from "../services/api";

const Login = () => {

  const [email,
    setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");






  const submitHandler =
    async (e) => {

      e.preventDefault();






      try {

        const { data } =
          await API.post(
            "/auth/login",
            {

              email,

              password,

            }
          );






        localStorage.setItem(
          "user",
          JSON.stringify(data)
        );






        window.location.href =
          "/";

      } catch (error) {

        alert(
          "Email ama password waa qalad"
        );

      }

    };







  return (

    <div
      style={{
        minHeight:"100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        background:"#f3f4f6",
      }}
    >

      <form
        onSubmit={submitHandler}
        style={{
          background:"white",
          padding:"40px",
          borderRadius:"20px",
          width:"350px",
          display:"flex",
          flexDirection:"column",
          gap:"15px",
        }}
      >

        <h1>🔐 Login</h1>






        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          required
        />






        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          required
        />






        <button className="btn">
          Login
        </button>






        <p>

          Akoon ma lihid?
          {" "}

          <a href="/register">
            Register
          </a>

        </p>

      </form>

    </div>

  );

};

export default Login;