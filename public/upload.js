const form = document.getElementById('photoUploadForm');
const photosInput = document.getElementById('photos');
const preview = document.getElementById('preview');
const errorMsg = document.getElementById('errorMsg');
const successMsg = document.getElementById('successMsg');

photosInput.addEventListener('change', () => {
  preview.innerHTML = '';
  errorMsg.textContent = '';
  successMsg.textContent = '';
  Array.from(photosInput.files).forEach(file => {
    if (file.size > 5 * 1024 * 1024) {
      errorMsg.textContent = 'Each photo must be less than 5MB.';
      return;
    }
    const reader = new FileReader();
    reader.onload = e => {
      const img = document.createElement('img');
      img.src = e.target.result;
      img.className = 'w-full h-32 object-cover rounded-lg';
      preview.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
});

form.addEventListener('submit', async e => {
  e.preventDefault();
  errorMsg.textContent = '';
  successMsg.textContent = '';
  const files = Array.from(photosInput.files);
  if (!files.length) {
    errorMsg.textContent = 'Please select at least one photo.';
    return;
  }
  if (files.some(f => f.size > 5 * 1024 * 1024)) {
    errorMsg.textContent = 'Each photo must be less than 5MB.';
    return;
  }
  const formData = new FormData();
  files.forEach(f => formData.append('photos', f));
  try {
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    if (res.ok) {
      successMsg.textContent = 'Photos uploaded successfully!';
      preview.innerHTML = '';
      photosInput.value = '';
    } else {
      errorMsg.textContent = data.error || 'Upload failed.';
    }
  } catch (err) {
    errorMsg.textContent = 'Upload failed.';
  }
});
