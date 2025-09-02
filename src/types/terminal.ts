export interface Command {
  name: string;
  description: string;
  execute: (args: string[]) => CommandOutput;
  help?: string;
}

export interface CommandOutput {
  type: 'text' | 'component' | 'error' | 'interactive';
  content: string | React.ReactNode;
  timestamp: Date;
  clickableCommands?: string[];
}

export interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error';
  content: string | React.ReactNode;
  timestamp: Date;
  command?: string;
}

export interface TerminalState {
  history: TerminalLine[];
  currentInput: string;
  commandHistory: string[];
  historyIndex: number;
  isProcessing: boolean;
}