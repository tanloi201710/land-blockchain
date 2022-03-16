import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from './config';


export const getAllUser = async () => {
    console.log("Get All user ")
    const q = query(collection(db, "users"), where("role", "==", "user"));
    const userSnapshot = await getDocs(q);
    if (userSnapshot.docs.length > 0) {
        const cityList = userSnapshot.docs.map(doc => doc.data());
        console.log(cityList);
        return cityList;
    } else {
        console.log("Login Failed")
        return [];
    }
}
