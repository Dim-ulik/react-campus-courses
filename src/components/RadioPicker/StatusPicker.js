import React, {useContext, useEffect, useState} from 'react';
import styles from './RadioPicker.module.css';
import {Context} from "../../index";

const StatusPicker = () => {
    const {coursePage} = useContext(Context);
    const [selectedValue, setSelectedValue] = useState(coursePage.rawStatus);

    const handleInputChange = (e) => {
        setSelectedValue(e.target.value)
    }

    useEffect(() => {
        coursePage.setEditingStatus(selectedValue);
    }, [selectedValue, coursePage])
    return (
        <form className={styles.choiceGroup}>
                <span>
                    <input type="radio" name="picker" value='OpenForAssigning' id='OpenForAssigning' checked={selectedValue === 'OpenForAssigning'}
                           onChange={handleInputChange}/>
                    <label htmlFor='OpenForAssigning' className={styles.choice}>Открыт для записи</label>
                </span>
            <span>
                    <input type="radio" name="picker" value='Started' id='Started' checked={selectedValue === 'Started'}
                           onChange={handleInputChange}/>
                    <label htmlFor='Started' className={styles.choice}>В процессе</label>
                </span>
            <span>
                    <input type="radio" name="picker" value='Finished' id='Finished' checked={selectedValue === 'Finished'}
                           onChange={handleInputChange}/>
                    <label htmlFor='Finished' className={styles.choice}>Закрыт</label>
                </span>
        </form>
    );
};

export default StatusPicker;