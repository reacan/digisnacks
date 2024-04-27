---
title: "DEPI/IPED"
date: 2023-09-13T20:29:41+03:00
tags: ["Digital Forensics"]
type: "post"
toc: true
---
Today I would like to introduce you to a free and open source digital forensics tool that, in my opinion, is on par with its commercial counterparts – **Digital Evidence Processor and Indexer** (DEPI), or perhaps better known by its Portuguese name – **Indexador e Processador de Evidências Digitais** (IPED).

## The industry

I've had the chance to work with some of the industries most recognized commercial tools, to name a few – EnCase Forensic, Magnet AXIOM, BelkaSoft Evidence Center. These programs cost considerable sums of money, for example, a single-user license of EnCase will set you back for around $3500, AXIOM, on the other hand, goes for as much as $5000. Haven't heard of these companies offering site licenses. Single-user license means one user at a time. That's an impressive price tag when you have a whole team to equip.  

## The Software
DEPI/IPED is a tool created by digital forensic experts from the Brazilian Federal Police. According to the tool's [GitHub repository](https://iped.dev) it has been in continuous development since 2012 and although it has always been open source, its code was oficially published only in 2019. DEPI is published under the GNU GPL v3 license. It is written in Java, thus ensuring platform independence – it has been tested on Windows and Linux operating systems.

## Localization

DEPI's code is locale-independent, it features the Java ResourceBundle framework, allowing for easy implementation of locales. Currently DEPI is officially available in English, Spanish, Portuguese, Italian and German. Also I have created my own unofficial Latvian localization.

## Processing
When using modern hardware the processing speeds can reach up to 400 gigabytes an hour.

The processing is very stable, everything that the program does is being logged and the logs can be checked in real-time. 

The processing is highly customizable by default. Users can set up their own processing profiles for various scenarios by editing the configuration files which contain about 5000 lines of simple markdown code. And if that is not enough, users can always edit the code and adapt it to their specific needs.

Advanced indexing that extracts **all** the available metadata, Optical Character Recognition (OCR), powerful RegEx engine, image & document similarity, recursive expansion of containers, efficient data carving, custom parsers for P2P, messengers, e-mail, internet browsers, operating system artefacts, a wide range of supported disk image formats and filesystems. Those are just a few of numerous DEPI's features.	

{{< figureCupper
img="Screenshot-1.png"
caption="Processing interface with locale set to \"Latvian\""
command="Resize"
options="700x" >}}

## Analysis

The analysis interface is snappy and intuitive. It features various options aimed at improving the user experience, like interface scaling, switching between light and dark themes, rearranging the panels and columns, saving the layout and loading the saved layout. The panels can be detached and moved thus allowing one to take full advantage of a multi-monitor setup. 

The analysis application is **fully portable, it can be opened on any Windows device without installing anything**, by simply copying the containing folder and data sources.

{{< figureCupper
img="Screenshot-2.png"
caption="Analysis interface in a dual-monitor setup"
command="Resize"
options="700x" >}}

## Reporting

One of the most fundamental aspects of any digital forensic investigation or eDiscovery endevour is presenting the findings.
DEPI allows its users to tag the relevant information and easily prepare comprehensive HTML reports. **The HTML reports also contain a portable case which stakeholders and clients can launch to perform their own additional analysis.**

{{< figureCupper
img="Screenshot-3.png"
caption="Title page of an HTML report"
command="Resize"
options="700x" >}}

## Customization

DEPI's major advantage over its commercial counterparts is the open source code. The field of information technology is very dynamic, constantly evolving and everchanging. Closed source solutions simply cannot keep up with the pace as well as their open source counterparts. It can take months to get a commercial company to implement a new parser in their software, however with open source it can be a matter of days, if not hours. 

Also having a powerful Digital Forensics/eDiscovery solution tailored to your organization's visual identity can have a very positive impact on stakeholders and clients, and make you stand out from your competition.

{{< figureCupper
img="iped_custom_splash.gif"
caption="DEPI with a custom loading screen"
command="Resize"
options="700x" >}}

## Implementation

I have assisted various organizations in implementing DEPI as a Digital Forensics, eDiscovery and Electronic Archive Management solution. If you are interested in seeing what DEPI can do for your organization, you are welcome to contact me by sending a message to: hello@dvilcans.com.   


{{< expandable label="An experience story:" level="2" >}}
Back in 2019 I started working for a local law enforcement agency. Not long after I was assigned to a large case where I had to perform forensic imaging of several servers and analyze them for keywords. 

The total amount of data exceeded 40 terabytes and there were more than 300 keywords to be checked. What made it even more complex, was the fact that all the information in the servers was contained in virtual machines. 

I was able to accomplish this task mainly thanks to DEPI's fast and stable processing, advanced indexing capabilities and features like OCR, file similarity, recursive expansion of containers, hash de-duplication, advanced filtering capabilities and portable cases. 

And most importantly – the developers. There were a large number of files that were encoded in KOI-8R – an obsolete cyrillic encoding. Initially DEPI failed to correctly render these files so I reached out to the developers who kindly implemented the support for a very wide range of encodings. 
{{< /expandable >}}

{{< expandable label="A couple of screenshots:" level="2" >}}

{{< figureCupper
img="Screenshot-6.png"
caption="Communications graph"
command="Resize"
options="700x" >}}

{{< figureCupper
img="Screenshot-11.png"
caption="Timeline graph"
command="Resize"
options="700x" >}}

{{< figureCupper
img="Screenshot-8.png"
caption="Filtering metadata"
command="Resize"
options="700x" >}}

{{< figureCupper
img="Screenshot-10.png"
caption="Explicit images filter"
command="Resize"
options="700x" >}}

{{< figureCupper
img="Screenshot-4.png"
caption="Bookmarking files, each Bookmark can be assigned to a hotkey for quick tagging"
command="Resize"
options="700x" >}}

{{< figureCupper
img="Screenshot-5.png"
caption="Exploring geo-referenced files"
command="Resize"
options="700x" >}}

{{< figureCupper
img="Screenshot-7.png"
caption="The OCR engine can be very succesfull in correctly recognizing text even in low quality images. However when it comes to low quality images, it is better to use the scattered search functionality – \"expression~\""
command="Resize"
options="700x" >}}

{{< figureCupper
img="Screenshot-9.png"
caption="HTML report's Help page"
command="Resize"
options="700x" >}}

{{< /expandable >}}


