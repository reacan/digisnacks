---
title: "Windows: Backups with Powershell & Task Scheduler"
date: 2023-09-18T14:48:58+03:00
draft: false
tags: ["Windows"]
---
Backing up data on regular basis is crucial for operational security. In this article I will outline my approach on creating simple backups by using the Windows built-in functionality. 


PowerShell one-liner:

```
Robocopy.exe C:\Users\ D:\Windows_backup\Backup_$(Get-Date -format "dd.MM.yyyy_HH.mm.ss") /E /r:0 /w:0
```

**/E** – copy subdirectories, including empty ones;
**/r** – number of retries on failed copies;
**/w** – wait time between retries;
**$(Get-Date -format "dd.MM.yyyy_HH.mm.ss")** – adds the current date and time to the name of the output subdirectory


Adapt the above line to your needs and save it in a text file with a .PS1 extension. You may want to experiment with the **/r** and **/w** parameters. To set up the scheduled task:


**Start > Task Scheduler > Create a Basic Task**

Set up the name, description and trigger. At the "Action" dialog choose the option "Start a program" and point Powershell to your script:

{{< figureCupper
img="Screenshot-1.png"
caption=""
command="Resize"
options="700x" >}}

After setting up the Basic task it is neccessary to check the task properties and adjust the default options that have been set automatically. There are options like "Start the task only if the computer is on AC power", "Run only when user is logged on", etc.


Also you may not be able to execute scripts on your system due to security policy. To enable the execution of scripts you can run the following line in PowerShell (be sure to explore the risks before you proceed):

{{< cmd >}}
Set-ExecutionPolicy Unrestricted 
{{< /cmd >}}

When prompted for input choose [A] Yes to All.

