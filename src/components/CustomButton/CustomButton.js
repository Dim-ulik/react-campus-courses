import React from 'react';
import {Button} from "react-bootstrap";
import styles from './CustomButton.module.css';

const CustomButton = ({name, color, clickFunc, value = null, isDisabled = false}) => {
    let stylesString = `${styles.customButton}`;
    if (color === 'green') {
        stylesString += ` ${styles.green}`;
    }
    else if (color === 'red') {
        stylesString += ` ${styles.red}`;
    }
    else if (color === 'gray') {
        stylesString += ` ${styles.gray}`;
    }
    else if (color === 'yellow') {
        stylesString += ` ${styles.yellow}`;
    }


    return (
        <Button className={stylesString} type="submit" onClick={() => clickFunc(value)} disabled={isDisabled}>
            {name}
        </Button>
    );
};

export default CustomButton;