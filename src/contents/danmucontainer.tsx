import cssText from "data-text:./danmucontainer.module.less";
import type { PlasmoContentScript, PlasmoGetOverlayAnchor } from "plasmo";
import style from "./danmucontainer.module.less";
import React, { useEffect, useRef, useState } from "react";
import Danmuku from "../Danmuku";
import Transparent from "../Danmuku/Transparent";
import ReactDom from 'react-dom'

export const config: PlasmoContentScript = {
  matches: ["https://twitter.com/*"]
  // exclude_matches:["https://twitter.com/home","https://twitter.com/explore","https://twitter.com/notifications","https://twitter.com/messages"]
};

console.log("xs: danmuContainer");
export const getStyle = () => {
  const style = document.createElement("style");
  style.textContent = cssText;
  return style;
};

let selector = "#react-root";
export const getOverlayAnchor: PlasmoGetOverlayAnchor = () => document.querySelector(selector);

export const getShadowHostId = () => "damu_container_shadow";


const danmuContainer = () => {

  const [screen, setScreen] = useState(null);
  const ref = useRef(null);
  const [bullet, setBullet] = useState("");


  const handleSend = () => {
    screen.send(bullet, {
      append(barrage, node) {
        console.log("xs: barrage");
        console.dir(barrage)
        console.log("xs: node")
        console.dir(node)
        // node.onmouseenter = e => {
        //   barrage.pause();
        //   node.classList.add("active");
        // };
        // node.onmouseleave = e => {
        //   barrage.resume();
        //   node.classList.remove("active");
        // };
        node.onclick = e => {
          // barrage.destroy();
          console.log("xs: node"+e)
        };
      },
      show() {
        console.log("show");
      }
    });
  };
  const handleChange = ({ target: { value } }) => {
    setBullet(value);
  };

  const testData = [
    // '很好很好很好',
    // '很好很好很好',
    // '很好很好很好',
    // '很好很好很好',
    // '很好很好很好',
    // '很好很好很好',
  ]

  useEffect(() => {
    const random = (min, max) => +(Math.random() * (max - min) + min).toFixed(0);
    const m = Danmuku.create({
      container: ref.current,
      height: 50, // 轨道高度
      rowGap: 10, // 两个弹幕的横向间隔（速度不一样，后面的可能会追上）
      direction: "right", // 弹幕的方向 left or right
      times: [6, 6], // 弹幕动画的时间取值范围
      limit: 150, // 能够渲染的最大数量
      interval: 0.5,
      hooks: {  // 这里的生命周期，特殊弹幕和普通弹幕都会调用
        // 弹幕创建时
        barrageCreate(barrage, node) {
          if (barrage.isSpecial) return;
          console.log("xs: barrage")
          console.dir(barrage.data)
          console.log("xs: node")
          console.dir(node)

          if (typeof barrage.data !== "string") {
            node.style.border = "3px solid #fff";
            node.textContent = barrage.data.content;
          } else {
            let element = <Transparent content={barrage.data}/>
            ReactDom.render(element,node)
          }

          node.classList.add("barrage");
          node.style.color = 'red' //`rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
        },

        // 弹幕开始移动时
        barrageMove(barrage, node) {
          console.log("xs: barrage"+ barrage.getMoveDistance())
          console.log("xs: barrage"+ barrage.getMovePercent())
          console.log("xs:node"+node.style.positionX)
          console.log("xs: currentTime"+barrage.currentTime)
          // 查看当前这个弹幕是否被修正过停留在视图的时长
          // console.log(barrage.isChangeDuration)
          node.style.opacity = 1;
        },

        // 弹幕节点移除视图时
        barrageRemove(barrage, node) {
          console.log("xs:"+screen)
        },

        barrageDestroy(barrage, node) {

        },

        send() {

        },

        ended() {
          console.log("end");
        },

        capacityWarning(manager) {
          console.error("capacityWarning 钩子被调用");
        },

        willRender(manager, barrage, isSpecial) {
          if (!isSpecial) return;
          console.log(barrage, isSpecial);
        },

        render() {

        },

        start() {

        },

        stop() {

        },

        clear() {

        },

        setOptions() {
          console.log("setOptions");
        },

        show() {

        },

        hidden() {

        }
      }
    });
    setScreen(m);
    m.start();

    setInterval(() => m.send(testData, {
      // 弹幕渲染到页面上时
      append (barrage, node) {
        // node.onmouseenter = e => {
        //   barrage.pause()
        //   node.classList.add('active')
        // }
        // node.onmouseleave = e => {
        //   barrage.resume()
        //   node.classList.remove('active')
        // }
        node.onclick = e => {
          barrage.destroy()
        }
      },
      show () {
        console.log('show')
      },
    }), 250)
    // screen.send(testData, {})
  }, []);

  return (
    <div className={style.danmu_container_root}>
      <div ref={ref} className={style.screen}></div>
    </div>
  );
};

export default danmuContainer;
