export const isAuthenticate = ()=>{
    return { type: 'AUTHENTICATED'}
}
export const isUnAuthenticate = ()=>{
    return { type :'UNAUTHENTICATED'}
}

export const setUser = (userData) =>{
    return {
        type: 'SETUSER',
        userData
    }
}