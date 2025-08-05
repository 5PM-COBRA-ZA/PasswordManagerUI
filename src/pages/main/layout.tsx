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
            items: [
                {
                    label: 'Passwords',
                    icon: 'pi pi-key',
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
        <div className={'flex layout'} style={{height: '100%'}}>
            {/*Desktop Navigation*/}
            <nav className={'flex-column justify-content-between p-5'}>
                <Menu model={ITEMS} className={'p-0 w-full'} style={{border: 'none'}} />
                <Menu model={BOTTOM_ITEMS} className={'p-0 w-full'} style={{border: 'none'}} />
            </nav>

            {/*Mobile Navigation*/}
            <div className={'mobile-nav'}>
                <Menubar model={[...ITEMS, ...BOTTOM_ITEMS]} className={'w-full'} />
            </div>

            {/*children*/}

            <div className={'p-5'}>
                <Outlet/>
            </div>
        </div>
    );
};

export default Layout;