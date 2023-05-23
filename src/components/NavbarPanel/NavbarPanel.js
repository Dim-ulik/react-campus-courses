import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../images/logo.png';
import React, {useContext} from 'react';
import {Context} from "../../index";
import {
    AUTH_ROUTE, COURSES_ROUTE,
    GROUPS_ROUTE,
    MAIN_ROUTE,
    PROFILE_ROUTE,
    REGISTRATION_ROUTE
} from "../../utils/const";
import {observer} from "mobx-react-lite";
import styles from './NavbarPanel.module.css'
import {Link, useNavigate} from "react-router-dom";

const NavbarPanel = observer(({exit}) => {
    const {user} = useContext(Context);
    const navigate = useNavigate();
    return (
        <Navbar bg="light" expand="lg" className="ps-3 pe-3">
            <Navbar.Brand as={Link} to={MAIN_ROUTE}>
                <img
                    src={logo}
                    width="35"
                    height="35"
                    className="d-inline-block align-top"
                    alt="Logo"
                />
                <span className={`${styles.brand} ps-3`}>Кампусные курсы</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                {user.isAuth ?
                    <>
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to={GROUPS_ROUTE}>Группы курсов</Nav.Link>
                            {user.roles.isStudent ? <Nav.Link as={Link} to={COURSES_ROUTE + '/my'}>Мои курсы</Nav.Link> : ''}
                            {user.roles.isTeacher ? <Nav.Link as={Link} to={COURSES_ROUTE + '/teaching'}>Преподаваемые курсы</Nav.Link> : ''}
                        </Nav>
                        <Nav className="ms-auto">
                            <Nav.Link as={Link} to={PROFILE_ROUTE}>{user.inf.email}</Nav.Link>
                            <Nav.Link onClick={() => {
                                exit();
                                navigate(AUTH_ROUTE);
                            }}>Выйти</Nav.Link>
                        </Nav>
                    </>
                    :
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to={REGISTRATION_ROUTE}>Регистрация</Nav.Link>
                        <Nav.Link as={Link} to={AUTH_ROUTE}>Вход</Nav.Link>
                    </Nav>
                }
            </Navbar.Collapse>
        </Navbar>
    );
});

export default NavbarPanel;