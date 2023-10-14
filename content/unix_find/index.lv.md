---
title: "GNU/Linux: findutils"
publishdate: "2023-09-01"
lastmod: "2023-09-02"
draft: false
tags: ["GNU/Linux", "CLI"]
---
## Dažas "find" variācijas, kuras man ir noderējušas

**Atrast un kopēt:**<br><br>
Kopēt visas datnes ar _.mp4_ paplašinājumu uz citu lokāciju:
{{< cmd >}}
find . -type f -iname "*.mp4" -exec cp "{}" /cita/lokācija/  \;
{{< /cmd >}}

**Atrast un izvadīt informāciju:**<br><br> Uz ekrāna izvadīt datņu **nosaukumu**, **ceļu**, **izmēru**, **_inode_**, kā arī **_sha256_** integritātes kodu.
{{< cmd >}}
find . -type f -printf  "%f\t %P\t %s\t %i\t " -exec sh -c 'sha256sum "{}" | cut -d " " -f 1 ' \;
{{< /cmd >}}

Uz ekrāna izvadīt **ceļu**, **nosaukumu**, **izmēru**, **piekļūšanas laiku**, **modificēšanas laiku** un **_sha256_** integritātes kodu.

{{< cmd >}}
find . -type f -printf "%P\t %s\t %a\t %t\t" -exec sh -c 'sha256sum "{}" | cut -d " " -f 1 ' \;
{{< /cmd >}}

**Meklēt datņu saturā**:<br><br>
Atrast visas datnes, kas satur kādus **konkrētus simbolus**.
{{< cmd >}}
find . -type f -print0 | xargs -0 grep "Konkrēti simboli"
{{< /cmd >}}

**Atrast un konvertēt:**<br><br>
Atrast visas datnes ar _.txt_ paplašinājumu un konvertēt tās _.doc_ formātā (nepieciešams LibreOffice).
{{< cmd >}}
find . -type f -name "*.txt" -exec soffice --headless --convert-to doc --outdir /izvades/direktorija/ "{}" \;
{{< /cmd >}}

Apvienot visas patreizējā direkorijā esošās datnes ar _.mp4_ paplašinājumu vienā datnē (nepieciešams ffmpeg)
{{< cmd >}}
find *.mp4 | sed 's:\ :\\\ :g'| sed 's/^/file /' > fl.txt; ffmpeg -f concat -safe 0 -i fl.txt -c copy output.mp4; rm fl.txt
{{< /cmd >}}

**Atrast un saskaitīt**:<br><br>
Atrast un saskaitīt visas _.jpeg_ datnes.
{{< cmd >}}
find . -type f -exec file '{}' \; | grep "JPEG" | wc -l
{{< /cmd >}}

**Atrast datnes pēc laikiem:**<br><br>
Izveidotas pēc konkrēta datuma (mm/dd/yyyy).
{{< cmd >}}
find -type f -newerct "09/01/2023" 
{{< /cmd >}}

Izveidotas pēdējo divu dienu laikā.
{{< cmd >}}
find . -type f -ctime -2
{{< /cmd >}}

**Atrast datnes pēc atļaujām:**<br><br>
Datnes, kuras var izpildīt (_execute_) jebkurš lietotājs.
{{< cmd >}}
find . -type f -perm 777
{{< /cmd >}}
