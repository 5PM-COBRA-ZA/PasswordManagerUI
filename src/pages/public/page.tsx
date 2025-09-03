import {Link} from "react-router";
import {Menubar} from "primereact/menubar";

import './page.css';


const LandingPage = () => {

    const left_items = [
        {
            label: 'Home',
            icon: 'pi pi-home'
        },
        {
            label: 'Features',
            icon: 'pi pi-star'
        },
        {
            label: 'Contact',
            icon: 'pi pi-envelope'
        }
    ];

    const right_items = (
        <div className={'flex gap-1'}>
            <Link className={'jp-nav-item'} to={'/auth/login'}>Login</Link>&nbsp;|&nbsp;
            <Link className={'jp-nav-item'} to={'/auth/login'}>Register</Link>
        </div>
    )

    return (
        <div>
            <Menubar model={left_items} end={right_items}/>
            <div>
                <h1 className={'text-center'}>Landing Page Coming Soon...</h1>
            </div>
        </div>
    )
};

export default LandingPage;