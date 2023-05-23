import React, {useContext} from 'react';
import {Card, Container, Form} from "react-bootstrap";
import InputField from "../../components/InputField/InputField";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import {
    useNameState, useBirthDateState, useProfileFormErrorState
} from '../../utils/functions/formValidations';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {getUserInf} from "../../utils/functions/user";
import ProfileAvatar from "../../components/ProfileAvatar/ProfileAvatar";
import swal from 'sweetalert';
import {putInf} from "../../http/userAPI";
import {useNavigate} from "react-router-dom";
import {AUTH_ROUTE} from "../../utils/const";

const Profile = observer(() => {
    const {user, auth} = useContext(Context);
    const navigate = useNavigate();

    const nameValidate = useNameState(user.inf.fullName, '');
    const birthDateValidate = useBirthDateState(user.inf.birthDate, '');
    const {hasFormErrors} = useProfileFormErrorState(nameValidate.nameError, birthDateValidate.birthDateError);

    const handleSubmit = async () => {
        try {
            await putInf(nameValidate.name, birthDateValidate.birthDate);
            await getUserInf(auth, user);
            await swal("Успешно!", "Профиль обновлен", "success", {
                buttons: false,
            });
        } catch (e) {
            const status = e.response.status;
            if (status === 403 || status === 401) {
                user.setIsAuth(false);
                navigate(AUTH_ROUTE);
                await swal("Время авторизации истекло", "Войдите заново", "error", {
                    buttons: false,
                });
            }
            else {
                await swal("Ошибка!", "Что-то пошло не так :(", "error", {
                    buttons: false,
                });
            }
        }
    };

    return (
        <div>
            <Container>
                <div className="header d-flex justify-content-center">
                    Профиль пользователя
                </div>
                <Card className="login-card m-auto mt-4">
                    <ProfileAvatar email={user.inf.email}/>
                    <Form>
                        <div className="mb-3">
                            <InputField label={'ФИО'}
                                        setInputDirty={nameValidate.setNameDirty}
                                        checker={nameValidate.nameChecker}
                                        name={'name'} type={'name'} value={nameValidate.name} controlId={''}
                                        placeHolder={'Введите ФИО'}
                                        isImportant={true}
                                        SetValueInStore={auth.setFullName.bind(auth)}
                            />
                        </div>
                        {(nameValidate.nameDirty && nameValidate.nameError) &&
                            <div className="error-message">
                                {nameValidate.nameError}
                            </div>
                        }
                        <div className="mb-3">
                            <InputField label={'Дата рождения'}
                                        setInputDirty={birthDateValidate.setBirthDateDirty}
                                        checker={birthDateValidate.birthDateChecker}
                                        name={'birthDate'} type={'date'} value={birthDateValidate.birthDate}
                                        controlId={'duedate'}
                                        placeHolder={'Введите дату рождения'}
                                        isImportant={true}
                                        SetValueInStore={auth.setBirthDate.bind(auth)}
                            />
                        </div>
                        {(birthDateValidate.birthDateDirty && birthDateValidate.birthDateError) &&
                            <div className="error-message">
                                {birthDateValidate.birthDateError}
                            </div>
                        }
                        {auth.error && <div className="form-error">Ошибка при редактировании данных!</div>}
                        <div className="d-flex justify-content-center mt-4">
                            <SubmitButton name={'Изменить'} isDisabled={hasFormErrors} submitEvent={handleSubmit}/>
                        </div>
                    </Form>
                </Card>
            </Container>
        </div>
    );
});

export default Profile;