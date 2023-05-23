import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {useNavigate} from "react-router-dom";
import swal from "sweetalert";
import {AUTH_ROUTE} from "../../utils/const";
import {Container} from "react-bootstrap";
import CourseField from "../../components/CourseField/CourseField";
import {getFreePlaces, getSemester, getStatus, getStudyYearsString} from "../../utils/functions/courseList";
import {getMyCourses, getTeachingCourses} from "../../http/coursesAPI";

const Courses = ({type}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const {user} = useContext(Context);
    const navigate = useNavigate();
    const showCourses = async () => {
        try {
            let data;
            if (type === 'teaching') {
                data = await getTeachingCourses();
            }
            else if (type === 'my') {
                data = await getMyCourses();
            }
            user.setListCourses(data);
            setIsLoaded(true);
        } catch (e) {
            await showErrorAlert(e);
        }
    };

    const showErrorAlert = async (e) => {
        const status = e.response.status;
        if (status === 401 || status === 403) {
            swal("Время авторизации истекло!", "Войдите снова!", "error", {
                buttons: false,
            }).then(() => {
                navigate(AUTH_ROUTE);
                user.setIsAuth(false);
            });
        } else {
            await swal("Ошибка!", "Что-то пошло не так :(", "error", {
                buttons: false,
            });
        }
    };

    useEffect(() => {
        showCourses();
    }, []);
    return (
        <div>
            <Container>
                <div className="mt-5">
                    {isLoaded ? (
                        user.listCourses.map((course) => (
                            <CourseField name={course.name} courseId={course.id} key={course.id}
                                         studyYear={getStudyYearsString(course.startYear)}
                                         allPlaces={course.maximumStudentsCount}
                                         freePlaces={getFreePlaces(course.remainingSlotsCount)}
                                         status={getStatus(course.status)}
                                         semester={getSemester(course.semester)}/>
                        ))
                    ) : (
                        <p>Курсы загружаются...</p>
                    )}
                </div>
            </Container>
        </div>
    );
};

export default Courses;