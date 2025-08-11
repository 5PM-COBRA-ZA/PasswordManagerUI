import {Outlet, useNavigate} from "react-router";

import logo from '/logo.svg';
import './layout.css';
import {Menu} from "primereact/menu";
import {Menubar} from "primereact/menubar";

const Layout = () => {
    const navigate = useNavigate();

    const ITEMS = [
        {
            template: () => {
                return (
                    <span className="inline-flex align-items-center gap-1 px-2 py-2">
                        <img height={40} src={logo} alt={'JPass Logo'}/>
                    </span>
                );
            }
        },
        {
            separator: true
        },
        {
            label: 'Manage',
            expanded: true,
            items: [
                {
                    label: 'Passwords',
                    icon: 'pi pi-key',
                    command: () => {
                        navigate('/dashboard/passwords');
                    }
                },
                {
                    label: 'Groups',
                    icon: 'pi pi-folder',
                },
            ]
        },
        {
            separator: true
        },
        {
            label: 'Profile',
            items: [
                {
                    label: 'Settings',
                    icon: 'pi pi-cog',
                },
                {
                    label: 'Messages',
                    icon: 'pi pi-inbox',
                },
                {
                    label: 'Subscriptions',
                    icon: 'pi pi-cart-plus',
                },
                {
                    label: 'Billing',
                    icon: 'pi pi-credit-card',
                },
            ]
        },
    ];

    const BOTTOM_ITEMS = [
        {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => navigate('/')
        }
    ]

    return(
        <div className={'flex layout'}>
            {/*Desktop Navigation*/}
            <nav className={'flex-column justify-content-between p-5'}>
                <Menu model={ITEMS} className={'p-0 w-full'} style={{border: 'none'}} />
                <Menu model={BOTTOM_ITEMS} className={'p-0 w-full'} style={{border: 'none'}} />
            </nav>

            {/*Mobile Navigation*/}
            <div className={'mobile-nav'}>
                <Menubar model={[...ITEMS.slice(1), ...BOTTOM_ITEMS]} className={'w-full'} />
            </div>

            {/*children*/}
            <div className={'w-full flex flex-column gap-5'}>
                <div className={'px-5 pt-5 flex flex-column gap-5 flex-1'}>
                    <Outlet/>
                </div>
                <footer className={'p-1 flex justify-content-center'}>
                    <p>© JPass. All rights reserved. Since 2025.</p>
                </footer>
            </div>
        </div>
    );
};

export default Layout;