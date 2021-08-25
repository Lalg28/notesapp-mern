import jwtDecode from 'jwt-decode'

export function setToken(token){
    localStorage.setItem('tokenNotes', token)
}

export function getToken(){
    return localStorage.getItem('tokenNotes')
}

export function removeToken(){
    localStorage.removeItem('tokenNotes')
}

export function hasExpireToken(token){
    const tokenDecode = jwtDecode(token)
    const expireDate = tokenDecode.exp * 1000
    const currentDate = new Date().getTime()

    if(currentDate > expireDate){
        return true
    }

    return false
}