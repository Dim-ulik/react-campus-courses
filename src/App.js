import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavbarPanel from "./components/NavbarPanel/NavbarPanel";
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {checkAuth} from "./utils/functions/user";
import {Spinner} from "react-bootstrap";
import {logout} from "./http/userAPI";
import swal from "sweetalert";

const App = () => {
    const {user} = useContext(Context);
    const {auth} = useContext(Context);
    const [loading, setLoading] = useState(true);
    const exit = async () => {
        user.setIsAuth(false);
        await logout();
        localStorage.setItem('token', '');
    }

    useEffect(() => {
        checkAuth(auth, user).then((response) => {
            if (response === 'Auth') {
                user.setIsAuth(true);
            } else {
                user.setIsAuth(false);
                localStorage.removeItem('token');
                if (response === 'Expired') {
                    swal("Время авторизации истекло", "Войдите заново", "error", {
                        buttons: false,
                    });
                }
            }
        }).finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <Spinner className="spinner" animation={"grow"}/>
    }

    return (
        <BrowserRouter>
            <NavbarPanel exit={exit}/>
            <AppRouter/>
        </BrowserRouter>
    );

}

export default App;
