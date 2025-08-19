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
          const wrapper = document.createElement('div');
          wrapper.className = 'flex flex-col items-center';

          const img = document.createElement('img');
          img.src = url;
          img.className = 'w-full h-32 object-cover rounded-lg mb-2';
          wrapper.appendChild(img);

          const downloadBtn = document.createElement('button');
          downloadBtn.className = 'px-3 py-1 bg-blue-400 text-white rounded shadow text-sm mb-2';
          downloadBtn.innerText = 'Download';
          downloadBtn.onclick = () => {
            window.open(url, '_blank');
          };
          wrapper.appendChild(downloadBtn);

          galleryGrid.appendChild(wrapper);
        });
      } else {
        galleryGrid.innerHTML = '<p class="col-span-4 text-blue-700">No photos uploaded yet.</p>';
      }
    });
}

refreshBtn.addEventListener('click', loadGallery);
window.addEventListener('DOMContentLoaded', loadGallery);
