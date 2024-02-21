/* Expandable sections */
(function () {
  function toggle (button, target) {
    var expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', !expanded);
    target.hidden = !target.hidden;
  }

  var expanders = document.querySelectorAll('[data-expands]');

  Array.prototype.forEach.call(expanders, function (expander) {
    var target = document.getElementById(expander.getAttribute('data-expands'));

    expander.addEventListener('click', function () {
      toggle(expander, target);
    })
  })
}());

/* Menu button */
(function () {
  var button = document.getElementById('menu-button');
  if (button) {
    var menu = document.getElementById('patterns-list');
    button.addEventListener('click', function() {
      var expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
    })
  }
}());

/* Persist navigation scroll point */
(function () {
  window.onbeforeunload = function () {
    var patternsNav = document.getElementById('patterns-nav');
    if (patternsNav) {
      var scrollPoint = patternsNav.scrollTop;
      localStorage.setItem('scrollPoint', scrollPoint);
    }
  }

  window.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('patterns-nav')) {
      if (window.location.href.indexOf('patterns/') !== -1) {
        document.getElementById('patterns-nav').scrollTop = parseInt(localStorage.getItem('scrollPoint'));
      } else {
        document.getElementById('patterns-nav').scrollTop = 0;
      }
    }
  })
}());

{{ if not .Site.Params.hideHeaderLinks }}
  /* Add "link here" links to <h2> headings */
  (function () {
    var headings = document.querySelectorAll('h2, h3, h4, h5, h6');

    Array.prototype.forEach.call(headings, function (heading) {
      var id = heading.getAttribute('id');

      if (id) {
        var newHeading = heading.cloneNode(true);
        newHeading.setAttribute('tabindex', '-1');

        var container = document.createElement('div');
        container.setAttribute('class', 'h2-container');
        container.appendChild(newHeading);

        heading.parentNode.insertBefore(container, heading);

        var link = document.createElement('a');
        link.setAttribute('href', '#' + id);
        link.innerHTML = '<svg aria-hidden="true" class="link-icon" viewBox="0 0 50 50" focusable="false"> <use href="#link"></use> </svg>';

        container.appendChild(link);

        heading.parentNode.removeChild(heading);
      }
    })
  }());
{{ end }}

/* Enable scrolling by keyboard of code samples */
(function () {
  var codeBlocks = document.querySelectorAll('pre, .code-annotated');

  Array.prototype.forEach.call(codeBlocks, function (block) {
    if (block.querySelector('code')) {
      block.setAttribute('role', 'region');
      block.setAttribute('aria-label', 'code sample');
      if (block.scrollWidth > block.clientWidth) {
        block.setAttribute('tabindex', '0');
      }
    }
  });
}());


/* Switch and persist theme */
(function () {
  var checkbox = document.getElementById('themer');
  var imageElement = document.getElementById('theme-image');

  function persistTheme(val) {
    localStorage.setItem('darkTheme', val);
  }

  function applyDarkTheme() {
    var darkTheme = document.getElementById('darkTheme');
    darkTheme.disabled = false;
    
    
    

    
    
   imageElement.src = "{{ "images/light_off.svg" | relURL }}"; // Path to your dark theme image
   imageElement.title = "Lights!"; // Tooltip text for the light theme

  }

  function clearDarkTheme() {
    var darkTheme = document.getElementById('darkTheme');
    darkTheme.disabled = true;
    imageElement.src = "{{ "images/light_on.svg" | relURL }}"; // Path to your light theme image
    imageElement.title = "Lights Please!"; // Tooltip text for the dark theme
  }

  function defaultDarkTheme() {
{{- with .Site.Params.defaultDarkTheme }}
    if (localStorage.getItem('darkTheme') == null) {
      persistTheme('true');
      checkbox.checked = true;
      applyDarkTheme();

    }
{{- else }}
    if (localStorage.getItem('darkTheme') == null) {
      persistTheme('false');
      checkbox.checked = false;
      clearDarkTheme();

    }
    

    
{{ end }}
  }

  checkbox.addEventListener('change', function () {
    defaultDarkTheme();
    if (this.checked) {
      applyDarkTheme();
      persistTheme('true');
    } else {
      clearDarkTheme();
      persistTheme('false');
    }
  });

  function showTheme() {
    if (localStorage.getItem('darkTheme') === 'true') {
      applyDarkTheme();
      checkbox.checked = true;
    } else {
      clearDarkTheme();
      checkbox.checked = false;
    }
  }

  function showContent() {
    document.body.style.visibility = 'visible';
    document.body.style.opacity = 1;
  }

  window.addEventListener('DOMContentLoaded', function () {
    defaultDarkTheme();
    showTheme();
    showContent();
  });

}());




// Function to create and append the "Back to Top" button
function createBackToTopButton() {
  // Create a button element
  var button = document.createElement('button');
  // Create an image element for the SVG
  var img = document.createElement('img');
  img.src = "{{ "/images/uparrow.svg" | relURL }}"; 
  img.setAttribute('width', '48');
  img.setAttribute('height', '48');
  
  // Apply the intro-and-nav class to the SVG element
  img.classList.add('back-to-top');
  
  // Append the image to the button
  button.appendChild(img);
  
  // Add a click event listener to scroll to the top when clicked
  button.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  

  // Apply CSS styles to style the button
  button.style.position = 'fixed';
  button.style.bottom = '2rem';
  button.style.right = '2rem';
  button.style.width = '3rem';
  button.style.height = '3rem';
  button.style.backgroundColor = 'transparent'; // Set background color to transparent
  button.style.border = 'none'; // Remove border
  
  // Append the button to the body of the document
  document.body.appendChild(button);
  
  // Add event listener to hide/show the button based on scroll position
  window.addEventListener('scroll', function() {
    // Check if the user is at the top of the page
    if (window.scrollY === 0) {
      // Hide the button if the user is at the top
      button.style.display = 'none';
    } else {
      // Show the button if the user is not at the top
      button.style.display = 'block';
    }
  });

  // Check the initial scroll position
  if (window.scrollY === 0) {
    // Hide the button if the initial scroll position is at the top
    button.style.display = 'none';
  }
}
// Check if the URL contains '#top'
if (window.location.href.includes('#top')) {
  // If '#top' is present, scroll to the top
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Create and append the "Back to Top" button
createBackToTopButton();




