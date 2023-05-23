import React, {useContext, useEffect, useState} from 'react';
import styles from './RadioPicker.module.css';
import {Form} from "react-bootstrap";
import {Context} from "../../index";

const SemesterPicker = () => {
    const {course} = useContext(Context);
    const [selectedValue, setSelectedValue] = useState('Spring');

    const handleInputChange = (e) => {
        setSelectedValue(e.target.value)
    }

    useEffect(() => {
        course.setCreatingCourseSemester(selectedValue);
    }, [selectedValue, course])

    return (
        <Form.Group>
            <Form.Label className={styles.label}>Семестр</Form.Label>
            <span className={styles.redStar}>*</span>
            <form className={styles.choiceGroup}>
                <span>
                    <input type="radio" name="picker" value='Autumn' id='Autumn' checked={selectedValue === 'Autumn'}
                           onChange={handleInputChange}/>
                    <label htmlFor='Autumn' className={styles.choice}>Осенний</label>
                </span>
                <span>
                    <input type="radio" name="picker" value='Spring' id='Spring' checked={selectedValue === 'Spring'}
                           onChange={handleInputChange}/>
                    <label htmlFor='Spring' className={styles.choice}>Весенний</label>
                </span>
            </form>
        </Form.Group>
    );
};

export default SemesterPicker;