'use client';

import React from 'react';
import { motion } from 'framer-motion';

const nodes = [
  { id: 1, label: 'Logic', x: '20%', y: '25%', color: '#4A6741' },
  { id: 2, label: 'Communication', x: '50%', y: '15%', color: '#607D8B' },
  { id: 3, label: 'Confidence', x: '80%', y: '30%', color: '#4A6741' },
  { id: 4, label: 'STAR Method', x: '15%', y: '55%', color: '#607D8B' },
  { id: 5, label: 'Resume', x: '45%', y: '45%', color: '#4A6741' },
  { id: 6, label: 'Technical Skills', x: '75%', y: '60%', color: '#607D8B' },
  { id: 7, label: 'HR', x: '35%', y: '80%', color: '#4A6741' },
  { id: 8, label: 'Feedback', x: '65%', y: '85%', color: '#607D8B' },
];

const connections = [
  [1, 2], [1, 4], [2, 3], [2, 5], [3, 6], 
  [4, 5], [4, 7], [5, 6], [5, 7], [5, 8], [6, 8]
];

export default function KnowledgeGraph() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <motion.svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full opacity-30"
        initial={{ x: 20, y: 20 }}
        animate={{ 
          x: [-10, 10, -10],
          y: [-10, 10, -10],
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <defs>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Connections */}
        {connections.map(([fromId, toId], index) => {
          const from = nodes.find(n => n.id === fromId)!;
          const to = nodes.find(n => n.id === toId)!;
          return (
            <motion.line
              key={`line-${index}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="#607D8B"
              strokeWidth="1"
              strokeOpacity="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ duration: 2, delay: index * 0.1 }}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => (
          <motion.g
            key={`node-${node.id}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", duration: 0.8, delay: node.id * 0.1 }}
          >
            {/* Soft Glow */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="40"
              fill={node.color}
              className="text-current"
              style={{ color: node.color }}
              animate={{ 
                r: [40, 50, 40],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: node.id * 0.2
              }}
            />
            
            {/* Inner Circle */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="6"
              fill={node.color}
              animate={{ 
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />

            {/* Label */}
            <text
              x={node.x}
              y={node.y}
              dy="30"
              textAnchor="middle"
              fill={node.color}
              className="text-[14px] font-medium tracking-wide uppercase pointer-events-none"
              style={{ fill: node.color, filter: 'drop-shadow(0px 0px 4px rgba(255,255,255,0.8))' }}
            >
              {node.label}
            </text>
          </motion.g>
        ))}
      </motion.svg>
    </div>
  );
}
