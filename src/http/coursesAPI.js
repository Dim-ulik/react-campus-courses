import {$authHost} from "./index";

export const createNewCourse = async (id, name, startYear, maximumStudentsCount, semester, requirements, annotations, mainTeacherId) => {
    const {data} = await $authHost.post(`courses/${id}`, {
        name,
        startYear,
        maximumStudentsCount,
        semester,
        requirements,
        annotations,
        mainTeacherId
    });
    return data;
}

export const getMyCourses = async () => {
    const {data} = await $authHost.get('courses/my');
    return data;
}

export const getTeachingCourses = async () => {
    const {data} = await $authHost.get('courses/teaching');
    return data;
}