import React, {useContext} from 'react';
import styles from './SelectField.module.css';
import {Form} from "react-bootstrap";
import {Context} from "../../index";

const SelectField = ({header, fields, setChoice, isAdding}) => {
    const {coursePage} = useContext(Context);
    return (
        <Form.Group>
            <Form.Label className={styles.label}>{header}</Form.Label>
            <span className={styles.redStar}>*</span>
            <Form.Select aria-label="Default select example" onChange={(e) => setChoice(e.target.value)}>
                {fields && fields.map(field => (
                    (coursePage.addingTeacherId === field.id && isAdding) ?
                        <option value={field.id} key={field.id} selected>{field.fullName}</option>
                        :
                        <option value={field.id} key={field.id}>{field.fullName}</option>
                ))}
            </Form.Select>
        </Form.Group>
    );
};

export default SelectField;