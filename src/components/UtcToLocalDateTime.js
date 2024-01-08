const UtcToLocalDateTime = (props) => {

    const convertUTCDateToLocalDate = (datetime) => {
        let date = new Date(datetime);
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        return date;
    };

    const render = () => {
        return convertUTCDateToLocalDate(props.datetime).toString();
    };

    return (
        <span>{render()}</span>
    );
};

export default UtcToLocalDateTime;

export const convertUTCDateToLocalDate = (datetime) => {
    let date = new Date(datetime);
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date;
};