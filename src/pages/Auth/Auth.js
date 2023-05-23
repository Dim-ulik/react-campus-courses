import React, {useContext, useEffect} from 'react';
import '../../utils/styles/AuthAndRegStyles.css';
import {Card, Container, Form, NavLink} from "react-bootstrap";
import {GROUPS_ROUTE, REGISTRATION_ROUTE} from "../../utils/const";
import {Link} from "react-router-dom";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import InputField from "../../components/InputField/InputField";
import {useEmailState, usePasswordState, useLogFormErrorState} from '../../utils/functions/formValidations';
import {Context} from "../../index";
import {submitFormLogin} from "../../utils/functions/submitForm";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {getUserInf, getUsersRoles} from "../../utils/functions/user";

const Auth = observer(() => {
    const {auth, user} = useContext(Context);
    const navigate = useNavigate();

    const passwordValidation = usePasswordState();
    const emailValidation = useEmailState();
    const {hasFormErrors} = useLogFormErrorState(emailValidation.emailError, passwordValidation.passwordError);

    useEffect(() => {
        if (auth.error === true) {
            setTimeout(() => {
                auth.setError(false);
            }, 1000)
        }
    }, [auth.error])

    const handleSubmit = async () => {
        const result = await submitFormLogin(auth);

        if (result === 1) {
            user.setIsAuth(true);
            await getUsersRoles(user);
            await getUserInf(auth, user);
            navigate(GROUPS_ROUTE);
            auth.setError(false);
        } else {
            auth.setError(true);
        }
    };

    return (
        <Container>
            <div className="header d-flex justify-content-center">
                Авторизация
            </div>
            <Card className="login-card m-auto mt-4">
                <Form>
                    <div className="mb-3">
                        <InputField label={'Email'}
                                    setInputDirty={emailValidation.setEmailDirty}
                                    checker={emailValidation.emailChecker}
                                    name={'email'} type={'email'} value={emailValidation.email} controlId={'formBasicEmail'}
                                    placeHolder={'Введите Email'}
                                    isImportant={false}
                                    SetValueInStore={auth.setEmail.bind(auth)}
                        />
                    </div>
                    {(emailValidation.emailDirty && emailValidation.emailError) &&
                        <div className="error-message">
                            {emailValidation.emailError}
                        </div>
                    }
                    <div className="mb-3">
                        <InputField label={'Пароль'}
                                    setInputDirty={passwordValidation.setPasswordDirty}
                                    checker={passwordValidation.passwordLoginChecker}
                                    name={'password'} type={'password'} value={passwordValidation.password} controlId={'formBasicPassword'}
                                    placeHolder={'Введите пароль'}
                                    isImportant={false}
                                    SetValueInStore={auth.setPassword.bind(auth)}
                        />
                    </div>
                    {(passwordValidation.passwordDirty && passwordValidation.passwordError) &&
                        <div className="error-message">
                            {passwordValidation.passwordError}
                        </div>
                    }
                    <div className="d-flex justify-content-center mt-4">
                        <SubmitButton name={'Войти'} isDisabled={hasFormErrors} submitEvent={handleSubmit}/>
                    </div>
                    {auth.error && <div className="form-error">Неверный логин и/или пароль</div>}
                    <div className="d-flex justify-content-center if-not-login">
                        Еще нет аккаунта? <NavLink className="ms-2 go-to-link"
                                                   as={Link} to={REGISTRATION_ROUTE}>Зарегистрируйтесь</NavLink>
                    </div>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;