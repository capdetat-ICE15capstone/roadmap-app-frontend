import { useState } from "react";

const DropdownMenuItem = (props) => {
  const handleClick = () => {
    props.onSelect(props.array);
  }

  return (
    <a
      href="#"
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      onClick={handleClick}
    >
      {props.label}
    </a>
  );
}

const DropdownSorting = ({ array }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const toggleMenu = () => setIsOpen(!isOpen);
  const [title, setTitle] = useState("Sort");

  const DateAscending = (array) => {
    console.log(array)
    array.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    setIsOpen(false);
  }

  const DateDecending = (array) => {
    array.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    setIsOpen(false);
  }

  const ViewAscending = (array) => {
    array.sort((a, b) => a.views_count - b.views_count);
    setIsOpen(false);
  }

  const ViewDecending = (array) => {
    array.sort((a, b) => b.views_count - a.views_count);
    setIsOpen(false);
  }

  return (
    <div className="relative">
      <button
        className="inline-flex array-center justify-center w-full px-4 py-2 text-base font-medium text-gray-700 bg-white rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={toggleMenu}
      >
        <span>{title}</span>
      </button>
      {isOpen && (
        <div
          className="absolute z-50 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 mt-2"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <DropdownMenuItem label="Date ^" onSelect={DateAscending} array={array} />
          <DropdownMenuItem label="Date v" onSelect={DateDecending} array={array} />
          <DropdownMenuItem label="Views ^" onSelect={ViewAscending} array={array} />
          <DropdownMenuItem label="Views v" onSelect={ViewDecending} array={array} />

        </div>
      )}
    </div>
  );
}

export default DropdownSorting;
