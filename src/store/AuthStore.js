import {makeAutoObservable} from "mobx";

export default class AuthStore {
    constructor() {
        this._email = '';
        this._password = '';
        this._confirmPassword = '';
        this._fullName = '';
        this._birthDate = '';
        this._error = false;
        makeAutoObservable(this);
    }

    setEmail(email) {
        this._email = email;
    }
    setPassword(password) {
        this._password = password;
    }
    setError(error) {
        this._error = error;
    }
    setConfirmPassword(confirmPassword) {
        this._confirmPassword = confirmPassword;
    }
    setBirthDate(birthDate) {
        this._birthDate = birthDate;
    }
    setFullName(fullName) {
        this._fullName = fullName;
    }

    get email() {
        return this._email;
    }
    get password() {
        return this._password;
    }
    get confirmPassword() {
        return this._confirmPassword;
    }
    get birthDate() {
        return this._birthDate;
    }
    get fullName() {
        return this._fullName;
    }
    get error() {
        return this._error;
    }
}