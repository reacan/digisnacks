---
title: "GNU/Linux: findutils"
publishdate: "2023-09-01"
lastmod: "2023-09-13"
draft: false
tags: ["GNU/Linux", "CLI"]
type: "post"
---
## Some "find" variations that have been handy
**Find and copy:**<br><br>
Copy all files with an _.mp4_ extension to another location:
{{< cmd >}}
find . -type f -iname "*.mp4" -exec cp "{}" /other/location/  \;
{{< /cmd >}}

**Find and print:**<br><br> Print **name**, **path**, **size**, **inode**, and **sha256** hash.
{{< cmd >}}
find . -type f -printf  "%f\t %P\t %s\t %i\t " -exec sh -c 'sha256sum "{}" | cut -d " " -f 1 ' \;
{{< /cmd >}}

Print **path**, **name**, **size**, **time accessed**, **time modified** and **sha256** hash.

{{< cmd >}}
find . -type f -printf "%P\t %s\t %a\t %t\t" -exec sh -c 'sha256sum "{}" | cut -d " " -f 1 ' \;
{{< /cmd >}}

**Search file content**:<br><br>
Find files that contain a particular **string**.
{{< cmd >}}
find . -type f -print0 | xargs -0 grep "string"
{{< /cmd >}}

**Find and convert:**<br><br>
Find all files with a _.txt_ extension and convert them to _.doc_ (LibreOffice required).
{{< cmd >}}
find . -type f -name "*.txt" -exec soffice --headless --convert-to doc --outdir /output/directory/ "{}" \;
{{< /cmd >}}

Merge all the files with an _.mp4_ extension that are in the current working directory into a single file (ffmpeg required).
{{< cmd >}}
find *.mp4 | sed 's:\ :\\\ :g'| sed 's/^/file /' > fl.txt; ffmpeg -f concat -safe 0 -i fl.txt -c copy output.mp4; rm fl.txt
{{< /cmd >}}

**Find and count**:<br><br>
Find and count all _.jpeg_ files.
{{< cmd >}}
find . -type f -exec file '{}' \; | grep "JPEG" | wc -l
{{< /cmd >}}

**Find by time:**<br><br>
Created after a particular date (mm/dd/yyyy).
{{< cmd >}}
find -type f -newerct "09/01/2023" 
{{< /cmd >}}

Created during the last two days.
{{< cmd >}}
find . -type f -ctime -2
{{< /cmd >}}

**Find by permissions:**<br><br>
Find files that can be executed by anyone.
{{< cmd >}}
find . -type f -perm 777
{{< /cmd >}}
