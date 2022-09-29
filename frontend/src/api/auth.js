import axios from "axios"

const client = axios.create({baseURL: "http://localhost:8000/api"})

export const createUser = async (userInfo) => {
    try {
        const {data} = await client.post("/user/create", userInfo)
        return data
    } catch (error) {
        const {response} = error
        if (response?.data) return response.data
        return {error: error.message || error}
    }
}

export const verifyUserEmail = async (userInfo) => {
    try {
        const {data} = await client.post("/user/verify-email", userInfo)
        return data
    } catch (error) {
        const {response} = error
        if (response?.data) return response.data
        return {error: error.message || error}
    }
}