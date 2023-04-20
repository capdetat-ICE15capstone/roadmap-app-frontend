import React from 'react'

function DropdownMenuItem(props) {
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

export default DropdownMenuItem