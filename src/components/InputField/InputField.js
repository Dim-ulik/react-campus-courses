import React from 'react';
import {Form} from "react-bootstrap";
import styles from "./InputField.module.css";

const InputField = ({label, setInputDirty, checker, name, type, value, controlId, placeHolder, isImportant, SetValueInStore}) => {
    return (
        <Form.Group controlId={controlId} >
            <Form.Label className={styles.label}>{label}</Form.Label> {isImportant &&
            <span className={styles.redStar}>*</span>}
            <Form.Control onBlur={(e) => setInputDirty(true)}
                          className={styles.inputField}
                          type={type}
                          name={name}
                          placeholder={placeHolder}
                          value={value}
                          onChange={(e) => {
                              checker(e);
                              SetValueInStore(e.target.value);
                          }}
                          />
        </Form.Group>
    );
};

export default InputField;