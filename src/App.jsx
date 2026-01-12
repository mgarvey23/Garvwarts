import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Home, Scroll, Shield } from 'lucide-react';
import HouseGlass from './components/HouseGlass';
import ChoreBoard from './components/ChoreBoard';
import ParentDashboard from './components/ParentDashboard';
import Leaderboard from './components/Leaderboard';
import PreviousWinner from './components/PreviousWinner';
import MagicalParticles from './components/MagicalParticles';
import AchievementBadge, { getNewAchievements } from './components/AchievementBadge';
import {
  loadData,
  saveData,
  claimChore,
  releaseChore,
  approveChore,
  rejectChore,
  addChore,
  deleteChore,
  addPoints,
  deductPoints,
  resetHousePoints,
  resetAllPoints,
  verifyPassword
} from './utils/dataStore';
import './App.css';

function App() {
  const [data, setData] = useState(loadData());
  const [currentView, setCurrentView] = useState('home'); // home, chores, parent
  const [isParentAuthenticated, setIsParentAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [particleTrigger, setParticleTrigger] = useState(0);
  const [particleColor, setParticleColor] = useState('#f0c75e');
  const [currentAchievement, setCurrentAchievement] = useState(null);

  // Save data whenever it changes
  useEffect(() => {
    saveData(data);
  }, [data]);

  // Handle claiming a chore
  const handleClaimChore = (choreId, childId) => {
    const newData = claimChore(data, choreId, childId);
    setData(newData);
  };

  // Handle releasing a chore
  const handleReleaseChore = (choreId) => {
    const newData = releaseChore(data, choreId);
    setData(newData);
  };

  // Handle approving a chore
  const handleApproveChore = (choreId, customPoints) => {
    // Get the chore to find out who claimed it
    const chore = data.chores.find(c => c.id === choreId);
    if (chore && chore.claimedBy) {
      const oldPoints = data.houses[chore.claimedBy].points;
      const pointsToAward = customPoints || chore.points;

      // Approve chore
      const newData = approveChore(data, choreId, customPoints);
      setData(newData);

      // Trigger particle effect
      setParticleColor(data.houses[chore.claimedBy].accentColor);
      setParticleTrigger(prev => prev + 1);

      // Check for new achievements
      const newAchievements = getNewAchievements(oldPoints, oldPoints + pointsToAward);
      if (newAchievements.length > 0) {
        setCurrentAchievement(newAchievements[0]);
      }
    } else {
      const newData = approveChore(data, choreId, customPoints);
      setData(newData);
    }
  };

  // Handle rejecting a chore
  const handleRejectChore = (choreId) => {
    const newData = rejectChore(data, choreId);
    setData(newData);
  };

  // Handle adding a new chore
  const handleAddChore = (name, points) => {
    const newData = addChore(data, name, points);
    setData(newData);
  };

  // Handle deleting a chore
  const handleDeleteChore = (choreId) => {
    const newData = deleteChore(data, choreId);
    setData(newData);
  };

  // Handle awarding bonus points
  const handleAwardBonusPoints = (childId, points, reason) => {
    const oldPoints = data.houses[childId].points;
    const newData = addPoints(data, childId, points, reason);
    setData(newData);

    // Trigger particle effect
    setParticleColor(data.houses[childId].accentColor);
    setParticleTrigger(prev => prev + 1);

    // Check for new achievements
    const newAchievements = getNewAchievements(oldPoints, oldPoints + points);
    if (newAchievements.length > 0) {
      setCurrentAchievement(newAchievements[0]);
    }
  };

  // Handle deducting points
  const handleDeductPoints = (childId, points, reason) => {
    const newData = deductPoints(data, childId, points, reason);
    setData(newData);
  };

  // Handle resetting house points
  const handleResetHousePoints = (childId) => {
    const newData = resetHousePoints(data, childId);
    setData(newData);
  };

  // Handle resetting all points
  const handleResetAllPoints = () => {
    const newData = resetAllPoints(data);
    setData(newData);
  };

  // Handle parent login
  const handleParentLogin = (e) => {
    e.preventDefault();
    if (verifyPassword(data, passwordInput)) {
      setIsParentAuthenticated(true);
      setPasswordError('');
      setPasswordInput('');
      setCurrentView('parent');
    } else {
      setPasswordError('Incorrect password! Try "accio"');
      setPasswordInput('');
    }
  };

  // Handle navigation
  const handleNavigation = (view) => {
    // If navigating away from parent view, log out
    if (currentView === 'parent' && view !== 'parent') {
      setIsParentAuthenticated(false);
      setPasswordInput('');
      setPasswordError('');
    }
    // Always set the view - the view itself handles authentication
    setCurrentView(view);
  };

  // Handle logout
  const handleLogout = () => {
    setIsParentAuthenticated(false);
    setPasswordInput('');
    setPasswordError('');
    setCurrentView('home');
  };

  return (
    <div className="app">
      {/* Magical background elements */}
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>

      {/* Navigation */}
      <nav className="nav">
        <div className="nav-brand">
          <Shield size={32} />
          <span className="nav-title">Garvwarts</span>
        </div>
        <div className="nav-links">
          <motion.button
            className={`nav-button ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => handleNavigation('home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Home size={20} />
            <span>House Cup</span>
          </motion.button>
          <motion.button
            className={`nav-button ${currentView === 'chores' ? 'active' : ''}`}
            onClick={() => handleNavigation('chores')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Scroll size={20} />
            <span>Quest Board</span>
          </motion.button>
          <motion.button
            className={`nav-button ${currentView === 'parent' ? 'active' : ''}`}
            onClick={() => handleNavigation('parent')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Lock size={20} />
            <span>Headmaster</span>
          </motion.button>
        </div>
      </nav>

      {/* Main content */}
      <main className="main-content">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div
              key="home"
              className="view-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="home-header">
                <motion.h1
                  className="main-title"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  The House Cup
                </motion.h1>
                <p className="main-subtitle">
                  May the best house win! Complete quests to earn house points.
                </p>
              </div>

              <PreviousWinner winner={data.previousMonthWinner} />

              <Leaderboard houses={data.houses} />

              <div className="houses-container">
                {Object.values(data.houses).map((house, index) => (
                  <motion.div
                    key={house.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 + 0.4, duration: 0.6 }}
                  >
                    <HouseGlass house={house} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {currentView === 'chores' && (
            <motion.div
              key="chores"
              className="view-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ChoreBoard
                chores={data.chores}
                houses={data.houses}
                onClaimChore={handleClaimChore}
                onReleaseChore={handleReleaseChore}
              />
            </motion.div>
          )}

          {currentView === 'parent' && !isParentAuthenticated && (
            <motion.div
              key="login"
              className="view-container"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className="login-container">
                <motion.div
                  className="login-box"
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Lock size={48} className="login-icon" />
                  <h2 className="login-title">Headmaster Access</h2>
                  <p className="login-subtitle">Enter the password to continue</p>
                  <form onSubmit={handleParentLogin}>
                    <input
                      type="password"
                      className="login-input"
                      placeholder="Enter password"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      autoFocus
                    />
                    {passwordError && (
                      <motion.div
                        className="login-error"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {passwordError}
                      </motion.div>
                    )}
                    <motion.button
                      type="submit"
                      className="login-button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Unlock
                    </motion.button>
                  </form>
                </motion.div>
              </div>
            </motion.div>
          )}

          {currentView === 'parent' && isParentAuthenticated && (
            <motion.div
              key="parent"
              className="view-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ParentDashboard
                chores={data.chores}
                houses={data.houses}
                history={data.history}
                onApproveChore={handleApproveChore}
                onRejectChore={handleRejectChore}
                onAddChore={handleAddChore}
                onDeleteChore={handleDeleteChore}
                onAwardBonusPoints={handleAwardBonusPoints}
                onDeductPoints={handleDeductPoints}
                onResetHousePoints={handleResetHousePoints}
                onResetAllPoints={handleResetAllPoints}
                onLogout={handleLogout}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Magical particle effects */}
      <MagicalParticles color={particleColor} trigger={particleTrigger} />

      {/* Achievement popup */}
      {currentAchievement && (
        <AchievementBadge
          achievement={currentAchievement}
          color={particleColor}
          onDismiss={() => setCurrentAchievement(null)}
        />
      )}
    </div>
  );
}

export default App;
