
const gallery = document.getElementById('gallery');
const dialog = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
let activeFilter = 'All';

function render(){
  const visible = TEARSHEETS.filter(x => activeFilter === 'All' || x.category === activeFilter);
  gallery.innerHTML = visible.map(item => `
    <article class="card">
      <button type="button" data-slug="${item.slug}" aria-label="Enlarge ${item.title}">
        <div class="card-media">
          <img src="assets/thumbs/${item.slug}.webp" alt="${item.publication} tear sheet featuring ${item.subject}" loading="lazy">
        </div>
      </button>
      <div class="card-body">
        <div class="meta"><span>${item.publication}</span><span>${item.date}</span></div>
        <h3>${item.title}</h3>
        <p class="subject">${item.subject}</p>
        <p class="credit">Photo credit: ${item.credit}</p>
      </div>
    </article>`).join('');
}

document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    activeFilter = button.dataset.filter;
    render();
  });
});

gallery.addEventListener('click', e => {
  const button = e.target.closest('button[data-slug]');
  if (!button) return;
  const item = TEARSHEETS.find(x => x.slug === button.dataset.slug);
  lightboxImage.src = `assets/images/${item.slug}.webp`;
  lightboxImage.alt = `${item.publication} tear sheet featuring ${item.subject}`;
  lightboxCaption.textContent = `${item.publication}, ${item.date} — ${item.title}. Photo credit: ${item.credit}`;
  dialog.showModal();
});

dialog.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && dialog.open) dialog.close(); });
document.getElementById('year').textContent = new Date().getFullYear();
render();
