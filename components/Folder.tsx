// import React, { useState } from 'react';

// interface FolderProps {
//   color?: string;
//   size?: number;
//   items?: React.ReactNode[];
//   className?: string;
// }

// const darkenColor = (hex: string, percent: number): string => {
//   let color = hex.startsWith('#') ? hex.slice(1) : hex;
//   if (color.length === 3) {
//     color = color
//       .split('')
//       .map(c => c + c)
//       .join('');
//   }
//   const num = parseInt(color, 16);
//   let r = (num >> 16) & 0xff;
//   let g = (num >> 8) & 0xff;
//   let b = num & 0xff;
//   r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
//   g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
//   b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
//   return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
// };

// const Folder: React.FC<FolderProps> = ({ color = '#5227FF', size = 1, items = [], className = '' }) => {
//   const maxItems = 3;
//   const papers = items.slice(0, maxItems);
//   while (papers.length < maxItems) {
//     papers.push(null);
//   }

//   const [open, setOpen] = useState(false);
//   const [paperOffsets, setPaperOffsets] = useState<{ x: number; y: number }[]>(
//     Array.from({ length: maxItems }, () => ({ x: 0, y: 0 }))
//   );

//   const folderBackColor = darkenColor(color, 0.08);
//   const paper1 = darkenColor('#ffffff', 0.1);
//   const paper2 = darkenColor('#ffffff', 0.05);
//   const paper3 = '#ffffff';

//   const handleClick = (e: React.MouseEvent) => {
//     // Only toggle if clicking on folder itself, not on papers
//     if (e.currentTarget === e.target) {
//       setOpen(prev => !prev);
//       if (open) {
//         setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));
//       }
//     }
//   };

//   const handlePaperMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
//     if (!open) return;
//     const rect = e.currentTarget.getBoundingClientRect();
//     const centerX = rect.left + rect.width / 2;
//     const centerY = rect.top + rect.height / 2;
//     const offsetX = (e.clientX - centerX) * 0.15;
//     const offsetY = (e.clientY - centerY) * 0.15;
//     setPaperOffsets(prev => {
//       const newOffsets = [...prev];
//       newOffsets[index] = { x: offsetX, y: offsetY };
//       return newOffsets;
//     });
//   };

//   const handlePaperMouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
//     setPaperOffsets(prev => {
//       const newOffsets = [...prev];
//       newOffsets[index] = { x: 0, y: 0 };
//       return newOffsets;
//     });
//   };

//   const folderStyle: React.CSSProperties = {
//     '--folder-color': color,
//     '--folder-back-color': folderBackColor,
//     '--paper-1': paper1,
//     '--paper-2': paper2,
//     '--paper-3': paper3
//   } as React.CSSProperties;

//   const scaleStyle = { transform: 'scale(' + size + ')', transformOrigin: 'top left' };

//   const getOpenTransform = (index: number) => {
//     if (index === 0) return 'translate(-120%, -70%) rotate(-15deg)';
//     if (index === 1) return 'translate(10%, -70%) rotate(15deg)';
//     if (index === 2) return 'translate(-50%, -100%) rotate(5deg)';
//     return '';
//   };

//   const scaledWidth = 100 * size;
//   const scaledHeight = 90 * size;

//   return (
//     <div className={className + ' relative'} style={{ width: scaledWidth + 'px', height: scaledHeight + 'px' }}>
//       <div style={scaleStyle}>
//         <div
//           className={'group relative transition-all duration-200 ease-in cursor-pointer' + (!open ? ' hover:-translate-y-2' : '')}
//           style={{
//             ...folderStyle,
//             transform: open ? 'translateY(-8px)' : undefined,
//             width: '100px',
//             height: '90px',
//             paddingTop: '10px'
//           }}
//           onClick={handleClick}
//         >
//           <div
//             className="relative w-[100px] h-[80px] rounded-tl-0 rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px]"
//             style={{ backgroundColor: folderBackColor }}
//           >
//             <span
//               className="absolute z-0 bottom-[98%] left-0 w-[30px] h-[10px] rounded-tl-[5px] rounded-tr-[5px] rounded-bl-0 rounded-br-0"
//               style={{ backgroundColor: folderBackColor }}
//             />
//             {papers.map((item, i) => {
//               let sizeClasses = '';
//               if (i === 0) sizeClasses = open ? 'w-[70%] h-[80%]' : 'w-[70%] h-[80%]';
//               if (i === 1) sizeClasses = open ? 'w-[80%] h-[80%]' : 'w-[80%] h-[70%]';
//               if (i === 2) sizeClasses = open ? 'w-[90%] h-[80%]' : 'w-[90%] h-[60%]';

