import { getToken, hasExpireToken } from "../api/token";

//Fetch para hacer peticiones protegidas
export async function authFetch(url, params, logout){
    const token = getToken()

    if(!token){
        //Usuario no logueado
        logout()
    }else{
        if(hasExpireToken(token)){
            //Token caducado
            logout()
        }else{
            const paramsTemp = {
                ...params,
                headers: {
                    ...params?.headers,
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const response = await fetch(url, paramsTemp)
                const result = response.json()
                return result
            } catch (error) {
                console.log(error)
            }
        }
    }
}