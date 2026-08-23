// ---- DATA: fill these arrays in with your own items later ----
// For projects, type is "video"; for certificates, type is "image".
// Leave src: "" until you upload the file, then set it to the file path/URL.
var pcData = {
  projects: [
    // { title: "Project name", meta: "2026 · HTML, CSS, JS", desc: "Short description.", type: "video", src: "" },
  ],
  certificates: [
    // { title: "Certificate name", meta: "Issuer · 2026", desc: "Short description.", type: "image", src: "" },
  ]
};

var categoryLabels = { projects: "Projects", certificates: "Certificates" };

var overlay = document.getElementById('pcModalOverlay');
var listView = document.getElementById('pcListView');
var detailView = document.getElementById('pcDetailView');
var listTitle = document.getElementById('pcListTitle');
var galleryGrid = document.getElementById('pcGalleryGrid');
var detailMedia = document.getElementById('pcDetailMedia');
var detailTitle = document.getElementById('pcDetailTitle');
var detailMeta = document.getElementById('pcDetailMeta');
var detailDesc = document.getElementById('pcDetailDesc');

var currentCategory = null;

function openCategory(category) {
  currentCategory = category;
  listTitle.textContent = categoryLabels[category];
  galleryGrid.innerHTML = '';

  var items = pcData[category] || [];

  if (items.length === 0) {
    galleryGrid.style.display = 'block';
    var empty = document.createElement('div');
    empty.className = 'pc-gallery-empty';
    empty.innerHTML = '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M8 21h8M12 18v3"/></svg><div>' +
      (category === 'projects' ? 'No projects uploaded yet.' : 'No certificates uploaded yet.') +
      '</div>';
    galleryGrid.appendChild(empty);
  } else {
    galleryGrid.style.display = 'grid';
    items.forEach(function (item, index) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pc-gallery-item';

      var thumb = document.createElement('div');
      thumb.className = 'pc-gallery-thumb';

      if (item.src) {
        if (item.type === 'video') {
          var vid = document.createElement('video');
          vid.src = item.src;
          vid.muted = true;
          thumb.appendChild(vid);
          var play = document.createElement('div');
          play.className = 'pc-play';
          play.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="#12141A"><path d="M8 5v14l11-7z"/></svg>';
          thumb.appendChild(play);
        } else {
          var img = document.createElement('img');
          img.src = item.src;
          img.alt = item.title;
          thumb.appendChild(img);
        }
      } else {
        var icon = document.createElement('div');
        icon.style.color = 'rgba(255,255,255,0.85)';
        icon.innerHTML = item.type === 'video'
          ? '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.6"><path d="M23 7l-7 5 7 5V7Z"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>'
          : '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.6"><circle cx="12" cy="8" r="6"/><path d="M9 14l-2 7 5-3 5 3-2-7"/></svg>';
        thumb.appendChild(icon);
      }

      var info = document.createElement('div');
      info.className = 'pc-gallery-info';
      info.innerHTML = '<div class="pc-gallery-title">' + item.title + '</div><div class="pc-gallery-meta">' + (item.meta || '') + '</div>';

      btn.appendChild(thumb);
      btn.appendChild(info);
      btn.addEventListener('click', function () { openDetail(category, index); });
      galleryGrid.appendChild(btn);
    });
  }

  listView.style.display = 'block';
  detailView.style.display = 'none';
  overlay.classList.add('open');
}

function openDetail(category, index) {
  var item = pcData[category][index];
  detailMedia.innerHTML = '';

  if (item.src) {
    if (item.type === 'video') {
      var vid = document.createElement('video');
      vid.src = item.src;
      vid.controls = true;
      vid.autoplay = true;
      detailMedia.appendChild(vid);
    } else {
      var img = document.createElement('img');
      img.src = item.src;
      img.alt = item.title;
      detailMedia.appendChild(img);
    }
  } else {
    var empty = document.createElement('div');
    empty.style.color = '#fff';
    empty.style.fontSize = '0.85rem';
    empty.style.fontFamily = "'IBM Plex Mono', monospace";
    empty.style.opacity = '0.85';
    empty.textContent = item.type === 'video' ? 'No video uploaded yet' : 'No image uploaded yet';
    detailMedia.appendChild(empty);
  }

  detailTitle.textContent = item.title;
  detailMeta.textContent = item.meta || '';
  detailDesc.textContent = item.desc || '';

  listView.style.display = 'none';
  detailView.style.display = 'block';
}

document.querySelectorAll('.pc-cat-btn').forEach(function (btn) {
  btn.addEventListener('click', function () { openCategory(btn.dataset.category); });
});

document.getElementById('pcBackBtn').addEventListener('click', function () {
  listView.style.display = 'block';
  detailView.style.display = 'none';
});

function closeModal() {
  overlay.classList.remove('open');
  detailMedia.innerHTML = '';
}

document.getElementById('pcModalClose').addEventListener('click', closeModal);
overlay.addEventListener('click', function (e) {
  if (e.target === overlay) closeModal();
});
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeModal();
});