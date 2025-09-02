import React from 'react';

const WelcomeScreen: React.FC = () => {
  return (
    <div className="text-terminal-text font-mono text-sm space-y-4 p-4">
      {/* Welcome message */}
      <div className="border border-orange-400 rounded px-4 py-2 mb-6">
        <span className="text-orange-400">✦ Welcome to the </span>
        <span className="text-white font-bold">Danish Imran </span>
        <span className="text-orange-400">portfolio terminal!</span>
      </div>

      {/* ASCII Art for DANISH */}
      <div className="text-orange-400 leading-none text-xs">
        <pre>{`
██████╗  █████╗ ███╗   ██╗██╗███████╗██╗  ██╗
██╔══██╗██╔══██╗████╗  ██║██║██╔════╝██║  ██║
██║  ██║███████║██╔██╗ ██║██║███████╗███████║
██║  ██║██╔══██║██║╚██╗██║██║╚════██║██╔══██║
██████╔╝██║  ██║██║ ╚████║██║███████║██║  ██║
╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝╚══════╝╚═╝  ╚═╝
        `}</pre>
      </div>

      {/* ASCII Art for IMRAN */}
      <div className="text-orange-400 leading-none text-xs">
        <pre>{`
██╗███╗   ███╗██████╗  █████╗ ███╗   ██╗
██║████╗ ████║██╔══██╗██╔══██╗████╗  ██║
██║██╔████╔██║██████╔╝███████║██╔██╗ ██║
██║██║╚██╔╝██║██╔══██╗██╔══██║██║╚██╗██║
██║██║ ╚═╝ ██║██║  ██║██║  ██║██║ ╚████║
╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝
        `}</pre>
      </div>

      {/* Login prompt */}
      <div className="mt-6">
        <span className="text-orange-400">🎉 Portfolio loaded successfully. Type </span>
        <span className="text-blue-400 font-bold">help</span>
        <span className="text-blue-400"> to continue</span>
      </div>
    </div>
  );
};

export default WelcomeScreen;