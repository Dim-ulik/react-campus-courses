import React from 'react';
import {Card, Container, Form, NavLink} from "react-bootstrap";
import {Link} from "react-router-dom";
import {AUTH_ROUTE, GROUPS_ROUTE} from "../../utils/const";
import '../../utils/styles/AuthAndRegStyles.css';
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import InputField from "../../components/InputField/InputField";
import {
    useNameState,
    useBirthDateState,
    useEmailState,
    usePasswordState,
    useRegFormErrorState,
    usePasswordRepeatState
} from '../../utils/functions/formValidations';
import {observer} from "mobx-react-lite";
import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {Context} from "../../index";
import {submitFormRegister} from "../../utils/functions/submitForm";
import {getUserInf, getUsersRoles} from "../../utils/functions/user";
import swal from 'sweetalert';

const Registration = observer(() => {
    const {auth, user} = useContext(Context);
    const navigate = useNavigate();

    const nameValidation = useNameState();
    const birthDateValidation = useBirthDateState();
    const passwordRepeatValidation = usePasswordRepeatState()
    const passwordValidation = usePasswordState(
        passwordRepeatValidation.passwordRepeat,
        passwordRepeatValidation.setPasswordRepeatError
    );
    const emailValidation = useEmailState();
    const {hasFormErrors} = useRegFormErrorState(
        nameValidation.nameError,
        birthDateValidation.birthDateError,
        passwordValidation.passwordError,
        passwordRepeatValidation.passwordRepeatError,
        emailValidation.emailError
    );

    const handleSubmit = async () => {
        const result = await submitFormRegister(auth);
        if (result === 1) {
            user.setIsAuth(true);
            await getUsersRoles(user);
            await getUserInf(auth, user);
            swal("Успешно!", "Вы зарегистрированы", "success", {
                buttons: false,
            });
            navigate(GROUPS_ROUTE);
        } else {
            swal("Ошибка!", "Что-то пошло не так :(", "error", {
                buttons: false,
            });
        }
    };

    return (
        <Container>
            <div className="header d-flex justify-content-center">
                Регистрация нового пользователя
            </div>
            <Card className="login-card m-auto mt-4">
                <Form>
                    <div className="mb-3">
                        <InputField label={'ФИО'}
                                    setInputDirty={nameValidation.setNameDirty}
                                    checker={nameValidation.nameChecker}
                                    name={'name'} type={'name'} value={nameValidation.name} controlId={''}
                                    placeHolder={'Введите ФИО'}
                                    isImportant={true}
                                    SetValueInStore={auth.setFullName.bind(auth)}
                        />
                    </div>
                    {(nameValidation.nameDirty && nameValidation.nameError) &&
                        <div className="error-message">
                            {nameValidation.nameError}
                        </div>
                    }
                    <div className="mb-3">
                        <InputField label={'Дата рождения'}
                                    setInputDirty={birthDateValidation.setBirthDateDirty}
                                    checker={birthDateValidation.birthDateChecker}
                                    name={'birthDate'} type={'date'} value={birthDateValidation.birthDate} controlId={'duedate'}
                                    placeHolder={'Введите дату рождения'}
                                    isImportant={true}
                                    SetValueInStore={auth.setBirthDate.bind(auth)}
                        />
                    </div>
                    {(birthDateValidation.birthDateDirty && birthDateValidation.birthDateError) &&
                        <div className="error-message">
                            {birthDateValidation.birthDateError}
                        </div>
                    }
                    <div className="mb-3">
                        <InputField label={'Email'}
                                    setInputDirty={emailValidation.setEmailDirty}
                                    checker={emailValidation.emailChecker}
                                    name={'email'} type={'email'} value={emailValidation.email} controlId={'formBasicEmail'}
                                    placeHolder={'Введите Email'}
                                    isImportant={true}
                                    SetValueInStore={auth.setEmail.bind(auth)}
                        />
                        <Form.Text className="text-muted">
                            Email будет использоваться для входа в систему
                        </Form.Text>
                    </div>
                    {(emailValidation.emailDirty && emailValidation.emailError) &&
                        <div className="error-message">
                            {emailValidation.emailError}
                        </div>
                    }
                    <div className="mb-3">
                        <InputField label={'Пароль'}
                                    setInputDirty={passwordValidation.setPasswordDirty}
                                    checker={passwordValidation.passwordRegChecker}
                                    name={'password'} type={'password'} value={passwordValidation.password} controlId={'formBasicPassword'}
                                    placeHolder={'Введите пароль'}
                                    isImportant={true}
                                    SetValueInStore={auth.setPassword.bind(auth)}
                        />
                    </div>
                    {(passwordValidation.passwordDirty && passwordValidation.passwordError) &&
                        <div className="error-message">
                            {passwordValidation.passwordError}
                        </div>
                    }
                    <div className="mb-3">
                        <InputField label={'Повторите пароль'}
                                    setInputDirty={passwordRepeatValidation.setPasswordRepeatDirty}
                                    checker={passwordRepeatValidation.passwordRepeatChecker}
                                    name={'passwordRepeat'} type={'password'} value={passwordRepeatValidation.passwordRepeat}
                                    controlId={'formBasicPassword'}
                                    placeHolder={'Введите пароль еще раз'}
                                    isImportant={true}
                                    SetValueInStore={auth.setConfirmPassword.bind(auth)}
                        />
                    </div>
                    {(passwordRepeatValidation.passwordRepeatDirty && passwordRepeatValidation.passwordRepeatError) &&
                        <div className="error-message">
                            {passwordRepeatValidation.passwordRepeatError}
                        </div>
                    }
                    <div className="d-flex justify-content-center mt-4">
                        <SubmitButton name={'Зарегистрироваться'} isDisabled={hasFormErrors}
                                      submitEvent={handleSubmit}/>
                    </div>
                    <div className="d-flex justify-content-center if-not-login">
                        Уже есть аккаунт?<NavLink className="ms-2 go-to-link"
                                                  as={Link} to={AUTH_ROUTE}>Войти</NavLink>
                    </div>
                </Form>
            </Card>
        </Container>
    );
});

export default Registration;