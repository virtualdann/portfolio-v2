import React, { useState, useCallback } from 'react';
import { TerminalLine, TerminalState } from '../types/terminal';
import { CommandRegistry } from '../utils/commandRegistry';
import WelcomeScreen from '../components/Terminal/WelcomeScreen';

const commandRegistry = new CommandRegistry();

export const useTerminal = () => {
  const [state, setState] = useState<TerminalState>({
    history: [
      {
        id: '1',
        type: 'output',
        content: React.createElement(WelcomeScreen),
        timestamp: new Date(),
      }
    ],
    currentInput: '',
    commandHistory: [],
    historyIndex: -1,
    isProcessing: false,
  });

  const executeCommand = useCallback((command: string) => {
    if (!command.trim()) return;

    const inputLine: TerminalLine = {
      id: Date.now().toString() + '-input',
      type: 'input',
      content: `$ ${command}`,
      timestamp: new Date(),
      command,
    };

    setState(prev => ({ 
      ...prev, 
      isProcessing: true,
      history: [...prev.history, inputLine],
      commandHistory: [...prev.commandHistory, command],
      historyIndex: -1,
    }));

    // Execute command
    const result = commandRegistry.execute(command);
    
    const outputLine: TerminalLine = {
      id: Date.now().toString() + '-output',
      type: result.type === 'error' ? 'error' : 'output',
      content: result.content,
      timestamp: result.timestamp,
    };

    setState(prev => ({
      ...prev,
      isProcessing: false,
      history: [...prev.history, outputLine],
      currentInput: '',
    }));
  }, []);

  const executeClickableCommand = useCallback((commandName: string) => {
    setState(prev => ({ ...prev, currentInput: commandName }));
    executeCommand(commandName);
  }, [executeCommand]);

  const setCurrentInput = useCallback((input: string) => {
    setState(prev => ({ ...prev, currentInput: input }));
  }, []);

  const navigateHistory = useCallback((direction: 'up' | 'down') => {
    setState(prev => {
      const { commandHistory, historyIndex } = prev;
      let newIndex = historyIndex;

      if (direction === 'up' && newIndex < commandHistory.length - 1) {
        newIndex++;
      } else if (direction === 'down' && newIndex > -1) {
        newIndex--;
      }

      const currentInput = newIndex === -1 ? '' : commandHistory[commandHistory.length - 1 - newIndex];

      return {
        ...prev,
        historyIndex: newIndex,
        currentInput,
      };
    });
  }, []);

  const clearTerminal = useCallback(() => {
    setState(prev => ({
      ...prev,
      history: [
        {
          id: '1',
          type: 'output',
          content: React.createElement(WelcomeScreen),
          timestamp: new Date(),
        }
      ],
    }));
  }, []);

  return {
    ...state,
    executeCommand,
    executeClickableCommand,
    setCurrentInput,
    navigateHistory,
    clearTerminal,
  };
};