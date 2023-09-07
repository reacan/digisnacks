---
title: "Interneta cenzūra Latvijā"
date: 2023-09-03T12:43:15+03:00
draft: false
tags: ["Internets", "politika"]
---
Pirms kāda laika, pārlūkojot Internetu, kādā ziņu portālā ievēroju rakstu par Latvijā bloķētajiem Interneta resursiem. Intereses pēc pamēģināju dažas no šīm mājaslapām atvērt un rezultātā biju vīlies, jo viss darbojās. Manu Interneta pieslēgumu nodrošina viens no lielākajiem vietējiem Interneta pakalpojumu sniedzējiem (turpmāk – ISP) un es neizmantoju virtuālos privātos tīklus (VPN) vai citus tamlīdzīgus risinājumus.

Nolēmu nedaudz šo jautājumu papētīt. Noskaidroju, ka uzraugošā iestāde ([NEPLP](https://www.neplp.lv/lv/ierobezoto-domenu-vardu-saraksts)) šo Interneta resursu bloķēšanu ir ieviesusi ļoti vienkāršotā veidā. Es varu piekļūt bloķētajiem resursiem, jo neizmantoju sava ISP piedāvātos DNS serverus. Šī Interneta resursu bloķēšana tiek nodrošināta liekot ISP savos DNS serveros izmainīt konkrētajiem resursiem piekritīgos ierakstus.
{{< note >}}
Kad Interneta pārlūka adreses lauciņā tiek ievadīta mājaslapas adrese – domēna nosaukums, Interneta pārlūks sazinās ar DNS serveriem, lai noskaidrotu domēna nosaukumam piekritīgo IP adresi, ja DNS serveris nespēj sniegt pareizu informāciju, Interneta pārlūks nespēs atvērt konkrēto Interneta resursu. 
{{< /note >}}

Es neizmantoju sava ISP piedāvātos DNS serverus, jo manā ieskatā citi DNS pakalpojumu sniedzēji spēj nodrošināt labāku ātrumu un privātumu. Pašreiz izmantoju [Cloudflare](https://www.cloudflare.com/learning/dns/what-is-1.1.1.1/) sniegtos DNS pakalpojumus, kurus vērtēju atzinīgi un rekomendēju.

{{< expandable label="Iestatīt Cloudflare DNS serverus IPv4 protokolam dažādās operētājsistēmās" level="2" >}}
**Debian GNU/Linux ar Gnome:**

{{< figureCupper
img="debian_dns_config.png" 
caption="Settings > WiFi vai Network > Zobratiņa ikona blakus savienojuma nosaukumam" 
command="Resize" 
options="700x" >}}

**Windows:**

{{< figureCupper
img="windows_dns_config.png" 
caption="Control Panel > Network and Internet > Network Sharing Center > Izvēlieties savienojumu > Properties > IPv4 > Properties" 
command="Resize" 
options="700x" >}}

**MacOS:**  

{{< figureCupper
img="macos_dns_config.png" 
caption="Settings > Network > Advanced > DNS > +" 
command="Resize" 
options="700x" >}}

**Android (var atšķirties atkarībā no ražotāja):**

{{< figureCupper
img="android_dns_config.png" 
caption="Settings > Network and Internet > Private DNS" 
command="Resize" 
options="700x" >}}
{{< /expandable >}}

## Nedaudz par politiku
Lielākā daļa "bloķēto" Interneta resursu ir daļa no Krievijas propagandas mašinērijas un šie resursi ir bloķēti nacionālās drošības interesēs.
Drošība neziņā ir Latvijas stratēģija, jo gluži vienkārši izglītot sabiedrību un politiski strādāt saliedētākas sabiedrības virzienā nav politiskā centrisma ideoloģijas garā. Kopš neatkarības atjaunošanas 1990.gadā, Latvijas politikā ir dominējuši centriski noskaņoti spēki. Politiskais centrisms – vai tas ir par līdzsvaru un mērenību vai drīzāk par neizlēmību un viduvējību?  
## Fakts jautrībai
2014.gada 18.martā šobrīd medijus uzraugošās iestādes (NEPLP) priekšsēdētājs Ivars Āboliņš savā Twitter kontā publicēja ierakstu, kurā cildināja Vladimira Putina runu un noniecinoši izteicās par Rietumu līderiem. Jāpiebilst, ka Krievijas īstenotā Krimas aneksija norisinājās no 2014.gada 20.februāra līdz 2014.gada 26.martam.
{{< figureCupper
img="putina_fanboy.jpg" 
caption="Iepriekšminētā ieraksta sliktas kvalitātes ekrānšāviņš. Šis ieraksts vairs nav pieejams Āboliņa kunga Twitter konta laikajoslā."
command="Resize" 
options="300x" >}}

{{< blockquote author="The Disposable Heroes of Hiphoprisy" >}}
Hypocrisy Is the Greatest Luxury
{{< /blockquote >}}



 
