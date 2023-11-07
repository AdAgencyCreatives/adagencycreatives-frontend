import ReactSelect from "react-select";

const customStyles = {
  option: (base, { data, isDisabled, isFocused, isSelected }) => {
  return {
    ...base,
    color: isFocused ? "white" : base.color,
  };
}
};

const Select = (props) => {
  return (
    <ReactSelect
      {...props}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: "#daa520",
          primary25: "#daa520",
          primary50: "#daa520",
        },
      })}
      styles={{...props.styles,...customStyles}}
      />
  );
};

export default Select;
