import {makeAutoObservable} from "mobx";

export default class GroupsStore {
    constructor() {
        this._groupsList = [];
        this._currentGroupId = '';
        this._currentGroupName = '';
        this._currentGroupCourses = [];
        makeAutoObservable(this);
    }

    setGroupsList(data) {
        this._groupsList = data;
    }

    setCurrentGroupId(id) {
        this._currentGroupId = id;
    }

    setCurrentGroupName(name) {
        this._currentGroupName = name;
    }

    setCurrentGroupCourses(data) {
        this._currentGroupCourses = data;
    }

    get groupsList() {
        return this._groupsList;
    }

    get currentGroupId() {
        return this._currentGroupId;
    }

    get currentGroupName() {
        return this._currentGroupName;
    }

    get currentGroupCourses() {
        return this._currentGroupCourses;
    }
}