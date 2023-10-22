import ReactSelect from "react-select";

const Select = (props) => {
  return (
    <ReactSelect
      {...props}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: "#d3a11f",
          primary25: "#c99e2d5c",
          primary50: "#c99e2d5c",
        },
      })}
    />
  );
};

export default Select;
