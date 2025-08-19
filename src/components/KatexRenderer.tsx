'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    katex: any;
    renderMathInElement: (el: HTMLElement, options?: any) => void;
  }
}

export default function KatexRenderer() {
  useEffect(() => {
    // Load KaTeX CSS
    if (!document.querySelector('link[href*="katex.min.css"]')) {
      const css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css';
      css.crossOrigin = 'anonymous';
      document.head.appendChild(css);
    }

    // Load KaTeX core script
    const katexScript = document.createElement('script');
    katexScript.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js';
    katexScript.crossOrigin = 'anonymous';
    
    // Load auto-render extension
    const autoRenderScript = document.createElement('script');
    autoRenderScript.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js';
    autoRenderScript.crossOrigin = 'anonymous';

    let scriptsLoaded = 0;
    
    const checkAndRender = () => {
      scriptsLoaded++;
      if (scriptsLoaded === 2) {
        // Small delay to ensure DOM is ready
        setTimeout(renderAllMath, 100);
      }
    };

    katexScript.onload = checkAndRender;
    autoRenderScript.onload = checkAndRender;

    // Error handling
    katexScript.onerror = () => console.error('Failed to load KaTeX core');
    autoRenderScript.onerror = () => console.error('Failed to load KaTeX auto-render');

    document.head.appendChild(katexScript);
    document.head.appendChild(autoRenderScript);

    function renderAllMath() {
      if (!window.renderMathInElement) {
        console.warn('renderMathInElement not available');
        return;
      }

      const elements = document.querySelectorAll('.render-math');
      
      elements.forEach((element) => {
        try {
          window.renderMathInElement(element as HTMLElement, {
            // Delimiters for different math contexts
            delimiters: [
              // Display math (centered, larger)
              { left: '$$', right: '$$', display: true },
              { left: '\\[', right: '\\]', display: true },
              
              // Inline math (within text)
              { left: '$', right: '$', display: false },
              { left: '\\(', right: '\\)', display: false },
            ],
            
            // Custom macros for common expressions
            macros: {
              // Boxing final answers
              '\\boxed': '\\fbox{#1}',
              
              // Common derivatives shortcuts
              '\\dx': '\\frac{d}{dx}',
              '\\dt': '\\frac{d}{dt}',
              '\\dy': '\\frac{d}{dy}',
              
              // Common integrals
              '\\sint': '\\int',
              '\\dint': '\\iint',
              '\\tint': '\\iiint',
              
              // Statistics shortcuts
              '\\mean': '\\bar{#1}',
              '\\var': '\\text{Var}(#1)',
              '\\std': '\\sigma',
              
              // Chemistry arrows
              '\\react': '\\rightarrow',
              '\\equil': '\\rightleftharpoons',
              
              // Physics units (common ones)
              '\\ms': '\\text{m/s}',
              '\\mss': '\\text{m/s}^2',
              '\\kg': '\\text{kg}',
              '\\newton': '\\text{N}',
              '\\joule': '\\text{J}',
            },
            
            // Strict delimiters - only render what's explicitly marked
            strict: false,
            
            // Error handling
            throwOnError: false,
            errorColor: '#cc0000',
            
            // Ignore these tags when processing
            ignoredTags: [
              'script', 'noscript', 'style', 'textarea', 'pre', 'code'
            ],
            
            // Trust mode for broader LaTeX support
            trust: (context: any) => ['\\htmlId', '\\href'].includes(context.command),
            
            // Output format
            output: 'html',
            
            // Font size relative to surrounding text
            fleqn: false,
            leqno: false,
            
            // Min/max rule thickness
            minRuleThickness: 0.04,
            maxSize: Infinity,
            maxExpand: 1000,
            
            // Global group for consistent styling
            globalGroup: false,
          });
          
          // Add a class to indicate successful rendering
          element.classList.add('katex-rendered');
          
        } catch (error) {
          console.error('KaTeX rendering error:', error);
          // Optionally add error indicator
          element.classList.add('katex-error');
        }
      });
      
      console.log('KaTeX rendering completed for', elements.length, 'elements');
    }

    // Cleanup function
    return () => {
      [katexScript, autoRenderScript].forEach(script => {
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      });
    };
  }, []);

  // Re-render when content changes (for dynamic content)
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          const addedNodes = Array.from(mutation.addedNodes);
          const hasRenderMath = addedNodes.some(node => 
            node instanceof Element && 
            (node.classList?.contains('render-math') || node.querySelector?.('.render-math'))
          );
          
          if (hasRenderMath && window.renderMathInElement) {
            setTimeout(() => {
              const elements = document.querySelectorAll('.render-math:not(.katex-rendered)');
              elements.forEach(el => {
                try {
                  window.renderMathInElement(el as HTMLElement, {
                    delimiters: [
                      { left: '$$', right: '$$', display: true },
                      { left: '$', right: '$', display: false },
                    ],
                    throwOnError: false,
                  });
                  el.classList.add('katex-rendered');
                } catch (e) {
                  console.error('Dynamic KaTeX render error:', e);
                }
              });
            }, 50);
          }
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => observer.disconnect();
  }, []);

  return null;
}