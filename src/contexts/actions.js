import { homePageManager, homePageUser } from '../api'

export const getHomePageData = async (role, setLands, setNotifyList) => {
    if (role === 'manager') {
        const result = await homePageManager()
        if (result.data.error) {
            console.log(result.data.message)
            return
        }
        setLands(result.data.allLands)
        setNotifyList(result.data.messages)
    } else {
        const result = await homePageUser()
        if (result.data.error) {
            console.log(result.data.message)
            return
        }
        setLands(result.data.allLands)
        setNotifyList(result.data.messages)
    }
}