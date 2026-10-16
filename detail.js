document.addEventListener('DOMContentLoaded', async function () {
  try {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    let metadata = {};

    try {
      const res = await fetch('insects_metadata.json');
      if (res.ok) {
        const raw = await res.json();
        if (Array.isArray(raw)) {
          raw.forEach(function (it) {
            if (it.id) metadata[it.id] = it;
          });
        } else {
          metadata = raw;
        }
      }
    } catch (fetchErr) {
      console.warn('Fetch error, fallback to embedded script:', fetchErr);
    }

    if (Object.keys(metadata).length === 0) {
      const dataScript = document.getElementById('insects-metadata');
      if (dataScript && dataScript.textContent) {
        try {
          metadata = JSON.parse(dataScript.textContent);
        } catch (parseErr) {
          console.error('Parse error:', parseErr);
        }
      }
    }

    const item = metadata[id];
    if (!item) {
      const titleErr = document.getElementById('detail-title');
      if (titleErr) {
        titleErr.textContent = '생먼 정보를 찾을 소 없습니다. (ID: ' + (id || '엑음') + ')';
      }
      return;
    }

    // Set page title
    document.title = (item.korean_name || '생물 정본') + ' - InsectsAPT.';

    // Set back link to specific season section
    const backLink = document.getElementById('back-link');
    if (backLink && item.season) {
      backLink.href = 'index.html#' + item.season.toLowerCase();
    }

    // Populate elements
    const img = document.getElementById('detail-img');
    if (img) {
      img.src = item.original_src || item.cutout_src || '';
      img.alt = (item.korean_name || '') + ' (' + (item.english_name || '') + ')';
    }

    const dateEl = document.getElementById('detail-date');
    if (dateEl) {
      dateEl.textContent = item.date || '';
    }

    const titleEl = document.getElementById('detail-title');
    if (titleEl) {
      titleEl.textContent =
        (item.korean_name || '') +
        (item.english_name ? ' (' + item.english_name + ')' : '');
    }

    const descEl = document.getElementById('detail-desc');
    if (descEl) {
      descEl.textContent = item.one_line_desc || '';
    }

    // Populate Cow's comment
    const commentBox = document.getElementById('detail-comment-box');
    const commentText = document.getElementById('detail-comment-text');
    if (commentBox && commentText) {
      if (item.comment && String(item.comment).trim() !== '') {
        commentBox.style.display = 'block';
        commentText.innerHTML = '';
        const lines = String(item.comment).split(String.fromCharCode(10));
        lines.forEach(function (line) {
          if (line.trim() !== '') {
            const p = document.createElement('p');
            p.textContent = line;
            commentText.appendChild(p);
          }
        });
      } else {
        commentBox.style.display = 'none';
      }
    }

    // Populate Fun fact
    const funfactBox = document.getElementById('detail-funfact-box');
    const funfactText = document.getElementById('detail-funfact-text');
    const footnoteLink = document.getElementById('detail-footnote-link');
    if (funfactBox && funfactText) {
      if (item.fun_fact) {
        funfactBox.style.display = 'block';
        funfactText.textContent = item.fun_fact;
        if (footnoteLink && item.source_url) {
          footnoteLink.href = item.source_url;
          footnoteLink.textContent =
            '[1] 출처: ' + (item.source_title || '참고자료') + ' ↗';
        } else if (footnoteLink) {
          footnoteLink.textContent = '';
          footnoteLink.removeAttribute('href');
        }
      } else {
        funfactBox.style.display = 'none';
      }
    }
  } catch (globalErr) {
    console.error('Error rendering detail page:', globalErr);
  }
});