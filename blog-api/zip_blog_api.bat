@echo off
echo Creating zip archive of blog-api...

REM Get current date in YYYYMMDD format for the filename
for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
set "YYYY=%dt:~0,4%"
set "MM=%dt:~4,2%"
set "DD=%dt:~6,2%"
set "timestamp=%YYYY%%MM%%DD%"

REM Define the output zip filename
set "zipfile=blog-api_%timestamp%.zip"

REM Create a temporary directory for files to include
if exist temp_for_zip rmdir /s /q temp_for_zip
mkdir temp_for_zip

REM Copy all necessary files to the temp directory - fix for root files
echo Copying root Python files...
copy *.py temp_for_zip\
echo Copying root text files...
copy *.txt temp_for_zip\
echo Copying other root files...
copy *.md temp_for_zip\
copy *.bat temp_for_zip\
copy *.sh temp_for_zip\
copy *.yml temp_for_zip\
copy *.json temp_for_zip\

REM Copy subdirectories
echo Copying subdirectories...
if exist models xcopy /s /e /y models temp_for_zip\models\
if exist routes xcopy /s /e /y routes temp_for_zip\routes\
if exist services xcopy /s /e /y services temp_for_zip\services\
if exist utils xcopy /s /e /y utils temp_for_zip\utils\
if exist db xcopy /s /e /y db temp_for_zip\db\

REM Exclude unnecessary files
echo Removing unnecessary files...
del temp_for_zip\*.pyc /s /q
if exist temp_for_zip\__pycache__ rmdir /s /q temp_for_zip\__pycache__
del temp_for_zip\*.log /s /q
if exist temp_for_zip\blog.db del temp_for_zip\blog.db

REM Create the zip file using PowerShell (available in Windows 7 and later)
echo Creating zip archive...
powershell -command "Compress-Archive -Path 'temp_for_zip\*' -DestinationPath '%zipfile%' -Force"

REM Clean up the temporary directory
echo Cleaning up...
rmdir /s /q temp_for_zip

echo Archive created: %zipfile%