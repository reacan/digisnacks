---
title: "Analyzing Apache access logs"
date: 2023-12-15
draft: false
tags: ["Digital Forensics", "GNU/Linux"]
type: "post"
---
<img src="h34d.png" style="width: 100%;">

### We need it done, and we need it fast!

In this article I will demonstrate how to quickly gain some insights on Apache webserver's access logs using GNU/Linux and Bash: **filtering unique IP's**, **top IP's** and **IP's by country**.

### Example log files:

Don't have any logs, but want to test out the below commands? Here you go:

<a href=access_1.log>access_1.log</a>  
<a href=access_2.log>access_2.log</a>  
<a href=access_2.log>access_3.log</a>  

### How many unique IP's are in the access logs?

Props to Steven Vona for the <a href=https://www.putorius.net/grep-an-ip-address-from-a-file.html>grep syntax</a>!


{{< cmd>}}
cat access_* | grep -E -o "(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)" | uniq -u | wc -l
{{< /cmd>}}

```
105653
```

### Top 10 IP's:

{{< cmd>}}
cat access_* | grep -E -o "(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)" | sort | uniq -c | sort -r -n -s -k1,1 | head -10
{{< /cmd>}}

```
  38201 192.168.57.3
   2140 1.9.2.4
   1115 1.9.0.15
    954 99.00.17.09
    872 14.6.9.160
    439 18.217.95.14
     88 128.199.214.126
     88 3.133.123.63
     88 45.129.18.64
     73 106.85.46.18
```     

### Filtering IP's by country: China

<a href=https://github.com/herrbischoff/country-ip-blocks>CIDR country-level IP data</a>, straight from the Regional Internet Registries, updated hourly.

{{< cmd>}}
grepcidr -f ch.cidr access_* | grep -E -o "(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)" | sort -u | wc -l
{{< /cmd>}}

```
30
```

### To sum up:

Command-line interface may initially seem intimidating, yet as one acquires proficiency, it unfolds as a profoundly rewarding toolset.  
 
Bash's CLI capabilities empower users to extract and manipulate data from log files efficiently, serving as a dependable alternative in situations where proprietary solutions may not be readily available.






