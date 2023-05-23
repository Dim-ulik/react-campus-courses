import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {Container} from "react-bootstrap";
import CourseMainInf from "../../components/CourseMainInf/CourseMainInf";
import InformationCourseCard from "../../components/InformationCourseCard/InformationCourseCard";
import swal from "sweetalert";
import {AUTH_ROUTE, COURSES_ROUTE, GROUPS_ROUTE} from "../../utils/const";
import {useNavigate} from "react-router-dom";
import {
    addNotification,
    addTeacher,
    deleteCourse, editMark, editStudentStatus,
    getCourseInf,
    putCourseInf,
    setCourseStatus, signUpToCourse
} from "../../http/coursePageAPI";
import ErrorPage from "../Main/ErrorPage";
import CourseEditing from "../../components/modals/CourseEditing";
import ChangeStatus from "../../components/modals/ChangeStatus";
import {observer} from "mobx-react-lite";
import CreateNotification from "../../components/modals/CreateNotification";
import UsersBlockCard from "../../components/UsersBlockCard/UsersBlockCard";
import AddTeacher from "../../components/modals/AddTeacher";
import {getUsersList} from "../../http/userAPI";
import SetMark from "../../components/modals/setMark";
import {getMyCourses} from "../../http/coursesAPI";

const Course = observer(() => {
    const {coursePage} = useContext(Context);

    const [isExist, setIsExist] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    const {user} = useContext(Context);
    const navigate = useNavigate();
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isStatusChangeOpen, setIsStatusChangeOpen] = useState(false);
    const [isCreateNotificationOpen, setIsCreateNotificationOpen] = useState(false);
    const [isAddTeacherOpen, setIsAddTeacherOpen] = useState(false);
    const [isSetMarkOpen, setIsSetMarkOpen] = useState(false);
    const courseId = window.location.pathname.split('/')[2];
    const [isCourseTeacher, setIsCourseTeacher] = useState(false);
    const [isCourseStudentAccepted, setIsCourseStudentAccepted] = useState(false);
    const [isCourseStudentDeclined, setIsCourseStudentDeclined] = useState(false);
    const [isCourseStudentQueue, setIsCourseStudentQueue] = useState(false);
    const [isCourseMainTeacher, setIsCourseMainTeacher] = useState(false);

    const setCurrentRoles = (data, myCourses) => {
        data.students.forEach((student) => {
            if (student.email === user.inf.email) {
                switch (student.status) {
                    case 'Accepted':
                        setIsCourseStudentAccepted(true);
                        break;
                    case 'Declined':
                        setIsCourseStudentDeclined(true);
                        break;
                    case 'InQueue':
                        setIsCourseStudentQueue(true);
                        break;
                }
                return 1;
            }
        });
        data.teachers.forEach((teacher) => {
            if (teacher.email === user.inf.email) {
                setIsCourseTeacher(true);
                if (teacher.isMain) {
                    setIsCourseMainTeacher(true);
                }
                return 1;
            }
        });
        myCourses.forEach((course) => {
            if (course.id === coursePage.id) {
                setIsCourseStudentQueue(true);
                return 1;
            }
        });
    }

    const showErrorAlert = async (e) => {
        if (e === 'NoStatus') {
            await swal("Поле статуса пустое", "Выберите нужный статус!", "error", {
                buttons: false,
            });
            return;
        }
        if (e === 'NoText') {
            await swal("Поле уведомления пустое", "Введите текст!", "error", {
                buttons: false,
            });
            return;
        }
        if (e === 'TeacherAddingError') {
            await swal("Данного пользователя нельзя назначить преподавателем", "Он уже преподаватель/студент этого курса", "error", {
                buttons: false,
            });
            return;
        }
        if (e === 'StudentStatusError') {
            await swal("Произошла ошибка", "Невозможно изменить статус пользователя", "error", {
                buttons: false,
            });
            return;
        }
        if (e === 'MarkError') {
            await swal("Произошла ошибка", "Невозможно поставить эту оценку", "error", {
                buttons: false,
            });
            return;
        }
        if (e === 'SignUpError') {
            await swal("Произошла ошибка", "Невозможно записаться на этот курс", "error", {
                buttons: false,
            });
            return;
        }
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
        } else if (status === 400) {
            await swal("Нарушен порядок смены статуса!", "Вы не можете поставить этот статус", "error", {
                buttons: false,
            });
        } else {
            await swal("Ошибка!", "Что-то пошло не так :(", "error", {
                buttons: false,
            });
        }
    };

    const setCourseInf = async () => {
        try {
            const data = await getCourseInf(courseId);
            const myCourses = await getMyCourses();
            coursePage.setAllData(data);
            setCurrentRoles(data, myCourses);
            setIsLoaded(true);
        } catch (e) {
            await showErrorAlert(e);
        }
    }

    useEffect(() => {
        setCourseInf()
    }, []);
    if (!isExist) {
        return <ErrorPage/>
    }

    const editCourseClick = async (id, requirements, annotations) => {
        try {
            await putCourseInf(id, requirements, annotations);
            await setCourseInf();
            await swal("Успешно!", "Изменения применены", "success", {
                buttons: false,
            });
        } catch (e) {
            await showErrorAlert(e);
        } finally {
            setIsEditOpen(false);
        }
    }

    const deleteCourseClick = async (courseId) => {
        swal({
            title: "Уверены, что хотите удалить курс?",
            text: "Отменить это действие будет невозможно!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                try {
                    await deleteCourse(courseId);
                    await swal("Курс удален успешно!", {
                        icon: "success",
                        buttons: false
                    });
                    navigate(GROUPS_ROUTE);
                } catch (e) {
                    await showErrorAlert(e);
                }
            }
        });
    }

    const changeStatusClick = async (id, status) => {
        if (status === '') {
            const e = 'NoStatus';
            await showErrorAlert(e);
        } else {
            try {
                await setCourseStatus(id, status);
                await setCourseInf();
                await swal("Успешно!", "Изменения применены", "success", {
                    buttons: false,
                });
            } catch (e) {
                await showErrorAlert(e);
            } finally {
                setIsStatusChangeOpen(false);
            }
        }
    }

    const createNotificationClick = async (id, text, isImportant) => {
        if (text === '') {
            const e = 'NoText';
            await showErrorAlert(e);
        } else {
            try {
                await addNotification(id, text, isImportant);
                await setCourseInf();
                await swal("Успешно!", "Уведомление создано", "success", {
                    buttons: false,
                });
            } catch (e) {
                await showErrorAlert(e);
            } finally {
                setIsCreateNotificationOpen(false);
            }
        }
    }

    const addTeacherClick = async (id, userId) => {
        try {
            await addTeacher(id, userId);
            await setCourseInf();
            await swal("Успешно!", "Преподаватель добавлен", "success", {
                buttons: false,
            });
        } catch (e) {
            if (e.response.status === 400) {
                await showErrorAlert('TeacherAddingError');
            }
        } finally {
            setIsAddTeacherOpen(false);
        }
    }

    const changeStudentStatusClick = async (userId, status) => {
        try {
            await  editStudentStatus(coursePage.id, userId, status);
            await setCourseInf();
            await swal("Успешно!", "Статус студента изменен", "success", {
                buttons: false,
            });
        } catch (e) {
            if (e.response.status === 400) {
                await showErrorAlert('StudentStatusError');
            }
        }
    }

    const changeMarkClick = async (userId, mark, markType) => {
        try {
            await editMark(coursePage.id, userId, markType, mark)
            await setCourseInf();
            await swal("Успешно!", "Оценка поставлена", "success", {
                buttons: false,
            });
        } catch (e) {
            if (e.response.status === 400) {
                await showErrorAlert('MarkError');
            }
        }
    }

    const signUpClick = async () => {
        try {
            await signUpToCourse(coursePage.id)
            await setCourseInf();
            await swal("Успешно!", "Вы записаны на курс!", "success", {
                buttons: false,
            });
        } catch (e) {
            if (e.response.status === 400) {
                await showErrorAlert('SignUpError');
            }
        }
    }

    const setUsers = async () => {
        try {
            getUsersList().then(data => coursePage.setUsersList(data));
        } catch (e) {
            await showErrorAlert(e);
        }
    }

    useEffect(() => {
        setUsers();
    }, [])

    return (
        <div>
            {isLoaded ?
                <Container>
                    <div className="header">
                        {coursePage.courseName}
                    </div>
                    <div className='mt-3'>
                        <CourseMainInf showModalEditing={setIsEditOpen} showModalStatus={setIsStatusChangeOpen}
                                       isCourseTeacher={isCourseTeacher} deleteCourseClick={deleteCourseClick} isStudent={(isCourseStudentAccepted || isCourseStudentDeclined || isCourseStudentQueue)} signUpClick={signUpClick}/>
                    </div>
                    <div className='mt-3'>
                        <InformationCourseCard openModal={setIsCreateNotificationOpen} isTeacher={isCourseTeacher}/>
                    </div>
                    <div className='mt-3'>
                        <UsersBlockCard isMainTeacher={isCourseMainTeacher} openModal={setIsAddTeacherOpen} isTeacher={isCourseTeacher} changeStudentStatus={changeStudentStatusClick} openMark={setIsSetMarkOpen} />
                    </div>
                    <CourseEditing show={isEditOpen} onHide={setIsEditOpen} clickFunc={editCourseClick}/>
                    <ChangeStatus show={isStatusChangeOpen} onHide={setIsStatusChangeOpen}
                                  clickFunc={changeStatusClick}/>
                    <CreateNotification show={isCreateNotificationOpen} onHide={setIsCreateNotificationOpen}
                                        clickFunc={createNotificationClick}/>
                    <AddTeacher show={isAddTeacherOpen} onHide={setIsAddTeacherOpen} clickFunction={addTeacherClick}/>
                    <SetMark show={isSetMarkOpen} onHide={setIsSetMarkOpen} clickFunction={changeMarkClick}/>
                </Container>
                : 'Загрузка курса...'
            }
        </div>
    );
});

export default Course;