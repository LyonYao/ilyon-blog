@echo off
echo Starting blog frontend...

REM Install dependencies if node_modules doesn't exist
if not exist node_modules (
    echo Installing dependencies...
    npm install
    npm install axios
)

REM Start the development server
echo Starting React development server...
npm start