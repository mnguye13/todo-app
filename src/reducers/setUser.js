const userReducer = (state ={}, action) =>{
    switch(action.type){
        case 'SETUSER': 
            return {...state, ...action.userData}
        default: return state; 
    }

}

export default userReducer;