import React, {createContext} from 'react';
import ReactDOM from 'react-dom'
import App from './App';
import UserStore from "./store/UserStore";
import AuthStore from "./store/AuthStore";
import './index.css';
import GroupsStore from "./store/GroupsStore";
import CourseStore from "./store/CourseStore";
import CoursePageStore from "./store/CoursePageStore"

export const Context = createContext(null);

ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        auth: new AuthStore(),
        groups: new GroupsStore(),
        course: new CourseStore(),
        coursePage: new CoursePageStore(),
    }}>
        <App/>
    </Context.Provider>,
    document.getElementById('root')
);

