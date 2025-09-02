import React, { useRef, useEffect, useState } from 'react';
import { resumeData } from '../../data/resume';

const Resume: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [terminalWidth, setTerminalWidth] = useState(120);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        // Calculate available character width based on container
        const containerWidth = containerRef.current.offsetWidth;
        // Estimate characters per line based on font size
        const charWidth = Math.floor(containerWidth / 8); // Approximate char width for text-xs
        setTerminalWidth(Math.max(80, Math.min(charWidth, 140))); // Min 80, max 140 chars
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const wrapText = (text: string, maxLength: number, indent: string = '') => {
    const words = text.split(' ');
    const lines = [];
    let currentLine = indent;

    for (const word of words) {
      if (currentLine.length + word.length + 1 <= maxLength) {
        currentLine += (currentLine === indent ? '' : ' ') + word;
      } else {
        if (currentLine.trim()) lines.push(currentLine);
        currentLine = indent + word;
      }
    }
    if (currentLine.trim()) lines.push(currentLine);
    return lines;
  };

  const renderLine = (content: string = '', width: number) => {
    return `| ${content.padEnd(width - 4)} |`;
  };

  const renderRightAlignedLine = (left: string, right: string, width: number) => {
    const totalContent = left.length + right.length;
    const spacing = width - 4 - totalContent;
    return `| ${left}${' '.repeat(Math.max(0, spacing))}${right} |`;
  };

  const renderWrappedBullet = (text: string, width: number) => {
    const maxContentWidth = width - 6; // Account for "| • " and " |"
    const wrappedLines = wrapText(text, maxContentWidth, '  '); // 2 spaces for continuation
    return wrappedLines.map((line, i) => 
      renderLine(i === 0 ? `• ${line.trim()}` : line, width)
    ).join('\n');
  };

  const renderCenteredHeading = (heading: string, width: number) => {
    const line = '-'.repeat(width);
    const paddingLength = Math.floor((width - 4 - heading.length) / 2);
    const padding = ' '.repeat(paddingLength);
    const centeredHeading = `| ${padding}${heading.toUpperCase()}${padding}${heading.length % 2 === 0 ? '' : ' '} |`;
    return `${line}\n${centeredHeading}\n${line}`;
  };

  const border = '-'.repeat(terminalWidth);

  return (
    <div ref={containerRef} className="w-full text-terminal-text font-mono text-xs leading-tight whitespace-pre-wrap overflow-x-hidden">
      {border}<br/>
      {renderCenteredHeading(resumeData.personal.name, terminalWidth)}<br/>
      <div className="text-center mb-4">
        <span className="text-terminal-text">📞 {resumeData.personal.phone}  </span>
        <a href={`mailto:${resumeData.personal.email}`} className="text-terminal-green hover:text-terminal-cyan underline">
          ✉️ {resumeData.personal.email}
        </a>
        <span className="text-terminal-text">  </span>
        <a href={`https://${resumeData.personal.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-terminal-green hover:text-terminal-cyan underline">
          🔗 {resumeData.personal.linkedin}
        </a>
        <span className="text-terminal-text">  </span>
        <a href={`https://${resumeData.personal.github}`} target="_blank" rel="noopener noreferrer" className="text-terminal-green hover:text-terminal-cyan underline">
          📱 {resumeData.personal.github}
        </a>
      </div>
      <br/>
      {renderCenteredHeading('Education', terminalWidth)}<br/>
      {renderRightAlignedLine(resumeData.education[0].institution, resumeData.education[0].year, terminalWidth)}<br/>
      {renderRightAlignedLine(resumeData.education[0].degree, resumeData.education[0].location, terminalWidth)}<br/>
      {renderLine(`GPA: ${resumeData.education[0].gpa}`, terminalWidth)}<br/>
      {renderLine(`Honors: ${resumeData.education[0].honors}`, terminalWidth)}<br/>
      {renderLine(`Clubs: ${resumeData.education[0].clubs}`, terminalWidth)}<br/>
      {renderLine(`Leadership: ${resumeData.education[0].leadership}`, terminalWidth)}<br/>
      <br/>
      {renderCenteredHeading('Experience', terminalWidth)}<br/>
      {resumeData.experience.map((exp, expIndex) => (
        <React.Fragment key={expIndex}>
          {renderRightAlignedLine(exp.company, exp.duration, terminalWidth)}<br/>
          {renderRightAlignedLine(exp.position, exp.location, terminalWidth)}<br/>
          {exp.description.map((desc, i) => (
            <React.Fragment key={i}>
              {renderWrappedBullet(desc, terminalWidth)}<br/>
            </React.Fragment>
          ))}
          <br/>
        </React.Fragment>
      ))}
      {renderCenteredHeading('Projects', terminalWidth)}<br/>
      {resumeData.projects.map((project, projIndex) => (
        <React.Fragment key={projIndex}>
          {renderRightAlignedLine(`${project.name} | ${project.technologies}`, project.date, terminalWidth)}<br/>
          {renderWrappedBullet(project.description, terminalWidth)}<br/>
          <br/>
        </React.Fragment>
      ))}
      <br/>
      {renderCenteredHeading('Additional Information', terminalWidth)}<br/>
      {renderLine(`Languages: ${resumeData.skills.technical.join(', ')}`, terminalWidth)}<br/>
      {renderLine(`Developer Tools: ${resumeData.skills.tools.join(', ')}`, terminalWidth)}<br/>
      {renderLine(`Hackathons: ${resumeData.additional.hackathons}`, terminalWidth)}<br/>
      {border}<br/>
      <br/>
      <div className="text-center">
        <span className="text-terminal-cyan">📄 Download PDF Resume: </span>
        <a 
          href="/Nor_Danish_Resume.pdf" 
          download="Nor_Danish_Resume.pdf"
          className="text-terminal-green hover:text-terminal-cyan underline font-bold"
        >
          Nor_Danish_Resume.pdf
        </a>
        <span className="text-terminal-cyan"> (not a virus I promise!) </span>
      </div>
    </div>
  );
};

export default Resume;