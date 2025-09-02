import React from 'react';
import { Command, CommandOutput } from '../types/terminal';
import Resume from '../components/Commands/Resume';
import PongGame from '../components/Games/PongGame';

export class CommandRegistry {
  private commands: Map<string, Command> = new Map();

  constructor() {
    // Register default commands
    this.registerDefaults();
  }

  register(command: Command) {
    this.commands.set(command.name.toLowerCase(), command);
  }

  execute(commandLine: string): CommandOutput {
    const parts = commandLine.trim().split(/\s+/);
    const commandName = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (!commandName) {
      return {
        type: 'error',
        content: 'No command provided.',
        timestamp: new Date(),
      };
    }

    const command = this.commands.get(commandName);
    if (!command) {
      return {
        type: 'error',
        content: `Command not found: ${commandName}. Type 'help' for available commands.`,
        timestamp: new Date(),
      };
    }

    try {
      return command.execute(args);
    } catch (error) {
      return {
        type: 'error',
        content: `Error executing command: ${error}`,
        timestamp: new Date(),
      };
    }
  }

  getCommands(): Command[] {
    return Array.from(this.commands.values());
  }

  private registerDefaults() {
    // Help command
    this.register({
      name: 'help',
      description: 'Show available commands',
      execute: () => {
        const visibleCommands = Array.from(this.commands.entries())
          .filter(([_, command]) => !command.hidden)
          .map(([name, _]) => name);
        
        return {
          type: 'interactive',
          content: 'Available commands (click to execute):',
          timestamp: new Date(),
          clickableCommands: visibleCommands,
        };
      },
    });

    // Resume command
    this.register({
      name: 'resume',
      description: 'Display resume information',
      execute: () => ({
        type: 'component',
        content: React.createElement(Resume),
        timestamp: new Date(),
      }),
    });

    // Clear command
    this.register({
      name: 'clear',
      description: 'Clear the terminal',
      execute: () => ({
        type: 'text',
        content: '',
        timestamp: new Date(),
      }),
    });

    // Placeholder commands
    const placeholderCommands = [
      { name: 'projects', description: 'View portfolio projects' },
      { name: 'about', description: 'Learn more about me' },
      { name: 'contact', description: 'Get in touch' },
      { name: 'skills', description: 'Technical skills overview' },
      { name: 'whoami', description: 'Display current user' },
    ];

    placeholderCommands.forEach(cmd => {
      this.register({
        name: cmd.name,
        description: cmd.description,
        execute: () => ({
          type: 'text',
          content: `${cmd.name} command - Coming soon! This feature is under development.`,
          timestamp: new Date(),
        }),
      });
    });

    // Easter egg: Pong game (hidden from help)
    this.register({
      name: 'pong',
      description: 'Play a game of pong',
      execute: () => ({
        type: 'component',
        content: React.createElement(PongGame),
        timestamp: new Date(),
      }),
      hidden: true, // Easter egg - not shown in help
    });
  }
}