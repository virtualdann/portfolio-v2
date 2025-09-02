import React, { useEffect, useRef } from 'react';
import { useTerminal } from '../../hooks/useTerminal';
import TerminalWindow from './TerminalWindow';
import Output from './Output';
import CommandLine from './CommandLine';

const Terminal: React.FC = () => {
  const {
    history,
    currentInput,
    isProcessing,
    executeCommand,
    executeClickableCommand,
    setCurrentInput,
    navigateHistory,
    clearTerminal,
  } = useTerminal();

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom when new content is added
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (command: string) => {
    if (command.toLowerCase() === 'clear') {
      clearTerminal();
    } else {
      executeCommand(command);
    }
  };

  return (
    <TerminalWindow>
      <div className="h-full flex flex-col">
        {/* Terminal Content */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar"
        >
          {history.map((line) => (
            <Output
              key={line.id}
              line={line}
              onCommandClick={executeClickableCommand}
            />
          ))}
        </div>

        {/* Command Input */}
        <div className="border-t border-terminal-gray p-4">
          <CommandLine
            currentInput={currentInput}
            onInputChange={setCurrentInput}
            onSubmit={handleSubmit}
            onHistoryNavigation={navigateHistory}
            isProcessing={isProcessing}
          />
        </div>
      </div>
    </TerminalWindow>
  );
};

export default Terminal;