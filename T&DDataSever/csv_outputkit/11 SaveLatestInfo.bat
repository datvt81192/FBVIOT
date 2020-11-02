echo off
setlocal


:*******************************************************************************

rem Data Server's Address
set ARG_HOST=192.168.50.31

rem Output Destination
set OUTDIR=output

:*******************************************************************************


rem Change Current Directory to the location of this batch file
cd /d %~dp0

call :makeSpecifyFolder %OUTDIR%
csv %ARG_HOST% > %OUTDIR%\current.csv

endlocal
exit




:makeSpecifyFolder arg1
if not exist %1 (
    mkdir %1
)
exit /b

