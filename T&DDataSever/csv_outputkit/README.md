
# Introduction
csv.exe is a console application that outputs data stored in the Data Server in CSV format.
We have prepared sample batch files that allow you to easily make CSV files.
You can open and edit them with a text editor to match your needs and environment.


| File Name| Description|
|:----|:---|
|01 GetLatestInfo.bat| Sample file to write the latest data to standard output|
|02 GetRecData(date).bat| Sample file to write recorded data for the specified date to standard output|
|03 GetRecData(number).bat| Sample file to write the specified number of most recent recorded data to standard output|
|11 SaveLatestInfo.bat| Sample file to output the latest data to a CSV file|
|12 SaveTodayData.bat| Sample file to output today's data to a CSV file for each logger|
|13 SaveYesterdayData.bat| Sample file to output yesterday's data to a CSV file for each logger|
|14 SaveRecData(date).bat| Sample file to output recorded data for the specified date to a CSV file for each logger|


## Note:
* CR LF(0x0D0A) is used as a line break.
* If the field contains any of the following characters, the field is surrounded by double quotes (").
    - comma (,)
    - line feed (LF)
    - double quotation (")
        * EX) 123,"ab""cd",789
        * EX) 123,"ab,cd",789
* This application uses date and time in (standard) local time calculated from the time difference set in the logger.
* To run csv.exe, it is necessary to have Visual Studio 2013 Runtime installed and running on your computer. <br>
If your computer doesn't have the runtime installed, search for and install Visual C++ Redistributable Package for Visual Studio 2013.




<div style="page-break-before:always"></div>

# Latest Info
By only specifying the IP address of the Data Server, the batch file will output the latest information for all devices stored in the Data Server.

## CSV Data Format
```csv
serial,model,group,name,battery,ch1Time,ch1Value,ch1Unit,ch1Warn,ch2Time,ch2Value,ch2Unit,ch2Warn,
```
The first line is the header and data starts from the second line. (See example output.)

|Field Name|Description|
|:---:|:---|
|Serial| Serial Number|
|Model| Model Number|
|group| Group Name|
|name| Device Name|
|Battery| Battery Level<br>5:Full to 0:None  -1:No Info|
|ch1Time|Time of Ch.1 Recorded Data|
|ch1Value|Value of Ch.1 Recorded Data|
|ch1Unit|Unit of Ch.1 Recorded Data|
|ch1Warn|Ch.1 Warning Status*1|
|ch2Time|Time of Ch.2 Recorded Data|
|ch2Value|Value of Ch.2 Recorded Data|
|ch2Unit|Unit of Ch.2 Recorded Data|
|ch2Warn| Ch.2 Warning Status*1|

|*1 Warning Status|Description|
|:---:|:---:|
|none    |No Warning|
|upper   |Upper Limit Exceeded|
|lower   |Lower Limit Exceeded|
|sensor  |Sensor Warning|
|unknown |Unknown|


<div style="page-break-before:always"></div>

## Example
```csv
csv 192.168.50.31:80
```

## Output
<span style="font-size: 0.6em; ">
<pre>
serial,model,group,name,battery,ch1Time,ch1Value,ch1Unit,ch1Warn,ch2Time,ch2Value,ch2Unit,ch2Warn,
5214267E,TR-72wf,GROUP109,office72wf,1,2017-12-21 10:48:45,23.7,C,none,2017-12-21 10:48:45,20.0,%,none
52160003,TR-71nw,GROUP1,ichi008,5,2017-12-21 10:48:15,21.2,C,none,2017-12-21 10:48:15,22.0,C,none
52160204,TR-71nw,GROUP2,office71nw,5,2017-12-21 10:34:34,21.8,C,none,2017-12-21 10:34:34,21.5,C,none
52180001,TR-72nw,GROUP1,ichi005,5,2017-12-21 09:01:59,23.6,C,none,2017-12-21 09:01:59,17.9,%,none
52180006,TR-72nw,GROUP1,ichi003,5,2017-12-21 09:49:44,20.8,C,none,2017-12-21 09:49:44,24.0,%,none
52180017,TR-72nw,GROUP1,ichi006,5,2017-12-21 10:48:19,23.0,C,none,2017-12-21 10:48:19,22.0,%,none
52180018,TR-72nw,GROUP1,ichi007,5,2017-12-21 10:47:47,22.2,C,none,2017-12-21 10:47:47,23.0,%,none
52180301,TR-72nw,GROUP1,TR72nwTest,5,2017-12-21 08:36:17,20.3,C,none,2017-12-21 08:36:17,21.5,%,none
</pre>
</span>


<div style="page-break-before:always"></div>

# Recorded Data
The serial number of the data logger can be specified with the "-s" option to output recorded data for the target device.<br>
The number of data readings to be output can be specified with the "-c" option. <br>
The date of the output data can be specified with the "-d" option. EX) 20170401<br>

## CSV Data Format
```csv
time,ch1,ch2

```
The first line is the header and data starts from the second line. (See example output.)
* The first field of the header is the serial number of the data logger.
* The terms in square brackets \[  \] in the channel fields of the header show the units for each channel.

|Field Name|Description|
|:---:|:---|
|time|Date and Time of Recorded Data |
|ch1|Channel 1 Recorded Data <br>Normal: value <br>Invalid data: ---- <br>No value: blank|
|ch2|Channel 2 Recorded Data <br>Normal: value <br>Invalid data: ---- <br>No value: blank|


<div style="page-break-before:always"></div>

## Example
```csv
csv 192.168.50.31 -s 5214267E -c 20
```

## Output
```csv
5214267E,Ch.1[C],Ch.2[%]
2017-12-21 08:35:51,20.4,20
2017-12-21 08:36:51,20.4,20
2017-12-21 08:37:51,20.5,20
2017-12-21 08:38:51,20.5,22
2017-12-21 08:39:51,20.6,22
2017-12-21 08:40:51,20.7,22
2017-12-21 08:41:51,20.8,22
2017-12-21 08:42:51,20.9,22
2017-12-21 08:43:51,20.9,22
2017-12-21 08:44:51,20.9,22
2017-12-21 08:45:51,20.8,22
2017-12-21 08:46:51,20.9,22
2017-12-21 08:47:51,20.9,22
2017-12-21 08:48:51,20.9,22
2017-12-21 08:49:51,20.9,22
2017-12-21 08:50:51,20.9,22
2017-12-21 08:51:51,21.0,22
2017-12-21 08:52:51,21.1,22
2017-12-21 08:53:51,21.2,22
2017-12-21 08:54:51,21.2,22
```


<div style="page-break-before:always"></div>

## Example
```csv
csv 192.168.50.31:80 -s 5214267E -d 20171207
```

## Output
```csv
5214267E,Ch.1[C],Ch.2[%]
2017-12-07 00:00:51,16.7,27
2017-12-07 00:01:51,16.7,27
2017-12-07 00:02:51,16.7,27
2017-12-07 00:03:51,16.7,27
2017-12-07 00:04:51,16.7,27
2017-12-07 00:05:51,16.6,27
2017-12-07 00:06:51,16.6,27
2017-12-07 00:07:51,16.5,27
    ：
    ：
    ：
2017-12-07 23:51:51,17.5,24
2017-12-07 23:52:51,17.5,24
2017-12-07 23:53:51,17.5,24
2017-12-07 23:54:51,17.4,24
2017-12-07 23:55:51,17.4,24
2017-12-07 23:56:51,17.4,24
2017-12-07 23:57:51,17.5,24
2017-12-07 23:58:51,17.5,24
2017-12-07 23:59:51,17.4,24
```
