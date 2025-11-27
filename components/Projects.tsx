"use client";

import React, { useState, useRef } from 'react';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import { Github, Eye, ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/neon-button"
import Link from 'next/link';


// --- Start of ProjectFolder Component (Customized Folder) ---

interface FolderProps {
  name: string; // Name of the project (replaces projectName)
  githubUrl?: string;
  previewUrl?: string;
  contactUrl?: string; // Required for the 'Buy' link
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

const ProjectFolder: React.FC<FolderProps> = ({
  name,
  githubUrl = '#',
  previewUrl = '#',
  contactUrl = '#',
  color = '#5227FF',
  size = 1.3, // Default size increased for visibility in the grid
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
    { icon: <ShoppingCart size={20} />, link: contactUrl, label: 'Buy' } // Changed label for clarity
  ];

  const handleClick = (e: React.MouseEvent) => {
    // Toggle open state
    setOpen(prev => !prev);
    if (open) {
      setPaperOffsets(Array.from({ length: 3 }, () => ({ x: 0, y: 0 })));
    }
  };

  const handlePaperMouseMove = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, index: number) => {
    if (!open) return;
    e.stopPropagation();
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
    if (index === 2) return 'translate(-50%, -100%) rotate(5deg)';  // Top (Buy/Contact)
    return '';
  };

  const scaledWidth = 100 * size;
  const scaledHeight = 90 * size;

  return (
    <div
      className={className + ' relative flex justify-center items-center'}
      style={{ width: scaledWidth + 'px', height: scaledHeight + 'px' }}
    >
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
              // Sizes for stacking effect
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
                    'absolute bottom-[10%] left-1/2 transition-all duration-300 ease-in-out flex flex-col justify-center items-center gap-2 shadow-md border border-gray-100/50 cursor-pointer ' +
                    (!open
                      ? 'z-20 transform -translate-x-1/2 translate-y-[10%] group-hover:translate-y-0 pointer-events-none opacity-0'
                      : 'z-50 hover:scale-110 opacity-100 hover:shadow-xl') +
                    ' ' + sizeClasses
                  }
                  style={{
                    transform: transformStyle || 'translate(-50%, 10%)',
                    backgroundColor: i === 0 ? paper1 : i === 1 ? paper2 : paper3,
                    borderRadius: '10px',
                    pointerEvents: open ? 'auto' : 'none',
                    // Added a min-height to ensure clickability
                    minHeight: '40px'
                  }}
                >
                  {/* Icon Content */}
                  <div className="text-gray-700 transition-colors">
                    {action.icon}
                  </div>
                  <span className='text-xs font-semibold text-gray-500'>
                    {action.label}
                  </span>
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

          </div>
        </div>
      </div>
    </div>
  );
};

// --- End of ProjectFolder Component ---


// --- Start of Projects Component ---

interface Project {
  id: string;
  name: string;
  githubUrl: string;
  previewUrl?: string;
  contactUrl?: string; // Added contact URL for the 'Buy' icon/link
  color: string;
}

const projectsData: Project[] = [
  {
    id: '1',
    name: 'Gym Management Software',
    githubUrl: 'https://github.com/Sameedshah/gym-management-system',
    previewUrl: 'https://github.com/Sameedshah/gym-management-system',
    contactUrl: 'mailto:sameedshahdev@gmail.com?subject=Inquiry about Gym Management Software',
    color: '#5227FF'
  },
  {
    id: '2',
    name: 'EvoLeads: Lead Generation SaaS',
    githubUrl: 'https://github.com/Evotechstudio/evoleads',
    previewUrl: 'https://evoleads.evotechstudio.dev',
    contactUrl: 'mailto:sameedshahdev@gmail.com?subject=Inquiry about EvoLeads SaaS',
    color: '#5227FF'
  },
  {
    id: '3',
    name: 'Vidify AI',
    githubUrl: 'https://github.com/Sameedshah/vidifyai',
    previewUrl: 'https://vidify-ai.vercel.app',
    contactUrl: 'mailto:sameedshahdev@gmail.com?subject=Inquiry about Vidify AI App',
    color: '#5227FF'
  },
  {
    id: '4',
    name: 'Financial Data Analyst',
    githubUrl: 'https://github.com/Sameedshah/financial-data-analyst',
    previewUrl: 'visualai-eight.vercel.app',
    contactUrl: 'mailto:sameedshahdev@gmail.com?subject=Inquiry about Portfolio Website',
    color: '#5227FF'
  }
];

export default function Projects() {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef(null);
  // Trigger animation when 200px of the section is visible
  const isInView = useInView(ref, { once: true, margin: '-200px' });

  // Animation variants
  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // Folders will fade in and scale up slightly
  const itemVariants = {
    initial: {
      opacity: 0,
      y: 30,
      scale: 0.95
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  };

  // Title will fade in and move up
  const titleVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut' as const
      }
    }
  };

  // Reduced motion fallback
  const reducedMotionVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeOut' as const }
    }
  };

  return (
    <section
      id="projects"
      ref={ref}
      className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-black text-white relative z-10"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <motion.div
          variants={shouldReduceMotion ? reducedMotionVariants : titleVariants}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 text-white">
            <span className="bg-clip-text text-transparent text-white">
              Featured Projects
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            Explore my latest work and open-source contributions. Click a folder to see links.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={shouldReduceMotion ? reducedMotionVariants : containerVariants}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="flex flex-wrap justify-center gap-x-12 gap-y-16 sm:gap-x-16 lg:gap-x-20"
        >
          {projectsData.map((project) => (
            <motion.div
              key={project.id}
              variants={shouldReduceMotion ? reducedMotionVariants : itemVariants}
              className="flex flex-col items-center"
            >
              <div className="flex items-center justify-center w-[130px]">
                <ProjectFolder
                  name={project.name}
                  githubUrl={project.githubUrl}
                  previewUrl={project.previewUrl}
                  contactUrl={project.contactUrl}
                  color={project.color}
                  size={1.3}
                />
              </div>
              <p className='text-sm font-medium ml-6 text-center mt-6 text-white break-words leading-tight max-w-[130px]'>
                {project.name}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-20"
        >
          <p className="text-gray-300 mb-4 text-lg">
            Want to see more of my code?
          </p>

          <Link
            href="https://github.com/Sameedshah"
            target="_blank"
            className="inline-block"
          >
            <Button className="px-6 py-3 font-semibold flex items-center gap-2">
              <Github className="w-5 h-5" />
              View All Code on GitHub
            </Button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}