import {
  useState,
} from "react";

import API from "../services/api";

const Register = () => {

  const [name,
    setName] =
    useState("");

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
            "/auth/register",
            {

              name,

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
          "Register failed"
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

        <h1>📝 Register</h1>






        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          required
        />






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
          Register
        </button>






        <p>

          Akoon ma leedahay?
          {" "}

          <a href="/">
            Login
          </a>

        </p>

      </form>

    </div>

  );

};

export default Register;