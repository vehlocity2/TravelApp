import React, { useEffect, useRef } from "react";

const DropdownMenu = ({ isOpen, onClose, options = [] }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      // if click is outside the menu, close it
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      onClick={(e) => e.stopPropagation()}
      className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-2xl shadow-black/20 z-50 py-2"
    >
      {options.map((opt, index) => (
        <button
          key={index}
          onClick={(e) => {
            e.stopPropagation()
            opt.onClick();
            onClose();
          }}
          className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer"
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};

export default DropdownMenu;
