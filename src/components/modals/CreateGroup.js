import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import CustomButton from "../CustomButton/CustomButton";
import {observer} from "mobx-react-lite";
import './createAndEditGroup.css'

const CreateGroup = observer(({clickFunc, show, onHide}) => {
    const [name, setName] = useState('');

    const afterClickOk = () => {
        clickFunc(name);
        onHide();
        setName('');
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Создать новую группу</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <input className='editNameGroupInput' value={name} onChange={(e) => {
                    setName(e.target.value);
                }}/>
            </Modal.Body>

            <Modal.Footer>
                <CustomButton name={'Создать'} color={'green'} clickFunc={afterClickOk}/>
                <CustomButton name={'Отмена'} color={'gray'} clickFunc={onHide}/>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateGroup;