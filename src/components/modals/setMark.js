import React, {useContext} from 'react';
import {Context} from "../../index";
import Modal from "react-bootstrap/Modal";
import CustomButton from "../CustomButton/CustomButton";
import AttestationPicker from "../RadioPicker/AttestationPicker";

const SetMark = ({onHide, show, clickFunction}) => {
    const {coursePage} = useContext(Context);

    const afterClickOk = () => {
        clickFunction(coursePage.currentUser, coursePage.mark, coursePage.currentMarkType);
        onHide();
    }

    return (
        <Modal show={show} onHide={onHide} className="modal-lg">
            <Modal.Header closeButton>
                <Modal.Title>Изменение отметки</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div>
                    <AttestationPicker/>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <CustomButton name={'Сохранить'} color={'green'} clickFunc={afterClickOk}/>
                <CustomButton name={'Отмена'} color={'gray'} clickFunc={onHide}/>
            </Modal.Footer>
        </Modal>
    );
};

export default SetMark;