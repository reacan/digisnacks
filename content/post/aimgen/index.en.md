---
title: "AI image generator"
date: 2024-01-28
tags: ["AI"]
---
#### A little experiment with Cloudflare Workers and AI.

  <h1>Describe your image:</h1>


  <input type="text" id="prompt" placeholder="E.g., Girl with an umbrella walking in the rain">

  <center><button onclick="generateImage()">Generate Image</button></center>
  <br>

  <!-- Add a loading tile -->
  <div id="loading" style="display: none;">
  <center>Image generation can take up to three minutes.</center>
  <center><img src="infinite-spinner.svg" alt="Loading Spinner"></center>
  </div>

  <center><div id="result">
    <!-- Image will be displayed here -->
  </div></center>

<script>
  async function generateImage() {
    const promptInput = document.getElementById('prompt').value;
    const resultDiv = document.getElementById('result');
    const loadingDiv = document.getElementById('loading');

    // Clear the error message
    resultDiv.innerHTML = '';

    // Show the loading tile
    loadingDiv.style.display = 'block';

    let loadingVisible = true;

    try {
      // Send user input to the worker
      const response = await fetch(`https://worker-quiet-glitter-4606.davis-vilcans.workers.dev/?input=${encodeURIComponent(promptInput)}`);

      const imageData = await response.blob();

      // Display the image
      const myImage = new Image();
      myImage.crossOrigin = "anonymous";
      myImage.src = URL.createObjectURL(imageData);

      // Hide the loading tile when the image is loaded
      myImage.onload = function() {
        loadingDiv.style.display = 'none';
        resultDiv.appendChild(myImage);
        loadingVisible = false;
      };
    } catch (error) {
      console.error('Error:', error.message);
      // Show a generic error message in the result div
      resultDiv.innerHTML = 'Oops, something went wrong! Please try again.';
      // Hide the loading tile on error
      loadingDiv.style.display = 'none';
      loadingVisible = false;
    }

    // Set a timeout to hide loading screen and show error message after two minutes
    setTimeout(() => {
      if (loadingVisible && getComputedStyle(loadingDiv).display === 'block') {
        loadingDiv.style.display = 'none';
        resultDiv.innerHTML = 'Oops, something went wrong! The request took too long. Please try again.';
      }
    }, 1200000); // 120000 milliseconds = 2 minutes
  }
</script>

</body>
</html>
   
