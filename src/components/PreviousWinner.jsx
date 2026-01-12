import { motion } from 'framer-motion';
import { Trophy, Award } from 'lucide-react';
import './PreviousWinner.css';

const PreviousWinner = ({ winner }) => {
  if (!winner) return null;

  return (
    <motion.div
      className="previous-winner-container"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <div
        className="previous-winner-banner"
        style={{
          borderColor: winner.accentColor,
          background: `linear-gradient(135deg, ${winner.color}33, ${winner.accentColor}22)`
        }}
      >
        <div className="winner-icon-container">
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1.1, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Trophy size={48} color="#FFD700" />
          </motion.div>
        </div>

        <div className="winner-content">
          <div className="winner-header">
            <Award size={20} color="#FFD700" />
            <span className="winner-title">{winner.month} {winner.year} Champion</span>
          </div>
          <div className="winner-name" style={{ color: winner.accentColor }}>
            {winner.childName}
          </div>
          <div className="winner-house">{winner.houseName}</div>
          <div className="winner-points">{winner.points.toLocaleString()} Points</div>
        </div>

        <div className="winner-decoration">
          <motion.div
            className="sparkle"
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ✨
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default PreviousWinner;
