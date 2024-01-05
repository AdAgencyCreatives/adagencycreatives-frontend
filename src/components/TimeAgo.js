const TimeAgo = (props) => {

    const getTimeAgo = () => {
        let oldTime = convertUTCDateToLocalDate(props.datetime ? new Date(props.datetime) : new Date());
        let newTime = new Date();

        let timeCalc = parseInt((newTime - oldTime) / 1000);
        if (timeCalc >= (60 * 60 * 24 * 30 * 12 * 2)) {
            timeCalc = parseInt(timeCalc / 60 / 60 / 24 / 30 / 12) + " years ago";
        } else if (timeCalc >= (60 * 60 * 24 * 30 * 12)) {
            timeCalc = parseInt(timeCalc / 60 / 60 / 24 / 30 / 12) + " year ago";
        } else if (timeCalc >= (60 * 60 * 24 * 30 * 2)) {
            timeCalc = parseInt(timeCalc / 60 / 60 / 24 / 30) + " months ago";
        } else if (timeCalc >= (60 * 60 * 24 * 30)) {
            timeCalc = parseInt(timeCalc / 60 / 60 / 24 / 30) + " month ago";
        } else if (timeCalc >= (60 * 60 * 24 * 2)) {
            timeCalc = parseInt(timeCalc / 60 / 60 / 24) + " days ago";
        } else if (timeCalc >= (60 * 60 * 24)) {
            timeCalc = " Yesterday";
        } else if (timeCalc >= (60 * 60 * 2)) {
            timeCalc = parseInt(timeCalc / 60 / 60) + " hours ago";
        } else if (timeCalc >= (60 * 60)) {
            timeCalc = parseInt(timeCalc / 60 / 60) + " hour ago";
        } else if (timeCalc >= 60 * 2) {
            timeCalc = parseInt(timeCalc / 60) + " minutes ago";
        } else if (timeCalc >= 60) {
            timeCalc = parseInt(timeCalc / 60) + " minute ago";
        } else if (timeCalc > 0) {
            timeCalc += " seconds ago";
        }  else if (timeCalc == 0) {
            timeCalc = "Just Now";
        }

        return timeCalc;
    }

    const convertUTCDateToLocalDate = (datetime) => {
        let date = new Date(datetime);
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        return date;
    };

    return (
        <span className="time-text">{getTimeAgo()}</span>
    );
};

export default TimeAgo;