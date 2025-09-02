import React, { useEffect, useRef } from 'react';

interface CommandLineProps {
  currentInput: string;
  onInputChange: (value: string) => void;
  onSubmit: (command: string) => void;
  onHistoryNavigation: (direction: 'up' | 'down') => void;
  isProcessing: boolean;
}

const CommandLine: React.FC<CommandLineProps> = ({
  currentInput,
  onInputChange,
  onSubmit,
  onHistoryNavigation,
  isProcessing,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-focus the input
    if (inputRef.current && !isProcessing) {
      inputRef.current.focus();
    }
  }, [isProcessing]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        if (currentInput.trim() && !isProcessing) {
          onSubmit(currentInput);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        onHistoryNavigation('up');
        break;
      case 'ArrowDown':
        event.preventDefault();
        onHistoryNavigation('down');
        break;
      case 'l':
        if (event.metaKey || event.ctrlKey) {
          event.preventDefault();
          onSubmit('clear');
        }
        break;
    }
  };

  return (
    <div className="flex items-center text-terminal-text font-mono text-sm">
      <span className="text-terminal-green mr-2">$</span>
      <div className="flex-1 relative">
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent outline-none text-terminal-text placeholder-terminal-gray caret-transparent"
          placeholder="Type a command..."
          disabled={isProcessing}
          autoComplete="off"
          spellCheck="false"
        />
        {/* Custom cursor */}
        <span 
          className={`absolute top-0 w-2 h-5 bg-terminal-green ${
            isProcessing ? '' : 'animate-blink'
          }`}
          style={{ 
            left: `${currentInput.length * 0.6}em` 
          }}
        />
      </div>
    </div>
  );
};

export default CommandLine;