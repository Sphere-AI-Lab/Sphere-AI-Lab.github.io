// JavaScript for SphereLab website

// This file is currently empty but can be used for:
// - Adding animations
// - Handling form submissions
// - Creating interactive elements
// - Implementing a responsive menu for mobile
// - Loading dynamic content

document.addEventListener('DOMContentLoaded', function() {
  console.log('SphereLab website loaded successfully');
  
  
  // Simple animations for the welcome text and logo
  const welcomeText = document.querySelector('.welcome-text');
  const logoContainer = document.querySelector('.logo-container');
  
  // Add classes to trigger CSS animations
  setTimeout(() => {
      if (welcomeText) {
          welcomeText.style.opacity = '1';
          welcomeText.style.transform = 'translateY(0)';
      }
  }, 300);
  
  setTimeout(() => {
      if (logoContainer) {
          logoContainer.style.opacity = '1';
          logoContainer.style.transform = 'scale(1)';
      }
  }, 600);
  
  // Initialize logo position after its animation completes
  setTimeout(() => {
      if (logoContainer) {
          // Add the logo-animated class to change transition behavior
          logoContainer.classList.add('logo-animated');
          logoContainer.dataset.initialTransform = 'scale(1)';
      }
  }, 1200);
  
  // Background and logo parallax effect
  window.addEventListener('mousemove', (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      // Move background shape - larger movement
      const shape = document.querySelector('.background-shape');
      if (shape) {
          shape.style.transform = `rotate(42deg) translate(${x * 30}px, ${y * 30}px)`;
      }
      
      // Move logo - smaller movement in opposite direction for enhanced depth effect
      if (logoContainer && logoContainer.dataset.initialTransform) {
          const initialTransform = logoContainer.dataset.initialTransform;
          logoContainer.style.transform = `${initialTransform} translate(${x * -15}px, ${y * -15}px)`;
      }
  });

  const element = document.getElementById('typewriter');

      // Define the parts of the animation: a prefix, a segment to delete,
      // and the final suffix to append after deletion. Deleting only the
      // segment leaves the prefix intact. After deletion the suffix will
      // be typed after the retained prefix, resulting in “We are driven by curiosity”.
      // Constant prefix that should never be removed. It is typed once at
      // the beginning of the animation and then retained through each
      // subsequent cycle. Only the words that follow this prefix will be
      // deleted and retyped.
      const prefix = 'We are ';
      // Words to cycle through after the prefix. The animation will type
      // each word, delete it, then move on to the next. When it reaches
      // the end of the array it loops back to the first.
      const words = ['SphereLab.', 'driven by curiosity.', 'drawn to simple principles.', 'building reliable AI.'];
      // Timing constants controlling the pace of typing and deletion as
      // well as pauses between phases. Adjust these values to change
      // the animation speed or pauses.
      const typingDelay = 150;         // milliseconds between keystrokes
      const deletingDelay = 100;       // milliseconds between deleting characters
      const pauseAfterTyping = 1000;   // pause before starting deletion
      const pauseAfterDeleting = 500;  // pause before typing the next word

      /**
       * Helper to write a given string to the element one character at a time.
       * @param {string} str The text to write
       * @param {number} i Current index in the string
       * @param {function} callback Called when the entire string has been written
       */
      function typeString(str, i, callback) {
        if (i < str.length) {
          element.textContent += str.charAt(i);
          setTimeout(() => typeString(str, i + 1, callback), typingDelay);
        } else {
          callback();
        }
      }

      /**
       * Helper to delete a number of characters from the end of the current
       * element’s text. It deletes one character per call until the
       * specified count has been removed.
       * @param {number} count Number of characters to delete
       * @param {function} callback Called when deletion is complete
       */
      function deleteChars(count, callback) {
        if (count > 0) {
          element.textContent = element.textContent.slice(0, -1);
          setTimeout(() => deleteChars(count - 1, callback), deletingDelay);
        } else {
          callback();
        }
      }

      /**
       * Cycles through the `words` array indefinitely. After the prefix
       * has been typed once, this function types the current word
       * character by character, waits, deletes it, waits again, then
       * proceeds to the next word. When the end of the array is
       * reached, it loops back to the beginning.
       */
      function cycleWords() {
        const word = words[wordIndex];
        typeString(word, 0, () => {
          // After typing the word, pause before deleting
          setTimeout(() => {
            deleteChars(word.length, () => {
              // Move to the next word after a pause
              setTimeout(() => {
                wordIndex = (wordIndex + 1) % words.length;
                cycleWords();
              }, pauseAfterDeleting);
            });
          }, pauseAfterTyping);
        });
      }

      // Begin typing the prefix once and then start cycling through words
      let wordIndex = 0;
      element.classList.add('typing');
      typeString(prefix, 0, () => {
        cycleWords();
      });
}); 