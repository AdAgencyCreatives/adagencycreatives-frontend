const NumUnit = (props) => {

    const getNumUnit = (number) => {
        if(number <= 0) {
            return '0'; 
        }
        
        const k = 1000
        const units = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']

        const i = Math.floor(Math.log(number) / Math.log(k))

        return `${parseFloat((number / Math.pow(k, i)).toFixed(0))} ${units[i]}`
    }
    
    return (
        <span onClick={ (e) => {props.onClick ? props.onClick(e) : void(0) } }>{getNumUnit(props.number || 0)}</span>
    );
};

export default NumUnit;