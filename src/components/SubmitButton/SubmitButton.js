import React from 'react';
import {Button} from "react-bootstrap";
import styles from './SubmitButton.module.css';

const SubmitButton = ({name, isDisabled, submitEvent}) => {
    return (
        <Button className={styles.submitButton} type='submit' disabled={isDisabled} onClick={(e) => {
            e.preventDefault();
            submitEvent();
        }}>
            {name}
        </Button>
    );
};

export default SubmitButton;