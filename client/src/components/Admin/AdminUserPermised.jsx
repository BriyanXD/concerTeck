import React from "react";
import { useDispatch, useSelector } from "react-redux"
import {findUser, getAllUsers, upgradeRank} from "../../redux/actions"


export default function AdminUserPermised(){
    
    const dispatch = useDispatch()
    const userSaved = useSelector((state) => state.userSaved)
    const allUsers = useSelector((state) => state.stateAdminPanel?.allUsers)


    async function handlerUserPermised(boolean){
        await dispatch(upgradeRank(userSaved.id, boolean))
        await dispatch(getAllUsers())
        return await dispatch(findUser(allUsers,userSaved.id))
    }
    return(
        <div>
            <button onClick={() => handlerUserPermised(true)}>Subir a Admin</button>
            <button onClick={() => handlerUserPermised(false)}>Quitar Admin</button>
        </div>
    )
}