import { forwardRef } from "react";
import ReactSelect from "react-select";

const customStyles = {
  option: (base, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...base,
      color: isFocused ? "white" : base.color,
    };
  },
};

const Select = forwardRef((props,ref) => {
 /*  const setSelectRef = props.setSelectRef;
  const innerRef = props.innerRef;
  console.log(innerRef.selectRef)
  const drawer = innerRef.drawer;
  const name = innerRef.name;
  let obj = drawer ? innerRef.selectRef.current["drawer"][name] : innerRef.selectRef.current[name]; */
  return (
    <ReactSelect
      {...props}
      ref={ref}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: "#daa520",
          primary25: "#daa520",
          primary50: "#daa520",
        },
      })}
      styles={{ ...props.styles, ...customStyles }}
    />
  );
});

export default Select;
