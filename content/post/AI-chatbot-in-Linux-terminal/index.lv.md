---
title: "MI čatbots Linux terminālī"
date: 2024-03-04
tags: ["MI", "GNU/Linux", "CLI"]
---

<center><img src="AI-in-Linux-terminal.png"></center>

#### Kas ir Bashbot?

Bashbot ir skripts, kas ļauj sazināties ar MI čatbotu no Linux termināļa. Šis čatbots izmanto Cloudflare Workers un [deepseek-coder-6.7b-instruct-awq](https://developers.cloudflare.com/workers-ai/models/deepseek-coder-6.7b-instruct-awq/) lielo valodas modeli (LLM).

#### Kāpēc es izveidoju Bashbot?

Es daudz darbojos Linux terminālī un vēlējos iespēju ātri nosūtīt dažādus vienkāršus vaicājumus MI čatbotam "pa taisno" no termināļa.

#### Ierobežojumi:

Šobrīd čatbots vienā vaicājumā spēj ģenerēt līdz 800 simboliem garu tekstu, lai palielinātu ģenerētā teksta apjomu man būtu jāizmanto [straumēšana](https://blog.cloudflare.com/workers-ai-streaming), ko es noteikti kaut kad pamēģināšu. Tad gan skripts būtu jāpārraksta izmantojot kādu programmēšanas valodu. Visacīmredzamākā izvēle, protams, būtu Python, bet es gribētu pamēģināt Go :)

#### Vēlies izmēģināt Bashbot?

Šis skripts un plašāka instrukcija ir pieejama manā [GitHub lapā](https://github.com/reacan/bashbot).
