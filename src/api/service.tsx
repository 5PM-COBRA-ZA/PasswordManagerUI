import Logger, {type EventReport, report_event} from "../utilities/logger.ts";
import {PARAMS} from "../constants/query-params.ts";

class Service {
    baseUrl = '/api';//FIXME: read from env

    get_base_url(): string {
        throw new Error('You have to implement the method get_base_url!');
    }

    get_params(){
        return PARAMS;
    }

    basicRequest(
        url: string,
        options: any,
        onSuccess: (response: any) => void,
        onFailed: (response: any) => void,
        setIsLoading: (response: boolean) => void,
        onErrors?: (response: any) => void,
    ){
        const startTime = Date.now()
        const reportData: EventReport = {
            startTime,
            url,
            method: (options?.method || 'GET').toUpperCase(),
            subType: 'fetch',
            type: 'performance',
        }

        setIsLoading(true);
        const uri: string = `${this.baseUrl}${url}`;

        fetch(uri, options)
        .then(async response => {
            reportData.status = response.status;
            reportData.success = response.ok;

            if(onErrors)
                onErrors(new Map());
            //No content, will throw an error while trying to parse
            if(response.status === 204){
                return undefined;
            }

            if(response.ok){
                return response.json();
            }

            //token expired/invalid redirect to login
            if(response.status === 401){
                document.cookie = "cashiers_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT"
                location.replace('/login')
            }

            let message = 'Please try again later.'
            try {
                const response_object = await response.json();
                if(response_object.detail && response_object.detail.messages?.length > 0){
                    message = response_object.detail.messages[0].message;
                }
                if(onErrors && response_object.detail.errors){
                    onErrors(new Map(Object.entries(response_object.detail.errors)))
                }
            }catch (e: any){
                Logger.log('Response is not json, returning default message.', e)
            }

            //if 422 don't show error message only validation messages.
            if(response.status === 422)
                message = '-1';

            throw new Error(message);
        }).then(data => {
            onSuccess(data);
            if(onErrors && data.errors){
                onErrors(new Map(Object.entries(data.errors)))
            }
        }).catch(error => {
            if(error.message != '-1'){
                onFailed([{
                    message: error.message,
                    type: 'error'
                }])
            }
            reportData.status = 0
            reportData.success = false
        }).finally(() => {
            setIsLoading(false);
            reportData.endTime = Date.now()
            reportData.duration = reportData.endTime - reportData.startTime
            report_event(reportData);
        })
    }

    get(
        url: string,
        onSuccess: (response: any) => void,
        onFailed: (response: any) => void,
        setIsLoading: (response: boolean) => void,
    ) {
        this.basicRequest(
            url,
            {
                method: "GET"
            },
            onSuccess,
            onFailed,
            setIsLoading,
            () => {}
        )
    }

    post(
        url: string,
        onSuccess: (response: any) => void,
        onFailed: (response: any) => void,
        setIsLoading: (response: boolean) => void,
        dto: any,
        isRequestJson: boolean,
        onErrors?: (response: any) => void,
    ) {
        const options: any = {
            method: "POST",
            body: isRequestJson ? JSON.stringify(dto) : dto,
            headers: undefined
        };

        if(isRequestJson)
            options.headers = {
                'Content-Type': 'application/json'
            }
        this.basicRequest(
            url,
            options,
            onSuccess,
            onFailed,
            setIsLoading,
            onErrors
        )
    }

    put(
        url: string,
        onSuccess: (response: any) => void,
        onFailed: (response: any) => void,
        setIsLoading: (response: boolean) => void,
        dto: any,
        isRequestJson: boolean,
        onErrors?: (response: any) => void,
    ) {
        this.basicRequest(
            url,
            {
                method: "PUT",
                body: isRequestJson ? JSON.stringify(dto) : dto
            },
            onSuccess,
            onFailed,
            setIsLoading,
            onErrors
        )
    }

    delete(
        url: string,
        onSuccess: (response: any) => void,
        onFailed: (response: any) => void,
        setIsLoading: (response: boolean) => void,
    ) {
        this.basicRequest(
            url,
            {
                method: "DELETE",
            },
            onSuccess,
            onFailed,
            setIsLoading,
            () => {}
        )
    }

    patch(
        url: string,
        onSuccess: (data: object) => any,
        onFailed: (message: object) => any,
        setIsLoading: (isLoading: boolean) => any,
        dto: object,
        isRequestJson: boolean,
        onErrors: (response: any) => void
    ) : void {
        this.basicRequest(
            url,
            {
                method: "PATCH",
                body: isRequestJson ? JSON.stringify(dto) : dto,
                headers: {
                    'Content-Type': 'application/json'
                }
            },
            onSuccess,
            onFailed,
            setIsLoading,
            onErrors
        )
    }
}

export default Service;
