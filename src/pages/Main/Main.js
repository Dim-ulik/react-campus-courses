import React from 'react';
import styles from './Main.module.css';
import logo from "../../images/logo.png";

const Main = () => {
    return (
        <div>
            <div className={styles.bigText}>
                Добро пожаловать в систему кампусных курсов
            </div>
            <img className={styles.mainPageLogo}
                src={logo}
                width="200"
                height="200"
                alt="React Bootstrap logo"
            />
        </div>
    );
};

export default Main;