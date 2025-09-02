@echo off
setlocal enabledelayedexpansion

:: Set colors for better output
set "GREEN=[92m"
set "RED=[91m"
set "YELLOW=[93m"
set "BLUE=[94m"
set "RESET=[0m"

echo %BLUE%========================================%RESET%
echo %BLUE%    GitHub Push Automation Script%RESET%
echo %BLUE%========================================%RESET%
echo.

:: Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo %RED%Error: Git is not installed or not in PATH%RESET%
    echo Please install Git and try again.
    pause
    exit /b 1
)

:: Check if we're in a git repository
git status >nul 2>&1
if errorlevel 1 (
    echo %RED%Error: Not in a git repository%RESET%
    echo Please run this script from within your git repository.
    pause
    exit /b 1
)

:: Set up remote origin (for new repositories)
echo %BLUE%Setting up GitHub remote...%RESET%
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo Adding remote origin: https://github.com/mark-25-git/teevent.my.git
    git remote add origin https://github.com/mark-25-git/teevent.my.git
    if errorlevel 1 (
        echo %RED%Error: Failed to add remote origin%RESET%
        pause
        exit /b 1
    )
    echo %GREEN%Remote origin added successfully!%RESET%
) else (
    echo %GREEN%Remote origin already configured%RESET%
)

echo.
echo %BLUE%Files to be added to repository:%RESET%
git status --porcelain
echo.

:: Get commit message from user
echo %BLUE%Enter your commit message:%RESET%
echo %YELLOW%(Leave empty to use default message)%RESET%
set /p commit_message=

:: Use default message if empty
if "!commit_message!"=="" (
    set "commit_message=Initial commit: Add project files"
    echo %YELLOW%Using default message: !commit_message!%RESET%
)

echo.
echo %BLUE%Commit message: %RESET%!commit_message!
echo.

:: Confirm before proceeding
echo %YELLOW%Do you want to proceed with the following actions?%RESET%
echo 1. Add all files to staging
echo 2. Commit with message: "!commit_message!"
echo 3. Push to GitHub main branch
echo.
set /p confirm=Continue? (Y/n): 

if /i "!confirm!"=="n" (
    echo %YELLOW%Operation cancelled by user.%RESET%
    pause
    exit /b 0
)

echo.
echo %BLUE%Starting git operations...%RESET%

:: Add all changes
echo %BLUE%Adding all files to staging...%RESET%
git add .
if errorlevel 1 (
    echo %RED%Error: Failed to add files to staging%RESET%
    pause
    exit /b 1
)
echo %GREEN%✓ Files added to staging%RESET%

:: Commit changes
echo %BLUE%Creating initial commit...%RESET%
git commit -m "!commit_message!"
if errorlevel 1 (
    echo %RED%Error: Failed to create commit%RESET%
    pause
    exit /b 1
)
echo %GREEN%✓ Initial commit created successfully%RESET%

:: Push to GitHub
echo %BLUE%Pushing to GitHub...%RESET%
git push -u origin main
if errorlevel 1 (
    echo %RED%Error: Failed to push to GitHub%RESET%
    echo.
    echo %YELLOW%Troubleshooting tips:%RESET%
    echo 1. Make sure you're authenticated with GitHub
    echo 2. Check your internet connection
    echo 3. Verify the repository exists on GitHub
    echo 4. Try running: git push -u origin main
    pause
    exit /b 1
)

echo %GREEN%✓ Successfully pushed to GitHub!%RESET%
echo.
echo %BLUE%========================================%RESET%
echo %GREEN%    Repository setup completed!%RESET%
echo %BLUE%========================================%RESET%
echo.
echo %BLUE%Repository: %RESET%https://github.com/mark-25-git/teevent.my
echo %BLUE%Commit: %RESET%!commit_message!
echo %BLUE%Branch: %RESET%main (set as upstream)
echo.

pause