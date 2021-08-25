import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {toast} from 'react-toastify'
import useAuth from "../hooks/useAuth";
import { createUser } from "../api/UsersApi";
import { LoginApi } from '../api/LoginApi'
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import bgImage from "../Sass/bgImages/marcos-paulo-prado-tcyW6Im5Uug-unsplash.jpg";

function Login() {
  const history = useHistory();
  const [registerView, setRegisterView] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const { login } = useAuth()

  const onSubmit = async (data) => {
    if (!registerView){
      const response = await LoginApi(data)
      if(response){
        login(response?.token)
        history.push("/homepage");
      }else{
        toast.error('Usuario o contraseña incorrectas.')
      }
    }else{
      const response = await createUser(data)
      
      if(response){
        toast.success('Usuario creado con exito')
        setRegisterView(false)
      }else{
        toast.error('El nombre de usuario ya existe')
      }
    }
    reset();
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="row">
          <div
            className="col-7 login__left p-0"
            style={{ backgroundImage: `url('${bgImage}'` }}
          >
            <div className="layer">
              <h1>
                La mejor opción de agenda <br /> y organización de notas
              </h1>
              <p>
                {registerView
                  ? "Inicia sesión"
                  : "Crea una cuenta con nosotros"}{" "}
                y descrube la mejor manera de <br />
                organizar y subir tus notas
              </p>
              {registerView ? (
                <button onClick={() => setRegisterView(false)}>
                  Iniciar sesión
                </button>
              ) : (
                <button onClick={() => setRegisterView(true)}>
                  Registrarse
                </button>
              )}
            </div>
          </div>
          <div className="col login__right">
            {registerView ? (
              <h1>¿Listo para iniciar?</h1>
            ) : (
              <h1>Bienvenido de nuevo</h1>
            )}
            <p>
              {registerView ? "Registrate" : "Inicia sesión"} e inicia la mejor
              experiencia en escribir notas
            </p>
            <form id={registerView ? 'form-register' : 'form-login'} onSubmit={handleSubmit(onSubmit)}>
              {registerView && (
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      <FontAwesomeIcon icon={faUserCircle} />
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    {...register("name", { required: true })}
                  />
                </div>
              )}
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    <FontAwesomeIcon icon={faUser} />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  {...register("username", { required: true })}
                />
              </div>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    <FontAwesomeIcon icon={faKey} />
                  </span>
                </div>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
              </div>
              <button>{registerView ? "Registrarse" : "Iniciar sesión"}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
