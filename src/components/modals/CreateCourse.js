import React, {useContext, useEffect, useState} from 'react';
import styles from './CreateCourse.module.css';
import {observer} from "mobx-react-lite";
import Modal from "react-bootstrap/Modal";
import CustomButton from "../CustomButton/CustomButton";
import CreateCourseForm from "../CreateCourseForm/CreateCourseForm";
import {useCreatingFormState, useNameState, usePlacesState, useYearState} from "../../utils/functions/courseValidation";
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html'
import SelectField from "../SelectField/SelectField";
import {getUsersList} from "../../http/userAPI";
import {Context} from "../../index";
import swal from "sweetalert";
import {AUTH_ROUTE} from "../../utils/const";
import {useNavigate} from "react-router-dom";

const CreateCourse = observer(({clickFunc, show, onHide, header, groupId}) => {
    const nameValidation = useNameState();
    const yearValidation = useYearState();
    const placesValidation = usePlacesState();
    const {course} = useContext(Context);
    const {hasFormErrors} = useCreatingFormState(nameValidation.nameError, yearValidation.yearError, placesValidation.placesError);
    const navigate = useNavigate();
    const {user} = useContext(Context);
    const [editorRequirementsState, setEditorRequirementsState] = useState(EditorState.createEmpty());
    const [editorAnnotationsState, setEditorAnnotationsStat] = useState(EditorState.createEmpty());

    const showErrorAlert = async (e) => {
        const status = e.response.status;
        if (status === 401 || status === 403) {
            swal("Время авторизации истекло!", "Войдите снова!", "error", {
                buttons: false,
            }).then(() => {
                navigate(AUTH_ROUTE);
                user.setIsAuth(false);
            });
        }
        else {
            await swal("Ошибка!", "Что-то пошло не так :(", "error", {
                buttons: false,
            });
        }
    }

    const afterClickOk = () => {
        clickFunc(
            groupId,
            course.creatingCourseName,
            course.creatingCourseYear,
            course.creatingCoursePlaces,
            course.creatingCourseSemester,
            course.creatingCourseRequirements,
            course.creatingCourseAnnotations,
            course.creatingCourseTeacherId
        );
        onHide();
        nameValidation.setClear();
        yearValidation.setClear();
        placesValidation.setClear();
    }

    const setUsers = async () => {
        try {
            getUsersList().then(data => course.setUsersList(data));
        } catch (e) {
            await showErrorAlert(e);
        }
    }

    useEffect(() => {
        setUsers();
    }, [])

    useEffect(() => {
        course.setCreatingCourseAnnotations(draftToHtml(convertToRaw(editorAnnotationsState.getCurrentContent())));
    }, [editorAnnotationsState])
    useEffect(() => {
        course.setCreatingCourseRequirements(draftToHtml(convertToRaw(editorRequirementsState.getCurrentContent())));
    }, [editorRequirementsState])

    return (
        <Modal show={show} onHide={onHide} className="modal-lg">
            <Modal.Header closeButton>
                <Modal.Title>{header}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <CreateCourseForm nameValidation={nameValidation} yearValidation={yearValidation} placesValidation={placesValidation}/>
                <div className={styles.label}>Требования</div>
                <div className = {styles.editor}>
                    <Editor
                        editorState={editorRequirementsState}
                        onEditorStateChange={setEditorRequirementsState}
                    />
                </div>
                <div className={styles.label}>Аннотации</div>
                <div className = {styles.editor}>
                    <Editor
                        editorState={editorAnnotationsState}
                        onEditorStateChange={setEditorAnnotationsStat}
                    />
                </div>
                <div className="mb-3">
                    <SelectField header={'Преподаватель'} fields={course.usersList} setChoice={course.setCreatingCourseTeacherId.bind(course)} isAdding={false}/>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <CustomButton name={'Создать'} color={'green'} clickFunc={afterClickOk} isDisabled={hasFormErrors}/>
                <CustomButton name={'Отмена'} color={'gray'} clickFunc={onHide}/>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateCourse;