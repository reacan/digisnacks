---
title: "Analyzing Apache access logs"
date: 2023-12-15
draft: false
tags: ["Digital Forensics", "GNU/Linux", "CLI"]
type: "post"
---
<img src="h34d.png" style="width: 100%;">



In this article I will demonstrate how to quickly gain some insights on Apache webserver's access logs using GNU/Linux and Bash: **filtering unique IP's**, **top IP's** and **IP's by country**.

### Example log files:

Don't have any logs, but want to test out the below commands? Here you go:

<a href=access_1.log>access_1.log</a>  
<a href=access_2.log>access_2.log</a>  
<a href=access_3.log>access_3.log</a>  

### How many unique IP's are in the access logs?

Props to Steven Vona for the <a href=https://www.putorius.net/grep-an-ip-address-from-a-file.html>grep syntax</a>!


{{< cmd>}}
cat access_* | grep -E -o "(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)" | uniq -u | wc -l
{{< /cmd>}}

```
105653
```

### Unique IP's excluding local:

Props to Kusalananda for the <a href=https://unix.stackexchange.com/questions/636631/find-ip-addresses-in-file-excluding-local-ips>grepcidr syntax</a> to filter out the local IP's!

{{< cmd>}}
cat access_* | grep -E -o "(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)" | grepcidr -v "10.0.0.0/8,172.16.0.0/12,192.168.0.0/16" | uniq -u | wc -l
{{< /cmd>}}

```
29566
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

### Top 10 IP's excluding local:

{{< cmd>}}
cat access_* | grep -E -o "(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)" | grepcidr -v "10.0.0.0/8,172.16.0.0/12,192.168.0.0/16" | sort | uniq -c | sort -r -n -s -k1,1 | head -10
{{< /cmd>}}

```
   2140 1.9.2.4
   1115 1.9.0.15
    872 14.6.9.160
    439 18.217.95.14
     88 128.199.214.126
     88 3.133.123.63
     88 45.129.18.64
     73 106.85.46.18
     73 114.119.157.190
     73 119.92.219.82

```

### Filtering IP's by country: Switzerland

<a href=https://github.com/herrbischoff/country-ip-blocks>CIDR country-level IP data</a>, straight from the Regional Internet Registries, updated hourly.

{{< cmd>}}
grepcidr -f ch.cidr access_* | grep -E -o "(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)" | grepcidr -v "10.0.0.0/8,172.16.0.0/12,192.168.0.0/16" | sort -u | wc -l
{{< /cmd>}}

```
29
```




### Top 10 IP's from Switzerland:

{{< cmd>}}
grepcidr -f ch.cidr access_* | grep -E -o "(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)" | grepcidr -v "10.0.0.0/8,172.16.0.0/12,192.168.0.0/16" | sort | uniq -c | sort -r -n -s -k1,1 | head -10
{{< /cmd>}}

```
     44 91.192.103.33
     29 89.217.16.66
      2 178.211.232.48
      2 188.155.242.121
      2 188.92.149.71
      1 109.164.246.252
      1 155.105.7.43
      1 178.196.77.24
      1 178.83.214.83
      1 178.83.94.17
```

### To sum up:

Command-line interface may initially seem intimidating, yet as one acquires proficiency, it unfolds as a profoundly rewarding toolset.  
 
Bash's CLI capabilities empower users to extract and manipulate data from log files efficiently, serving as a dependable alternative in situations where proprietary solutions may not be readily available.






