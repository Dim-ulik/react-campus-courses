import React, {useContext} from 'react';
import styles from './GroupField.module.css';
import {Col, NavLink, Row} from "react-bootstrap";
import CustomButton from "../CustomButton/CustomButton";
import {Link} from "react-router-dom";
import {GROUPS_ROUTE} from "../../utils/const";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const GroupField = observer(({groupName, groupId, openModal, showGroups, deleteGroup}) => {
    const {user} = useContext(Context);
    const {groups} = useContext(Context);

    const onClickEdit = () => {
        groups.setCurrentGroupName(groupName);
        groups.setCurrentGroupId(groupId);
        openModal(true);
    }

    const onClickDelete = () => {
        deleteGroup(groupId, showGroups);
    }

    return (
        <div>
            <Row>
                <Col className={styles.name} xxl={8} xl={7} lg={6} md={8} xs={12}>
                    <NavLink
                        as={Link} to={GROUPS_ROUTE + '/' + groupId}>{groupName}</NavLink>
                </Col>
                {
                    user.roles.isAdmin ?
                        <Col xxl={4} xl={5} lg={6} md={4} sm={12} xs={12}>
                            <Row className="ms-md-auto">
                                <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                                    <CustomButton name={'Редактировать'} color={'green'} clickFunc={onClickEdit}/>
                                </Col>
                                <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}
                                     className="mt-2 mt-sm-2 mt-md-2 mt-lg-0">
                                    <CustomButton name={'Удалить'} color={'red'} clickFunc={onClickDelete}/>
                                </Col>
                            </Row>
                        </Col>
                        : ''
                }
            </Row>
        </div>
    );
});

export default GroupField;