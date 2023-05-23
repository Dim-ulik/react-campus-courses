import {makeAutoObservable} from "mobx";
import {getSemester, getStatus, getStudyYearsString} from "../utils/functions/courseList";

export default class CoursePageStore {
    constructor() {
        this._courseName = '';
        this._status = '';
        this._year = '';
        this._allPlaces = '';
        this._semester = '';
        this._enrolledStudentsCount = '';
        this._pendingStudentsCount = '';
        this._requirements = '';
        this._annotations = '';
        this._notifications = [];
        this._teachers = [];
        this._students = [];
        this._id = '';
        this._rawStatus = '';
        this._notificationsCount = 0;
        this._editingRequirements = '';
        this._editingAnnotations = '';
        this._editingNotifications = '';
        this._editingNotificationsImportant = false;
        this._editingStatus = '';
        this._addingTeacherId = '';
        this._usersList = [];
        this._mark = '';
        this._currentMark = '';
        this._currentUser = '';
        this._currentMarkType = '';
        makeAutoObservable(this);
    }

    setUsersList(list) {
        this._usersList = list;
        this._addingTeacherId = list[0].id;
    }
    setAddingTeacherId(id) {
        this._addingTeacherId = id;
    }
    setEditingNotificationsImportant(value) {
        this._editingNotificationsImportant = value;
    }
    setEditingRequirements(requirements) {
        this._editingRequirements = requirements;
    }
    setEditingAnnotations(annotations) {
        this._editingAnnotations = annotations;
    }
    setEditingStatus (status) {
        this._editingStatus = status;
    }
    setAllData(data) {
        this._id = data.id;
        this._courseName = data.name;
        this._rawStatus = (data.status !== 'Created') ? data.status : '';
        this._status = getStatus(data.status);
        this._year = getStudyYearsString(data.startYear);
        this._allPlaces = data.maximumStudentsCount;
        this._semester = getSemester(data.semester);
        this._enrolledStudentsCount = data.studentsEnrolledCount;
        this._pendingStudentsCount = data.studentsInQueueCount;
        this._requirements = data.requirements;
        this._annotations = data.annotations;
        this._notifications = data.notifications;
        this._teachers = data.teachers;
        this._students = data.students;
        this._notificationsCount = data.notifications.length;
        this._editingAnnotations = data.annotations;
        this._editingRequirements = data.requirements;
    }
    setCourseName(name) {
        this._courseName = name;
    }
    setRequirements(data) {
        this._requirements = data;
    }
    setAnnotations(data) {
        this._annotations = data;
    }
    setNotifications(data) {
        this._notifications = data;
    }
    setStatus(status) {
        this._status = status;
    }
    setYear(year) {
        this._year = year;
    }
    setAllPlaces(places) {
        this._allPlaces = places;
    }
    setSemester(semester) {
        this._semester = semester;
    }
    setEnrolledStudentsCount(count) {
        this._enrolledStudentsCount = count;
    }
    setPendingStudentsCount(count) {
        this._pendingStudentsCount = count;
    }
    setEditingNotifications(text) {
        this._editingNotifications = text;
    }
    setMark(mark) {
        this._mark = mark;
    }
    setCurrentMark(mark) {
        this._currentMark = mark;
        this._mark = mark;
    }
    setCurrentUser(id) {
        this._currentUser = id;
    }
    setCurrentMarkType(type) {
        this._currentMarkType = type;
    }

    get status() {
        return this._status;
    }
    get year() {
        return this._year;
    }
    get allPlaces() {
        return this._allPlaces;
    }
    get semester() {
        return this._semester;
    }
    get enrolledStudentsCount() {
        return this._enrolledStudentsCount;
    }
    get pendingStudentsCount() {
        return this._pendingStudentsCount;
    }
    get requirements() {
        return this._requirements;
    }
    get annotations() {
        return this._annotations;
    }
    get notifications() {
        return this._notifications;
    }
    get courseName() {
        return this._courseName;
    }
    get notificationsCount() {
        return this._notificationsCount;
    }
    get editingRequirements() {
        return this._editingRequirements;
    }
    get editingAnnotations() {
        return this._editingAnnotations;
    }
    get id() {
        return this._id;
    }
    get editingStatus() {
        return this._editingStatus;
    }
    get rawStatus() {
        return this._rawStatus;
    }
    get editingNotifications() {
        return this._editingNotifications;
    }
    get editingNotificationsImportant() {
        return this._editingNotificationsImportant;
    }
    get teachers() {
        return this._teachers;
    }
    get students() {
        return this._students;
    }
    get addingTeacherId() {
        return this._addingTeacherId;
    }
    get usersList() {
        return this._usersList;
    }
    get studentDifference() {
        return (this.allPlaces - this.enrolledStudentsCount);
    }
    get mark() {
        return this._mark;
    }
    get currentMark() {
        return this._currentMark;
    }
    get currentUser() {
        return this._currentUser;
    }
    get currentMarkType() {
        return this._currentMarkType
    }
}