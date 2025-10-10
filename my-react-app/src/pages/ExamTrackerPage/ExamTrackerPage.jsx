import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getProgressTree, getConceptDetail } from "../../api";

const NODE_SIZE = 80; // diameter of nodes
const H_SPACING = 220; // horizontal spacing between levels
const V_SPACING = 120; // vertical spacing between sibling nodes

// Curved connection line
const Connection = ({ x1, y1, x2, y2 }) => {
  const cx = (x1 + x2) / 2;
  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
      <path
        d={`M${x1 + NODE_SIZE / 2},${y1 + NODE_SIZE / 2} C${cx},${y1 + NODE_SIZE / 2} ${cx},${y2 + NODE_SIZE / 2} ${x2 + NODE_SIZE / 2},${y2 + NODE_SIZE / 2}`}
        stroke="gray"
        strokeWidth={2}
        fill="transparent"
      />
    </svg>
  );
};

const TreeNode = ({ node, level = 0, x, y, onClickNode }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {/* Connections to children */}
      {expanded &&
        node.children &&
        node.children.map((child, idx) => {
          const childX = x + H_SPACING;
          const childY = y + idx * V_SPACING;
          return <Connection key={idx} x1={x} y1={y} x2={childX} y2={childY} />;
        })}

      {/* Node */}
      <motion.div
        layout
        className="absolute w-20 h-20 rounded-full flex items-center justify-center text-white font-bold cursor-pointer shadow-lg"
        style={{
          left: x,
          top: y,
          backgroundColor: node.masteryColor || "#3B82F6",
        }}
        onClick={() => {
          setExpanded(!expanded);
          onClickNode(node);
        }}
        whileHover={{ scale: 1.1 }}
      >
        {node.name}
      </motion.div>

      {/* Children */}
      <AnimatePresence>
        {expanded &&
          node.children &&
          node.children.map((child, idx) => {
            const childX = x + H_SPACING;
            const childY = y + idx * V_SPACING;
            return (
              <TreeNode
                key={idx}
                node={child}
                level={level + 1}
                x={childX}
                y={childY}
                onClickNode={onClickNode}
              />
            );
          })}
      </AnimatePresence>
    </>
  );
};

export default function ExamTrackerGame() {
  const [tree, setTree] = useState([]);
  const [selectedConcept, setSelectedConcept] = useState(null);

  useEffect(() => {
    async function fetchTree() {
      const data = await getProgressTree();

      const mapped = data.map((subject) => ({
        name: subject.subject_name,
        children: subject.topics.map((topic) => ({
          name: topic.topic_name,
          children: topic.subtopics.map((sub) => ({
            name: sub.subtopic_name,
            children: sub.concepts.map((c) => ({
              name: c.concept_name,
              conceptId: c.concept_id,
              masteryColor: `rgb(${Math.floor((1 - c.mastery) * 255)}, ${
                Math.floor(c.mastery * 200 + 55)
              }, 50)`,
            })),
          })),
        })),
      }));

      setTree(mapped);
    }
    fetchTree();
  }, []);

  const handleClickNode = async (node) => {
    if (node.conceptId) {
      const detail = await getConceptDetail(node.conceptId);
      setSelectedConcept(detail);
    }
  };

  return (
    <div className="relative w-full h-screen bg-gray-100 overflow-auto">
      {tree.map((node, idx) => (
        <TreeNode key={idx} node={node} x={50} y={50 + idx * V_SPACING} onClickNode={handleClickNode} />
      ))}

      {/* Concept Modal */}
      <AnimatePresence>
        {selectedConcept && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedConcept(null)}
          >
            <motion.div
              className="bg-white p-6 rounded shadow-lg w-96"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-2">{selectedConcept.concept_name}</h2>
              <p>Mastery: {(selectedConcept.mastery * 100).toFixed(0)}%</p>
              <p>Points: {selectedConcept.points}</p>
              <p>Streak: {selectedConcept.streak}</p>
              <p>Next Review: {selectedConcept.next_review}</p>
              <button
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => alert("Start Quiz for this concept")}
              >
                Start Quiz
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}




// import React, { useEffect, useState } from "react";
// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
// import { getProgressTree, getConceptDetail } from "../../api";
// import { motion, AnimatePresence } from "framer-motion";

// // Node component
// const TreeNode = ({ node, handleClick }) => {
//   const masteryColor = (mastery) => {
//     const r = Math.floor((1 - mastery) * 255);
//     const g = Math.floor(mastery * 200 + 55);
//     return `rgb(${r},${g},50)`;
//   };

