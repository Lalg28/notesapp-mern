import axios from 'axios'

//Iniciar sesion
export async function LoginApi(data){
    try {
        const url = 'http://localhost:3001/api/login'
        const response = await axios.post(url, data)
        return response.data
    } catch (error) {
        console.log(error)
        return null
    }
}