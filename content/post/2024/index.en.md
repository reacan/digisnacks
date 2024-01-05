---
title: "Notes for 2024"
date: 2023-12-31
draft: false
tags: ["life"]
type: "post"
---

### Monetize a hobby;

### Build a couple of bicycles;

### Spend more time in the nature;

### Less perfection, more authenticity;

### Re-learn to write like in the [old days](https://dvilcans.wordpress.com/);

### Listen to [Radio Paradise](https://radioparadise.com/player/info/mellow-mix) Mellow Mix and take it easy.

<center><img src="IMG_20180716_1857245.jpg"></center>





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
<div id="title">till next post</div>

<script>
  window.onload = function () {
    // Create a JavaScript Date object
    var countDownDate = new Date("Jan 12, 2024").getTime();

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
        countdownElement.innerHTML = days + " days " + hours + " hours " + minutes + " minutes " + seconds + " seconds ";
      }
    }, 1000);
  }
</script>
