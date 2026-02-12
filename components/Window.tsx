
import React, { ReactNode } from 'react';

interface WindowProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
}

const Window: React.FC<WindowProps> = ({ title, children, onClose }) => {
  return (
    <div className="absolute top-20 left-1/2 -translate-x-1/2 win98-border bg-[#c0c0c0] shadow-2xl z-30 min-w-[320px]">
      <div className="h-7 bg-blue-900 flex items-center justify-between px-1 m-0.5">
        <div className="flex items-center gap-1">
          <span className="text-white text-xs font-bold">{title}</span>
        </div>
        <button 
          onClick={onClose}
          className="w-5 h-5 bg-[#c0c0c0] win98-border flex items-center justify-center font-bold text-xs hover:bg-gray-300 win98-button"
        >
          X
        </button>
      </div>
      <div className="p-1">
        {children}
      </div>
    </div>
  );
};

export default Window;
