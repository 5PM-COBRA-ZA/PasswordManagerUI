interface InfoItemProps {
    icon: any,
    heading: string,
    description: string
}

const InfoItem = (props: InfoItemProps) => {
    return(
        // <div className="flex flex-column gap-3 p-5 card h-full">
        //     <div>
        //         {props.icon}
        //     </div>
        //     <div>
        //         <h2 className="m-0">{props.heading}</h2>
        //     </div>
        //     <div>
        //         <p className="m-0">{props.description}</p>
        //     </div>
        // </div>
        <div className="flex flex-column gap-3 px-5 py-8 card h-full">
            <div>
                <h1 className="m-0" style={{textAlign: 'center', color: 'var(--primary-color)'}}>{props.heading}</h1>
            </div>
            <div>
                <p className="m-0" style={{textAlign: 'center'}}>{props.description}</p>
            </div>
        </div>
    );
}

export default InfoItem;