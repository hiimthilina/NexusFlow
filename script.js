// Default settings
let currentCategory = 'guidance';
let headingFontSize = 24;
let contentFontSize = 18;
let subInfoFontSize = 14;
let headingSpacing = 15;
let contentSpacing = 15;

// Color schemes for each category
const colorSchemes = {
  educational: {
    name: 'Educational Facts',
    background: '#E6F7FF',
    heading: { font: 'Montserrat Bold', color: '#003366' },
    content: { font: 'Open Sans Regular', color: '#00529B' },
    subInfo: { font: 'Roboto Light', color: '#A6A6A6' }
  },
  // ... other categories ...
  about: {
    name: 'About Myself',
    background: '#FFF8E1',
    heading: { font: 'Montserrat Bold', color: '#6D4C41' },
    content: { font: 'Open Sans Regular', color: '#8D6E63' },
    subInfo: { font: 'Roboto Light', color: '#A6A6A6' }
  }
};

// Function to update the post preview
function updatePostPreview() {
  const postPreview = document.getElementById('postPreview');
  const previewHeading = document.getElementById('previewHeading');
  const previewContent = document.getElementById('previewContent');
  const previewSubInfo = document.getElementById('previewSubInfo');

  const scheme = colorSchemes[currentCategory];
  postPreview.style.backgroundColor = scheme.background;
  previewHeading.style.color = scheme.heading.color;
  previewContent.style.color = scheme.content.color;
  previewSubInfo.style.color = scheme.subInfo.color;

  previewHeading.style.fontFamily = scheme.heading.font;
  previewContent.style.fontFamily = scheme.content.font;
  previewSubInfo.style.fontFamily = scheme.subInfo.font;

  previewHeading.style.fontSize = `${headingFontSize}px`;
  previewContent.style.fontSize = `${contentFontSize}px`;
  previewSubInfo.style.fontSize = `${subInfoFontSize}px`;

  previewHeading.style.marginBottom = `${headingSpacing}px`;
  previewContent.style.marginBottom = `${contentSpacing}px`;

  previewHeading.textContent = document.getElementById('headingInput').value;
  previewContent.textContent = document.getElementById('descriptionInput').value;
  previewSubInfo.textContent = document.getElementById('hashtagsInput').value;

  // Update preset details
  document.getElementById('presetDetails').innerHTML = `
    <strong>Preset Name:</strong> ${scheme.name}<br>
    <strong>Background Color:</strong> ${scheme.background}<br>
    <strong>Heading Font:</strong> ${scheme.heading.font} <strong>Color:</strong> ${scheme.heading.color}<br>        
    <strong>Content Font:</strong> ${scheme.content.font} <strong>Color:</strong> ${scheme.content.color}<br>
    <strong>Sub-Info Font:</strong> ${scheme.subInfo.font} <strong>Color:</strong> ${scheme.subInfo.color}
  `;
}

// Event listeners for category buttons
document.querySelectorAll('.category-selector button').forEach(button => {
  button.addEventListener('click', () => {
    currentCategory = button.dataset.category;
    highlightButton(button.id);
    updatePostPreview();
  });
});

// Highlight selected button
function highlightButton(selectedId) {
  document.querySelectorAll('.category-selector button').forEach(button => {
    button.classList.remove('selected');
  });
  document.getElementById(selectedId).classList.add('selected');
}

// Event listeners for font size sliders
document.getElementById('headingFontSizeSlider').addEventListener('input', (event) => {
  headingFontSize = event.target.value;
  document.getElementById('headingFontSizeValue').textContent = `${headingFontSize}px`;
  updatePostPreview();
});

document.getElementById('contentFontSizeSlider').addEventListener('input', (event) => {
  contentFontSize = event.target.value;
  document.getElementById('contentFontSizeValue').textContent = `${contentFontSize}px`;
  updatePostPreview();
});

document.getElementById('subInfoFontSizeSlider').addEventListener('input', (event) => {
  subInfoFontSize = event.target.value;
  document.getElementById('subInfoFontSizeValue').textContent = `${subInfoFontSize}px`;
  updatePostPreview();
});

// Event listeners for spacing sliders
document.getElementById('headingSpacingSlider').addEventListener('input', (event) => {
  headingSpacing = event.target.value;
  document.getElementById('headingSpacingValue').textContent = `${headingSpacing}px`;
  updatePostPreview();
});

document.getElementById('contentSpacingSlider').addEventListener('input', (event) => {
  contentSpacing = event.target.value;
  document.getElementById('contentSpacingValue').textContent = `${contentSpacing}px`;
  updatePostPreview();
});

// Event listeners for form inputs
document.getElementById('headingInput').addEventListener('input', updatePostPreview);
document.getElementById('descriptionInput').addEventListener('input', updatePostPreview);
document.getElementById('hashtagsInput').addEventListener('input', updatePostPreview);

