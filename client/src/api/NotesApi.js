import { authFetch } from "../utils/authFetch";
import { BASE_PATH } from "../utils/constants";

//Obtener notas
export async function getNotes(logout) {
  try {
    const url = `${BASE_PATH}/api/notes`
    const result = await authFetch(url, null, logout)
    return result
  } catch (error) {
    console.log(error);
    return null;
  }
}

//Obtener notas por usuario
export async function getNoteUser(idUser, logout){
  try {
    const url = `${BASE_PATH}/api/notes?user=${idUser}`
    const result = await authFetch(url, null, logout)
    return result
  } catch (error) {
    console.log(error)
    return null
  }
}

//Obtener nota por ID
export async function getNoteByID(idNote, logout) {
  try {
    const url = `${BASE_PATH}/api/notes/${idNote}`;
    const result = await authFetch(url, null, logout)
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

//Crear una nota
export async function addNote(data, logout) {
  try {
    const url = `${BASE_PATH}/api/notes`;
    const params = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    const result = await authFetch(url, params, logout)
    return result
  } catch (error) {
    console.log(error);
    return null;
  }
}

//Eliminar una nota
export async function deleteNote(idNote, logout) {
  try {
    const url = `${BASE_PATH}/api/notes/${idNote}`;
    const params = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    const result = await authFetch(url, params, logout)
    return result
  } catch (error) {
    console.log(error);
    return null;
  }
}

//Editar una nota
export async function updateNote(idNote, data, logout) {
  try {
    const url = `http://localhost:3001/api/notes/${idNote}`;
    const params = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    const result = await authFetch(url, params, logout)
    return result
  } catch (error) {
    console.log(error);
    return null;
  }
}
