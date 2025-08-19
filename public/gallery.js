const galleryGrid = document.getElementById('galleryGrid');
const refreshBtn = document.getElementById('refreshGallery');
let currentImages = [];

function loadGallery() {
  galleryGrid.innerHTML = '';
  fetch('/api/gallery')
    .then(res => res.json())
    .then(data => {
      currentImages = data.images || [];
      if (currentImages.length) {
        currentImages.forEach(url => {
          const img = document.createElement('img');
          img.src = url;
          img.className = 'w-full h-32 object-cover rounded-lg cursor-pointer transition duration-200 hover:scale-105';
          img.onclick = () => openLightbox(url);
          galleryGrid.appendChild(img);
        });
      } else {
        galleryGrid.innerHTML = '<p class="col-span-4 text-blue-700">No photos uploaded yet.</p>';
      }
    });
}
// Lightbox logic
const lightboxModal = document.getElementById('lightboxModal');
const lightboxImg = document.getElementById('lightboxImg');
const downloadLightbox = document.getElementById('downloadLightbox');
const closeLightbox = document.getElementById('closeLightbox');
let currentLightboxUrl = '';

function openLightbox(url) {
  currentLightboxUrl = url;
  lightboxImg.src = url;
  lightboxModal.classList.remove('hidden');
}

closeLightbox.onclick = () => {
  lightboxModal.classList.add('hidden');
  lightboxImg.src = '';
};

downloadLightbox.onclick = () => {
  const link = document.createElement('a');
  link.href = currentLightboxUrl;
  link.download = currentLightboxUrl.split('/').pop();
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

refreshBtn.addEventListener('click', loadGallery);
window.addEventListener('DOMContentLoaded', loadGallery);
