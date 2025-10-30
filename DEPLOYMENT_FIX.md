# 🔧 URGENT: Fix GitHub Pages Deployment

## The Problem
Multiple workflow runs created duplicate artifacts, causing deployment to fail with:
```
Error: Multiple artifacts named "github-pages" were unexpectedly found
```

## ✅ SOLUTION - Follow These Steps in Order:

### Step 1: Cancel All Running Workflows
1. Go to your GitHub repository: `https://github.com/mgarvey23/Garvwarts`
2. Click the **Actions** tab
3. On the left sidebar, click **"Deploy to GitHub Pages"**
4. For each workflow run that shows "In progress" or "Queued":
   - Click on it
   - Click **"Cancel workflow"** (top right)
5. **Cancel ALL running/queued workflows**

### Step 2: Delete Old Artifacts
1. Still in the **Actions** tab
2. For each completed workflow run:
   - Click on the workflow run
   - Scroll down to the **Artifacts** section
   - Click the **trash icon** next to each artifact to delete it
3. Delete ALL artifacts named "github-pages"

### Step 3: Merge Your Branch to Main
**IMPORTANT:** The workflow only runs on `main` or `master` branches!

**Option A - Using GitHub UI (Recommended):**
1. Go to your repository
2. Click **Pull requests** tab
3. Click **New pull request**
4. Set base: `main` (create it if it doesn't exist)
5. Set compare: `claude/harry-potter-chore-tracker-011CUSKaKH9oLpxMiXWaiV6M`
6. Click **Create pull request**
7. Click **Merge pull request**
8. Click **Confirm merge**

**Option B - Using Terminal:**
```bash
# Create and push main branch
git checkout -b main
git push origin main:main

# OR if main exists, merge your branch
git checkout main
git pull origin main
git merge claude/harry-potter-chore-tracker-011CUSKaKH9oLpxMiXWaiV6M
git push origin main
```

### Step 4: Wait for Clean Deployment
1. Go to **Actions** tab
2. Watch the new workflow run
3. It should complete successfully (green checkmark)
4. Wait 2-3 minutes after success

### Step 5: Visit Your Site
```
https://mgarvey23.github.io/Garvwarts/
```

---

## 🛠️ If Still Not Working:

### Check GitHub Pages Settings:
1. **Settings** → **Pages**
2. **Source**: Must be "GitHub Actions" (NOT "Deploy from branch")
3. Click Save

### Check Workflow Permissions:
1. **Settings** → **Actions** → **General**
2. Scroll to "Workflow permissions"
3. Select **"Read and write permissions"**
4. Check ✓ **"Allow GitHub Actions to create and approve pull requests"**
5. Click Save

### Verify Branch Protection:
1. Make sure you're pushing to `main` or `master` branch
2. The workflow will NOT run on feature branches like `claude/harry-potter-chore-tracker-...`

---

## 📝 Quick Checklist:

- [ ] Cancel all running workflows
- [ ] Delete all "github-pages" artifacts
- [ ] Merge feature branch to `main`
- [ ] Verify GitHub Pages source is "GitHub Actions"
- [ ] Wait for new workflow to complete
- [ ] Visit site URL

---

## 🆘 Last Resort:

If nothing works, try this simpler approach:

1. Build locally:
   ```bash
   npm run build
   ```

2. Go to **Settings** → **Pages**

3. Change **Source** to: **"Deploy from a branch"**

4. Select branch: **`main`** and folder: **`/dist`**

5. Commit the `dist` folder:
   ```bash
   git add dist -f
   git commit -m "Add dist folder for manual deployment"
   git push origin main
   ```

---

**Need Help?** Check the workflow runs in the Actions tab for detailed error messages.
