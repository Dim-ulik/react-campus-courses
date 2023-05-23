import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import styles from "./CreateCourse.module.css";
import {Editor} from "react-draft-wysiwyg";
import CustomButton from "../CustomButton/CustomButton";
import {convertToRaw, EditorState, convertFromHTML, ContentState} from "draft-js";
import draftToHtml from "draftjs-to-html";
import {Context} from "../../index";

const CourseEditing = ({show, onHide, clickFunc}) => {
    const {coursePage} = useContext(Context);
    const createEditorState = (value) => {
        const blockFromHtml = convertFromHTML(value);
        const contentState = ContentState.createFromBlockArray(blockFromHtml);
        return EditorState.createWithContent(contentState)
    }
    const [editorRequirementsState, setEditorRequirementsState] = useState(createEditorState(coursePage.editingRequirements));
    const [editorAnnotationsState, setEditorAnnotationsStat] = useState(createEditorState(coursePage.editingAnnotations));
    useEffect(() => {
        coursePage.setEditingAnnotations(draftToHtml(convertToRaw(editorAnnotationsState.getCurrentContent())));
    }, [editorAnnotationsState])
    useEffect(() => {
        coursePage.setEditingRequirements(draftToHtml(convertToRaw(editorRequirementsState.getCurrentContent())));
    }, [editorRequirementsState])

    const afterClickOk = () => {
        clickFunc(coursePage.id, coursePage.editingRequirements, coursePage.editingAnnotations);
        onHide();
    }

    return (
        <Modal show={show} onHide={onHide} className="modal-lg">
            <Modal.Header closeButton>
                <Modal.Title>Редактирование курса</Modal.Title>
            </Modal.Header>

            <Modal.Body>

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
            </Modal.Body>

            <Modal.Footer>
                <CustomButton name={'Создать'} color={'green'} clickFunc={afterClickOk}/>
                <CustomButton name={'Отмена'} color={'gray'} clickFunc={onHide}/>
            </Modal.Footer>
        </Modal>
    );
};

export default CourseEditing;