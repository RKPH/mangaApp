import PropTypes from "prop-types";
// Define your custom button component
const MyCustomButton = ({ onClick, children }) => (
  <button
    style={{
      width: "100%",
      padding: "12px",
      backgroundColor: "red",
    }}
    className="bg-red-400 w-full p-4 gap-3 border border-gray-300 rounded-lg flex items-center justify-center font-semibold"
    onClick={onClick}
  >
    {children}
  </button>
);

MyCustomButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
export default MyCustomButton;
