// Data structure and localStorage utilities for Garvwarts House Points

const STORAGE_KEY = 'garvwarts_data';
const PARENT_PASSWORD = 'accio'; // Default password, can be changed

// Initial data structure
const initialData = {
  houses: {
    clayton: {
      id: 'clayton',
      name: 'Clayton',
      house: 'Slytherin',
      color: '#1a472a', // Dark green
      accentColor: '#2a623d',
      points: 0
    },
    avery: {
      id: 'avery',
      name: 'Avery',
      house: 'Ravenclaw',
      color: '#2a5298', // Brighter Ravenclaw blue
      accentColor: '#4a7bc8',
      points: 0
    },
    josie: {
      id: 'josie',
      name: 'Josie',
      house: 'Hufflepuff',
      color: '#f0c75e', // Yellow/gold
      accentColor: '#ecb939',
      points: 0
    }
  },
  chores: [
    // Default chores with point values
    { id: 1, name: 'Make your bed', points: 50, status: 'available', claimedBy: null, claimedAt: null },
    { id: 2, name: 'Clean your room', points: 100, status: 'available', claimedBy: null, claimedAt: null },
    { id: 3, name: 'Do the dishes', points: 75, status: 'available', claimedBy: null, claimedAt: null },
    { id: 4, name: 'Take out the trash', points: 50, status: 'available', claimedBy: null, claimedAt: null },
    { id: 5, name: 'Vacuum the house', points: 150, status: 'available', claimedBy: null, claimedAt: null },
    { id: 6, name: 'Help with laundry', points: 100, status: 'available', claimedBy: null, claimedAt: null },
    { id: 7, name: 'Set the table for dinner', points: 30, status: 'available', claimedBy: null, claimedAt: null },
    { id: 8, name: 'Clear the table after dinner', points: 30, status: 'available', claimedBy: null, claimedAt: null },
    { id: 9, name: 'Feed the pets', points: 40, status: 'available', claimedBy: null, claimedAt: null },
    { id: 10, name: 'Homework completed on time', points: 100, status: 'available', claimedBy: null, claimedAt: null },
    { id: 11, name: 'Practice instrument', points: 75, status: 'available', claimedBy: null, claimedAt: null },
    { id: 12, name: 'Read for 30 minutes', points: 60, status: 'available', claimedBy: null, claimedAt: null },
    { id: 13, name: 'Organize pantry/closet', points: 200, status: 'available', claimedBy: null, claimedAt: null },
    { id: 14, name: 'Wash the car', points: 150, status: 'available', claimedBy: null, claimedAt: null },
    { id: 15, name: 'Yard work', points: 200, status: 'available', claimedBy: null, claimedAt: null },
    { id: 16, name: 'Help sibling with task', points: 80, status: 'available', claimedBy: null, claimedAt: null },
    { id: 17, name: 'Extra kindness shown', points: 100, status: 'available', claimedBy: null, claimedAt: null },
    { id: 18, name: 'Babysit younger sibling', points: 150, status: 'available', claimedBy: null, claimedAt: null }
  ],
  history: [],
  settings: {
    parentPassword: PARENT_PASSWORD
  }
};

// Load data from localStorage
export const loadData = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge with initial data to ensure new fields are added
      return {
        ...initialData,
        ...parsed,
        houses: { ...initialData.houses, ...parsed.houses }
      };
    }
  } catch (error) {
    console.error('Error loading data:', error);
  }
  return initialData;
};

// Save data to localStorage
export const saveData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving data:', error);
    return false;
  }
};

// Add points to a house
export const addPoints = (data, childId, points, reason) => {
  const newData = { ...data };
  if (newData.houses[childId]) {
    newData.houses[childId].points += points;

    // Add to history
    newData.history.unshift({
      id: Date.now(),
      childId,
      childName: newData.houses[childId].name,
      points,
      reason,
      timestamp: new Date().toISOString()
    });

    // Keep only last 100 history items
    if (newData.history.length > 100) {
      newData.history = newData.history.slice(0, 100);
    }
  }
  return newData;
};

