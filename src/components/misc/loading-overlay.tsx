import { ProgressSpinner } from 'primereact/progressspinner';
import './loading-overlay.css';

const LoadingOverlay = () => {
    return(
        <div className={'jp-loading-overlay'}>
            <ProgressSpinner
                className={'jp-loading-overlay-spinner'}
                strokeWidth="4"
                animationDuration="2s"
            />
        </div>
    );
};


export default LoadingOverlay;
