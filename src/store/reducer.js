const initialState = {
    profiles : [],
    images : [],
    liked : [],
    open : false
}

const reducer = ( state = initialState, action ) => {
    
    switch(action.type){
        case 'STOREPROFILE' :
            return {
                ...state,
                profiles: action.data
            }
        case 'STOREIMAGE' : 
            return {
                ...state,
                images : action.imageData,
                liked: action.likeData
            }
        case 'HANDLELIKE':
            return {
                ...state,
                liked: action.likeStat
            }
        case 'DELETE' :
            return {
                ...state,
                profiles: action.profile,
                images: action.image,
                liked : action.likeStat
            }
        case 'UPDATE':
            return {
                ...state,
                profiles : action.profile
            }
        default :
        return state;
    }
}

export default reducer;