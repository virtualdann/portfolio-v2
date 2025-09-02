import React from 'react';

interface MacOSDesktopProps {
  children: React.ReactNode;
}

const MacOSDesktop: React.FC<MacOSDesktopProps> = ({ children }) => {
  return (
    <div 
      className="min-h-screen w-full relative"
      style={{
        backgroundImage: `url(${require('./mac-os-desktop-bg.png')})`,
        backgroundSize: 'cover',
      }}
    >
        {/* Desktop Icons - Left Side */}
        <div className="absolute left-8 top-20 space-y-6">
          {/* Visual Studio Code Icon */}
          <div className="flex flex-col items-center group">
            <div className="w-16 h-16 mb-2 transition-transform">
              <img 
                src={require("./vs-code-icon.png")} 
                alt="VS Code" 
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            <span className="text-white text-xs font-medium drop-shadow-md">VS Code</span>
          </div>

          {/* Arc Browser Icon */}
          <div className="flex flex-col items-center group">
            <div className="w-16 h-16 mb-2 transition-transform">
              <img 
                src={require("./arc-browser-logo.png")}
                alt="Arc Browser" 
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            <span className="text-white text-xs font-medium drop-shadow-md">Arc</span>
          </div>
        </div>

        {/* Desktop Icons - Right Side */}
        <div className="absolute right-8 top-20 space-y-6">
          {/* UM Notes Folder */}
          <div className="flex flex-col items-center group">
            <div className="w-16 h-16 mb-2 transition-transform">
              <img 
                src={require("./folder-icon-macos.png")} 
                alt="UM Notes Folder" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-white text-xs font-medium drop-shadow-md">um notes</span>
          </div>

          {/* Job Apps Folder */}
          <div className="flex flex-col items-center group">
            <div className="w-16 h-16 mb-2 transition-transform">
              <img 
                src={require("./folder-icon-macos.png")} 
                alt="Job Apps Folder" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-white text-xs font-medium drop-shadow-md">job apps</span>
          </div>
        </div>

      {/* Terminal Window - Centered */}
      <div className="flex items-center justify-center min-h-screen p-4">
        {children}
      </div>
    </div>
  );
};

export default MacOSDesktop;