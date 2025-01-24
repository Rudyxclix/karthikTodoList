import commonAPI from "./commonAPI"
import serverURL from "./serverURL"

export const saveTaskAPI = async (taskDetails) => {
    return await commonAPI("POST", `${serverURL}/tasks`, taskDetails)
}

export const getAllTaskAPI = async () => {
    return await commonAPI("GET", `${serverURL}/tasks`, "")
}

export const deleteTaskAPI = async (id) => {
    return await commonAPI("DELETE", `${serverURL}/tasks/${id}`, {})
}