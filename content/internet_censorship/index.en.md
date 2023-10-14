---
title: "Internet censorship in Latvia"
date: 2023-09-03T12:43:15+03:00
draft: false
tags: ["Internet", "politics"]
type: "post"
---
A while ago while browsing the Internet I came accross a news article with a list of websites that are apparently blocked in Latvia. When I tried to open some of these websites from my laptop, I was very disappointed. Everything was working. My Internet connection is provided by one of the largest local ISP's and I am not using VPN's or other similar solutions.

It made me curious so I decided to investigate a little bit. It appears that the way the supervisory authority ([NEPLP](https://www.neplp.lv/lv/ierobezoto-domenu-vardu-saraksts)) has implemented this website blocking is very basic. I am able to access the "blocked websites" because I am not using my ISP's DNS servers. This "website blocking" is achieved by making the ISP's change the DNS entries for these websites.
{{< note >}}
When you enter a particular domain name in the browser, the browser contacts the DNS server to resolve this domain name to a corresponding IP address, if the DNS server is unable to resolve the domain name to an IP address, you won't be able to access the resource. 
{{< /note >}}

I am using different DNS servers over the ones provided by my ISP for reasons of speed and privacy. Currently I am using [Cloudflare's](https://www.cloudflare.com/learning/dns/what-is-1.1.1.1/) DNS services which I highly recommend.

{{< expandable label="Setting up Cloudflare's DNS servers for IPv4 on different operating systems" level="2" >}}
**Debian GNU/Linux with Gnome:**

{{< figureCupper
img="debian_dns_config.png" 
caption="Settings > WiFi or Network > Gear icon next to the connection" 
command="Resize" 
options="700x" >}}

**Windows:**

{{< figureCupper
img="windows_dns_config.png" 
caption="Control Panel > Network and Internet > Network Sharing Center > Choose the connection > Properties > IPv4 > Properties" 
command="Resize" 
options="700x" >}}

**MacOS:**  

{{< figureCupper
img="macos_dns_config.png" 
caption="Settings > Network > Advanced > DNS > +" 
command="Resize" 
options="700x" >}}

**Android (varies for different OEM's):**

{{< figureCupper
img="android_dns_config.png" 
caption="Settings > Network and Internet > Private DNS" 
command="Resize" 
options="700x" >}}
{{< /expandable >}}

## A little bit of politics
Most of the "blocked" websites are a part of the Russian propaganda machine and they have been blocked for reasons of national security.
Security in obscurity is Latvia's strategy. Because simply educating the population and politically working towards a more cohesive society is not in the spirit of political centrism. Latvian politics have been dominated by centric political powers ever since the restoration of independance in 1990. Political centrism – is it all about balance and moderation or rather indecisiveness and mediocrity?  
## Fun fact
On 18th of March 2014 the future chairman of the Latvian media supervisory authority (NEPLP) – Mr.Ivars Āboliņš, posted a tweet where he praised the speech of Vladimir Putin and used derogatory language to describe Western leaders. It should be noted that the annexation of Crimea by the Russian Federation took place from 20th of February 2014 till 26th of March 2014.

{{< figureCupper
img="putina_fanboy.jpg" 
caption="Low quality capture of the aforementioned tweet. The original tweet can no longer be found on Mr.Āboliņš Twitter feed." 
command="Resize" 
options="300x" >}}
 
