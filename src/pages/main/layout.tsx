import {Outlet} from "react-router";

const Layout = () => {
    return(
        <div>
            <div>Navbar</div>

            {/*children*/}
            <Outlet />
        </div>
    );
};

export default Layout;