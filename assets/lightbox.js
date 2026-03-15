(function () {
    'use strict';

    const galleries = Array.from(document.querySelectorAll('.gallery'));
    if (!galleries.length) return;

    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = [
        '<button type="button" class="lightbox-close" aria-label="Cerrar">&times;</button>',
        '<button type="button" class="lightbox-prev" aria-label="Anterior">&#8249;</button>',
        '<img class="lightbox-image" alt="Vista ampliada">',
        '<button type="button" class="lightbox-next" aria-label="Siguiente">&#8250;</button>'
    ].join('');

    document.body.appendChild(overlay);

    const imageElement = overlay.querySelector('.lightbox-image');
    const closeButton = overlay.querySelector('.lightbox-close');
    const prevButton = overlay.querySelector('.lightbox-prev');
    const nextButton = overlay.querySelector('.lightbox-next');

    let currentImages = [];
    let currentIndex = 0;

    function renderImage() {
        const item = currentImages[currentIndex];
        if (!item) return;
        imageElement.src = item.src;
        imageElement.alt = item.alt || 'Imagen ampliada';
    }

    function openLightbox(images, index) {
        currentImages = images;
        currentIndex = index;
        renderImage();
        overlay.classList.add('is-open');
        document.body.classList.add('lightbox-open');
    }

    function closeLightbox() {
        overlay.classList.remove('is-open');
        document.body.classList.remove('lightbox-open');
        imageElement.removeAttribute('src');
    }

    function goPrev() {
        if (!currentImages.length) return;
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        renderImage();
    }

    function goNext() {
        if (!currentImages.length) return;
        currentIndex = (currentIndex + 1) % currentImages.length;
        renderImage();
    }

    galleries.forEach((gallery) => {
        const images = Array.from(gallery.querySelectorAll('.gallery-item img'));

        images.forEach((img, index) => {
            img.addEventListener('click', function (event) {
                event.preventDefault();
                const items = images.map((image) => ({
                    src: image.currentSrc || image.src,
                    alt: image.alt || ''
                }));
                openLightbox(items, index);
            });
        });
    });

    closeButton.addEventListener('click', closeLightbox);
    prevButton.addEventListener('click', goPrev);
    nextButton.addEventListener('click', goNext);

    overlay.addEventListener('click', function (event) {
        if (event.target === overlay) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', function (event) {
        if (!overlay.classList.contains('is-open')) return;
        if (event.key === 'Escape') closeLightbox();
        if (event.key === 'ArrowLeft') goPrev();
        if (event.key === 'ArrowRight') goNext();
    });
})();
