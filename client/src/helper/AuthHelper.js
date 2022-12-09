import { useSelector, useDispatch } from "react-redux"

export const isUserLoggedIn = (userState) => {
    if(userState.isLoggedIn) {
        return true
    } else {
        return false
    }
}