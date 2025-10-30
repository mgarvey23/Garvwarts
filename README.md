# Garvwarts - Harry Potter House Points Chore Tracker

A magical Harry Potter-themed chore tracker where kids can earn house points by completing tasks around the house. Watch their house glasses fill up as they complete quests!

## Features

### For Kids
- **Three Houses**: Clayton (Slytherin - Green), Avery (Ravenclaw - Blue), and Josie (Hufflepuff - Yellow)
- **Live Leaderboard**: See who's winning the House Cup with real-time rankings
- **Quest Board**: Browse and claim available chores
- **Animated House Glasses**: Watch your house glass fill as you earn points (0-3,000 scale)
- **Overflow Effect**: Points continue accumulating even after the glass is full, with a magical overflow animation
- **Achievement Badges**: Unlock achievements at milestones (100, 500, 1000, 2000, 3000 points)
- **Magical Celebrations**: Particle effects when points are awarded
- **Real-time Updates**: See everyone's progress in the House Cup

### For Parents (Headmaster Dashboard)
- **Approval System**: Review and approve completed chores
- **Custom Point Awards**: Adjust point values when approving chores
- **Bonus Points**: Award bonus points for good behavior, extra effort, or special achievements
- **Point Deduction**: Remove points for misbehavior or incomplete tasks
- **Reset Functionality**: Reset individual or all house points (with confirmation)
- **Quest Management**: Add custom quests and manage the quest board
- **History Tracking**: View complete history of all points awarded (including deductions)
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

### Deploying to GitHub Pages

The app is configured to automatically deploy to GitHub Pages when you push to the main/master branch.

**To enable GitHub Pages:**
1. Go to your repository settings on GitHub
2. Navigate to "Pages" in the left sidebar
3. Under "Build and deployment", select:
   - **Source**: GitHub Actions
4. Push your code to the main/master branch
5. The GitHub Action will automatically build and deploy
6. Your app will be available at: `https://[username].github.io/Garvwarts/`

**Manual deployment:**
```bash
npm run build
# Then deploy the dist/ folder to your hosting service
```

**Note**: The app uses localStorage, so each user's data is stored locally in their browser. For multi-device support, you'd need to add a backend like Firebase.

### Troubleshooting Deployment

**If you see "Multiple artifacts" error:**
1. Go to your repository's **Actions** tab on GitHub
2. Find the failed workflow run
3. Click **Re-run all jobs** (top right)
4. The new workflow will cancel old runs automatically

**If deployment still fails:**
1. Go to repository **Settings** → **Actions** → **General**
2. Under "Workflow permissions", ensure:
   - **Read and write permissions** is selected
   - **Allow GitHub Actions to create and approve pull requests** is checked
3. Save and re-run the workflow

**Common issues:**
- Forgot to enable GitHub Pages in Settings → Pages
- Source is set to "Deploy from branch" instead of "GitHub Actions"
- Pushing to wrong branch (must be main or master)
- First deployment can take 2-5 minutes

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

## Achievement System

Kids unlock special achievement badges as they reach point milestones:

| Achievement | Points Required | Icon |
|-------------|----------------|------|
| First Quest | 1 | ⭐ Star |
| 100 Point Club | 100 | 🏅 Award |
| Rising Star | 500 | ✨ Sparkles |
| House Champion | 1,000 | 🏆 Trophy |
| Legendary Wizard | 2,000 | ⚡ Lightning |
| Grand Master | 3,000 | 👑 Crown |

When an achievement is unlocked:
- A full-screen celebration appears with the achievement details
- Magical particle effects burst across the screen
- The achievement is permanently earned (tracked in localStorage)

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

## New Features Added

### Version 2.0 Enhancements:
- ✅ **Leaderboard**: Real-time house standings with trophy rankings
- ✅ **Achievement System**: 6 milestone badges with full-screen celebrations
- ✅ **Magical Particles**: Animated particle effects when points are awarded
- ✅ **Point Deduction**: Parents can remove points for misbehavior
- ✅ **Reset Functionality**: Reset individual or all house points with confirmation
- ✅ **Enhanced Animations**: Smooth transitions and celebratory effects

## Future Enhancement Ideas

- Sound effects when awarding points (spell casting, glass filling)
- Weekly/monthly competition cycles with automatic reset
- Email/text notifications to parents when quests are claimed
- Mobile app version with push notifications
- Firebase backend for multi-device sync
- Printable certificates for achievements and milestones
- Custom house crest graphics upload
- Wand cursor animation
- Daily/weekly bonus challenges
- Parent approval notifications to kids
- Photo proof of completed chores
- Point multipliers for special events

## License

MIT License - Feel free to use and modify for your family!

## Credits

Created with love for the Garvey family - Clayton, Avery, and Josie!

May the best house win! ⚡️
