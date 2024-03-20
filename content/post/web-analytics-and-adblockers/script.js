// Fetch public IP address
async function getPublicIP() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Error fetching public IP:', error);
    return null; // Return null if there's an error
  }
}

// Update HTML with public IP address
async function updateIPAddress() {
  const ipAddressElement = document.getElementById("ip-address");
  if (!ipAddressElement) {
    console.error('Error updating public IP: Element with ID "ip-address" not found.');
    return;
  }

  try {
    const ip = await getPublicIP();
    ipAddressElement.innerText = ip;
  } catch (error) {
    console.error('Error updating public IP:', error);
    ipAddressElement.innerText = 'Error fetching IP';
  }
}

// Fetch operating system
function getOS() {
  var userAgent = navigator.userAgent;
  var os = "";
  if (userAgent.indexOf("Windows") > -1) {
    os = "Windows";
  } else if (userAgent.indexOf("Mac") > -1) {
    os = "Mac";
  } else if (userAgent.indexOf("Linux") > -1) {
    os = "Linux";
  } else if (userAgent.indexOf("Android") > -1) {
    os = "Android";
  } else if (userAgent.indexOf("iPhone") > -1) {
    os = "iPhone";
  } else if (userAgent.indexOf("iPad") > -1) {
    os = "iPad";
  }
  return os;
}

// Fetch browser info
function getBrowser() {
  var userAgent = navigator.userAgent;
  var browser = "";
  if (userAgent.indexOf("Firefox") > -1) {
    browser = "Mozilla Firefox";
  } else if (userAgent.indexOf("Chrome") > -1) {
    browser = "Google Chrome";
  } else if (userAgent.indexOf("Safari") > -1) {
    browser = "Apple Safari";
  } else if (userAgent.indexOf("Edge") > -1) {
    browser = "Microsoft Edge";
  } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
    browser = "Opera";
  } else if (userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident") > -1) {
    browser = "Internet Explorer";
  } else {
    browser = "Unknown Browser";
  }
  return browser;
}

// Fetch preferred language
function getLanguage() {
  return navigator.language;
}

// Get screen resolution
function getScreenResolution() {
  return window.screen.width + "x" + window.screen.height;
}

// Check if user prefers dark mode
function prefersDarkMode() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

document.addEventListener("DOMContentLoaded", function() {
    // Update the DOM with gathered info
document.getElementById("ip-address").innerText = updateIPAddress();
    document.getElementById("operating-system").innerText = getOS();
    document.getElementById("browser-info").innerText = getBrowser();
    document.getElementById("language").innerText = getLanguage();
    document.getElementById("screen-resolution").innerText = getScreenResolution();

    // Display dark mode preference
    var darkModeMessage = prefersDarkMode() ? "Dark" : "Light";
    document.getElementById("dark-mode").innerText = darkModeMessage;
});
