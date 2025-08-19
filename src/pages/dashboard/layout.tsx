import {Outlet, useNavigate} from "react-router";

import './layout.css';
import {Menu} from "primereact/menu";
import {Menubar} from "primereact/menubar";
import {type Store, use_store} from "../../store/store.tsx";
import {useContext} from "react";
import {PrimeReactContext} from "primereact/api";
import Logger from "../../utilities/logger.ts";

const Layout = () => {
    const navigate = useNavigate();
    const theme = use_store((state: Store) => state.theme);
    const toggle_theme = use_store((state: Store) => state.toggle_theme);

    const { changeTheme } = useContext(PrimeReactContext);

    const logo_width = '8rem';
    const logo_height = '3rem';

    const ITEMS = [
        {
            template: () => {
                return (
                    <span className="inline-flex align-items-center gap-1 px-2 py-2">
                        <svg width={logo_width} height={logo_height} className={'logo_svg'}>
                            <use width={logo_width} height={logo_height} xlinkHref="/logo.svg#logo_svg"></use>
                        </svg>
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
                    command: () => {
                        navigate('/dashboard/profile/settings');
                    }
                },
                {
                    label: 'Messages',
                    icon: 'pi pi-inbox',
                },
            ]
        },
    ];

    const BOTTOM_ITEMS = [
        {
            label: `${theme == 'dark' ? 'Light' : 'Dark'} mode`,
            icon: 'pi pi-palette',
            command: () => {
                if (changeTheme) {
                    const new_theme = theme == 'light' ? 'dark' : 'light';
                    changeTheme(theme, new_theme, 'theme-link', () => {
                        Logger.log(`theme changed to [${new_theme}]`)
                        toggle_theme()
                    })
                }
            }
        },
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