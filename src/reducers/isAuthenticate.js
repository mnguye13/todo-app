const authenticatedReducer = (state=false, action)=>{
    switch(action.type){
        case 'AUTHENTICATED': return true;
        case 'UNAUTHENTICATED': return false;
        default: return state;
    }
}

export default authenticatedReducer;