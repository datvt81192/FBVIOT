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
set serials=5218427A

rem Target Date
set ARG_DATE=20200604

:*******************************************************************************



for %%A in (%serials%) do (
    call :makeSpecifyFolder %OUTDIR%\
    echo %OUTDIR%\\current.csv
    csv %ARG_HOST% -s %%A -d %ARG_DATE% > %OUTDIR%\current.csv
)

endlocal
exit




:makeSpecifyFolder arg1
if not exist %1 (
    mkdir %1
)
exit /b

