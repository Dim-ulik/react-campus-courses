import {$authHost, $host} from "./index";

export const registration = async ({fullName, birthDate, email, password, confirmPassword}) => {
    const {data} = await $host.post('registration', {fullName, birthDate, email, password, confirmPassword});
    return data;
}

export const login = async ({email, password}) => {
    const {data} = await $host.post('login', {email, password});
    return data;
}

export const logout = async () => {
    const {data} = await $authHost.post('logout');
    return data;
}

export const getRoles = async () =>  {
    const {data} = await $authHost.get('roles');
    return data;
}

export const userInf = async () => {
    const {data} = await $authHost.get('profile');
    return data;
}

export const putInf = async (fullName, birthDate) => {
    const {data} = await $authHost.put('profile', {fullName, birthDate});
    return data;
}

export const getUsersList = async () => {
    const {data} = await $authHost.get('users');
    return data;
}