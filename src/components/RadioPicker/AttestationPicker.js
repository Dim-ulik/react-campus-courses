import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {Form} from "react-bootstrap";
import styles from "./RadioPicker.module.css";

const AttestationPicker = () => {
    const {coursePage} = useContext(Context);
    const [selectedValue, setSelectedValue] = useState(coursePage.currentMark);

    const handleInputChange = (e) => {
        setSelectedValue(e.target.value)
    }

    useEffect(() => {
        coursePage.setMark(selectedValue);
    }, [selectedValue, coursePage])

    return (
        <Form.Group>
            <Form.Label className={styles.label}>Отметка</Form.Label>
            <form className={styles.choiceGroup}>
                <span>
                    <input type="radio" name="picker" value='Passed' id='Passed' checked={selectedValue === 'Passed'}
                           onChange={handleInputChange}/>
                    <label htmlFor='Autumn' className={styles.choice}>Успешно пройдена</label>
                </span>
                <span>
                    <input type="radio" name="picker" value='Failed' id='Failed' checked={selectedValue === 'Failed'}
                           onChange={handleInputChange}/>
                    <label htmlFor='Spring' className={styles.choice}>Провалена</label>
                </span>
            </form>
        </Form.Group>
    );
};

export default AttestationPicker;