@echo off
git config core.autocrlf true
git stage --all
set /p message="Enter message: "
git commit -m "%message%"
git push
pause