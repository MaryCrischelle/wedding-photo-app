const galleryGrid = document.getElementById('galleryGrid');
fetch('/api/gallery')
  .then(res => res.json())
  .then(data => {
    if (data.images && data.images.length) {
      data.images.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        img.className = 'w-full h-32 object-cover rounded-lg';
        galleryGrid.appendChild(img);
      });
    } else {
      galleryGrid.innerHTML = '<p class="col-span-4 text-blue-700">No photos uploaded yet.</p>';
    }
  });
