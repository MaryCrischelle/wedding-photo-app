let bgImages = [];
let bgIndex = 0;
let bgInterval = null;

function setBackground(url) {
	document.body.style.backgroundImage = `url('${url}')`;
	document.body.style.backgroundSize = 'cover';
	document.body.style.backgroundPosition = 'center';
	document.body.style.backgroundRepeat = 'no-repeat';
}

function fetchBgImages() {
	fetch('/api/gallery')
		.then(res => res.json())
		.then(data => {
			bgImages = data.images || [];
			if (bgImages.length) {
				bgIndex = 0;
				setBackground(bgImages[bgIndex]);
				if (bgInterval) clearInterval(bgInterval);
				bgInterval = setInterval(() => {
					bgIndex = (bgIndex + 1) % bgImages.length;
					setBackground(bgImages[bgIndex]);
				}, 4000);
			}
		});
}

window.addEventListener('DOMContentLoaded', fetchBgImages);
