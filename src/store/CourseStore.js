import {makeAutoObservable} from "mobx";

export default class CourseStore {
    constructor() {
        this._creatingCourseName = '';
        this._creatingCourseYear = '';
        this._creatingCoursePlaces = '';
        this._creatingCourseSemester = 'Autumn';
        this._creatingCourseRequirements = '';
        this._creatingCourseAnnotations = '';
        this._creatingCourseTeacherId = '';
        this._usersList = [];
        makeAutoObservable(this);
    }

    setUsersList(array) {
        this._usersList = array;
        this._creatingCourseTeacherId = array[0].id;
    }
    setCreatingCourseName(name) {
        this._creatingCourseName = name;
    }
    setCreatingCourseYear(year) {
        this._creatingCourseYear = year;
    }
    setCreatingCoursePlaces(count) {
        this._creatingCoursePlaces = count;
    }
    setCreatingCourseSemester(semester) {
        this._creatingCourseSemester = semester;
    }
    setCreatingCourseRequirements(requirements) {
        this._creatingCourseRequirements = requirements;
    }
    setCreatingCourseAnnotations(annotations) {
        this._creatingCourseAnnotations = annotations;
    }
    setCreatingCourseTeacherId(teacherId) {
        this._creatingCourseTeacherId = teacherId;
    }

    get usersList() {
        return this._usersList;
    }
    get creatingCourseName() {
        return this._creatingCourseName;
    }
    get creatingCourseYear() {
        return this._creatingCourseYear;
    }
    get creatingCoursePlaces() {
        return this._creatingCoursePlaces;
    }
    get creatingCourseSemester() {
        return this._creatingCourseSemester;
    }
    get creatingCourseRequirements() {
        return this._creatingCourseRequirements;
    }
    get creatingCourseAnnotations() {
        return this._creatingCourseAnnotations;
    }
    get creatingCourseTeacherId() {
        return this._creatingCourseTeacherId;
    }
}