import cssText from "data-text:./referbtn.module.less";
import type { PlasmoContentScript, PlasmoGetInlineAnchorList } from "plasmo";

export const config: PlasmoContentScript = {
  matches:["https://twitter.com/*"],
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

let selector = 'div.css-1dbjc4n.r-1ta3fxp.r-18u37iz.r-1wtj0ep.r-1s2bzr4.r-1mdbhws > div:last-child'
export const getInlineAnchorList: PlasmoGetInlineAnchorList = () =>
  document.querySelectorAll(selector)

console.log("插入引用1111")

export const getShadowHostId = () => "refer_btn"

const ReferBtn = () => {
  return (
    <button className='refer_btn' onClick={() => {console.log("点击引用按钮")}}>引用</button>
  )
}

export default ReferBtn
