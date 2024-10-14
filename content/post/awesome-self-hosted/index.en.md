---
title: "Awesome apps for self-hosting on a VPS"
date: 2024-10-14
#lastmod: 2024-07-10
tags: ["Linux"]
#toc: true
---
There is an interesting [article](https://github.com/awesome-selfhosted/awesome-selfhosted) on GitHub with a long list of awesome self-hosted applications. Here are some that I have tried out:

## [Copyparty](https://github.com/9001/copyparty): Portable file server

{{< figureCupper
img="copyparty.png"
caption="Copyparty"
command="Resize"
options="700x" >}}

A portable file server written in Python 3, all in one file with no dependencies. It is a pretty cool tool for managing files on the VPS from the browser. It features a multimedia player, a gallery application, viewers for various file formats, and several other cool features. Additionally, it allows mounting the file share as a network drive.

## [Kimai](https://github.com/kimai/kimai): Time tracking application

{{< figureCupper
img="kimai.png"
caption="Kimai"
command="Resize"
options="700x" >}}

A very well-developed time tracking application. From its look and feel, it seems like it could be a top competitor to Clockify. Getting it to work was pretty straightforward. All I had to do was compile the tool with Composer and set up a MariaDB database.

## [Mail Header Analyzer](https://github.com/kodjunkie/mail-header-analyzer): The name says it all

{{< figureCupper
img="mha.png"
caption="Mail Header Analyzer"
command="Resize"
options="700x" >}}

This one is not on the GitHub list, but it has come in very handy. I am self-hosting it on my VPS so I always have access to it, regardless of what device I am using.

## [Wastebin](https://github.com/matze/wastebin): A pastebin

{{< figureCupper
img="wastebin.png"
caption="Wastebin"
command="Resize"
options="700x" >}}

Really cool pastebin application. Features code syntax highlighting for dozens of programming languages, encrypted pastes, self-destructing pastes, and a super clean user interface.

## [Umami](https://github.com/umami-software/umami): Web analytics that bypass AdBlockers

{{< figureCupper
img="umami.png"
caption="Umami Web Analytics"
command="Resize"
options="700x" >}}

A great alternative to Google Analytics, this tool has a notable advantage: it isn’t blocked by privacy tools that filter trackers. Umami can track visitors using various AdBlock-like extensions, including Ghostery, as well as users of the Brave Browser. Additionally, it allows you to share your website statistics. Here, you can take a look at this blog's humble [stats](https://umami.dvilcans.com/share/x4i8lDNyZvphfieo/dvilcans.com).