//               const transformStyle = open
//                 ? getOpenTransform(i) + ' translate(' + paperOffsets[i].x + 'px, ' + paperOffsets[i].y + 'px)'
//                 : undefined;

//               return (
//                 <div
//                   key={i}
//                   onMouseMove={e => open && handlePaperMouseMove(e, i)}
//                   onMouseLeave={e => open && handlePaperMouseLeave(e, i)}
//                   className={'absolute bottom-[10%] left-1/2 transition-all duration-300 ease-in-out ' + (!open ? 'z-20 transform -translate-x-1/2 translate-y-[10%] group-hover:translate-y-0 pointer-events-none' : 'z-50 hover:scale-110') + ' ' + sizeClasses}
//                   style={{
//                     transform: transformStyle || 'translate(-50%, 10%)',
//                     backgroundColor: i === 0 ? paper1 : i === 1 ? paper2 : paper3,
//                     borderRadius: '10px',
//                     pointerEvents: open && item ? 'auto' : 'none'
//                   }}
//                 >
//                   {item}
//                 </div>
//               );
//             })}
//             <div
//               className={'absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out pointer-events-none' + (!open ? ' group-hover:[transform:skew(15deg)_scaleY(0.6)]' : '')}
//               style={{
//                 backgroundColor: color,
//                 borderRadius: '5px 10px 10px 10px',
//                 ...(open && { transform: 'skew(15deg) scaleY(0.6)' })
//               }}
//             />
//             <div
//               className={'absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out pointer-events-none' + (!open ? ' group-hover:[transform:skew(-15deg)_scaleY(0.6)]' : '')}
//               style={{
//                 backgroundColor: color,
//                 borderRadius: '5px 10px 10px 10px',
//                 ...(open && { transform: 'skew(-15deg) scaleY(0.6)' })
//               }}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Folder;

import React, { useState } from 'react';
import { Github, Eye, ShoppingCart } from 'lucide-react';

interface FolderProps {
  name: string; // Name of the project
  githubUrl?: string;
  previewUrl?: string;
  contactUrl?: string;
  color?: string;
  size?: number;
  className?: string;
}

// Utility to darken color for depth effects
const darkenColor = (hex: string, percent: number): string => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color
      .split('')
      .map(c => c + c)
      .join('');
  }
  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

