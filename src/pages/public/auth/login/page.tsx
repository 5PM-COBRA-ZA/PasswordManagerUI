import viteLogo from '/vite.svg';
import './page.css';
import "primereact/resources/themes/bootstrap4-dark-blue/theme.css";
import "primeflex/primeflex.css";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";

const LoginPage = () => {

    return (
        <div className={'creds-card'}>
            <div className={'creds-logo'}>
                <a href="https://vite.dev" target="_blank">
                    <img height={75} src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
            </div>
            <div>
                <h1>Login</h1>
            </div>
            <div className={'field'}>
                <label>Email</label>
                <InputText
                    className={'w-full'}
                />
            </div>
            <div className={'field'}>
                <label>Password</label>
                <InputText
                    className={'w-full'}
                />
            </div>

            <Button
                label={'Login'}
                className={'w-full'}
            />
        </div>
    )
}

export default LoginPage
