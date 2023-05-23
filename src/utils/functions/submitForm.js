import {login, registration} from "../../http/userAPI";

export const submitFormLogin = async (auth) => {
    try {
        const response = await login(auth);
        localStorage.setItem('token', response.token);
        return 1;
    } catch (e) {
        return 0;
    }
}

export const submitFormRegister = async (auth) => {
    try {
        console.log(auth.birthDate);
        const response = await registration(auth);
        localStorage.setItem('token', response.token);
        return 1;
    } catch (e) {
        return 0;
    }
}

