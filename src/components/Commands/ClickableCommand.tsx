import React from 'react';

interface ClickableCommandProps {
  command: string;
  onCommandClick?: (command: string) => void;
}

const ClickableCommand: React.FC<ClickableCommandProps> = ({ 
  command, 
  onCommandClick 
}) => {
  const handleClick = () => {
    if (onCommandClick) {
      onCommandClick(command);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <span
      className="text-terminal-green hover:text-white cursor-pointer hover:bg-terminal-green/20 px-1 rounded transition-colors duration-150"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Execute ${command} command`}
    >
      {command}
    </span>
  );
};

export default ClickableCommand;