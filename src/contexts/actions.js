import { getPosts, homePageManager, homePageUser } from '../api'

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

export const getPostsData = async (setPosts) => {
    try {
        const result = await getPosts()
        if (!result.data.error) {
            setPosts(result.data.posts)
        }
    } catch (error) {
        console.log(error)
    }
}
