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