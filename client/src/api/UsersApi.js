import axios from "axios";
import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/authFetch";

//Crear un usuario
export async function createUser(data) {
  try {
    const url = "http://localhost:3001/api/users";
    const response = await axios.post(url, data);
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}

//Obtener informacion del usuario
export async function getUserData(idUser, logout) {
  try {
    const url = `${BASE_PATH}/api/users/${idUser}`;
    const result = await authFetch(url, null, logout);
    return result ? result : null;
  } catch (error) {
    console.log(error);
  }
}
