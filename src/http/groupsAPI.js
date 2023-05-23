import {$authHost} from "./index";

export const getListOfGroups = async () => {
    const {data} = await $authHost.get('groups');
    return data;
}

export const createGroup = async (name) => {
    const {data} = await $authHost.post('groups', {name});
    return data;
}

export const updateGroup = async (id, name) => {
    const {data} = await $authHost.put(`groups/${id}`, {name});
    return data;
}

export const deleteGroup = async (id) => {
    const {data} = await $authHost.delete(`groups/${id}`);
    return data;
}

export const getListCourses = async (id) => {
    const {data} = await $authHost.get(`groups/${id}`);
    return data;
}
