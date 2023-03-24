import React, { useState, useEffect } from "react";
import { AnimatePresence, motion, useAnimate } from "framer-motion";

// Old CustomSVG, delete after testing is completed
// export const CustomSVG = ({
//     height = 42,
//     width = 42,
//     radius = 20,
//     className = "",
//     type = "circle",
//   }) => {
//     let cx = Math.ceil(width / 2);
//     let cy = Math.ceil(height / 2);
//     return (
//       <svg height={height} width={width} className={className}>
//         {type === "circle" ? (
//           <circle cx={cx} cy={cy} r={radius} className={className} />
//         ) : null}
//         {type === "square" ? (
//           <rect
//             height={height - 2}
//             width={width - 2}
//             x={1}
//             y={1}
//             className={className}
//           />
//         ) : null}
//         {type === "triangle" ? (
//           <polygon
//             points={`${cx},2 ${width - 2},${height - 1} 2,${height - 1}`}
//             className={className}
//           />
//         ) : null}
//       </svg>
//     );
//   };

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i) => {
    const delay = 1 + i * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    };
  },
};

export const CustomSVG = ({
  size = 42,
  className = "",
  type = "circle",
  isStrokeOn = false,
  strokeWidth = 2,
  strokeColor = "black",
}) => {
  const [shapeAttr, setShapeAttr] = useState({});

  useEffect(() => {
    // Use to handle props update
    attrSetter();
  }, [size, type, isStrokeOn, strokeWidth, strokeColor]);

  const attrSetter = () => {
    switch (type) {
      case "circle":
        setShapeAttr(calculateCircle());
        break;
      case "square":
        setShapeAttr(calculateSquare());
        break;
      case "triangle":
        setShapeAttr(calculateTriangle());
        break;
    }
  };

  const calculateCircle = () => {
    if (isStrokeOn) {
      return {
        cx: Math.ceil(size / 2),
        cy: Math.ceil(size / 2),
        r: size / 2 - strokeWidth / 2,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
      };
    }

    return {
      cx: Math.ceil(size / 2),
      cy: Math.ceil(size / 2),
      r: size / 2,
    };
  };

  const calculateSquare = () => {
    if (isStrokeOn) {
      return {
        height: size - strokeWidth,
        width: size - strokeWidth,
        x: strokeWidth / 2,
        y: strokeWidth / 2,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
      };
    }

    return {
      height: size,
      width: size,
      x: 0,
      y: 0,
    };
  };
  const calculateTriangle = () => {
    if (isStrokeOn) {
      return {
        points: `${Math.ceil(size / 2)},${strokeWidth} ${size - strokeWidth},${
          size - strokeWidth / 2
        } ${strokeWidth},${size - strokeWidth / 2}`,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
      };
    }

    return {
      points: `${Math.ceil(size / 2)},0 ${size},${size} 0,${size}`,
    };
  };

  return (
    <AnimatePresence>
      {/* <motion.svg height={size} width={size} initial="hidden" animate="visible" whileHover={{scale: 1.2}} key={type}> */}
        {type === "circle" ? (
          <motion.svg height={size} width={size} initial="hidden" animate="visible" whileHover={{scale: 1.2}} key={type}>
          <motion.circle {...shapeAttr} className={className} variants={draw} />
          </motion.svg>
        ) : type === "square" ? (
          <motion.svg height={size} width={size} initial="hidden" animate="visible" whileHover={{scale: 1.2}} key={type}>
          <motion.rect {...shapeAttr} className={className} variants={draw} />
          </motion.svg>
        ) : type === "triangle" ? (
          <motion.svg height={size} width={size} initial="hidden" animate="visible" whileHover={{scale: 1.2}} key={type}>
          <motion.polygon
            {...shapeAttr}
            variants={draw}
            className={className} 
          />
          </motion.svg>
        ) : null}
      {/* </motion.svg> */}
    </AnimatePresence>
  );
};

export const allNodeColor = [
  {
    name: "gray",
    twfill: "fill-gray-400",
    twtext: "text-gray-400",
    twbg: "bg-gray-400",
  },
  {
    name: "red",
    twfill: "fill-red-400",
    twtext: "text-red-400",
    twbg: "bg-red-400",
  },
  {
    name: "orange",
    twfill: "fill-orange-400",
    twtext: "text-orange-400",
    twbg: "bg-orange-400",
  },
  {
    name: "yellow",
    twfill: "fill-yellow-400",
    twtext: "text-yellow-400",
    twbg: "bg-yellow-400",
  },
  {
    name: "green",
    twfill: "fill-green-400",
    twtext: "text-green-400",
    twbg: "bg-green-400",
  },
  {
    name: "cyan",
    twfill: "fill-cyan-400",
    twtext: "text-cyan-400",
    twbg: "bg-cyan-400",
  },
  {
    name: "blue",
    twfill: "fill-blue-400",
    twtext: "text-blue-400",
    twbg: "bg-blue-400",
  },
  {
    name: "violet",
    twfill: "fill-violet-400",
    twtext: "text-violet-400",
    twbg: "bg-violet-400",
  },
  {
    name: "pink",
    twfill: "fill-pink-400",
    twtext: "text-pink-400",
    twbg: "bg-pink-400",
  },
];

export const getTWFill = (n) => {
  // n is the string of color name such as "pink", "violet" etc.
  const result = allNodeColor.find(({ name }) => name === n);
  return result !== undefined ? result.twfill : "fill-black";
};

export const getTWText = (n) => {
  const result = allNodeColor.find(({ name }) => name === n);
  return result !== undefined ? result.twtext : "text-black";
};

export const getTWbg = (n) => {
  const result = allNodeColor.find(({ name }) => name === n);
  return result !== undefined ? result.twbg : "bg-black";
};
