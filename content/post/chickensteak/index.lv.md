---
title: "Vistas steiks ar ananāsu gredzeniem"
date: 2024-01-15
draft: false
tags: ["dzīve", "ēdiens"]
type: "post"
---
Viens no maniem hobijiem ir ēdiena gatavošana un nesen es aizdomājos par to, vai pastāv tāda lieta kā vistas steiks? Manuprāt, pastāv un lūk mana interpretācija par to. 

#### Sastāvdaļas:

1. Vistas krūtiņas fileja -- 1 kg;

2. Vidēja izmēra konservētu ananāsu gredzenu bundžiņa;

3. Tumšā sojas mērce -- 10 ēdamkarotes;

4. Viens liels sīpols;

5. Viena ķiploka galviņa;

6. Divas paciņas jebkādu vistas garšvielu bez sāls (~30 grami)

#### Sagatavošana: Piepildiet trauku ar visām sastāvdaļām


1. Sagriezt sīpolu plānos gredzenos;

2. Saspiest ķiploku ar spiedi; 

3. Ieliet traukā visu ananāsu sulu no bundžas;

4. Pievienot sojas mērci un garšvielas; 

5. Visu samaisīt;

6. Horizontāli pārgriezt vistas filejas gabaliņus un kopā ar ananāsu gredzeniem ievietot traukā;

8. Atstāt uz pāris stundām.

<center><img src="2024-01-13-16-42-03-919.jpg"></center>

#### Pagatavošana:

Es parasti izmantoju grilu, taču tā ir ļoti liela noņemšanās, it īpaši ziemā. Pāris ieteikumi, lai šo ēdienu garšīgi pagatavotu arī uz pannas:

* 2 minūtes uz lēnas liesmas no abām pusēm;

* Pēc tam uz lielas liesmas cep no abām pusēm kamēr viss ūdens ir iztvaikojis un vista ir ieguvusi sarkanīgi brūnu nokrāsu;

* Labāk kārtīgi neizcept, nekā pārcept, jo pirmo stāvokli var viegli izlabot;

* Ananasu gredzenus cepu aptuveni vienu minūti no katras puses uz lielas liesmas.


<center><img src="2024-01-14-20-30-58-813.jpg"></center>

#### Voilà:

Parasti es šo ēdienu pasniedzu ar olu nūdelēm, rīsiem, vai vienkārši kādu garšīgu maizi un svaigiem dārzeņiem.

<center><img src="2024-01-14-20-54-35-340.jpg"></center>


<style>
  #countdown {
    font-size: 0.8rem;
    padding-top: 4rem;
    color: #000000;
    font-family: 'Comic Sans MS', cursive;
    text-align: center;
  }

  #title {
    font-size: 0.8rem;
    color: #000000;
    font-family: 'Comic Sans MS', cursive;
    text-align: center;
    margin-top: 0.5rem;
  }
</style>

<div id="countdown"></div>
<div id="title">līdz nākamajam ierakstam</div>

<script>
  window.onload = function () {
    // Create a JavaScript Date object
    var countDownDate = new Date("Jan 17, 2024").getTime();

    // Update the count down every 1 second
    var x = setInterval(function () {

      // Get todays date and time
      var now = new Date().getTime();

      // Find the distance between now an the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes, and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Get the elements
      var countdownElement = document.getElementById("countdown");
      var titleElement = document.getElementById("title");

      // If the countdown is finished, hide it
      if (distance < 0) {
        clearInterval(x);
        countdownElement.style.display = "none";
        titleElement.style.display = "none";
      } else {
        // Display the result in the element with id="countdown"
        countdownElement.innerHTML = days + " dienas " + hours + " stundas " + minutes + " minūtes " + seconds + " sekundes ";
      }
    }, 1000);
  }
</script>
