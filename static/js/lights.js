const checkbox = document.getElementById('themer1');
const checkboxImage = document.querySelector('.checkbox-image');

checkbox.addEventListener('change', function() {
         if (checkbox.checked) {
              checkboxImage.src = 'images/light_off.svg'; // Path to your checked image
          } else {
              checkboxImage.src = 'images/light_on.svg'; // Path to your unchecked image
          }
      });
