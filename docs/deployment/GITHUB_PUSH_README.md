# GitHub Push Automation Script

This batch file automates the process of pushing your changes to the GitHub repository `https://github.com/mark-25-git/teevent.my`.

## Features

- ✅ Interactive commit message input
- ✅ Automatic staging of all changes
- ✅ Error handling and validation
- ✅ Colored output for better readability
- ✅ Confirmation prompts before actions
- ✅ Automatic remote setup if needed
- ✅ Git status checking

## Usage

1. **Double-click** `push-to-github.bat` or run it from command prompt
2. **Enter your commit message** when prompted (or leave empty for default)
3. **Confirm** the actions when asked
4. The script will automatically:
   - Add all changes to staging
   - Commit with your message
   - Push to GitHub

## Prerequisites

- Git must be installed and accessible from command line
- You must be in a git repository directory
- You should have push access to the repository

## Default Behavior

- If no commit message is provided, it uses: `"Update: Automated commit via batch script"`
- If no remote origin exists, it automatically sets it to: `https://github.com/mark-25-git/teevent.my.git`
- Pushes to the `main` branch by default

## Troubleshooting

If you encounter issues:

1. **Authentication errors**: Make sure you're logged into GitHub via Git
2. **Network errors**: Check your internet connection
3. **Repository errors**: Ensure you're in the correct directory
4. **Permission errors**: Verify you have push access to the repository

## Manual Commands

If the batch file doesn't work, you can run these commands manually:

```bash
git add .
git commit -m "Your commit message here"
git push origin main
```
