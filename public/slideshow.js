const slideshowImg = document.getElementById('slideshowImg');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const autoBtn = document.getElementById('autoBtn');

let images = [];
let currentIndex = 0;
let autoInterval = null;

function showImage(index) {
  if (images.length === 0) {
    slideshowImg.src = '';
    slideshowImg.alt = 'No photos available.';
    return;
  }
  slideshowImg.src = images[index];
  slideshowImg.alt = `Photo ${index + 1}`;
}

function fetchImages() {
  fetch('/api/gallery')
    .then(res => res.json())
    .then(data => {
      images = data.images || [];
      currentIndex = 0;
      showImage(currentIndex);
    });
}

prevBtn.addEventListener('click', () => {
  if (images.length === 0) return;
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
});

nextBtn.addEventListener('click', () => {
  if (images.length === 0) return;
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
});

autoBtn.addEventListener('click', () => {
  if (autoInterval) {
    clearInterval(autoInterval);
    autoInterval = null;
    autoBtn.textContent = 'Start Auto Slideshow';
    return;
  }
  autoBtn.textContent = 'Stop Auto Slideshow';
  autoInterval = setInterval(() => {
    nextBtn.click();
  }, 3000);
});

window.addEventListener('DOMContentLoaded', fetchImages);
