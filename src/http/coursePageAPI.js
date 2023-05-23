import {$authHost} from "./index";

export const getCourseInf = async (id) => {
    const {data} = await $authHost.get(`courses/${id}/details`);
    return data;
}

export const putCourseInf = async (id, requirements, annotations) => {
    const {data} = await $authHost.put(`courses/${id}`, {requirements, annotations});
    return data;
}

export const setCourseStatus = async (id, status) => {
    const {data} = await $authHost.post(`courses/${id}/status`, {status});
    return data;
}

export const deleteCourse = async (id) => {
    const {data} = await $authHost.delete(`courses/${id}`);
    return data;
}

export const addNotification = async (id, text, isImportant) => {
    const {data} = await $authHost.post(`courses/${id}/notifications`, {text, isImportant});
    return data;
}

export const addTeacher = async (id, userId) => {
    const {data} = await $authHost.post(`courses/${id}/teachers`, {userId});
    return data;
}

export const editStudentStatus = async (id, studentId, status) => {
    const {data} = await $authHost.post(`courses/${id}/student-status/${studentId}`, {status});
    return data;
}

export const signUpToCourse = async (id) => {
    const {data} = await $authHost.post(`courses/${id}/sign-up`);
    return data;
}

export const editMark = async (id, studentId, markType, mark) => {
    const {data} = await $authHost.post(`courses/${id}/marks/${studentId}`, {markType, mark});
    return data;
}