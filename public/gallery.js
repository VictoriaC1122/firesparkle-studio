// Official app screenshots. Links still open the original image without JavaScript.
(() => {
  if (typeof HTMLDialogElement === 'undefined' || !HTMLDialogElement.prototype.showModal) return;

  const galleries = [...document.querySelectorAll('[data-gallery]')];
  if (!galleries.length) return;

  let dialog;
  let fullImage;
  let previous;
  let next;
  let count;
  let currentLinks = [];
  let currentIndex = 0;

  const bilingual = (zh, en) => window.fsI18n?.markup(en) || zh;

  function createDialog() {
    dialog = document.createElement('dialog');
    dialog.className = 'gallery-modal';
    dialog.setAttribute('aria-labelledby', 'gallery-modal-title');
    dialog.innerHTML = `
      <div class="gallery-modal-header">
        <h2 class="gallery-modal-title" id="gallery-modal-title">${bilingual('作品畫面', 'Screenshots')}</h2>
        <button class="gallery-modal-button gallery-modal-close" type="button" autofocus>
          <span aria-hidden="true">×</span>${bilingual('關閉', 'Close')}
        </button>
      </div>
      <figure class="gallery-modal-stage">
        <img class="gallery-modal-image" alt="" decoding="async">
      </figure>
      <div class="gallery-modal-footer">
        <button class="gallery-modal-button gallery-modal-previous" type="button">
          <span aria-hidden="true">←</span>${bilingual('上一張', 'Previous')}
        </button>
        <p class="gallery-modal-count" role="status" aria-live="polite" aria-atomic="true"></p>
        <button class="gallery-modal-button gallery-modal-next" type="button">
          ${bilingual('下一張', 'Next')}<span aria-hidden="true">→</span>
        </button>
      </div>`;
    document.body.append(dialog);
    fullImage = dialog.querySelector('.gallery-modal-image');
    previous = dialog.querySelector('.gallery-modal-previous');
    next = dialog.querySelector('.gallery-modal-next');
    count = dialog.querySelector('.gallery-modal-count');
    dialog.querySelector('.gallery-modal-close').addEventListener('click', () => dialog.close());
    previous.addEventListener('click', () => showImage(currentIndex - 1));
    next.addEventListener('click', () => showImage(currentIndex + 1));
    dialog.addEventListener('keydown', (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        const forward = document.documentElement.dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
        showImage(currentIndex + (event.key === forward ? 1 : -1));
      }
      // Escape and returning focus to the opener are handled by the native dialog.
    });
    dialog.addEventListener('click', (event) => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right ||
          event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    });
  }

  function showImage(index) {
    if (index < 0 || index >= currentLinks.length) return;
    currentIndex = index;
    const link = currentLinks[index];
    fullImage.alt = link.querySelector('img')?.alt || '';
    fullImage.src = link.href;
    const number = new Intl.NumberFormat(document.documentElement.lang);
    count.textContent = `${number.format(index + 1)} / ${number.format(currentLinks.length)}`;
    previous.disabled = index === 0;
    next.disabled = index === currentLinks.length - 1;
    // Keep focus inside the controls if a navigation button reaches its boundary.
    if (previous.disabled && document.activeElement === previous) next.focus();
    if (next.disabled && document.activeElement === next) previous.focus();
  }

  for (const gallery of galleries) {
    gallery.addEventListener('click', (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.altKey ||
          event.ctrlKey || event.metaKey || event.shiftKey) return;
      const link = event.target.closest('a[data-full-image][href]');
      if (!link || !gallery.contains(link)) return;
      currentLinks = [...gallery.querySelectorAll('a[data-full-image][href]')];
      const index = currentLinks.indexOf(link);
      if (index < 0) return;
      if (!dialog) createDialog();
      showImage(index);
      // Some browsers do not focus a clicked link; this gives the native dialog
      // the correct opener to restore after closing.
      link.focus({ preventScroll: true });
      dialog.showModal();
      event.preventDefault();
    });
  }
})();
