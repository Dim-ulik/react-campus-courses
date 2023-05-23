import {makeAutoObservable} from "mobx";
import {dateToView} from "../utils/functions/dateConverter";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._roles = {
            isStudent: false,
            isTeacher: false,
            isAdmin: false
        }
        this._inf = {
            fullName: '',
            birthDate: '',
            email: ''
        }
        this._myCourses = [];
        this._teachingCourses = [];
        makeAutoObservable(this);
    }

    setListCourses(data) {
        this._teachingCourses = data;
    }
    setIsAuth(status) {
        this._isAuth = status;
    }
    setRoles(studentStatus, teacherStatus, adminStatus) {
        this._roles = {
            isStudent: studentStatus,
            isTeacher: teacherStatus,
            isAdmin: adminStatus
        }
    }
    setInf(data) {
        this._inf = {
            fullName: data.fullName,
            birthDate: dateToView(data.birthDate),
            email: data.email
        }
    }

    get listCourses() {
        return this._teachingCourses;
    }
    get isAuth() {
        return this._isAuth;
    }
    get roles() {
        return this._roles;
    }
    get inf() {
        return this._inf;
    }
}