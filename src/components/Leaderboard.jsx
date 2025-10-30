import { motion } from 'framer-motion';
import { Trophy, Medal, Award } from 'lucide-react';
import './Leaderboard.css';

const Leaderboard = ({ houses }) => {
  // Sort houses by points
  const sortedHouses = Object.values(houses).sort((a, b) => b.points - a.points);

  const getRankIcon = (index) => {
    switch (index) {
      case 0:
        return <Trophy size={32} />;
      case 1:
        return <Medal size={28} />;
      case 2:
        return <Award size={24} />;
      default:
        return null;
    }
  };

  const getRankLabel = (index) => {
    switch (index) {
      case 0:
        return '1st Place';
      case 1:
        return '2nd Place';
      case 2:
        return '3rd Place';
      default:
        return `${index + 1}th Place`;
    }
  };

  return (
    <div className="leaderboard">
      <motion.div
        className="leaderboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Trophy size={36} className="leaderboard-trophy" />
        <h2 className="leaderboard-title">House Standings</h2>
      </motion.div>

      <div className="leaderboard-list">
        {sortedHouses.map((house, index) => (
          <motion.div
            key={house.id}
            className={`leaderboard-item rank-${index + 1}`}
            style={{
              borderColor: house.accentColor,
              background: `linear-gradient(135deg, ${house.color}22, ${house.accentColor}11)`
            }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, x: 5 }}
          >
            <div className="leaderboard-rank" style={{ color: house.accentColor }}>
              {getRankIcon(index)}
              <span className="rank-label">{getRankLabel(index)}</span>
            </div>

            <div className="leaderboard-house-info">
              <div className="house-name-large">{house.name}</div>
              <div className="house-label" style={{ color: house.accentColor }}>
                {house.house}
              </div>
            </div>

            <div className="leaderboard-points" style={{ color: house.accentColor }}>
              <span className="points-value">{house.points.toLocaleString()}</span>
              <span className="points-text">points</span>
            </div>

            {index === 0 && house.points > 0 && (
              <motion.div
                className="crown-badge"
                initial={{ rotate: -20, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
              >
                👑
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {sortedHouses[0].points > 0 && (
        <motion.div
          className="leader-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {sortedHouses[0].name} is leading the House Cup!
        </motion.div>
      )}
    </div>
  );
};

export default Leaderboard;
