import type { PlasmoContentScript } from "plasmo"
export const config: PlasmoContentScript = {
  matches: ["https://twitter.com/*"]
};

window.addEventListener("load", () => {
  let script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = chrome.runtime.getURL('ethers.js')
  script.async = false
  document.body.appendChild(script);
  script.onload = () => {
    script.remove()
  }

  let injectScript = document.createElement('script');
  injectScript.type = 'text/javascript';
  injectScript.src = chrome.runtime.getURL('inpage_script.js')
  injectScript.async = false
  document.body.appendChild(injectScript);
  injectScript.onload = () => {
    injectScript.remove()
  }
})

