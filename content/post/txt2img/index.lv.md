---
title: "MI attēlu ģenerators"
date: 2024-01-28
tags: ["MI"]
---
#### Neliels eksperiments ar Cloudflare Workers un MI.
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

</head>
<body>

  <h1>Aprakstiet attēlu (angliski):</h1>



  <input type="text" id="prompt" placeholder="Piem., Girl with an umbrella walking in the rain">

  <center><button class=aimgen onclick="generateImage()">Ģenerēt attēlu</button></center>
  <br>

  <!-- Add a loading tile -->
  <div id="loading" style="display: none;">
  <center>Attēla ģenerēšana var aizņemt līdz vienai minūtei.</center>
  <center><img src="infinite-spinner.svg" alt="Loading Spinner"></center>
  </div>

  <center>
  <div id="result">
    <!-- Image will be displayed here -->
  </div>
  <br>
  <!-- Add Save Image button, initially hidden -->
  <button id="saveButton" class=aimgen style="display: none;" onclick="saveImage()">Saglabāt attēlu</button>
</center>

<script>
  async function generateImage() {
     // Hide the Save Image button
    document.getElementById('saveButton').style.display = 'none';

    const promptInput = document.getElementById('prompt').value;
    const resultDiv = document.getElementById('result');
    const loadingDiv = document.getElementById('loading');
    const saveButton = document.getElementById('saveButton');

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
        // Show the Save Image button when an image is present
        saveButton.style.display = 'block';
      };
    } catch (error) {
      console.error('Error:', error.message);
      // Show a generic error message in the result div
      resultDiv.innerHTML = 'Oops, kaut kas nogāja greizi. Mēģiniet vēlreiz.';
      // Hide the loading tile on error
      loadingDiv.style.display = 'none';
      loadingVisible = false;
      // Hide the Save Image button when there is an error
      saveButton.style.display = 'none';
    }

    // Set a timeout to hide loading screen and show error message after two minutes
    setTimeout(() => {
      if (loadingVisible && getComputedStyle(loadingDiv).display === 'block') {
        loadingDiv.style.display = 'none';
        resultDiv.innerHTML = 'Oops, kaut kas nogāja greizi. Mēģiniet vēlreiz.';
        // Hide the Save Image button when there is an error
        saveButton.style.display = 'none';
      }
    }, 1200000); // 120000 milliseconds = 2 minutes
  }

  // Function to save the displayed image
  function saveImage() {
    const resultDiv = document.getElementById('result');
    const images = resultDiv.getElementsByTagName('img');

    if (images.length > 0) {
      const link = document.createElement('a');
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      canvas.width = images[0].naturalWidth;
      canvas.height = images[0].naturalHeight;
      context.drawImage(images[0], 0, 0);

      link.href = canvas.toDataURL();
      link.download = 'generated_image.png';
      link.click();
    } else {
      console.error('No image to save.');
    }
  }
</script>

</body>
</html>
   
   

