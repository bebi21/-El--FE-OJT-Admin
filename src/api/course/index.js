import publicAxios from "../../database/publicAxios";
import {
  API_GET_ALL_COURSE,
  API_SEARCH_COURSE,
  API_PAGINATION_COURSE,
  API_GET_ALl_TEACHER,
  API_COURSES_BY_ID_UPDATE,
} from "./ApiCourse";
export const getALlCourseApi = async () => {
  try {
    const response = await publicAxios.get(API_GET_ALL_COURSE);
    return response;
  } catch (error) {
    return error;
    return error;
  }
};

export const handleSearchCourseApi = async (dataValue) => {
  try {
    const response = await publicAxios.get(API_SEARCH_COURSE + `${dataValue}`);
    return response;
  } catch (error) {
    return error;
    return error;
  }
};
S;

export const handlePaginationRenderOneApi = async (firstPage, limit) => {
  try {
    const response = await publicAxios.get(
      API_PAGINATION_COURSE + `${firstPage}&limit=${limit}`
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const handlePaginationApi = async (page, limit) => {
  try {
    const response = await publicAxios.get(
      API_PAGINATION_COURSE + `${page}&limit=${limit}`
    );
    return response;
  } catch (error) {
    return error;
  }
};
export const handleFindCourseByIdApi = async (id) => {
  try {
    const response = await publicAxios.get(API_COURSES_BY_ID + `${id}`);
    return response;
  } catch (error) {
    return error;
  }
};
export const handleUpdateCourseByIdApi = async (id, data) => {
  try {
    const response = await publicAxios.put(
      API_COURSES_BY_ID_UPDATE + `${id}`,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};
export const handleGetAllTeacherApi = async () => {
  try {
    const response = await publicAxios.get(API_GET_ALl_TEACHER);
    return response;
  } catch (error) {
    return error;
  }
};

export const handleCreateCourseApi = async (data) => {
  try {
    const response = await publicAxios.post(API_COURSES_BY_ID_CREATE, data);
    return response;
  } catch (error) {
    return error;
  }
};
