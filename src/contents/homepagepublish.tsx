import cssText from "data-text:./homepagepublish.module.less";
import type { PlasmoContentScript, PlasmoGetInlineAnchor } from "plasmo";
import style from "./homepagepublish.module.less";
import { Button } from "antd";
import { fetchPost } from "../util/http";

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
    fetchPost("/bully_screen/post", message).then(response => {
      console.log('xs: ' + response);
      let id = response.data.id;
      pay(id, message.money);
    });
  };

  const pay = (shoutId,money) => {
    document.dispatchEvent(new CustomEvent("xingshi_extension_pay", {
      detail: {shoutId,money}
    }));
  };

  return (
    <div className={style.homepage}>
      <span>hello web3</span>
      <Button type="primary" onClick={() => {
        sendMessage({
          text: "这是一条霸屏喊话",
          fromUser: 1559796245748523011,
          toUser: 1263466616605380608,
          money: 0.0001
        });
      }}>发布</Button>
    </div>
  );
};
console.log("插入发布区1111");


export default HomePagePublish;
