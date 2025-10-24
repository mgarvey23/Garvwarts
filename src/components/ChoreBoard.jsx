import { motion } from 'framer-motion';
import { Star, Clock, CheckCircle } from 'lucide-react';
import './ChoreBoard.css';

const ChoreBoard = ({ chores, houses, onClaimChore, onReleaseChore }) => {
  const availableChores = chores.filter(c => c.status === 'available');
  const claimedChores = chores.filter(c => c.status === 'claimed');

  const getHouseForChild = (childId) => houses[childId];

  const handleClaim = (choreId, childId) => {
    onClaimChore(choreId, childId);
  };

  const handleRelease = (choreId) => {
    onReleaseChore(choreId);
  };

  return (
    <div className="chore-board">
      <motion.div
        className="board-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="board-title">📜 Quest Board</h2>
        <p className="board-subtitle">Choose your quests wisely, young wizards!</p>
      </motion.div>

      {/* Claimed/In Progress Chores */}
      {claimedChores.length > 0 && (
        <div className="chore-section">
          <h3 className="section-title">
            <Clock size={20} /> Quests In Progress
          </h3>
          <div className="chore-grid">
            {claimedChores.map((chore, index) => {
              const house = getHouseForChild(chore.claimedBy);
              return (
                <motion.div
                  key={chore.id}
                  className="chore-card claimed"
                  style={{ borderColor: house?.accentColor }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="chore-header">
                    <div className="chore-name">{chore.name}</div>
                    <div className="chore-points" style={{ color: house?.accentColor }}>
                      <Star size={16} fill={house?.accentColor} />
                      {chore.points}
                    </div>
                  </div>
                  <div className="chore-claimed-by" style={{ color: house?.accentColor }}>
                    Claimed by {house?.name} ({house?.house})
                  </div>
                  <motion.button
                    className="chore-button release"
                    onClick={() => handleRelease(chore.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Release Quest
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Available Chores */}
      <div className="chore-section">
        <h3 className="section-title">
          <Star size={20} /> Available Quests
        </h3>
        <div className="chore-grid">
          {availableChores.map((chore, index) => (
            <motion.div
              key={chore.id}
              className="chore-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)' }}
            >
              <div className="chore-header">
                <div className="chore-name">{chore.name}</div>
                <div className="chore-points">
                  <Star size={16} fill="#f0c75e" />
                  {chore.points}
                </div>
              </div>
              <div className="claim-buttons">
                {Object.values(houses).map(house => (
                  <motion.button
                    key={house.id}
                    className="claim-button"
                    style={{
                      backgroundColor: house.color,
                      borderColor: house.accentColor
                    }}
                    onClick={() => handleClaim(chore.id, house.id)}
                    whileHover={{ scale: 1.05, brightness: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {house.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {availableChores.length === 0 && claimedChores.length === 0 && (
        <motion.div
          className="empty-state"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p>No quests available at the moment. Check back soon!</p>
        </motion.div>
      )}
    </div>
  );
};

export default ChoreBoard;
