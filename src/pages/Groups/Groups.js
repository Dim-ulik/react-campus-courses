import React, {useContext, useEffect, useState} from 'react';
import {Container, Table} from "react-bootstrap";
import styles from './Groups.module.css'
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import GroupField from "../../components/GroupField/GroupField";
import CustomButton from "../../components/CustomButton/CustomButton";
import {createGroup, deleteGroup, getListOfGroups, updateGroup} from "../../http/groupsAPI";
import CreateGroup from "../../components/modals/CreateGroup";
import swal from "sweetalert";
import EditGroup from "../../components/modals/EditGroup";
import {useNavigate} from "react-router-dom";
import {AUTH_ROUTE} from "../../utils/const";

const Groups = observer(() => {
    const {user, groups} = useContext(Context);
    const navigate = useNavigate();
    const [showCreateGroup, setShowCreateGroup] = useState(false);
    const [showEditGroup, setShowEditGroup] = useState(false);

    const showErrorAlert = async (e) => {
        const status = e.response.status;
        if (status === 401 || status === 403) {
            swal("Время авторизации истекло!", "Войдите снова!", "error", {
                buttons: false,
            }).then(() => {
                navigate(AUTH_ROUTE);
                user.setIsAuth(false);
            });
        }
        else {
            await swal("Ошибка!", "Что-то пошло не так :(", "error", {
                buttons: false,
            });
        }
    }

    const showGroups = async () => {
        try {
            getListOfGroups().then(data => groups.setGroupsList(data));
        } catch (e) {
            await showErrorAlert(e);
        }
    }

    useEffect(() => {
        showGroups();
    }, [])

    const createGroupClick = async (groupName) => {
        try {
            await createGroup(groupName);
            await showGroups();
            await swal("Успешно!", "Группа создана", "success", {
                buttons: false,
            });
        } catch (e) {
            await showErrorAlert(e);
        } finally {
            setShowCreateGroup(false);
        }
    }

    const updateGroupClick = async (id, newName) => {
        try {
            await updateGroup(id, newName);
            await showGroups();
            await swal("Успешно!", "Изменения применены", "success", {
                buttons: false,
            });
        } catch (e) {
            await showErrorAlert(e);
        } finally {
            setShowEditGroup(false);
        }
    }

    const deleteGroupClick = async (groupId, showGroups) => {
        swal({
            title: "Уверены, что хотите удалить группу?",
            text: "Отменить это действие будет невозможно!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                try {
                    await deleteGroup(groupId);
                    showGroups();
                    await swal("Группа удалена успешно!", {
                        icon: "success",
                        buttons: false
                    });
                } catch (e) {
                    await showErrorAlert(e);
                }
            }
        });
    }

    return (
        <div>
            <Container>
                <div className="header">
                    Группы кампусных курсов
                </div>
                {user.roles.isAdmin ?
                    <div className={`${styles.button} align-items-end`}>
                        <CustomButton name={'Создать группу'} color={'green'} clickFunc={setShowCreateGroup}
                                      value={true}/>
                    </div> : ''
                }
                <Table className={styles.table}>
                    {groups.groupsList.map((group) =>
                        <GroupField groupName={group.name} groupId={group.id} openModal={setShowEditGroup} showGroups={showGroups}
                                    key={group.id} deleteGroup={deleteGroupClick}/>
                    )}
                </Table>
            </Container>
            <CreateGroup clickFunc={createGroupClick} show={showCreateGroup} onHide={setShowCreateGroup}/>
            <EditGroup clickFunc={updateGroupClick}  show={showEditGroup} onHide={setShowEditGroup} groups={groups}/>
        </div>
    );
});

export default Groups;