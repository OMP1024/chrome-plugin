// import type { PlasmoContentScript } from "plasmo"
// export const config: PlasmoContentScript = {
//   matches: ["https://twitter.com/*"]
// };

export {}
console.log("xs: injectScript")
window.addEventListener("load", () => {
  let script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = chrome.runtime.getURL('js/ethers.js')
  script.async = false
  document.body.appendChild(script);
  script.onload = () => {
    script.remove()
  }

  let injectScript = document.createElement('script');
  injectScript.type = 'text/javascript';
  injectScript.src = chrome.runtime.getURL('js/inpage_script.js')
  console.log('xs: '+ injectScript.src)
  document.body.appendChild(injectScript);
  injectScript.onload = () => {
    injectScript.remove()
  }
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("xs: content-listener"+request.value)
})

