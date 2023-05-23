import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import Modal from "react-bootstrap/Modal";
import CustomButton from "../CustomButton/CustomButton";

const EditGroup = observer(({clickFunc, show, onHide}) => {
    const {groups} = useContext(Context);
    const [name, setName] = useState(groups.currentGroupName);
    useEffect(() => {
        setName(groups.currentGroupName)
    }, [groups.currentGroupName])

    const afterClickOk = () => {
        clickFunc(groups.currentGroupId, name);
        setName('');
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Изменить имя группы</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <input className='editNameGroupInput' value={name} onChange={(e) => {
                    setName(e.target.value);
                }}/>
            </Modal.Body>

            <Modal.Footer>
                <CustomButton name={'Редактировать'} color={'green'} clickFunc={afterClickOk}/>
                <CustomButton name={'Отмена'} color={'gray'} clickFunc={onHide}/>
            </Modal.Footer>
        </Modal>
    );
});

export default EditGroup;