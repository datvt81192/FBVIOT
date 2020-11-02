echo off
setlocal

rem Change Current Directory to the location of this batch file
cd /d %~dp0


:*******************************************************************************

rem Data Server's Address
set ARG_HOST=192.168.1.12:80

rem Output Destination
set OUTDIR=output

rem Serial Number of Target Device
set serials=52364E1A

:*******************************************************************************



rem Create date for today
set VBS=tmp%RANDOM%.vbs
echo WScript.Echo DateAdd("d",0,Date()) > %VBS%
for /f "tokens=1-3 delims=/-" %%A in ('cscript //nologo %VBS%') do set ARG_DATE=%%A%%B%%C
del %VBS%


for %%A in (%serials%) do (
    call :makeSpecifyFolder %OUTDIR%\%%A
    echo %OUTDIR%\%%A\current.csv
    csv %ARG_HOST% -s %%A -d %ARG_DATE% > %OUTDIR%\%%A\current.csv
)

endlocal
exit




:makeSpecifyFolder arg1
if not exist %1 (
    mkdir %1
)
exit /b

