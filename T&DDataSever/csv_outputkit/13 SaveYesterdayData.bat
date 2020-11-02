echo off
setlocal

rem Change Current Directory to the location of this batch file
cd /d %~dp0


:*******************************************************************************

rem Data Server's Address
set ARG_HOST=192.168.50.31

rem Output Destination
set OUTDIR=output

rem Serial Number of Target Device
set serials=3212000B,5214000D,5214267E,52160003,52160204,52180001,52180006,52180017,52180018,52180301,E2180002,E2180004

:*******************************************************************************



Rem Create date for yesterday
set VBS=tmp%RANDOM%.vbs
echo WScript.Echo DateAdd("d",-1,Date()) > %VBS%
for /f "tokens=1-3 delims=/-" %%A in ('cscript //nologo %VBS%') do set ARG_DATE=%%A%%B%%C
del %VBS%


for %%A in (%serials%) do (
    call :makeSpecifyFolder %OUTDIR%\%%A
    echo %OUTDIR%\%%A\%%A_%ARG_DATE%.csv
    csv %ARG_HOST% -s %%A -d %ARG_DATE% > %OUTDIR%\%%A\%%A_%ARG_DATE%.csv
)

endlocal
exit




:makeSpecifyFolder arg1
if not exist %1 (
    mkdir %1
)
exit /b

