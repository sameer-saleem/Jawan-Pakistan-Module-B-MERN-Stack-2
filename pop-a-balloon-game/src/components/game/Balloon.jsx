import { motion } from "framer-motion";
import { useRef, useEffect } from "react";

export default function Balloon({ color, left, isCorrect, onHover }) {
  const startTimeRef = useRef(Date.now());

  return (
    <motion.div
      initial={{ y: 800 }}
      animate={{ y: -900 }}
      transition={{ duration: 11, ease: "linear" }}
      style={{ position: "absolute", left, bottom: -130, cursor: "crosshair" }}
      onClick={() => onHover(Date.now() - startTimeRef.current)}
    >
      <motion.div
        animate={{ x: [0, 40, -40, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      >
        <div style={{
          width: 90,
          height: 110,
          background: color,
          borderRadius: "50%",
          position: "relative",
          boxShadow: "inset -20px -20px 40px rgba(0,0,0,0.3)",
        }}>
          {isCorrect && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 3, 2], opacity: [0, 1, 0] }}
              transition={{ duration: 0.9 }}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: 44,
                fontWeight: "bold",
                color: "white",
                textShadow: "4px 4px 12px black",
                pointerEvents: "none",
              }}
            >
              POP!
            </motion.div>
          )}
        </div>
        <div style={{ width: 5, height: 90, background: "#8B4513", margin: "0 auto" }} />
      </motion.div>
    </motion.div>
  );
}