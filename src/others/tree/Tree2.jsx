import React, { useState } from 'react';

// Data structure representing the tree with exactly 7 leaves
const treeData = {
    id: 'R',
    name: 'Foundation Root',
    children: [
        {
            id: 'A',
            name: 'Strategy A',
            children: [
                { id: 'A1', name: 'Product V1 Launch' }, // Leaf 1
                {
                    id: 'A2',
                    name: 'Marketing B',
                    children: [
                        { id: 'A2i', name: 'SEO Campaign' }, // Leaf 2
                        { id: 'A2ii', name: 'Social Media' }, // Leaf 3
                    ],
                },
            ],
        },
        {
            id: 'B',
            name: 'Operations B',
            children: [
                { id: 'B1', name: 'Logistics Stream' }, // Leaf 4
                {
                    id: 'B2',
                    name: 'Development C',
                    children: [
                        { id: 'B2i', name: 'Module X' }, // Leaf 5
                        { id: 'B2ii', name: 'Module Y' }, // Leaf 6
                        { id: 'B2iii', name: 'Module Z' }, // Leaf 7
                    ],
                },
            ],
        },
    ],
};

/**
 * Recursive component to render a single tree node and its children.
 * It uses absolute positioned divs to draw the connecting lines.
 */
const TreeNode = ({ node, isRoot = false }) => {
    const hasChildren = node.children && node.children.length > 0;
    const isLeaf = !hasChildren;
    
    // Tailwind classes for the node box
    const nodeClasses = `
        p-3 rounded-xl shadow-md transition duration-300 transform hover:scale-[1.03]
        text-center text-sm font-semibold cursor-pointer whitespace-nowrap min-w-[120px] max-w-[180px]
        ${isLeaf
            ? 'bg-emerald-600 text-white shadow-emerald-700/50' // Leaf style
            : 'bg-white border-2 border-indigo-400 text-indigo-900 shadow-xl' // Branch/Root style
        }
    `;

    // Calculate the width for the horizontal crossbar based on children count
    // This is hardcoded for visual Tree2eal based on the structure and spacing
    const getCrossbarWidth = (childrenCount) => {
        if (childrenCount <= 1) return '0px';
        // Adjust this value based on space-x- setting in the children container
        return `${(childrenCount - 1) * 128}px`; 
    };

    return (
        <div className="flex flex-col items-center">
            {/* 1. Node Content Box */}
            <div className={nodeClasses}>
                {node.name}
            </div>

            {/* 2. Connection and Children */}
            {hasChildren && (
                <div className="relative flex flex-col items-center">
                    {/* Vertical Line Down from Parent (if not root, otherwise it's handled by children connection) */}
                    <div className="w-px h-8 bg-gray-400"></div>

                    <div className="flex justify-center w-full relative pt-4">
                        
                        {/* Horizontal Crossbar line - Absolute position for connection */}
                        {/* The line spans from the center of the first child to the center of the last child */}
                        <div 
                            className="absolute top-4 h-px bg-gray-400" 
                            style={{ 
                                width: '90%', // Use a large width and center it
                                left: '5%',
                                right: '5%',
                            }}
                        ></div>

                        {/* Children container with spacing */}
                        <div className="flex justify-center space-x-16">
                            {node.children.map((child, index) => (
                                <div key={child.id} className="flex flex-col items-center relative">
                                    {/* Vertical Line Up to the Crossbar */}
                                    <div className="absolute top-0 w-px h-4 bg-gray-400 z-0"></div>
                                    
                                    {/* Recursive Call */}
                                    <TreeNode node={child} isRoot={false} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Main Tree2 Component
const Tree2 = () => {
    const [title, setTitle] = useState("Organizational Tree Structure");

    return (
        <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center font-sans">
            <script src="https://cdn.tailwindcss.com"></script>
            <div className="text-center mb-10 w-full max-w-4xl">
                <h1 className="text-4xl font-extrabold text-indigo-700 mb-2">{title}</h1>
                <p className="text-gray-500">
                    A responsive visualization of a hierarchical structure with 7 final nodes (leaves) highlighted in green.
                </p>
                <div className="flex justify-center mt-4">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full">
                        Total Leaves: 7
                    </span>
                </div>
            </div>
            
            {/* The Tree Visualization Container */}
            <div className="mt-8 p-6 bg-white rounded-2xl shadow-2xl overflow-x-auto min-w-full lg:min-w-0">
                <div className="flex justify-center min-w-max">
                    <TreeNode node={treeData} isRoot={true} />
                </div>
            </div>
        </div>
    );
};

export default Tree2;