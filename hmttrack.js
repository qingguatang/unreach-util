const DOCUMENT_NODE_TYPE = 9;


if (typeof Element !== 'undefined' && !Element.prototype.matches) {
  const proto = Element.prototype;
  proto.matches =
    proto.matchesSelector ||
    proto.mozMatchesSelector ||
    proto.msMatchesSelector ||
    proto.oMatchesSelector ||
    proto.webkitMatchesSelector;
}


export function trackReady() {
  delegate(document.body, 'click', '[data-track]', e => {
    const el = e.delegateTarget;
    const track = el.dataset.track;
    if (!track) {
      return;
    }
    const category = getCategory(el);
    const parts = track.split(':');
    trackAction(category || 'action', 'click', parts[0], parts[1]);
  }, true);
}


function getCategory(el) {
  el = el.parentNode;
  const list = [];
  while (el && el.nodeType !== DOCUMENT_NODE_TYPE) {
    if (el.matches && el.matches('[data-track-scope]')) {
      list.unshift(el.dataset.trackScope);
    }
    el = el.parentNode;
  }
  return list.join('|');
}


function delegate(elm, event, selector, handler, capture) {
  elm.addEventListener(event, e => {
    const target = closest(e.target, selector, elm);
    if (target) {
      e.delegateTarget = target;
      handler(e);
    }
  }, capture);
}


function closest(element, selector, stop) {
  while (element && element.nodeType !== DOCUMENT_NODE_TYPE && element !== stop) {
    if (element.matches && element.matches(selector)) {
      return element;
    }
    element = element.parentNode;
  }
  return null;
}


export function trackAction(category, action = 'click', label = null, value = null) {
  window._hmt && window._hmt.push(['_trackEvent', category, action, label, value]);   // eslint-disable-line
}


export function trackElement(el, action = 'click', label = null, value = null) {
  const category = getCategory(el) || 'action';
  trackAction(category, action, label, value);
}

