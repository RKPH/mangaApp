import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const DropdownContent = ({ domain, setDropdownVisible }) => {
  let timeoutId;
  return (
    <div
      onMouseEnter={() => {
        clearTimeout(timeoutId);
        setDropdownVisible(true);
      }}
      onMouseLeave={() => setDropdownVisible(false)}
      className="min-w-[400px] min-h-[300px] dark:bg-[#242426] bg-orange-500 border-white"
    >
      <div className="grid grid-cols-6  p-5 border">
        {domain.map((category) => (
          <Link
            to={`/the-loai/${category.slug}`}
            key={category._id}
            className="hover:opacity-60"
          >
            <div>
              <h4
                onClick={() => setDropdownVisible(false)}
                className="font-semibold text-sm"
              >
                {category.name}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
DropdownContent.propTypes = {
  domain: PropTypes.array,
  setDropdownVisible: PropTypes.func,
};
export default DropdownContent;
