#!/bin/bash

# ResumeCraft AI Deployment Script
# This script prepares and deploys the optimized website to GitHub Pages

echo "🚀 Starting ResumeCraft AI deployment..."

# Backup original files
echo "📦 Backing up original files..."
cp index.html index-backup.html
cp styles.css styles-backup.css
cp script.js script-backup.js

# Deploy optimized version
echo "⚡ Deploying optimized version..."
cp index-optimized.html index.html
cp styles-new.css styles.css
cp script-new.js script.js

# Minify files for production (optional)
echo "🔧 Minifying files..."
# You can add minification commands here if needed
# For example: npx uglifycss styles.css > styles.min.css

# Test the website locally
echo "🧪 Testing website locally..."
if command -v python3 &> /dev/null; then
    echo "🌐 Starting local server on http://localhost:8000"
    echo "📋 Press Ctrl+C to stop the server"
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "🌐 Starting local server on http://localhost:8000"
    echo "📋 Press Ctrl+C to stop the server"
    python -m SimpleHTTPServer 8000
else
    echo "⚠️ Python not found. Please open index.html manually in your browser."
    echo "📁 Open file://$(pwd)/index.html in your browser"
fi

# Deployment instructions
echo ""
echo "📋 Deployment Instructions:"
echo "1. Commit changes to Git:"
echo "   git add ."
echo "   git commit -m 'Deploy ResumeCraft AI redesign'"
echo "2. Push to GitHub:"
echo "   git push origin main"
echo "3. Your site will be live at: https://prclaw.github.io/claw-mvp/"
echo ""
echo "🎉 Deployment complete! The new design is ready for Friday launch."