// Initialize with default settings
updatePostPreview();

// Theme toggle functionality
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const body = document.body;

// Check if the user has a preferred theme saved in localStorage
const currentTheme = localStorage.getItem('theme');

// Apply the saved theme on page load
if (currentTheme === 'dark') {
  body.classList.add('dark-theme');
}

// Add click event listener to toggle the theme
themeToggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark-theme');
  if (body.classList.contains('dark-theme')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});

// Generate Button functionality
document.getElementById('generateButton').addEventListener('click', function() {
  const postContent = generatePostContent();
  const newTab = window.open();
  newTab.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Generated Post</title>
      <style>
        body { margin: 0; padding: 20px; }
        .post-in-new-tab { position: relative; overflow: hidden; }
        #bgImage { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: -1; }
        #controls { margin-top: 20px; }
        input[type="range"] { width: 100%; }
      </style>
    </head>
    <body>
      ${postContent}
      <div id="controls">
        <input type="range" id="opacitySlider" min="0" max="1" step="0.1" value="0.5" onchange="updateBgStyle()">
        <input type="range" id="blurSlider" min="0" max="10" value="5" onchange="updateBgStyle()">
        <button onclick="zoomIn()">Zoom In</button>
        <button onclick="zoomOut()">Zoom Out</button>
        <button onclick="panLeft()">Pan Left</button>
        <button onclick="panRight()">Pan Right</button>
        <button onclick="panUp()">Pan Up</button>
        <button onclick="panDown()">Pan Down</button>
        <button onclick="crop()">Crop</button>
        <button onclick="exportAsJPG()">Export as JPG</button>
      </div>
      <script>
        function updateBgStyle() {
          const bgImage = document.getElementById('bgImage');
          if (bgImage) {
            bgImage.style.opacity = document.getElementById('opacitySlider').value;
            bgImage.style.filter = \`blur(\${document.getElementById('blurSlider').value}px)\`;
          }
        }
        function zoomIn() { /* Implement Zoom In */ }
        function zoomOut() { /* Implement Zoom Out */ }
        function panLeft() { /* Implement Pan Left */ }
        function panRight() { /* Implement Pan Right */ }
        function panUp() { /* Implement Pan Up */ }
        function panDown() { /* Implement Pan Down */ }
        function crop() { /* Implement Crop */ }
        function exportAsJPG() {
          html2canvas(document.querySelector('.post-in-new-tab')).then(canvas => {
            const imgData = canvas.toDataURL("image/jpeg", 1.0);
            const link = document.createElement('a');
            link.download = 'post.jpg';
            link.href = imgData;
            link.click();
          });
        }
        updateBgStyle();
      </script>
    </body>
    </html>
  `);
  newTab.document.close();
});

function generatePostContent() {
  const imageUrl = document.getElementById('backgroundImageInput').value;
  const bgImageStyle = imageUrl ? ` background-image: url('${imageUrl}'); background-size: cover; background-position: center;` : '';
  const platform = document.getElementById('platformSelect').value;
  const recommendedSize = suggestResolution(platform);

  return `
    <div class="post-in-new-tab" style="width: ${recommendedSize.width}px; height: ${recommendedSize.height}px;${bgImageStyle}">
      ${imageUrl ? `<img id="bgImage" src="${imageUrl}" style="opacity: 0.5; filter: blur(5px);">` : ''}
      <h2 style="font-family: ${colorSchemes[currentCategory].heading.font}; color: ${colorSchemes[currentCategory].heading.color}; font-size: ${headingFontSize}px; margin-bottom: ${headingSpacing}px;">${document.getElementById('headingInput').value}</h2>
      <p style="font-family: ${colorSchemes[currentCategory].content.font}; color: ${colorSchemes[currentCategory].content.color}; font-size: ${contentFontSize}px; margin-bottom: ${contentSpacing}px;">${document.getElementById('descriptionInput').value}</p>
      <small style="font-family: ${colorSchemes[currentCategory].subInfo.font}; color: ${colorSchemes[currentCategory].subInfo.color}; font-size: ${subInfoFontSize}px;">${document.getElementById('hashtagsInput').value}</small>
    </div>
  `;
}

function suggestResolution(platform) {
  const resolutions = {
    'youtube': { width: 1200, height: 630 },
    'facebook': { width: 1200, height: 630 },
    'instagram': { width: 1080, height: 1080 },
    'twitter': { width: 1024, height: 512 },
    'tiktok': { width: 1080, height: 1920 },
    'threads': { width: 1080, height: 1080 },
    'linkedin': { width: 1200, height: 627 }
  };
  return resolutions[platform.toLowerCase()] || { width: 1200, height: 630 };
}