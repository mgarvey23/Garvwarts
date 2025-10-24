import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle,
  XCircle,
  Plus,
  Star,
  Wand2,
  Trash2,
  History,
  Award
} from 'lucide-react';
import './ParentDashboard.css';

const ParentDashboard = ({
  chores,
  houses,
  history,
  onApproveChore,
  onRejectChore,
  onAddChore,
  onDeleteChore,
  onAwardBonusPoints
}) => {
  const [newChoreName, setNewChoreName] = useState('');
  const [newChorePoints, setNewChorePoints] = useState('');
  const [customPoints, setCustomPoints] = useState({});
  const [bonusChild, setBonusChild] = useState('');
  const [bonusPoints, setBonusPoints] = useState('');
  const [bonusReason, setBonusReason] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  const claimedChores = chores.filter(c => c.status === 'claimed');

  const handleApprove = (choreId) => {
    const points = customPoints[choreId] || null;
    onApproveChore(choreId, points);
    setCustomPoints(prev => {
      const newCustom = { ...prev };
      delete newCustom[choreId];
      return newCustom;
    });
  };

  const handleAddChore = (e) => {
    e.preventDefault();
    if (newChoreName.trim() && newChorePoints) {
      onAddChore(newChoreName.trim(), parseInt(newChorePoints));
      setNewChoreName('');
      setNewChorePoints('');
    }
  };

  const handleAwardBonus = (e) => {
    e.preventDefault();
    if (bonusChild && bonusPoints && bonusReason.trim()) {
      onAwardBonusPoints(bonusChild, parseInt(bonusPoints), bonusReason.trim());
      setBonusChild('');
      setBonusPoints('');
      setBonusReason('');
    }
  };

  const getHouseForChild = (childId) => houses[childId];

  return (
    <div className="parent-dashboard">
      <motion.div
        className="dashboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="dashboard-title">
          <Wand2 size={32} /> Headmaster's Office
        </h2>
        <p className="dashboard-subtitle">Manage quests and award house points</p>
      </motion.div>

      {/* Pending Approvals */}
      {claimedChores.length > 0 && (
        <div className="dashboard-section">
          <h3 className="section-title">
            <CheckCircle size={24} /> Pending Approvals
          </h3>
          <div className="approval-grid">
            {claimedChores.map((chore) => {
              const house = getHouseForChild(chore.claimedBy);
              return (
                <motion.div
                  key={chore.id}
                  className="approval-card"
                  style={{ borderColor: house?.accentColor }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="approval-header">
                    <div className="chore-info">
                      <div className="chore-name">{chore.name}</div>
                      <div className="chore-meta" style={{ color: house?.accentColor }}>
                        {house?.name} ({house?.house})
                      </div>
                      <div className="chore-time">
                        Claimed: {new Date(chore.claimedAt).toLocaleString()}
                      </div>
                    </div>
                    <div className="default-points">
                      <Star size={20} fill="#f0c75e" />
                      {chore.points}
                    </div>
                  </div>

                  <div className="approval-actions">
                    <div className="custom-points-input">
                      <label>Custom Points (optional):</label>
                      <input
                        type="number"
                        placeholder={chore.points}
                        value={customPoints[chore.id] || ''}
                        onChange={(e) => setCustomPoints(prev => ({
                          ...prev,
                          [chore.id]: e.target.value ? parseInt(e.target.value) : ''
                        }))}
                        min="0"
                        max="3000"
                      />
                    </div>
                    <div className="action-buttons">
                      <motion.button
                        className="approve-button"
                        onClick={() => handleApprove(chore.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <CheckCircle size={18} /> Approve
                      </motion.button>
                      <motion.button
                        className="reject-button"
                        onClick={() => onRejectChore(chore.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <XCircle size={18} /> Reject
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Award Bonus Points */}
      <div className="dashboard-section">
        <h3 className="section-title">
          <Award size={24} /> Award Bonus Points
        </h3>
        <form className="bonus-form" onSubmit={handleAwardBonus}>
          <div className="form-row">
            <select
              value={bonusChild}
              onChange={(e) => setBonusChild(e.target.value)}
              required
            >
              <option value="">Select Child</option>
              {Object.values(houses).map(house => (
                <option key={house.id} value={house.id}>
                  {house.name} ({house.house})
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Points"
              value={bonusPoints}
              onChange={(e) => setBonusPoints(e.target.value)}
              min="1"
              max="3000"
              required
            />
          </div>
          <input
            type="text"
            placeholder="Reason (e.g., 'Extra kindness shown')"
            value={bonusReason}
            onChange={(e) => setBonusReason(e.target.value)}
            required
          />
          <motion.button
            type="submit"
            className="submit-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Wand2 size={18} /> Award Points
          </motion.button>
        </form>
      </div>

      {/* Add New Chore */}
      <div className="dashboard-section">
        <h3 className="section-title">
          <Plus size={24} /> Add New Quest
        </h3>
        <form className="add-chore-form" onSubmit={handleAddChore}>
          <input
            type="text"
            placeholder="Quest name"
            value={newChoreName}
            onChange={(e) => setNewChoreName(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Points"
            value={newChorePoints}
            onChange={(e) => setNewChorePoints(e.target.value)}
            min="1"
            max="3000"
            required
          />
          <motion.button
            type="submit"
            className="submit-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus size={18} /> Add Quest
          </motion.button>
        </form>
      </div>

      {/* Manage Chores */}
      <div className="dashboard-section">
        <h3 className="section-title">
          <Star size={24} /> Manage Quests
        </h3>
        <div className="chore-list">
          {chores.filter(c => c.status === 'available').map(chore => (
            <motion.div
              key={chore.id}
              className="chore-item"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="chore-item-info">
                <span className="chore-item-name">{chore.name}</span>
                <span className="chore-item-points">
                  <Star size={14} fill="#f0c75e" /> {chore.points}
                </span>
              </div>
              {chore.custom && (
                <motion.button
                  className="delete-button"
                  onClick={() => onDeleteChore(chore.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Trash2 size={16} />
                </motion.button>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* History Toggle */}
      <div className="dashboard-section">
        <button
          className="history-toggle"
          onClick={() => setShowHistory(!showHistory)}
        >
          <History size={20} /> {showHistory ? 'Hide' : 'Show'} History
        </button>

        <AnimatePresence>
          {showHistory && (
            <motion.div
              className="history-section"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              {history.slice(0, 20).map((entry) => {
                const house = getHouseForChild(entry.childId);
                return (
                  <div
                    key={entry.id}
                    className="history-entry"
                    style={{ borderLeftColor: house?.accentColor }}
                  >
                    <div className="history-name" style={{ color: house?.accentColor }}>
                      {entry.childName}
                    </div>
                    <div className="history-reason">{entry.reason}</div>
                    <div className="history-points">+{entry.points} points</div>
                    <div className="history-time">
                      {new Date(entry.timestamp).toLocaleString()}
                    </div>
                  </div>
                );
              })}
              {history.length === 0 && (
                <div className="empty-history">No history yet</div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ParentDashboard;
