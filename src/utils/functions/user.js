import {getRoles, userInf} from "../../http/userAPI";

export const getUsersRoles = async (user) => {
    const response = await getRoles();
    user.setRoles(response.isStudent, response.isTeacher, response.isAdmin);
}

export const getUserInf = async (auth, user) => {
    const response = await userInf();
    auth.setBirthDate(response.birthDate);
    auth.setFullName(response.fullName);
    user.setInf(response);
}

export const checkAuth = async (auth, user) => {
    if (localStorage.getItem('token') !== '' && localStorage.getItem('token') !== null) {
        try {
            await getUsersRoles(user);
            await getUserInf(auth, user);
            return 'Auth';
        } catch (e) {
            const status = e.response.status;
            if (status === 401 || status === 403) {
                return 'Expired'
            }
            return 'Error';
        }
    }
    else {
        return 'NonAuth';
    }
}

