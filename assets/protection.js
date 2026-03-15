(function () {
    'use strict';

    function addWatermarks() {
        const containers = document.querySelectorAll('.gallery-item, .about-image');

        containers.forEach((container) => {
            container.classList.add('watermark-protected');

            if (!container.querySelector('.photo-watermark')) {
                const mark = document.createElement('div');
                mark.className = 'photo-watermark';
                mark.textContent = '© CARO ISAS';
                container.appendChild(mark);
            }
        });
    }

    function protectImages() {
        document.querySelectorAll('img').forEach((img) => {
            img.setAttribute('draggable', 'false');
            img.setAttribute('loading', img.getAttribute('loading') || 'lazy');
            img.style.webkitUserDrag = 'none';
            img.style.userSelect = 'none';
        });
    }

    function blockCommonActions() {
        const blockedKeys = new Set(['s', 'u', 'p', 'c', 'x', 'i', 'j']);

        document.addEventListener('contextmenu', function (event) {
            event.preventDefault();
        });

        document.addEventListener('dragstart', function (event) {
            if (event.target && event.target.closest('img')) {
                event.preventDefault();
            }
        });

        document.addEventListener('copy', function (event) {
            event.preventDefault();
        });

        document.addEventListener('cut', function (event) {
            event.preventDefault();
        });

        document.addEventListener('keydown', function (event) {
            const key = event.key.toLowerCase();
            if ((event.ctrlKey || event.metaKey) && blockedKeys.has(key)) {
                event.preventDefault();
            }
            if (event.key === 'PrintScreen') {
                event.preventDefault();
            }
            if (event.key === 'F12') {
                event.preventDefault();
            }
        });
    }

    function initProtection() {
        addWatermarks();
        protectImages();
        blockCommonActions();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initProtection);
    } else {
        initProtection();
    }
})();