const Folder: React.FC<FolderProps> = ({
  name,
  githubUrl = '#',
  previewUrl = '#',
  contactUrl = '#',
  color = '#5227FF',
  size = 1,
  className = ''
}) => {
  const [open, setOpen] = useState(false);
  const [paperOffsets, setPaperOffsets] = useState<{ x: number; y: number }[]>(
    Array.from({ length: 3 }, () => ({ x: 0, y: 0 }))
  );

  const folderBackColor = darkenColor(color, 0.08);
  const paper1 = darkenColor('#ffffff', 0.1);
  const paper2 = darkenColor('#ffffff', 0.05);
  const paper3 = '#ffffff';

  // Define the actions/icons for the 3 papers
  const actions = [
    { icon: <Github size={20} />, link: githubUrl, label: 'Source' },
    { icon: <Eye size={20} />, link: previewUrl, label: 'Preview' },
    { icon: <ShoppingCart size={20} />, link: contactUrl, label: 'Buy' }
  ];

  const handleClick = () => {
    // Toggle open state
    setOpen(prev => !prev);
    if (open) {
      setPaperOffsets(Array.from({ length: 3 }, () => ({ x: 0, y: 0 })));
    }
  };

  const handlePaperMouseMove = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, index: number) => {
    if (!open) return;
    e.stopPropagation(); // Prevent triggering folder close when moving on paper
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) * 0.15;
    const offsetY = (e.clientY - centerY) * 0.15;
    setPaperOffsets(prev => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: offsetX, y: offsetY };
      return newOffsets;
    });
  };

  const handlePaperMouseLeave = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, index: number) => {
    setPaperOffsets(prev => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: 0, y: 0 };
      return newOffsets;
    });
  };

  // CSS Variables for colors
  const folderStyle: React.CSSProperties = {
    '--folder-color': color,
    '--folder-back-color': folderBackColor,
    '--paper-1': paper1,
    '--paper-2': paper2,
    '--paper-3': paper3
  } as React.CSSProperties;

  const scaleStyle = { transform: 'scale(' + size + ')', transformOrigin: 'top left' };

  const getOpenTransform = (index: number) => {
    if (index === 0) return 'translate(-120%, -70%) rotate(-15deg)'; // Left (Github)
    if (index === 1) return 'translate(10%, -70%) rotate(15deg)';   // Right (Preview)
    if (index === 2) return 'translate(-50%, -100%) rotate(5deg)';  // Top (Buy)
    return '';
  };

  const scaledWidth = 100 * size;
  const scaledHeight = 90 * size;

  return (
    <div className={className + ' relative'} style={{ width: scaledWidth + 'px', height: scaledHeight + 'px' }}>
      <div style={scaleStyle}>
        <div
          className={'group relative transition-all duration-200 ease-in cursor-pointer' + (!open ? ' hover:-translate-y-2' : '')}
          style={{
            ...folderStyle,
            transform: open ? 'translateY(-8px)' : undefined,
            width: '100px',
            height: '90px',
            paddingTop: '10px'
          }}
          onClick={handleClick}
        >
          <div
            className="relative w-[100px] h-[80px] rounded-tl-0 rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px]"
            style={{ backgroundColor: folderBackColor }}
          >
            {/* Folder Tab (Top Left) */}
            <span
              className="absolute z-0 bottom-[98%] left-0 w-[30px] h-[10px] rounded-tl-[5px] rounded-tr-[5px] rounded-bl-0 rounded-br-0"
              style={{ backgroundColor: folderBackColor }}
            />

            {/* Render the 3 Action Papers */}
            {actions.map((action, i) => {
              let sizeClasses = '';
              // Adjust sizes slightly for stacking effect
              if (i === 0) sizeClasses = open ? 'w-[70%] h-[80%]' : 'w-[70%] h-[80%]';
              if (i === 1) sizeClasses = open ? 'w-[80%] h-[80%]' : 'w-[80%] h-[70%]';
              if (i === 2) sizeClasses = open ? 'w-[90%] h-[80%]' : 'w-[90%] h-[60%]';

              const transformStyle = open
                ? getOpenTransform(i) + ' translate(' + paperOffsets[i].x + 'px, ' + paperOffsets[i].y + 'px)'
                : undefined;

              return (
                <a
                  key={i}
                  href={open ? action.link : undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (!open) e.preventDefault();
                    e.stopPropagation(); // Stop bubbling so folder doesn't close immediately on click
                  }}
                  onMouseMove={e => open && handlePaperMouseMove(e, i)}
                  onMouseLeave={e => open && handlePaperMouseLeave(e, i)}
                  className={
                    'absolute bottom-[10%] left-1/2 transition-all duration-300 ease-in-out flex flex-col justify-center items-center gap-2 shadow-sm border border-gray-100 ' +
                    (!open
                      ? 'z-20 transform -translate-x-1/2 translate-y-[10%] group-hover:translate-y-0 pointer-events-none opacity-0'
                      : 'z-50 hover:scale-110 opacity-100') +
                    ' ' + sizeClasses
                  }
                  style={{
                    transform: transformStyle || 'translate(-50%, 10%)',
                    backgroundColor: i === 0 ? paper1 : i === 1 ? paper2 : paper3,
                    borderRadius: '10px',
                    pointerEvents: open ? 'auto' : 'none'
                  }}
                >
                  {/* Icon Content */}
                  <div className="text-gray-800 transition-colors hover:text-black">
                    {action.icon}
                  </div>
                </a>
              );
            })}

            {/* Front Flap 1 (Left skew) */}
            <div
              className={'absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out pointer-events-none' + (!open ? ' group-hover:[transform:skew(15deg)_scaleY(0.6)]' : '')}
              style={{
                backgroundColor: color,
                borderRadius: '5px 10px 10px 10px',
                ...(open && { transform: 'skew(15deg) scaleY(0.6)' })
              }}
            />

            {/* Front Flap 2 (Right skew) */}
            <div
              className={'absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out pointer-events-none' + (!open ? ' group-hover:[transform:skew(-15deg)_scaleY(0.6)]' : '')}
              style={{
                backgroundColor: color,
                borderRadius: '5px 10px 10px 10px',
                ...(open && { transform: 'skew(-15deg) scaleY(0.6)' })
              }}
            />

            {/* FOLDER NAME LABEL */}
            {/* Positioned absolutely in the center, fades out when opened */}
            <div
              className={`absolute inset-0 z-40 flex items-center justify-center pointer-events-none transition-opacity duration-200 ${open ? 'opacity-0' : 'opacity-100'}`}
            >
              <h3 className="text-white font-bold text-sm tracking-wide drop-shadow-md text-center px-2 break-words w-full">
                {name}
              </h3>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Folder;