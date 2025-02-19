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
  guidance: {
    name: 'Helpful Guidance',
    background: '#E8F3E8',
    heading: { font: 'Montserrat Bold', color: '#2E7D32' },
    content: { font: 'Open Sans Regular', color: '#388E3C' },
    subInfo: { font: 'Roboto Light', color: '#A6A6A6' }
  },
  filmmaking: {
    name: 'Filmmaking',
    background: '#FFEBEE',
    heading: { font: 'Montserrat Bold', color: '#8B0000' },
    content: { font: 'Open Sans Regular', color: '#B71C1C' },
    subInfo: { font: 'Roboto Light', color: '#A6A6A6' }
  },
  ai: {
    name: 'AI Technologies',
    background: '#E3F2FD',
    heading: { font: 'Montserrat Bold', color: '#1565C0' },
    content: { font: 'Open Sans Regular', color: '#1E88E5' },
    subInfo: { font: 'Roboto Light', color: '#A6A6A6' }
  },
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
  previewSubInfo.textContent = document.getElementById('subInfoInput').value;

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
document.getElementById('subInfoInput').addEventListener('input', updatePostPreview);

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

// Next button functionality to move to Stage 2
document.getElementById('nextButton').addEventListener('click', () => {
  // Store current state for Stage 2
  localStorage.setItem('postState', JSON.stringify({
    heading: document.getElementById('headingInput').value,
    content: document.getElementById('descriptionInput').value,
    subInfo: document.getElementById('subInfoInput').value,
    category: currentCategory,
    headingFontSize: headingFontSize,
    contentFontSize: contentFontSize,
    subInfoFontSize: subInfoFontSize,
    headingSpacing: headingSpacing,
    contentSpacing: contentSpacing
  }));
  
  // Redirect to stage 2
  window.location.href = 'export.html';
});

// Additional JS for export.html

document.addEventListener('DOMContentLoaded', () => {
  const postState = JSON.parse(localStorage.getItem('postState'));
  if (!postState) {
    alert('No post data found. Please go back to Stage 1.');
    window.location.href = 'index.html';
    return;
  }

  // Load post data from Stage 1
  const { heading, content, subInfo, category, headingFontSize, contentFontSize, subInfoFontSize, headingSpacing, contentSpacing } = postState;
  
  const scheme = colorSchemes[category];
  const finalPreview = document.getElementById('finalPreview');
  finalPreview.innerHTML = `
    <h2 style="font-family: ${scheme.heading.font}; color: ${scheme.heading.color}; font-size: ${headingFontSize}px; margin-bottom: ${headingSpacing}px;">${heading}</h2>
    <p style="font-family: ${scheme.content.font}; color: ${scheme.content.color}; font-size: ${contentFontSize}px; margin-bottom: ${contentSpacing}px;">${content}</p>
    <small style="font-family: ${scheme.subInfo.font}; color: ${scheme.subInfo.color}; font-size: ${subInfoFontSize}px;">${subInfo}</small>
  `;
  finalPreview.style.backgroundColor = scheme.background;

  // Background Image Controls
  document.getElementById('loadFromUrl').addEventListener('click', loadFromUrl);
  document.getElementById('loadFromFile').addEventListener('click', () => {
    const file = document.getElementById('bgImageFile').files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        setBackgroundImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  });

  document.getElementById('searchImages').addEventListener('click', searchImages);

  document.getElementById('opacitySlider').addEventListener('input', updateBackgroundStyle);
  document.getElementById('blurSlider').addEventListener('input', updateBackgroundStyle);

  document.getElementById('exportButton').addEventListener('click', exportPost);

  // Initialize background image if any was set
  const bgImage = localStorage.getItem('bgImage');
  if (bgImage) {
    setBackgroundImage(bgImage);
  }
});

function loadFromUrl() {
  const url = document.getElementById('bgImageUrl').value;
  if (url) setBackgroundImage(url);
}

function setBackgroundImage(src) {
  const finalPreview = document.getElementById('finalPreview');
  finalPreview.style.backgroundImage = `url(${src})`;
  finalPreview.style.backgroundSize = 'cover';
  finalPreview.style.backgroundPosition = 'center';
  localStorage.setItem('bgImage', src);
  updateBackgroundStyle();
}

function updateBackgroundStyle() {
  const finalPreview = document.getElementById('finalPreview');
  const opacity = document.getElementById('opacitySlider').value;
  const blur = document.getElementById('blurSlider').value;
  
  finalPreview.style.opacity = opacity;
  finalPreview.style.filter = `blur(${blur}px)`;
}

function searchImages() {
  const query = document.getElementById('imageSearch').value;
  const stockImagesDiv = document.getElementById('stockImages');
  stockImagesDiv.innerHTML = ''; // Clear previous results

  // Here you'd typically make an API call to Pexels or Pixabay, but for demo:
  for (let i = 0; i < 5; i++) {
    const img = document.createElement('img');
    img.src = `https://via.placeholder.com/150x150?text=Image+${i+1}`;
    img.style = 'width: 150px; height: 150px; margin-right: 10px;';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.style = 'position: absolute; top: 10px; right: 10px;';
    checkbox.onclick = function() {
      if (this.checked) {
        setBackgroundImage(this.previousElementSibling.src);
        document.getElementById('selectedImage').textContent = `Selected from Placeholder (${i+1})`;
      }
    };
    const imgContainer = document.createElement('div');
    imgContainer.style = 'position: relative; display: inline-block;';
    imgContainer.appendChild(img);
    imgContainer.appendChild(checkbox);
    stockImagesDiv.appendChild(imgContainer);
  }
}

function exportPost() {
  html2canvas(document.getElementById('finalPreview')).then(canvas => {
    const imgData = canvas.toDataURL("image/jpeg", 1.0);
    const link = document.createElement('a');
    link.download = 'post.jpg';
    link.href = imgData;
    link.click();
  });
}