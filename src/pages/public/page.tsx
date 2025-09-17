import {Link} from "react-router";
import {Menubar} from "primereact/menubar";

import './page.css';
import { Button } from "primereact/button";
import InfoItem from "./components/InfoItem";

const logo_size = 35;

const LandingPage = () => {

    const left_items = (
        <div>
            <div className={'creds-logo py-2'} style={{marginLeft: -100}}>
                <svg height={logo_size} className={'logo_svg'}>
                    <use height={logo_size} xlinkHref="/logo.svg#logo_svg"></use>
                </svg>
            </div>
        </div>
    )

    const right_items = (
        <div className={'flex gap-1'}>
            <Link className={'jp-nav-item'} to={'/auth/login'}>Login</Link>&nbsp;|&nbsp;
            <Link className={'jp-nav-item'} to={'/auth/login'}>Register</Link>
        </div>
    )

    return (
        <div>
            <Menubar 
                pt={{
                    root: {
                        className: 'container'
                    }
                }}
                start={left_items} 
                end={right_items}
            />
            <div className="flex justify-content-center align-items-center jp-h-full">
                <div className="jp-landing-container">
                    <div className="p-5 flex-1 flex flex-column gap-3 align-items-center justify-content-center">
                        <h1>Saving your <span style={{color: 'var(--primary-color)'}}>passwords</span> and your sanity</h1>
                        <p>One app to safely manage all your logins</p>
                        <div className="flex gap-3">
                            <Button label="Sign Up" />
                            <Button outlined label="Login" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="grid m-0">
                    <div className="col-4">
                        <InfoItem 
                            icon={<i className="pi pi-check"></i>}
                            heading={'57%'}
                            description={'57% of people say remembering passwords is a top frustration.'}
                        />
                    </div>
                    <div className="col-4">
                        <InfoItem 
                            icon={<i className="pi pi-check"></i>}
                            heading={'3X'}
                            description={'People using password managers are 3x less likely to reuse passwords.'}
                        />
                    </div>
                    <div className="col-4">
                        <InfoItem 
                            icon={<i className="pi pi-check"></i>}
                            heading={'98%'}
                            description={'98% of cybersecurity experts recommend using a password manager.'}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default LandingPage;