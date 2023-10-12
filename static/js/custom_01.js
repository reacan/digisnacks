const checkbox = document.getElementById('themer');
const checkboxImage = document.querySelector('.checkbox-image');

checkbox.addEventListener('change', function() {
      if (checkbox.checked) {
          checkboxImage.src = 'light_off.svg'; // Path to your checked image
          } else {
          checkboxImage.src = 'light_on.svg'; // Path to your unchecked image
            }
      });
