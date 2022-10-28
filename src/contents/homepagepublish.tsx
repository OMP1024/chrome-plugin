import cssText from "data-text:./homepagepublish.module.less";
import type { PlasmoContentScript, PlasmoGetInlineAnchor } from "plasmo";
import style from "./homepagepublish.module.less";
import { Button } from "antd";
import { Todo } from "../config/constant";

export const config: PlasmoContentScript = {
  matches: ["https://twitter.com/*"]
};

export const getStyle = () => {
  const style = document.createElement("style");
  style.textContent = cssText;
  return style;
};

let selector = ".css-1dbjc4n.r-1ifxtd0.r-ymttw5.r-ttdzmv";
export const getInlineAnchor: PlasmoGetInlineAnchor = () =>
  document.querySelector(selector);

export const getShadowHostId = () => "homepage_publish";

const HomePagePublish = () => {

  const sendMessage = (message) => {
    chrome.runtime.sendMessage(message,function (response) {
      console.log('收到来自后台的回复：' + response);
    })
  }

  return (
    <div className={style.homepage}>
      <span>hello web3</span>
      <Button type="primary" onClick={() => {
        sendMessage({todo: 'publish', data: {
            text: "这是一条霸屏喊话",
            fromUser: 1,
            toUser: 2,
            money: 0.001
          }})
      }}>发布</Button>
    </div>
  );
};
console.log("插入发布区1111");

export default HomePagePublish;
