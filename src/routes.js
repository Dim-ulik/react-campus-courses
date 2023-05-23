import Main from './pages/Main/Main';
import Auth from './pages/Auth/Auth';
import Registration from './pages/Registration/Registration';
import Profile from "./pages/Profile/Profile";
import Groups from "./pages/Groups/Groups";
import GroupCourses from "./pages/Courses/GroupCourses";
import Course from "./pages/Course/Course";
import MyCourses from "./pages/Courses/MyCourses";
import TeachingCourses from "./pages/Courses/TeachingCourses";

import {
    MAIN_ROUTE,
    AUTH_ROUTE,
    REGISTRATION_ROUTE,
    PROFILE_ROUTE,
    GROUPS_ROUTE,
    COURSES_ROUTE
} from "./utils/const";

export const authRoutes = [
    {
        path: PROFILE_ROUTE,
        Component: <Profile/>
    },
    {
        path: GROUPS_ROUTE,
        Component: <Groups/>
    },
    {
        path: GROUPS_ROUTE + '/:id',
        Component: <GroupCourses/>
    },
    {
        path: COURSES_ROUTE + '/my',
        Component: <MyCourses/>
    },
    {
        path: COURSES_ROUTE + '/teaching',
        Component: <TeachingCourses/>
    },
    {
        path: COURSES_ROUTE + '/:id',
        Component: <Course/>
    }
]

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: <Main/>
    },
    {
        path: AUTH_ROUTE,
        Component: <Auth/>
    },
    {
        path: REGISTRATION_ROUTE,
        Component: <Registration/>
    },
]