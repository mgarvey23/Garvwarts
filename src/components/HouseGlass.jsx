import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import './HouseGlass.css';

const HouseGlass = ({ house }) => {
  const MAX_POINTS = 3000;
  const fillPercentage = Math.min((house.points / MAX_POINTS) * 100, 100);
  const isOverflowing = house.points > MAX_POINTS;
  const overflowAmount = house.points - MAX_POINTS;

  return (
    <div className="house-glass-container">
      <motion.div
        className="house-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="house-name">{house.name}</h2>
        <div className="house-badge">{house.house}</div>
      </motion.div>

      <div className="glass-wrapper">
        {/* Magical sparkles */}
        {house.points > 0 && (
          <motion.div
            className="sparkles"
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sparkles size={24} color={house.accentColor} />
          </motion.div>
        )}

        {/* The glass container */}
        <div className="glass" style={{ borderColor: house.accentColor }}>
          {/* Overflow effect - liquid spilling over */}
          {isOverflowing && (
            <motion.div
              className="overflow-liquid"
              style={{
                background: `linear-gradient(180deg, ${house.color}, ${house.accentColor})`
              }}
              initial={{ height: 0 }}
              animate={{
                height: ['20px', '30px', '20px'],
                opacity: [0.7, 0.9, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}

          {/* The liquid fill */}
          <motion.div
            className="liquid"
            style={{
              background: `linear-gradient(180deg, ${house.accentColor}, ${house.color})`
            }}
            initial={{ height: 0 }}
            animate={{ height: `${fillPercentage}%` }}
            transition={{
              duration: 1.5,
              ease: "easeOut"
            }}
          >
            {/* Bubbles effect */}
            {house.points > 0 && (
              <>
                <div className="bubble bubble-1" style={{ background: house.accentColor }} />
                <div className="bubble bubble-2" style={{ background: house.accentColor }} />
                <div className="bubble bubble-3" style={{ background: house.accentColor }} />
              </>
            )}

            {/* Shine effect */}
            <div className="shine" />
          </motion.div>

          {/* Glass highlight overlay */}
          <div className="glass-highlight" />
        </div>

        {/* Points display */}
        <motion.div
          className="points-display"
          key={house.points}
          initial={{ scale: 1.3, color: house.accentColor }}
          animate={{ scale: 1, color: '#fff' }}
          transition={{ duration: 0.5 }}
        >
          <span className="points-number">{house.points.toLocaleString()}</span>
          <span className="points-label">points</span>
          {isOverflowing && (
            <motion.div
              className="overflow-badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              +{overflowAmount.toLocaleString()} overflow!
            </motion.div>
          )}
        </motion.div>

        {/* Progress indicator */}
        <div className="progress-label">
          {fillPercentage.toFixed(1)}% full
        </div>
      </div>
    </div>
  );
};

export default HouseGlass;
