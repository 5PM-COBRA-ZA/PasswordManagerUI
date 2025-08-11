interface KeyValue <T>{
    key: string,
    value: T
}

export const addSearchParam = (query_params: URLSearchParams, key: string, value: string | undefined) => {
    if(value){
        query_params.set(key, value);
    }
}

export const create_query_string = (arr: KeyValue<string>[], query_params: string) => {
  const params = new URLSearchParams(query_params);

  for(const param of arr){
    params.set(param.key, param.value)
  }

  return `?${params.toString()}`;
}

export const create_query = (key: string, value: string, query_params: string) => {
    const param = {
        key,
        value
    }

    return create_query_string([param], query_params);
}

export const format_currency = (amount: number) => {
    if(!amount)
        amount = 0;
    const value: string = (Math.round(amount * 100) / 100).toFixed(2);
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export const format_date = (date: Date, include_time: boolean) => {
    const date_string = date.getFullYear() + '-'
    + ('0' + (date.getMonth()+1)).slice(-2) + '-'
    + ('0' + date.getDate()).slice(-2);

    if(!include_time)
        return date_string;

    return  date_string + ' '
    + ('0' + date.getHours()).slice(-2) + ':'
    + ('0' + date.getMinutes()).slice(-2) + ':'
    + ('0' + date.getSeconds()).slice(-2);
}

export const format_time = (time?: string) => {
    if(time?.length != 6)
        return time;
    return `${time.substring(0, 2)}:${time.substring(2, 4)}`
}

export const format_display_date = (start_date: string, start_time: string, end_date: string, end_time: string) => {
    if(start_date?.length != 10)
        return ''

    if(start_time?.length != 6)
        return ''

    let date = `${start_date} ${format_time(start_time)} -`;

    if(end_date?.length != 10)
        return date;

    if(start_date != end_date)
        date = `${date} ${end_date}`;

    if(end_time?.length != 6)
        return date;

    return `${date} ${format_time(end_time)}`
}