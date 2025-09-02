import React from 'react';

interface TerminalWindowProps {
  children: React.ReactNode;
}

const TerminalWindow: React.FC<TerminalWindowProps> = ({ children }) => {
  return (
    <div className="w-full max-w-4xl bg-terminal-bg rounded-lg shadow-2xl border border-terminal-gray overflow-hidden flex flex-col backdrop-blur-sm bg-opacity-95" style={{ height: 'calc(100vh - 8rem)' }}>
      {/* Terminal Header */}
      <div className="bg-terminal-gray h-8 flex items-center px-4 border-b border-terminal-gray flex-shrink-0">
        {/* Traffic Light Buttons */}
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        {/* Terminal Title */}
        <div className="flex-1 text-center text-terminal-text text-sm font-mono">
          whoami-terminal
        </div>
      </div>
      
      {/* Terminal Content */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default TerminalWindow;