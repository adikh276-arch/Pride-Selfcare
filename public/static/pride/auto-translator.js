// auto-translator.js — translation and layout stability version
// v2 — properly translates dynamically-rendered card content.
(function () {
  var translationsCache = {};
  var initPromise = null;
  window.__mutationTriggerCount = 0;

  function decodeHtmlEntities(str) {
    if (typeof str !== 'string') return str;
    var txt = document.createElement('textarea');
    txt.innerHTML = str;
    return txt.value;
  }

  function getLanguage() {
    var urlParams = new URLSearchParams(window.location.search);
    var paramLang = urlParams.get('lang');
    if (paramLang) {
      var lower = paramLang.toLowerCase();
      if (lower === 'zh-hans') return 'zh-Hans';
      if (lower === 'zh-hant') return 'zh-Hant';
      return lower;
    }
    var navLang = navigator.language || 'en';
    var lowerNav = navLang.toLowerCase();
    if (lowerNav.startsWith('zh-tw') || lowerNav.startsWith('zh-hk') || lowerNav.startsWith('zh-hant')) return 'zh-Hant';
    if (lowerNav.startsWith('zh')) return 'zh-Hans';
    return navLang.split('-')[0].toLowerCase();
  }

  async function initTranslator() {
    if (initPromise) return initPromise;
    initPromise = (async function() {
      try {
        var language = getLanguage();
        if (language === 'en') return;

        var cacheBuster = '?v=' + new Date().getTime();
        var paths = [
          '../i18n/' + language + '.json',
          './static/pride/i18n/' + language + '.json',
          '/pride/static/pride/i18n/' + language + '.json',
          '/static/pride/i18n/' + language + '.json'
        ];
        
        var res = null;
        for (var i = 0; i < paths.length; i++) {
          try {
            var attempt = await fetch(paths[i] + cacheBuster);
            if (attempt && attempt.ok) {
              res = attempt;
              console.log('[Auto Translator] Successfully loaded locale JSON from:', paths[i]);
              break;
            }
          } catch (fetchErr) {
            console.warn('[Auto Translator] Path lookup failed for: ' + paths[i], fetchErr);
          }
        }

        if (!res || !res.ok) {
          throw new Error('All localized JSON translation fetch attempts failed.');
        }

        var data = await res.json();
        var decodedData = {};
        for (var key in data) {
          decodedData[decodeHtmlEntities(key.trim())] = decodeHtmlEntities(data[key].trim());
        }
        translationsCache[language] = decodedData;
        window.__translations = decodedData;

        applyTranslations();
      } catch (e) {
        console.error('[Auto Translator] Initialization failed gracefully:', e);
      }
    })();
    return initPromise;
  }

  function t(key) {
    if (typeof key !== 'string') return key;
    var language = getLanguage();
    if (language === 'en') return key;
    var locale = translationsCache[language] || {};
    var normalizedKey = decodeHtmlEntities(key.trim());

    // 1. Surrogate pairs (UTF-16) for emojis check
    if (normalizedKey.length <= 2 && /[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(normalizedKey)) {
      return key;
    }

    // 2. Blacklist check for common symbols and standard emojis
    var symbolBlacklist = [
      '🌈', '🏳️‍🌈', '✨', '🎉', '✓', '✗', '→', '←', '↩', '⚡', '💕', '📚', '✊', '🌟', '✍️', '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💖', '💗', '💓', '💞', '💌', '🌸', '🌹', '🌺', '🌻', '🌼', '🌷', '🌱', '🌿', '🍀', '🍁', '🍂', '🍃', '👑', '👒', '👓', '🕶️', '👔', '👕', '👖', '🧣', '🧤', '🧥', '🧦', '👗', '👘', '👙', '👚', '👛', '👜', '👝', '🎒', '👞', '👟', '👠', '👡', '👢', '👑'
    ];
    if (symbolBlacklist.indexOf(normalizedKey) !== -1) {
      return key;
    }
    
    var translated = locale[normalizedKey] || locale[key.trim()] || locale[key];
    if (translated) {
      return translated;
    }
    
    // Skip warnings for pure symbols/numbers/empty space
    if (normalizedKey && !/^[0-9\s.,\/#!$%\^&*;:{}=\-_`~()?"'✨🎉✓✗→←↩⚡]+$/.test(normalizedKey)) {
      console.warn('[Auto Translator] Missing translation for key in "' + language + '":', key);
    }
    return key;
  }

  /**
   * Walk DOM elements and text nodes to replace them with their translations.
   * Supports both block-level element tag-inclusive keys (e.g. <em> tags)
   * and fine-grained standalone text nodes.
   */
  function translateNode(targetNode) {
    if (!targetNode) return;
    var language = getLanguage();
    if (language === 'en') return;

    // Clear existing data-translated attribute on the target container itself to scope dynamic content updates
    if (targetNode.removeAttribute) {
      targetNode.removeAttribute('data-translated');
    }

    // Capture original state for card debugging
    var isCardDebug = targetNode.classList && targetNode.classList.contains('card');
    var originalHTML = isCardDebug ? targetNode.outerHTML : '';

    // 1. Tag-inclusive / innerHTML element translations
    var allElements = targetNode.querySelectorAll ? targetNode.querySelectorAll('*') : [];
    var elementsToTranslate = [];
    if (targetNode.tagName) {
      elementsToTranslate.push(targetNode);
    }
    for (var i = 0; i < allElements.length; i++) {
      elementsToTranslate.push(allElements[i]);
    }

    elementsToTranslate.forEach(function(el) {
      // Robust Parent check to avoid translating descendants of already translated elements
      var curr = el;
      while (curr) {
        if (curr.getAttribute && curr.getAttribute('data-translated') === 'true') {
          return;
        }
        curr = curr.parentElement;
      }

      var html = el.innerHTML ? el.innerHTML.trim() : '';
      if (!html) return;
      // Skip if it contains no English letters (pure symbols / emojis / already translated text)
      if (!/[a-zA-Z]/.test(html)) return;

      var translated = t(html);
      if (translated && translated !== html) {
        try {
          el.innerHTML = translated;
          el.setAttribute('data-translated', 'true');
        } catch (domErr) {
          console.error('[Auto Translator] Runtime DOM HTML replacement failure on element:', el, domErr);
        }
      } else {
        // Targeted debug logging for untranslated story nodes
        if (el.classList && (
          el.classList.contains('card-name') ||
          el.classList.contains('card-quote') ||
          el.classList.contains('story-name-large') ||
          el.classList.contains('story-highlight') ||
          el.classList.contains('story-takeaway') ||
          el.classList.contains('story-body')
        )) {
          console.warn('[Auto Translator] Untranslated story element node in "' + language + '":', el);
        }
      }
    });

    // 2. Fall back to standard TreeWalker for plain standalone text nodes
    var walker = document.createTreeWalker(
      targetNode,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function(node) {
          var tag = node.parentElement && node.parentElement.tagName;
          if (tag === 'SCRIPT' || tag === 'STYLE') return NodeFilter.FILTER_REJECT;
          if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_SKIP;
          
          // ES5 parent walking to safely check for parent data-translated state (extremely compatible)
          var curr = node.parentElement;
          while (curr) {
            if (curr.getAttribute && curr.getAttribute('data-translated') === 'true') {
              return NodeFilter.FILTER_REJECT;
            }
            curr = curr.parentElement;
          }
          
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    var nodes = [];
    var node;
    while ((node = walker.nextNode())) nodes.push(node);

    nodes.forEach(function(textNode) {
      var original = textNode.nodeValue;
      var trimmed = original.trim();
      if (!trimmed) return;
      // Skip if it contains no English letters (pure symbols / emojis / already translated text)
      if (!/[a-zA-Z]/.test(trimmed)) return;

      var translated = t(trimmed);
      if (translated && translated !== trimmed) {
        try {
          textNode.nodeValue = original.replace(trimmed, translated);
          if (textNode.parentElement) {
            textNode.parentElement.setAttribute('data-translated', 'true');
          }
        } catch (domErr) {
          console.error('[Auto Translator] Runtime DOM text node replacement failure:', textNode, domErr);
        }
      } else {
        // Targeted debug logging for untranslated text nodes inside story elements
        var parent = textNode.parentElement;
        if (parent && parent.classList && (
          parent.classList.contains('card-name') ||
          parent.classList.contains('card-quote') ||
          parent.classList.contains('story-name-large') ||
          parent.classList.contains('story-highlight') ||
          parent.classList.contains('story-takeaway') ||
          parent.classList.contains('story-body')
        )) {
          console.warn('[Auto Translator] Untranslated story text node in "' + language + '":', parent, trimmed);
        }
      }
    });

    // Detailed debug output for target card
    if (isCardDebug) {
      console.log('[Runtime Card Debug] =======================================');
      console.log('Original Card HTML structure:', originalHTML);
      console.log('Translated Card HTML structure:', targetNode.outerHTML);
      console.log('MutationObserver trigger count:', window.__mutationTriggerCount || 0);
      console.log('Number of translated child nodes after render:', targetNode.querySelectorAll('[data-translated="true"]').length);
      console.log('Final Rendered DOM Structure (pre-order tags with data-translated status):');
      var structure = Array.prototype.map.call(targetNode.querySelectorAll('*'), function(el) {
        var cls = el.className ? '.' + el.className.split(' ').join('.') : '';
        return '  ' + el.tagName.toLowerCase() + cls + ' [data-translated=' + (el.getAttribute('data-translated') || 'false') + ']';
      }).join('\n');
      console.log(structure);
      console.log('===========================================================');
    }
  }

  function applyTranslations() {
    translateNode(document.body);

    var observer = new MutationObserver(function(mutations) {
      window.__mutationTriggerCount = (window.__mutationTriggerCount || 0) + 1;
      observer.disconnect();
      mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(addedNode) {
          if (addedNode.nodeType === Node.ELEMENT_NODE) {
            translateNode(addedNode);
          }
        });
      });
      observer.observe(document.body, { childList: true, subtree: true });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  window.initTranslator = initTranslator;
  window.t = t;
  window.translateNode = translateNode;

  if (typeof window !== 'undefined') {
    initTranslator();
  }
})();
