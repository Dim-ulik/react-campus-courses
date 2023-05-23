import React, {useContext, useState} from 'react';
import {getListCourses, getListOfGroups} from "../../http/groupsAPI";
import {useEffect} from "react";
import {Context} from "../../index";
import swal from "sweetalert";
import {AUTH_ROUTE} from "../../utils/const";
import {useNavigate} from "react-router-dom";
import ErrorPage from "../Main/ErrorPage";
import GroupHeader from "../../components/GroupHeader";
import {Container} from "react-bootstrap";
import CourseField from "../../components/CourseField/CourseField";
import {getFreePlaces, getSemester, getStatus, getStudyYearsString} from "../../utils/functions/courseList";
import CustomButton from "../../components/CustomButton/CustomButton";
import CreateCourse from "../../components/modals/CreateCourse";
import {createNewCourse} from "../../http/coursesAPI";

const GroupCourses = () => {
    const {groups, user} = useContext(Context);
    const [isExist, setIsExist] = useState(true);
    const [groupName, setGroupName] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [showCreatingModal, setShowCreatingModal] = useState(false);
    const navigate = useNavigate();
    const groupId = window.location.pathname.split('/')[2];

    const getGroupName = async () => {
        const response = await getListOfGroups();
        for (let i = 0; i < response.length; i++) {
            if (response[i].id === groupId) {
                return response[i].name;
            }
        }
    };

    const showCourses = async () => {
        try {
            const data = await getListCourses(groupId);
            groups.setCurrentGroupCourses(data);
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
        } else if (status === 404) {
            setIsExist(false);
        } else {
            await swal("Ошибка!", "Что-то пошло не так :(", "error", {
                buttons: false,
            });
        }
    };

    useEffect(() => {
        getGroupName().then((name) => setGroupName(name));
        showCourses();
    }, []);

    const createCourseClick = async (groupId, name, year, places, semester, requirements, annotations, teacherId) => {
        try {
            await createNewCourse(groupId, name, year, places, semester, requirements, annotations, teacherId);
            await showCourses();
            await swal("Успешно!", "Курс создан", "success", {
                buttons: false,
            });
        } catch (e) {
            await showErrorAlert(e);
        } finally {
            setShowCreatingModal(false);
        }
    }

    if (!isExist) {
        return <ErrorPage/>;
    }

    return (
        <div>
            <Container>
                <GroupHeader groupName={groupName}/>
                {user.roles.isAdmin ?
                    <div className={`mt-2`}>
                        <CustomButton name={'Создать курс'} color={'green'} clickFunc={setShowCreatingModal}
                                      value={true}/>
                    </div> : ''
                }
                <div className="mt-5">
                    {isLoaded ? (
                        groups.currentGroupCourses.map((course) => (
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
            <CreateCourse show={showCreatingModal} onHide={setShowCreatingModal} header={'Создание курса'}
                          clickFunc={createCourseClick} groupId={groupId}/>
        </div>
    );
};

export default GroupCourses;