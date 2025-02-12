import React, { useState } from 'react';
import { motion } from 'framer-motion';

const DropdownMenu = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="relative inline-block">
      {/* Trigger with Avatar */}
      <DropdownMenuTrigger onClick={toggleMenu}>
        <img
          src="https://via.placeholder.com/40" // Replace with your avatar URL
          alt="Avatar"
          className="w-10 h-10 rounded-full cursor-pointer"
        />
      </DropdownMenuTrigger>

      {/* Menu Content */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md"
        >
          <DropdownMenuContent>
            {React.Children.map(children, (child) =>
              React.cloneElement(child, { closeMenu })
            )}
          </DropdownMenuContent>
        </motion.div>
      )}
    </div>
  );
};

const DropdownMenuTrigger = ({ children, ...props }) => (
  <div {...props} className="cursor-pointer">
    {children}
  </div>
);

const DropdownMenuContent = ({ children }) => <div>{children}</div>;

const DropdownMenuLabel = ({ children }) => (
  <div className="px-4 py-2 text-sm font-semibold text-gray-800">
    {children}
  </div>
);

const DropdownMenuItem = ({ children, closeMenu, ...props }) => (
  <button
    {...props}
    onClick={() => {
      closeMenu(); // Close menu on item click
      if (props.onClick) props.onClick();
    }}
    className="w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:outline-none"
  >
    {children}
  </button>
);

const DropdownMenuSeparator = () => (
  <div className="my-1 border-t border-gray-200" />
);

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
};
