const galleryGrid = document.getElementById('galleryGrid');
fetch('/api/gallery')
  .then(res => res.json())
  .then(data => {
    if (data.images && data.images.length) {
      data.images.forEach(url => {
        const link = document.createElement('a');
        link.href = url;
        link.download = url.split('/').pop();
        link.className = 'block';
        const img = document.createElement('img');
        img.src = url;
        img.className = 'w-full h-32 object-cover rounded-lg';
        link.appendChild(img);
        galleryGrid.appendChild(link);
      });
    } else {
      galleryGrid.innerHTML = '<p class="col-span-4 text-blue-700">No photos uploaded yet.</p>';
    }
  });
