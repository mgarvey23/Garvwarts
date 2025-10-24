# Garvwarts - Harry Potter House Points Chore Tracker

A magical Harry Potter-themed chore tracker where kids can earn house points by completing tasks around the house. Watch their house glasses fill up as they complete quests!

## Features

### For Kids
- **Three Houses**: Clayton (Slytherin - Green), Avery (Ravenclaw - Blue), and Josie (Hufflepuff - Yellow)
- **Quest Board**: Browse and claim available chores
- **Animated House Glasses**: Watch your house glass fill as you earn points (0-3,000 scale)
- **Overflow Effect**: Points continue accumulating even after the glass is full, with a magical overflow animation
- **Real-time Updates**: See everyone's progress in the House Cup

### For Parents (Headmaster Dashboard)
- **Approval System**: Review and approve completed chores
- **Custom Point Awards**: Adjust point values when approving chores
- **Bonus Points**: Award bonus points for good behavior, extra effort, or special achievements
- **Quest Management**: Add custom quests and manage the quest board
- **History Tracking**: View complete history of all points awarded
- **Password Protected**: Secure access with password (default: "accio")

## Harry Potter Theme

The entire app is designed with a magical Harry Potter aesthetic:
- **Cinzel & Crimson Text fonts** for that wizarding world feel
- **Animated starry background** for a magical atmosphere
- **House colors**: Slytherin green, Ravenclaw blue, Hufflepuff yellow
- **Magical animations**: Glass filling, bubble effects, sparkles, and overflow animations
- **Quest terminology**: Chores are called "Quests" for added immersion
- **Headmaster's Office**: Parent dashboard with wand icons and spell-themed interactions

## Technology Stack

- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icons
- **localStorage** - Data persistence (no backend required)

## Getting Started

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

## How to Use

### As a Kid:
1. Go to the **Quest Board** (navigation menu)
2. Browse available quests
3. Click your name button on a quest to claim it
4. Complete the chore
5. Wait for parent approval
6. Watch your house glass fill with points!

### As a Parent:
1. Click the **Headmaster** button in the navigation
2. Enter the password (default: "accio")
3. Review pending quest completions
4. Approve or reject with custom point values if needed
5. Award bonus points for extra good behavior
6. Add custom quests as needed
7. View history to see all points awarded

## Point System

- **Point Scale**: 0 to 3,000 points per child
- **Glass Visualization**: The glass fills from 0% to 100% as points accumulate
- **Overflow**: When a glass reaches 3,000+ points, it shows an overflow animation
- **No Auto-Reset**: Points continue accumulating without automatic reset
- **Default Chores**: Range from 30 points (small tasks) to 200 points (big chores)

## Default Chores Included

| Quest | Points |
|-------|--------|
| Make your bed | 50 |
| Clean your room | 100 |
| Do the dishes | 75 |
| Take out the trash | 50 |
| Vacuum the house | 150 |
| Help with laundry | 100 |
| Set the table | 30 |
| Clear the table | 30 |
| Feed the pets | 40 |
| Homework on time | 100 |
| Practice instrument | 75 |
| Read for 30 minutes | 60 |
| Organize pantry/closet | 200 |
| Wash the car | 150 |
| Yard work | 200 |
| Help sibling | 80 |
| Extra kindness | 100 |
| Babysit sibling | 150 |

## Customization

### Changing the Password
Edit `/src/utils/dataStore.js` and change the `PARENT_PASSWORD` constant:
```javascript
const PARENT_PASSWORD = 'your-new-password';
```

### Modifying House Colors
Edit `/src/utils/dataStore.js` in the `initialData.houses` section:
```javascript
clayton: {
  color: '#1a472a', // Main color
  accentColor: '#2a623d' // Lighter accent
}
```

### Adding More Default Chores
Edit the `chores` array in `/src/utils/dataStore.js`

## Data Storage

All data is stored in the browser's localStorage:
- House points for each child
- Quest status (available, claimed, completed)
- Point award history
- Custom quests
- Settings

**Note**: Clearing browser data will reset all progress. For multi-device access, consider adding a backend like Firebase in the future.

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

Optimized for desktop/laptop use as specified.

## Future Enhancement Ideas

- Sound effects when awarding points
- Achievement badges
- Weekly leaderboard with reset option
- Email/text notifications to parents when quests are claimed
- Mobile app version
- Firebase backend for multi-device sync
- Printable certificates for milestones
- House crest graphics
- Wand cursor animation
- Spell-casting sound effects

## License

MIT License - Feel free to use and modify for your family!

## Credits

Created with love for the Garvey family - Clayton, Avery, and Josie!

May the best house win! ⚡️
