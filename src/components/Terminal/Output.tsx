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

  const commands = [
    {
      command: 'help',
      description: 'Show this help message',
    },
    {
      command: 'resume',
      description: 'Display resume information',
    },
    {
      command: 'pong',
      description: 'IT\'S PONG!',
    },
    // {
    //   command: 'projects',
    //   description: 'View portfolio projects',
    // },
    // {
    //   command: 'about',
    //   description: 'Learn more about me',
    // },
    // {
    //   command: 'contact',
    //   description: 'Get in touch',
    // },
    // {
    //   command: 'skills',
    //   description: 'Technical skills overview',
    // },
    {
      command: 'clear',
      description: 'Clear the terminal',
    },
    {
      command: 'whoami',
      description: 'Display current user',
    },
  ];

  const renderContent = () => {
    if (typeof line.content === 'string') {
      // Check if this is a help command output with clickable commands
      if (line.content.includes('Available commands (click to execute):')) {
        return (
          <div>
            <div className="mb-2">{line.content}</div>
            <div className="ml-4 space-y-1">
              {commands.map((cmd) => (
                <div className="flex items-center" key={cmd.command}>
                  <ClickableCommand 
                    command={cmd.command} 
                    onCommandClick={onCommandClick} 
                  />
                  <span className="text-terminal-text"> - {cmd.description}</span>
                </div>
              ))}
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