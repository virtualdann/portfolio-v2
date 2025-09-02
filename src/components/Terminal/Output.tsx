import React from 'react';
import { TerminalLine } from '../../types/terminal';
import ClickableCommand from '../Commands/ClickableCommand';

interface OutputProps {
  line: TerminalLine;
  onCommandClick?: (command: string) => void;
}

const Output: React.FC<OutputProps> = ({ line, onCommandClick }) => {
  const getTextColor = () => {
    switch (line.type) {
      case 'error':
        return 'text-red-400';
      case 'input':
        return 'text-terminal-green';
      default:
        return 'text-terminal-text';
    }
  };

  const renderContent = () => {
    if (typeof line.content === 'string') {
      // Check if this is a help command output with clickable commands
      if (line.content.includes('Available commands (click to execute):')) {
        return (
          <div>
            <div className="mb-2">{line.content}</div>
            <div className="ml-4 space-y-1">
              <div className="flex items-center">
                <ClickableCommand 
                  command="help" 
                  onCommandClick={onCommandClick} 
                />
                <span className="ml-8 text-terminal-text">- Show this help message</span>
              </div>
              <div className="flex items-center">
                <ClickableCommand 
                  command="resume" 
                  onCommandClick={onCommandClick} 
                />
                <span className="ml-6 text-terminal-text">- Display resume information</span>
              </div>
              <div className="flex items-center">
                <ClickableCommand 
                  command="projects" 
                  onCommandClick={onCommandClick} 
                />
                <span className="ml-4 text-terminal-text">- View portfolio projects</span>
              </div>
              <div className="flex items-center">
                <ClickableCommand 
                  command="about" 
                  onCommandClick={onCommandClick} 
                />
                <span className="ml-8 text-terminal-text">- Learn more about me</span>
              </div>
              <div className="flex items-center">
                <ClickableCommand 
                  command="contact" 
                  onCommandClick={onCommandClick} 
                />
                <span className="ml-6 text-terminal-text">- Get in touch</span>
              </div>
              <div className="flex items-center">
                <ClickableCommand 
                  command="skills" 
                  onCommandClick={onCommandClick} 
                />
                <span className="ml-8 text-terminal-text">- Technical skills overview</span>
              </div>
              <div className="flex items-center">
                <ClickableCommand 
                  command="clear" 
                  onCommandClick={onCommandClick} 
                />
                <span className="ml-8 text-terminal-text">- Clear the terminal</span>
              </div>
              <div className="flex items-center">
                <ClickableCommand 
                  command="whoami" 
                  onCommandClick={onCommandClick} 
                />
                <span className="ml-7 text-terminal-text">- Display current user</span>
              </div>
            </div>
            <div className="mt-3 text-terminal-cyan">
              Click any command above to execute it.
            </div>
          </div>
        );
      }
      return line.content;
    }
    
    return line.content;
  };

  return (
    <div className={`font-mono text-sm leading-relaxed ${getTextColor()}`}>
      {renderContent()}
    </div>
  );
};

export default Output;