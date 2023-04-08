import React, { useState } from 'react';

const KebabMenu = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="kebab-menu">
      <button onClick={handleClick}>Menu</button>
      {isOpen && (
        <ul>
          {options.map(option => (
            <li key={option}>{option}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default KebabMenu;
