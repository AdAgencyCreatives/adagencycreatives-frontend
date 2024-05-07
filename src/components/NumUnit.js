const NumUnit = (props) => {

    const getNumUnit = (number) => {
        if (typeof number !== 'number') {
            return number;
        }

        const k = 1000;
        const units = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];

        const i = Math.floor(Math.log(number) / Math.log(k));

        return `${parseFloat((number / Math.pow(k, i)).toFixed(0))} ${units[i]}`;
    }

    return (
        <span className="num-unit" {...props}>{getNumUnit(props?.number || (Object.hasOwn(props, 'default') ? props.default : '0'))}</span>
    );
};

export default NumUnit;