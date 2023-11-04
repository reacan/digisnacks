---
title: "Forensics & FOSS: sleuthkit"
date: 2023-10-14T14:49:03+03:00
draft: false
tags: ["Digital Forensics", "GNU/Linux"]
type: "post"
---
>_The Sleuth Kit (TSK)_ ir populāra atvērtā pirmkoda programmu bibliotēka un kolekcija ar komandrindas digitālās izmeklēšanas rīkiem. _The Sleuth Kit_ ļauj izmeklētājiem un analītiķiem analizēt datu nesēju attēlus (_disk image_), kā arī pašus datu nesējus un veikt detalizētu failu sistēmu analīzi.

_TSK_ ir mans galvenais rīks, ko izmantoju, veicot sākotnējo analīzi datu nesēju attēliem un datu nesējiem. Šajā ierakstā es parādīšu, kā izmantot _TSK_, lai ātri pārbaudītu datu nesēju attēlus vai datu nesējus. Konkrēti - kā:

### Pārbaudīt partīcijas, pārlūkot failu sistēmas, atklāt dzēstos failus, filtrēt un eksportēt failus.

_TSK_ strādā uz _Windows_, _macOS_ un _Linux_ operētājsistēmām. To var uzstādīt uz jebkuras Debian atvasinātās sistēmas, vienkārši izpildot komandu:

{{< cmd >}}
apt install sleuthkit
{{< /cmd >}}

### USB zibatmiņas pārbaude ar _TSK_, soli pa solim:

* Nepieciešams atslēgt _automount_ kā aprakstīts [šajā ierakstā](https://www.dvilcans.com/en/foss_forensics_imaging/), lai nodrošinātu datu integritāti;
* Pievienot zibatmiņu un parādīt disku iekārtas;

{{< cmd >}}
lsblk
{{< /cmd >}}

```
sda                      8:0    1   961M  0 disk  
└─sda1                   8:1    1   960M  0 part  

```

### Pārbaudīt pievienotās zibatmiņas partīciju shēmu:

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

#### 2048 sektorā atrodas NTFS failu sistēma. Parādīt NTFS failu sistēmas saknes direktorijas saturu:

{{< cmd >}}
fls -o 2048 /dev/sda
{{< /cmd >}}

**-o**: offset (nobīde)

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
NTFS failu sistēmas saknes direktorija satur esošu direktoriju "polises_info" un esošu failu "polise_printet.pdf". Tāpat tā satur divus dzēstus .png failus un trīs dzēstas mapes.
{{< /note >}}

#### Izgūt dzēsto _.png_ failu "lol.png":

{{< cmd >}}
icat -o 2048 /dev/sda 69 > lol.png
{{< /cmd >}}

{{< note >}}
Augstāk redzamajā piemērā skaitlis **69** ir faila "lol.png" _inode_ numurs, kā redzams **fls** komandas izvadē.
{{< /note >}}

#### Parādīt dzēstās direktorijas "political_science" saturu:

{{< cmd >}}
fls -o 2048 /dev/sda -r -p | grep political_science
{{< /cmd >}}

**-r**: Rekursīvi parādīt direktoriju saturu<br>
**-p**: Parādīt pilnu failu atrašanās vietu<br>

#### Rekursīvi parādīt visu NTFS failu sistēmas saturu un rezultātus izvadīt failā:

{{< cmd >}}
fls -o 2048 /dev/sda -r -p > MFT.csv
{{< /cmd >}}

#### "fls" parametri, ko izmantoju visbiežāk, kopā ar -r un -p:

**-d**: Parādīt tikai dzēstos ierakstus;<br>
**-u**: Parādīt tikai nedzēstos ierakstus;<br>
**-D**: Parādīt tikai direktorijas;<br>
**-F**: Parādīt tikai failus<br>
<br>
<br>
**The Sleuth Kit** ir vērtīgs līdzeklis, lai ātri pārbaudītu aizdomīgus datu nesējus. Tā plašā rīku kolekcija ļauj analītiķiem ātri izpētīt failu sistēmas, atgūt pazudušos datus un veidot detalizētas laika līnijas.



