//your JS code here. If required.
document.addEventListener("DOMContentLoaded", function () {
    // Load saved preferences from cookies
    loadPreferences();

    // Get the form element
    var form = document.getElementById('customForm');

    // Add a submit event listener to the form
    form.addEventListener('submit', function (event) {
        // Prevent the default form submission
        event.preventDefault();

        // Get the selected font size and font color from the form
        var fontSize = document.getElementById('fontsize').value + 'px';
        var fontColor = document.getElementById('fontcolor').value;

        // Update CSS custom properties
        document.documentElement.style.setProperty('--fontsize', fontSize);
        document.documentElement.style.setProperty('--fontcolor', fontColor);

        // Save preferences in cookies
        savePreferences(fontSize, fontColor);
    });

    function loadPreferences() {
        // Load preferences from cookies
        var fontSize = getCookie('fontsize');
        var fontColor = getCookie('fontcolor');

        // Apply saved preferences
        if (fontSize && fontColor) {
            document.documentElement.style.setProperty('--fontsize', fontSize);
            document.documentElement.style.setProperty('--fontcolor', fontColor);

            // Update form fields
            document.getElementById('fontsize').value = parseInt(fontSize);
            document.getElementById('fontcolor').value = fontColor;
        }
    }

    function savePreferences(fontSize, fontColor) {
        // Save preferences in cookies
        setCookie('fontsize', fontSize, 365);
        setCookie('fontcolor', fontColor, 365);
    }

    function setCookie(name, value, days) {
        var expires = '';
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + value + expires + '; path=/';
    }

    function getCookie(name) {
        var nameEQ = name + '=';
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1, cookie.length);
            }
            if (cookie.indexOf(nameEQ) === 0) {
                return cookie.substring(nameEQ.length, cookie.length);
            }
        }
        return null;
    }
});
