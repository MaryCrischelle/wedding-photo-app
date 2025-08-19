const galleryGrid = document.getElementById('galleryGrid');
const refreshBtn = document.getElementById('refreshGallery');

function loadGallery() {
  galleryGrid.innerHTML = '';
  fetch('/api/gallery')
    .then(res => res.json())
    .then(data => {
      if (data.images && data.images.length) {
        data.images.forEach(url => {
          const wrapper = document.createElement('div');
          wrapper.className = 'flex flex-col items-center';

          const img = document.createElement('img');
          img.src = url;
          img.className = 'w-full h-32 object-cover rounded-lg mb-2';
          wrapper.appendChild(img);

          const downloadBtn = document.createElement('a');
          downloadBtn.href = url;
          downloadBtn.download = url.split('/').pop();
          downloadBtn.className = 'px-3 py-1 bg-blue-400 text-white rounded shadow text-sm mb-2';
          downloadBtn.innerText = 'Download';
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
