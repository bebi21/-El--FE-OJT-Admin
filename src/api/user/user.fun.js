import publicAxios from "../../database/publicAxios";
import { API_PAGINATION_USER, API_UPDATE_STATUS_USER } from "./ApiUser";

export const handleChangeStatusApi = async(data)=>{
    try {
    const response = await publicAxios.put(API_UPDATE_STATUS_USER, data);
    return response
    } catch (error) {
        console.log(error)
    }
}

export const handlePagnigationFirstApi = async(firstPage, limit)=>{
    try {
    const response = await publicAxios.get(API_PAGINATION_USER + `${firstPage}&limit=${limit}`); 
    return response
    } catch (error) {
        console.log(error)
    }
}

export const handlePagnigationApi = async(firstPage, limit)=>{
    try {
    const response = await publicAxios.get(API_PAGINATION_USER + `${firstPage}&limit=${limit}`); 
    return response
    } catch (error) {
        console.log(error)
    }
}