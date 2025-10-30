import { motion, AnimatePresence } from 'framer-motion';
import { Award, Star, Trophy, Zap, Crown, Sparkles } from 'lucide-react';
import './AchievementBadge.css';

const achievements = [
  { id: 'first_quest', name: 'First Quest', description: 'Complete your first quest', points: 1, icon: Star },
  { id: 'hundred_club', name: '100 Point Club', description: 'Earn 100 points', points: 100, icon: Award },
  { id: 'five_hundred', name: 'Rising Star', description: 'Reach 500 points', points: 500, icon: Sparkles },
  { id: 'thousand', name: 'House Champion', description: 'Earn 1,000 points', points: 1000, icon: Trophy },
  { id: 'two_thousand', name: 'Legendary Wizard', description: 'Reach 2,000 points', points: 2000, icon: Zap },
  { id: 'three_thousand', name: 'Grand Master', description: 'Achieve 3,000 points', points: 3000, icon: Crown },
];

export const getAchievements = (points) => {
  return achievements.filter(achievement => points >= achievement.points);
};

export const getNewAchievements = (oldPoints, newPoints) => {
  return achievements.filter(
    achievement => oldPoints < achievement.points && newPoints >= achievement.points
  );
};

const AchievementBadge = ({ achievement, color, onDismiss }) => {
  if (!achievement) return null;

  const Icon = achievement.icon;

  return (
    <AnimatePresence>
      <motion.div
        className="achievement-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onDismiss}
      >
        <motion.div
          className="achievement-badge"
          style={{ borderColor: color }}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <motion.div
            className="achievement-glow"
            style={{ backgroundColor: color }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <div className="achievement-icon" style={{ color }}>
            <Icon size={64} />
          </div>

          <h2 className="achievement-title">Achievement Unlocked!</h2>
          <h3 className="achievement-name" style={{ color }}>{achievement.name}</h3>
          <p className="achievement-description">{achievement.description}</p>

          <motion.div
            className="achievement-stars"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <Star size={20} fill={color} color={color} />
              </motion.div>
            ))}
          </motion.div>

          <p className="achievement-dismiss">Click anywhere to continue</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AchievementBadge;
