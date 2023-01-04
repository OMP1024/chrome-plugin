import type { PlasmoContentScript, PlasmoGetInlineAnchorList, PlasmoGetOverlayAnchorList } from "plasmo";

export const config: PlasmoContentScript = {
  matches: ["https://twitter.com/*"]
};

console.log("xs: replace");
let selector = 'div[data-testid="card.wrapper"]';
export const getOverlayAnchorList: PlasmoGetOverlayAnchorList = () =>
  document.querySelectorAll(selector);

setTimeout(function() {
  const list = document.querySelectorAll(selector)
  for (let i = 0; i < list.length;i++) {
    console.log(list[i])
    let selector1 = 'a > div > div > span > span'
    let span = list[i].querySelector(selector1)
    console.log(span.innerHTML)
  }
  console.log('xs: list', list)
},4000)

const ReplaceContainer = () => {
  return (
    <div style={{backgroundColor: 'red',height:'100px'}}>
      <span>我是被替换的</span>
    </div>
  );
};

export default ReplaceContainer;


