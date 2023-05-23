import React from 'react';

const GroupHeader = ({groupName}) => {
    return (
        <div className="header">
            Группа - <span className="gray-header">{groupName}</span>
        </div>
    );
};

export default GroupHeader;