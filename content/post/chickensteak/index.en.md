---
title: "Chicken Steak with Pineapple Rings"
date: 2024-01-15
draft: false
tags: ["life", "food"]
type: "post"
---
One of my hobbies is cooking, and recently I was wondering about whether there is such a thing as a chicken steak? I believe there is, and here is my interpretation.

#### Ingredients:

1. Chicken breast fillet -- 1 kg / 2.2 lb;

2. A medium can of pineapple rings;

3. Dark soy sauce -- 10 tablespoons;

4. One large onion;

5. One head of garlic;

6. Two packs of whatever salt free chicken seasonings (~30 grams / 1 ounce)

#### Preparation: Fill a container with all the ingredients


1. Cut the onion in thin rings;

2. Use garlic press to mince garlic; 

3. Pour all the pineapple juice from the can;

4. Add soy sauce and seasonings; 

5. Mix it all up;

6. Slice each chicken breast horizontally and add it to the mix along with pineapple rings

8. Let it sit for a couple of hours.

<center><img src="2024-01-13-16-42-03-919.jpg"></center>

#### Cooking:

I normally cook it on the grill, but sometimes it is too much of a hustle, it specially during the winter time. Here are some tips to make it taste great when using a frying pan:

* 2 minutes on a slow fire for each side;

* Afterwards cook each side on a high heat untill all the water has evaporated and the cololor is nicely redish brown;

* It is better to undercook than overcook, because the first condition can be easily fixed;

* The pineapple rings take about 1 minute on a high heat, for each side.


<center><img src="2024-01-14-20-30-58-813.jpg"></center>

#### Voilà:

I usually serve it with egg noodles, rice, or simply with some nice bread and fresh vegetables.

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
<div id="title">till next post</div>

<script>
  window.onload = function () {
    // Create a JavaScript Date object
    var countDownDate = new Date("Jan 21, 2024").getTime();

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

