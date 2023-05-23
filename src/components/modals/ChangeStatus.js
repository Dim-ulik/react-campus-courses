import React, {useContext} from 'react';
import Modal from "react-bootstrap/Modal";
import CustomButton from "../CustomButton/CustomButton";
import {Context} from "../../index";
import StatusPicker from "../RadioPicker/StatusPicker";

const ChangeStatus = ({show, onHide, clickFunc}) => {
    const {coursePage} = useContext(Context);

    const afterClickOk = () => {
        clickFunc(coursePage.id, coursePage.editingStatus);
        onHide();
        coursePage.setEditingStatus('');
    }

    return (
        <Modal show={show} onHide={onHide} className="modal-lg">
            <Modal.Header closeButton>
                <Modal.Title>Изменение статуса курса</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <StatusPicker/>
            </Modal.Body>

            <Modal.Footer>
                <CustomButton name={'Изменить'} color={'green'} clickFunc={afterClickOk}/>
                <CustomButton name={'Отмена'} color={'gray'} clickFunc={onHide}/>
            </Modal.Footer>
        </Modal>
    );
};

export default ChangeStatus;