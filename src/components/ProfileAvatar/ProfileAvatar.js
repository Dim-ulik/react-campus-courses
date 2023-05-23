import React from 'react';
import styles from "./ProfileAvatar.module.css";
import avatar from "../../images/avatar.png";

const ProfileAvatar = ({email}) => {
    return (
        <>
            <img
                className={styles.avatar}
                src={avatar}
                width="200"
                height="200"
                alt="Avatar"
            />
            <div className={styles.email}>
                {email}
            </div>
        </>
    );
};

export default ProfileAvatar;