// Claim a chore
export const claimChore = (data, choreId, childId) => {
  const newData = { ...data };
  const choreIndex = newData.chores.findIndex(c => c.id === choreId);

  if (choreIndex !== -1 && newData.chores[choreIndex].status === 'available') {
    newData.chores[choreIndex] = {
      ...newData.chores[choreIndex],
      status: 'claimed',
      claimedBy: childId,
      claimedAt: new Date().toISOString()
    };
  }

  return newData;
};

// Release a claimed chore (cancel claim)
export const releaseChore = (data, choreId) => {
  const newData = { ...data };
  const choreIndex = newData.chores.findIndex(c => c.id === choreId);

  if (choreIndex !== -1) {
    newData.chores[choreIndex] = {
      ...newData.chores[choreIndex],
      status: 'available',
      claimedBy: null,
      claimedAt: null
    };
  }

  return newData;
};

// Approve chore completion and award points
export const approveChore = (data, choreId, pointsAwarded) => {
  const newData = { ...data };
  const choreIndex = newData.chores.findIndex(c => c.id === choreId);

  if (choreIndex !== -1) {
    const chore = newData.chores[choreIndex];
    const actualPoints = pointsAwarded || chore.points;

    // Award points
    if (chore.claimedBy) {
      newData.houses[chore.claimedBy].points += actualPoints;

      // Add to history
      newData.history.unshift({
        id: Date.now(),
        childId: chore.claimedBy,
        childName: newData.houses[chore.claimedBy].name,
        points: actualPoints,
        reason: chore.name,
        timestamp: new Date().toISOString()
      });
    }

    // Reset chore to available
    newData.chores[choreIndex] = {
      ...chore,
      status: 'available',
      claimedBy: null,
      claimedAt: null
    };
  }

  return newData;
};

// Reject chore completion
export const rejectChore = (data, choreId) => {
  return releaseChore(data, choreId);
};

// Add new custom chore
export const addChore = (data, name, points) => {
  const newData = { ...data };
  const newId = Math.max(...newData.chores.map(c => c.id), 0) + 1;

  newData.chores.push({
    id: newId,
    name,
    points,
    status: 'available',
    claimedBy: null,
    claimedAt: null,
    custom: true
  });

  return newData;
};

// Delete custom chore
export const deleteChore = (data, choreId) => {
  const newData = { ...data };
  newData.chores = newData.chores.filter(c => c.id !== choreId);
  return newData;
};

// Deduct points from a house
export const deductPoints = (data, childId, points, reason) => {
  const newData = { ...data };
  if (newData.houses[childId]) {
    newData.houses[childId].points = Math.max(0, newData.houses[childId].points - points);

    // Add to history with negative points
    newData.history.unshift({
      id: Date.now(),
      childId,
      childName: newData.houses[childId].name,
      points: -points,
      reason,
      timestamp: new Date().toISOString()
    });

    // Keep only last 100 history items
    if (newData.history.length > 100) {
      newData.history = newData.history.slice(0, 100);
    }
  }
  return newData;
};

// Reset points for a specific house
export const resetHousePoints = (data, childId) => {
  const newData = { ...data };
  if (newData.houses[childId]) {
    const previousPoints = newData.houses[childId].points;
    newData.houses[childId].points = 0;

    // Add to history
    newData.history.unshift({
      id: Date.now(),
      childId,
      childName: newData.houses[childId].name,
      points: -previousPoints,
      reason: 'Points reset by parent',
      timestamp: new Date().toISOString()
    });
  }
  return newData;
};

// Reset all house points
export const resetAllPoints = (data) => {
  const newData = { ...data };
  Object.keys(newData.houses).forEach(childId => {
    const previousPoints = newData.houses[childId].points;
    newData.houses[childId].points = 0;

    // Add to history
    newData.history.unshift({
      id: Date.now(),
      childId,
      childName: newData.houses[childId].name,
      points: -previousPoints,
      reason: 'All points reset by parent',
      timestamp: new Date().toISOString()
    });
  });
  return newData;
};

// Verify parent password
export const verifyPassword = (data, password) => {
  return password === data.settings.parentPassword;
};

export default {
  loadData,
  saveData,
  addPoints,
  deductPoints,
  resetHousePoints,
  resetAllPoints,
  claimChore,
  releaseChore,
  approveChore,
  rejectChore,
  addChore,
  deleteChore,
  verifyPassword
};
