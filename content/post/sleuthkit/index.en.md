---
title: "The Sleuthkit"
date: 2023-10-14T14:49:03+03:00
draft: false
tags: ["Digital Forensics", "GNU/Linux"]
type: "post"
---
>The Sleuth Kit (TSK) is a popular open-source software library and collection of command-line digital forensic tools. The Sleuth Kit allows forensic analysts and investigators to analyze disk images as well as live disks and to perform in-depth analysis of file systems.

TSK is my go-to tool for performing the initial analysis of images and live disk devices. In the following post I will demonstrate how to use TSK to quickly check disk images or live disk devices. In particular – how to: 

### Check the partitions, browse the filesystems, reveal deleted files, filter and export files. 

It works on Windows, macOS and Linux. It can be installed on any Debian derrivative by simply running:

{{< cmd >}}
apt install sleuthkit
{{< /cmd >}}


#### Checking a USB stick with TSK step-by-step:

* Disabling auto-mount as per the [imaging guide](https://www.dvilcans.com/en/foss_forensics_imaging/), to ensure that the integrity of the data will not be compromised;
* Attaching the drive and listing block devices;

{{< cmd >}}
lsblk
{{< /cmd >}}

```
sda                      8:0    1   961M  0 disk  
└─sda1                   8:1    1   960M  0 part  

```
#### Checking the partition scheme of the attached drive:

{{< cmd >}}
mmls /dev/sda
{{< /cmd >}}

```
DOS Partition Table
Offset Sector: 0
Units are in 512-byte sectors

      Slot      Start        End          Length       Description
000:  Meta      0000000000   0000000000   0000000001   Primary Table (#0)
001:  -------   0000000000   0000002047   0000002048   Unallocated
002:  000:000   0000002048   0001968127   0001966080   NTFS / exFAT (0x07)

```
#### There is an NTFS filesystem that starts at sector 2048. Listing the contents of the NTFS filesystem's root:

{{< cmd >}}
fls -o 2048 /dev/sda
{{< /cmd >}}

**-o**: offset

```
...
d/d 65-144-2:	polises_info
r/r 64-128-2:	polise_printet.pdf
-/r * 69-128-2:	lol.png
-/r * 75-128-2:	watermark.png
-/d * 76-144-2:	political_science
-/d * 87-144-2:	.Trash-1000
-/d * 88-144-2:	.Trash-1000
V/V 89:	$OrphanFiles
...
```
{{< note >}}
The NTFS filesystem's root contains an existing directory "polises_info" and an existing file "polise_printet.pdf"
It also contains two deleted _.png_ files and three deleted directories. 
{{< /note >}}

#### Exporting the deleted _.png_ file "lol.png":

{{< cmd >}}
icat -o 2048 /dev/sda 69 > lol.png
{{< /cmd >}}

{{< note >}}
In the above example, the number **69** is the inode number of the file "lol.png" as seen in the output of **fls**.
{{< /note >}}

#### Listing the contents of the deleted directory "political_science":

{{< cmd >}}
fls -o 2048 /dev/sda -r -p | grep political_science
{{< /cmd >}}

**-r**: Recurse on directory entries<br>
**-p**: Display full path for each file<br>

#### Listing all the contents of the NTFS filesystem recursively and redirecting the output to a file:

{{< cmd >}}
fls -o 2048 /dev/sda -r -p > MFT.csv
{{< /cmd >}}

#### "fls" parameters that I use most often along with -r and -p:

**-d**: Display deleted entries only;<br>
**-u**: Display undeleted entries only;<br>
**-D**: Display only directories;<br>
**-F**: Display only files<br>
<br>
<br>
**The Sleuth Kit** is an invaluable asset for quickly checking suspicious drives. More so its robust suite of tools empowers analysts to swiftly examine file systems, recover lost data, and create detailed timelines, enhancing the efficiency and accuracy of forensic examinations.





