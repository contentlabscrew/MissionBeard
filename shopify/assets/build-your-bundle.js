/* Mission Beard — Build Your Bundle PDP
   Vanilla JS bundle-builder + interactions, integrated with Shopify cart. */

(function () {
  'use strict';

  var root = document.querySelector('[data-byb-root]');
  if (!root) return;

  var cfg = JSON.parse(root.getAttribute('data-byb-config') || '{}');
  // cfg = { tiers: [{qty,discount,sub,flag}], scents: [{id,variantId,name,note,...}], single, currency, moneyFormat, cartUrl }

  var state = {
    tier: cfg.tiers[2] || cfg.tiers[cfg.tiers.length - 1], // default to trio
    picks: {},
  };

  /* ─── helpers ─── */
  function totalPicks() {
    var t = 0;
    for (var k in state.picks) t += state.picks[k] || 0;
    return t;
  }

  function priceFor(qty) {
    var tier = null;
    for (var i = 0; i < cfg.tiers.length; i++) {
      if (cfg.tiers[i].qty === qty) { tier = cfg.tiers[i]; break; }
    }
    if (!tier) tier = cfg.tiers[0];
    var rrp = cfg.single * qty;
    var now = +(rrp * (1 - tier.discount)).toFixed(2);
    var save = +(rrp - now).toFixed(2);
    return { rrp: rrp, now: now, save: save, tier: tier };
  }

  function fmt(amount) {
    return cfg.currencySymbol + amount.toFixed(2);
  }

  /* ─── BUNDLE BUILDER ─── */
  function setTier(qty) {
    var tier = null;
    for (var i = 0; i < cfg.tiers.length; i++) {
      if (cfg.tiers[i].qty === qty) { tier = cfg.tiers[i]; break; }
    }
    if (!tier) return;
    state.tier = tier;
    // clamp picks if tier shrunk
    var max = tier.qty;
    var t = totalPicks();
    if (t > max) {
      var ids = Object.keys(state.picks).sort(function (a, b) {
        return state.picks[b] - state.picks[a];
      });
      var i = 0;
      while (totalPicks() > max && i < 200) {
        var id = ids[i % ids.length];
        if (state.picks[id] > 0) state.picks[id] -= 1;
        i++;
      }
    }
    render();
  }

  function inc(id) {
    var max = state.tier.qty;
    if (totalPicks() >= max) return;
    state.picks[id] = (state.picks[id] || 0) + 1;
    render();
  }

  function dec(id) {
    if (!state.picks[id]) return;
    state.picks[id] = Math.max(0, state.picks[id] - 1);
    render();
  }

  function topUpFromFragrance(id) {
    var max = state.tier.qty;
    if (totalPicks() < max) {
      state.picks[id] = (state.picks[id] || 0) + 1;
    } else {
      // bump tier to next size and add
      var next = null;
      for (var i = 0; i < cfg.tiers.length; i++) {
        if (cfg.tiers[i].qty === max + 1) { next = cfg.tiers[i]; break; }
      }
      if (next) {
        state.tier = next;
        state.picks[id] = (state.picks[id] || 0) + 1;
      }
    }
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ─── RENDER ─── */
  function render() {
    var max = state.tier.qty;
    var total = totalPicks();
    var remaining = max - total;
    var full = remaining === 0;
    var price = priceFor(max);
    var perBottle = (price.now / max).toFixed(2);

    // tier active states
    root.querySelectorAll('[data-byb-tier]').forEach(function (el) {
      var qty = parseInt(el.getAttribute('data-byb-tier'), 10);
      el.classList.toggle('active', qty === max);
    });

    // pickers counter
    var counter = root.querySelector('[data-byb-counter]');
    if (counter) {
      counter.classList.toggle('full', full);
      counter.innerHTML = full
        ? '<span><b>✓ Bundle complete</b></span>'
        : '<span><b>' + remaining + '</b> ' + (remaining === 1 ? 'bottle' : 'bottles') + ' to choose</span>';
    }

    // step 2 label
    var stepLabel = root.querySelector('[data-byb-step2-label]');
    if (stepLabel) stepLabel.textContent = 'Choose your ' + max + ' ' + (max === 1 ? 'scent' : 'scents');

    // picker rows
    root.querySelectorAll('[data-byb-picker]').forEach(function (el) {
      var id = el.getAttribute('data-byb-picker');
      var count = state.picks[id] || 0;
      var pill = el.querySelector('.byb-qty-pill');
      pill.classList.toggle('has-val', count > 0);
      var valEl = el.querySelector('.qty-val');
      if (valEl) valEl.textContent = count;
      var dec = el.querySelector('[data-byb-dec]');
      var inc = el.querySelector('[data-byb-inc]');
      if (dec) dec.disabled = count === 0;
      if (inc) inc.disabled = total >= max;
    });

    // price row
    var priceNow = root.querySelector('[data-byb-price-now]');
    var priceWas = root.querySelector('[data-byb-price-was]');
    var pricePer = root.querySelector('[data-byb-price-per]');
    var priceSave = root.querySelector('[data-byb-price-save]');
    if (priceNow) priceNow.textContent = fmt(price.now);
    if (priceWas) {
      priceWas.textContent = fmt(price.rrp);
      priceWas.style.display = price.save > 0 ? '' : 'none';
    }
    if (pricePer) pricePer.textContent = fmt(parseFloat(perBottle)) + '/bottle';
    if (priceSave) {
      priceSave.textContent = 'Save ' + fmt(price.save);
      priceSave.style.display = price.save > 0 ? '' : 'none';
    }

    // ATC
    var atc = root.querySelector('[data-byb-atc]');
    if (atc) {
      atc.disabled = !full;
      atc.innerHTML = full
        ? 'Add bundle to cart <span class="arr-r">→</span>'
        : 'Pick ' + remaining + ' more ' + (remaining === 1 ? 'scent' : 'scents');
    }

    // Sticky ATC
    var stickyLbl = root.querySelector('[data-byb-sticky-lbl]');
    var stickySub = root.querySelector('[data-byb-sticky-sub]');
    var stickyNow = root.querySelector('[data-byb-sticky-now]');
    var stickyWas = root.querySelector('[data-byb-sticky-was]');
    var stickySave = root.querySelector('[data-byb-sticky-save]');
    var stickyAtc = root.querySelector('[data-byb-sticky-atc]');
    if (stickyLbl) stickyLbl.textContent = 'Build your bundle · ' + max + '-pack';
    if (stickySub) stickySub.textContent = full ? 'Bundle complete' : (remaining + ' ' + (remaining === 1 ? 'bottle' : 'bottles') + ' remaining');
    if (stickyNow) stickyNow.textContent = fmt(price.now);
    if (stickyWas) {
      stickyWas.textContent = fmt(price.rrp);
      stickyWas.style.display = price.save > 0 ? '' : 'none';
    }
    if (stickySave) {
      stickySave.textContent = 'Save ' + fmt(price.save);
      stickySave.style.display = price.save > 0 ? '' : 'none';
    }
    if (stickyAtc) {
      stickyAtc.disabled = !full;
      stickyAtc.textContent = full ? 'Add to cart' : 'Pick ' + remaining + ' more';
    }

    // header cart count (bundle preview, not actual cart)
    var headerCart = root.querySelector('[data-byb-cart-count]');
    if (headerCart) headerCart.textContent = '(' + total + ')';
  }

  /* ─── ADD TO CART (Shopify AJAX) ─── */
  function addBundleToCart(btn) {
    if (totalPicks() !== state.tier.qty) return;
    var items = [];
    cfg.scents.forEach(function (s) {
      var n = state.picks[s.id] || 0;
      if (n > 0 && s.variantId) {
        items.push({
          id: parseInt(s.variantId, 10),
          quantity: n,
          properties: {
            '_bundle_size': state.tier.qty + '-pack',
            '_bundle_discount': Math.round(state.tier.discount * 100) + '%',
          },
        });
      }
    });
    if (!items.length) {
      console.warn('[byb] No variant IDs configured. Set them in the section settings.');
      alert('This page is not yet wired up to products. Configure variant IDs in the section settings.');
      return;
    }
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Adding…';
    }
    fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ items: items }),
    })
      .then(function (r) {
        if (!r.ok) throw new Error('Add to cart failed: ' + r.status);
        return r.json();
      })
      .then(function () {
        window.location.href = cfg.cartUrl || '/cart';
      })
      .catch(function (err) {
        console.error('[byb] add to cart error', err);
        if (btn) {
          btn.disabled = false;
          btn.textContent = 'Try again';
        }
        alert('Sorry — could not add to cart. ' + (err.message || ''));
      });
  }

  /* ─── EVENT WIRING ─── */
  root.addEventListener('click', function (e) {
    var t;
    if ((t = e.target.closest('[data-byb-tier]'))) {
      setTier(parseInt(t.getAttribute('data-byb-tier'), 10));
    } else if ((t = e.target.closest('[data-byb-inc]'))) {
      var row = t.closest('[data-byb-picker]');
      if (row) inc(row.getAttribute('data-byb-picker'));
    } else if ((t = e.target.closest('[data-byb-dec]'))) {
      var row2 = t.closest('[data-byb-picker]');
      if (row2) dec(row2.getAttribute('data-byb-picker'));
    } else if ((t = e.target.closest('[data-byb-pick-fragrance]'))) {
      topUpFromFragrance(t.getAttribute('data-byb-pick-fragrance'));
    } else if ((t = e.target.closest('[data-byb-atc]')) || (t = e.target.closest('[data-byb-sticky-atc]'))) {
      addBundleToCart(t);
    } else if ((t = e.target.closest('[data-byb-gallery-thumb]'))) {
      var idx = parseInt(t.getAttribute('data-byb-gallery-thumb'), 10);
      var main = root.querySelector('[data-byb-gallery-main]');
      var src = t.getAttribute('data-byb-thumb-src');
      if (main && src) main.setAttribute('src', src);
      root.querySelectorAll('[data-byb-gallery-thumb]').forEach(function (el) {
        el.classList.toggle('active', parseInt(el.getAttribute('data-byb-gallery-thumb'), 10) === idx);
      });
    } else if ((t = e.target.closest('[data-byb-vid-arrow]'))) {
      var dir = t.getAttribute('data-byb-vid-arrow') === 'next' ? 1 : -1;
      var track = root.querySelector('[data-byb-vid-track]');
      if (track) track.scrollBy({ left: dir * (360 + 24), behavior: 'smooth' });
    } else if ((t = e.target.closest('[data-byb-faq-q]'))) {
      var item = t.closest('.byb-faq-item');
      if (item) {
        var alreadyOpen = item.classList.contains('open');
        root.querySelectorAll('.byb-faq-item').forEach(function (i) { i.classList.remove('open'); });
        if (!alreadyOpen) item.classList.add('open');
        var icon = t.querySelector('.icon');
        if (icon) icon.textContent = item.classList.contains('open') ? '−' : '+';
        // reset all icons
        root.querySelectorAll('.byb-faq-item').forEach(function (i) {
          var ic = i.querySelector('.icon');
          if (ic) ic.textContent = i.classList.contains('open') ? '−' : '+';
        });
      }
    }
  });

  /* ─── STICKY ATC visibility ─── */
  var sticky = root.querySelector('[data-byb-sticky]');
  function onScroll() {
    if (!sticky) return;
    sticky.classList.toggle('visible', window.scrollY > 700);
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ─── VIDEO arrows enable/disable ─── */
  var vidTrack = root.querySelector('[data-byb-vid-track]');
  if (vidTrack) {
    var prevBtn = root.querySelector('[data-byb-vid-arrow="prev"]');
    var nextBtn = root.querySelector('[data-byb-vid-arrow="next"]');
    function syncArrows() {
      var max = vidTrack.scrollWidth - vidTrack.clientWidth;
      if (prevBtn) prevBtn.disabled = vidTrack.scrollLeft <= 4;
      if (nextBtn) nextBtn.disabled = max > 0 && vidTrack.scrollLeft >= max - 4;
    }
    vidTrack.addEventListener('scroll', syncArrows, { passive: true });
    window.addEventListener('resize', syncArrows);
    setTimeout(syncArrows, 50);
  }

  /* ─── NOTE BAR animation when fragrance section enters viewport ─── */
  var fragSection = root.querySelector('[data-byb-frag]');
  if (fragSection && 'IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          root.querySelectorAll('.byb-note-bar-fill').forEach(function (bar) {
            bar.style.width = bar.getAttribute('data-byb-note-value') + '%';
          });
          obs.disconnect();
        }
      });
    }, { threshold: 0.15 });
    obs.observe(fragSection);
  } else {
    root.querySelectorAll('.byb-note-bar-fill').forEach(function (bar) {
      bar.style.width = bar.getAttribute('data-byb-note-value') + '%';
    });
  }

  /* initial render */
  render();
})();
