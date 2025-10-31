#!/bin/bash

# Garvwarts - Fresh Repository Setup Script
# Run this script to upload everything to your fresh GitHub repository

echo "🎯 Garvwarts Fresh Deployment Script"
echo "======================================"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found"
    echo "Please run this script from the Garvwarts project directory"
    exit 1
fi

echo "✅ Found project files"
echo ""

# Initialize git if needed
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
    git branch -M main
fi

# Add all files
echo "📁 Adding all files..."
git add .

# Commit
echo "💾 Creating commit..."
git commit -m "Initial commit - Garvwarts Harry Potter Chore Tracker" || echo "Already committed"

# Set remote
echo "🔗 Setting up remote..."
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/mgarvey23/Garvwarts.git

# Push
echo "🚀 Pushing to GitHub..."
echo ""
echo "⚠️  You will need to enter your GitHub credentials:"
echo "   Username: mgarvey23"
echo "   Password: Your Personal Access Token (NOT your password)"
echo ""
echo "   Don't have a token? Create one at:"
echo "   https://github.com/settings/tokens/new"
echo "   (Select: repo permissions)"
echo ""

git push -u origin main --force

echo ""
echo "✅ Upload complete!"
echo ""
echo "Next steps:"
echo "1. Go to: https://github.com/mgarvey23/Garvwarts/settings/pages"
echo "2. Under 'Build and deployment':"
echo "   - Source: Deploy from a branch"
echo "   - Branch: gh-pages"
echo "   - Folder: / (root)"
echo "3. Wait 2-3 minutes after the GitHub Action completes"
echo "4. Visit: https://mgarvey23.github.io/Garvwarts/"
echo ""
echo "🎉 Done!"
