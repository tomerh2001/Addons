@echo off
git config core.autocrlf true
git stage --all
set /p branch="branch: "
git pull origin %branch%
pause