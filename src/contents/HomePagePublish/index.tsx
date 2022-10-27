import cssText from "data-text:./style.css";
import type { PlasmoContentScript, PlasmoGetInlineAnchor } from "plasmo";

export const config: PlasmoContentScript = {
  matches:["https://twitter.com/*"],
  css: ['style.css']
}

export const getStyle = () => {
  const style = document.createElement('style')
  style.textContent = cssText
  return style
}

const HomePagePublish = () => {
  return (
    <>
      <div className='homepage'>
        <span>容器标题</span>
        <button className='publish-btn'
                onClick={() => {}}>
          发布
        </button>
      </div>
    </>
  );
};
console.log("插入发布区1111")

let selector = '.css-1dbjc4n.r-1ifxtd0.r-ymttw5.r-ttdzmv'
export const getInlineAnchor: PlasmoGetInlineAnchor = () =>
  document.querySelector(selector)

export const getShadowHostId = () => "homepage_publish"

export default HomePagePublish
