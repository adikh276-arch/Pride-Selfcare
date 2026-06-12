// auto-dom-translator.ts
// Handles runtime DOM translation for all standard React/TSX views (e.g. trans and bisexual static minis)

import i18n from './i18n';

function startReactAutoDomTranslator() {
  if (typeof window === 'undefined') return;

  const translateText = (text: string): string => {
    if (!text) return text;
    const namespaces = ['hub', 'minis', 'guides', 'trackers', 'tips'];
    for (const ns of namespaces) {
      const translated = i18n.t(text, { ns, lng: i18n.language });
      if (translated && translated !== text) {
        return translated;
      }
    }
    return text;
  };

  const translateNode = (targetNode: Node) => {
    if (!targetNode) return;

    if (targetNode.nodeType === Node.TEXT_NODE) {
      const original = targetNode.nodeValue?.trim();
      if (original) {
        if (/^[0-9\s.,\/#!$%\^&\*;:{}=\-_`~()?"'✨🎉✓✗]*$/.test(original)) return;
        const translated = translateText(original);
        if (translated !== original) {
          targetNode.nodeValue = targetNode.nodeValue!.replace(original, translated);
        }
      }
      return;
    }

    const walker = document.createTreeWalker(targetNode, NodeFilter.SHOW_TEXT, null);
    let node;
    while ((node = walker.nextNode())) {
      const original = node.nodeValue?.trim();
      if (!original) continue;

      if (/^[0-9\s.,\/#!$%\^&\*;:{}=\-_`~()?"'✨🎉✓✗]*$/.test(original)) continue;

      const translated = translateText(original);
      if (translated !== original) {
        node.nodeValue = node.nodeValue!.replace(original, translated);
      }
    }
  };

  const observer = new MutationObserver((mutations) => {
    observer.disconnect();
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        for (const addedNode of mutation.addedNodes) {
          translateNode(addedNode);
        }
      } else if (mutation.type === 'characterData') {
        translateNode(mutation.target);
      }
    }
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  });

  const runTranslation = () => {
    translateNode(document.body);
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  };

  if (i18n.isInitialized) {
    runTranslation();
  } else {
    i18n.on('initialized', () => {
      runTranslation();
    });
  }

  i18n.on('languageChanged', () => {
    translateNode(document.body);
  });
}

// Start auto-DOM-translation
startReactAutoDomTranslator();
