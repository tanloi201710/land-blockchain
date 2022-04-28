import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from './config';


export const getAllUser = async () => {
    console.log("Get All user ")
    const q = query(collection(db, "users"), where("role", "==", "user"))
    const userSnapshot = await getDocs(q)
    if (userSnapshot.docs.length > 0) {
        const userList = userSnapshot.docs.map(doc => doc.data());
        console.log(userList)
        return userList
    } else {
        console.log("Get users failed")
        return []
    }
}

export const getUser = async (userId) => {
    console.log("Get user")
    const q = query(collection(db, "users"), where("userId", "==", userId))
    const userSnapshot = await getDocs(q)
    if (userSnapshot.docs.length > 0) {
        const userList = userSnapshot.docs.map(doc => doc.data())
        console.log(userList)
        return userList
    } else {
        console.log("Get user failed")
        return []
    }
}
