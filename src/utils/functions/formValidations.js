import {useEffect, useState} from 'react';

export const useNameState = (startName = "", error = "Поле не может быть пустым!") => {
    const [name, setName] = useState(startName);
    const [nameDirty, setNameDirty] = useState(false);
    const [nameError, setNameError] = useState(error);

    const makeFirstLettersUpper = (string) => {
        return string.replace(/(^|\s)\S/g, function (a) {
            return a.toUpperCase()
        })
    }

    const nameChecker = (e) => {
        setName(makeFirstLettersUpper(e.target.value));
        if (e.target.value.length === 0) {
            setNameError('Поле не может быть пустым!');
            return;
        }
        if (e.target.value.length < 3) {
            setNameError('Слишком короткое имя!');
            return;
        }
        setNameError('');
    }

    return {name, setName, nameDirty, setNameDirty, nameError, setNameError, nameChecker}
}

export const useBirthDateState = (startBirthDate = "", error = "Поле не может быть пустым!") => {
    const [birthDate, setBirthDate] = useState(startBirthDate);
    const [birthDateDirty, setBirthDateDirty] = useState(false);
    const [birthDateError, setBirthDateError] = useState(error);

    const birthDateChecker = (e) => {
        setBirthDate(e.target.value);
        const nowDate = new Date();
        const currentDate = new Date(e.target.value);
        if (e.target.value.length === 0) {
            setBirthDateError('Поле не может быть пустым!');
            return;
        }
        if (currentDate > nowDate || e.target.value < '1910-01-01') {
            setBirthDateError('Некорректная дата рождения!');
            return;
        }
        setBirthDateError('');
    }

    return {
        birthDate,
        setBirthDate,
        birthDateError,
        setBirthDateError,
        birthDateDirty,
        setBirthDateDirty,
        birthDateChecker
    }
}

export const usePasswordState = (passwordRepeat = null, setPasswordRepeatError = null) => {
    const [password, setPassword] = useState('');
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [passwordError, setPasswordError] = useState('Пароль не может быть пустым!');

    const isContainDigital = (string) => {
        return (/[0-9]/.test(string));
    }

    const passwordRegChecker = (e) => {
        setPassword(e.target.value);
        if (e.target.value !== passwordRepeat) {
            setPasswordRepeatError('Пароли должны совпадать!');
        } else {
            setPasswordRepeatError('');
        }
        if (e.target.value.length === 0) {
            setPasswordError('Пароль не может быть пустым!');
            return;
        }
        if (e.target.value.length < 6) {
            setPasswordError('Минимальная длина пароля - 6 символов!');
            return;
        }
        if (!isContainDigital(e.target.value)) {
            setPasswordError('Пароль должен содержать минимум 1 цифру!');
            return;
        }
        setPasswordError("");
    }

    const passwordLoginChecker = (e) => {
        setPassword(e.target.value);
        if (e.target.value.length === 0) {
            setPasswordError('Пароль не может быть пустым');
            return;
        }
        setPasswordError("");
    }

    return {password, passwordDirty, setPasswordDirty, passwordError, passwordRegChecker, passwordLoginChecker}
}

export const useEmailState = () => {
    const [email, setEmail] = useState("");
    const [emailDirty, setEmailDirty] = useState(false);
    const [emailError, setEmailError] = useState('Email не может быть пустым!');

    const emailChecker = (e) => {
        setEmail(e.target.value);
        if (e.target.value.length === 0) {
            setEmailError('Email не может быть пустым!');
            return;
        }
        if (!(/[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+/.test(e.target.value))) {
            setEmailError('Некорректный формат Email!');
            return;
        }
        setEmailError('');
    }

    return {email, emailDirty, setEmailDirty, emailError, emailChecker}
}

export const usePasswordRepeatState = (password) => {
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [passwordRepeatDirty, setPasswordRepeatDirty] = useState(false);
    const [passwordRepeatError, setPasswordRepeatError] = useState('Поле не может быть пустым!');

    const passwordRepeatChecker = (e) => {
        setPasswordRepeat(e.target.value);
        if (e.target.value.length === 0) {
            setPasswordRepeatError('Поле не может быть пустым!');
            return;
        }
        if (e.target.value !== password) {
            setPasswordRepeatError('Пароли должны совпадать!');
            return;
        }
        setPasswordRepeatError("");
    }

    return {
        passwordRepeat,
        passwordRepeatDirty,
        setPasswordRepeatDirty,
        passwordRepeatError,
        setPasswordRepeatError,
        passwordRepeatChecker
    }
}

export const useProfileFormErrorState = (nameError, birthDateError) => {
    const [hasFormErrors, setHasFormErrors] = useState(true);

    useEffect(() => {
        if (nameError || birthDateError) {
            setHasFormErrors(true);
        } else {
            setHasFormErrors(false);
        }
    }, [nameError, birthDateError]);

    return {hasFormErrors};
}

export const useRegFormErrorState = (nameError, birthDateError, passwordError, repeatPasswordError, emailError) => {
    const [hasFormErrors, setHasFormErrors] = useState(true);

    useEffect(() => {
        if (nameError || birthDateError || passwordError || repeatPasswordError || emailError) {
            setHasFormErrors(true);
        } else {
            setHasFormErrors(false);
        }
    }, [nameError, birthDateError, passwordError, repeatPasswordError, emailError]);

    return {hasFormErrors};
}

export const useLogFormErrorState = (emailError, passwordError) => {
    const [hasFormErrors, setHasFormErrors] = useState(true);

    useEffect(() => {
        if (emailError || passwordError) {
            setHasFormErrors(true);
        } else {
            setHasFormErrors(false);
        }
    }, [emailError, passwordError]);

    return {hasFormErrors};
}