//   return (
//     <motion.div
//       className="absolute p-3 rounded-lg cursor-pointer border-2 text-center"
//       style={{
//         left: node.x,
//         top: node.y,
//         backgroundColor: masteryColor(node.mastery || 0),
//         width: 120,
//       }}
//       onClick={() => handleClick(node.concept_id)}
//     >
//       {node.concept_name || node.name}
//     </motion.div>
//   );
// };

// // Connection lines between nodes
// const TreeConnection = ({ x1, y1, x2, y2 }) => (
//   <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
//     <line
//       x1={x1 + 60} // node width / 2
//       y1={y1 + 20} // node height / 2
//       x2={x2 + 60}
//       y2={y2 + 20}
//       stroke="black"
//       strokeWidth={2}
//     />
//   </svg>
// );

// const ExamTrackerTree = () => {
//   const [tree, setTree] = useState([]);
//   const [selectedConcept, setSelectedConcept] = useState(null);

//   useEffect(() => {
//     async function fetchTree() {
//       const data = await getProgressTree();
//       setTree(data);
//     }
//     fetchTree();
//   }, []);

//   // Recursive function to flatten tree with x/y positions
//   const layoutTree = (nodes, startX = 50, startY = 50, levelSpacing = 200, verticalSpacing = 120) => {
//     let positions = [];

//     const recurse = (node, x, y, parent = null) => {
//       const nodeId = node.concept_id || node.topic_name || node.subtopic_name || node.subject_name;
//       const newNode = {
//         ...node,
//         key: nodeId,
//         x,
//         y,
//         parent,
//       };
//       positions.push(newNode);

//       const children = node.topics || node.subtopics || node.concepts || [];
//       children.forEach((child, idx) => {
//         recurse(child, x + levelSpacing, y + idx * verticalSpacing, newNode);
//       });
//     };

//     nodes.forEach((node, idx) => recurse(node, startX, startY + idx * verticalSpacing * 2));
//     return positions;
//   };

//   const positionedNodes = layoutTree(tree);

//   const handleConceptClick = async (conceptId) => {
//     const detail = await getConceptDetail(conceptId);
//     setSelectedConcept(detail);
//   };

//   return (
//     <div className="p-6 min-h-screen bg-gray-100">
//       <h1 className="text-3xl font-bold mb-6 text-center">Exam Tracker Tree</h1>

//       <TransformWrapper
//         initialScale={1}
//         minScale={0.5}
//         maxScale={2}
//         wheel={{ step: 0.1 }}
//         doubleClick={{ disabled: true }}
//       >
//         {({ zoomIn, zoomOut, resetTransform }) => (
//           <>
//             <div className="mb-4 flex gap-2 justify-center">
//               <button onClick={zoomIn} className="px-4 py-2 bg-blue-500 text-white rounded">Zoom In</button>
//               <button onClick={zoomOut} className="px-4 py-2 bg-blue-500 text-white rounded">Zoom Out</button>
//               <button onClick={resetTransform} className="px-4 py-2 bg-gray-500 text-white rounded">Reset</button>
//             </div>
//             <TransformComponent>
//               <div className="relative w-[3000px] h-[2000px]">
//                 {positionedNodes.map((node) => (
//                   <React.Fragment key={node.key}>
//                     {node.parent && (
//                       <TreeConnection
//                         x1={node.parent.x}
//                         y1={node.parent.y}
//                         x2={node.x}
//                         y2={node.y}
//                       />
//                     )}
//                     <TreeNode node={node} handleClick={handleConceptClick} />
//                   </React.Fragment>
//                 ))}
//               </div>
//             </TransformComponent>
//           </>
//         )}
//       </TransformWrapper>

//       {/* Concept Modal */}
//       <AnimatePresence>
//         {selectedConcept && (
//           <motion.div
//             className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setSelectedConcept(null)}
//           >
//             <motion.div
//               className="bg-white p-6 rounded shadow-lg w-96"
//               initial={{ scale: 0.8 }}
//               animate={{ scale: 1 }}
//               exit={{ scale: 0.8 }}
//               onClick={(e) => e.stopPropagation()}
//             >
//               <h2 className="text-xl font-bold mb-2">{selectedConcept.concept_name}</h2>
//               <p>Mastery: {(selectedConcept.mastery * 100).toFixed(0)}%</p>
//               <p>Points: {selectedConcept.points}</p>
//               <p>Streak: {selectedConcept.streak}</p>
//               <p>Next Review: {selectedConcept.next_review}</p>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default ExamTrackerTree;
