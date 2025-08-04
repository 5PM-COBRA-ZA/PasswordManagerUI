import {Button} from "primereact/button";
import {useNavigate} from "react-router";


const LandingPage = () => {
    const navigate = useNavigate();

    return(
        <div className={'flex justify-content-evenly'}>
            <Button label={'login'} onClick={()=>{navigate('/auth/login')}} />
        </div>
    );
};

export default LandingPage;