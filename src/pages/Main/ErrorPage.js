import React from 'react';
import styles from './Main.module.css'
import logo from "../../images/logo.png";

const ErrorPage = () => {
    return (
        <div>
            <div className={styles.bigText}>
                <div>404</div>
                <div>Такой страницы не существует!</div>
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

export default ErrorPage;