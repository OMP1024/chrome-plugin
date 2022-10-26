import * as style from "./style.module.scss";
import type { PlasmoContentScript, PlasmoGetShadowHostId } from "plasmo";
import { createRoot } from "react-dom/client";

export const config: PlasmoContentScript = {
  matches:["https://twitter.com/*"],
}

const HomePagePublish = () => {
  return (
    <>
      <div className={style.homepage}>
        <span>hello web3</span>
        <button className={style.publish_btn} onClick={() => {

        }}>发布
        </button>
      </div>
    </>
  );
};
console.log("插入发布区")
export const getRootContainer = () =>
  new Promise((resolve) => {
    const checkInterval = setInterval(() =>{
      const injectContainer = document.querySelector('.css-1dbjc4n.r-1ifxtd0.r-ymttw5.r-ttdzmv')
      console.log(injectContainer)
      if (injectContainer) {
        clearInterval(checkInterval)
        const rootContainer = document.createElement('div')
        injectContainer.appendChild(rootContainer)
        resolve(rootContainer)
      }
    },100)
  })

export const render = async ({ createRootContainer }) => {
  const rootContainer = await createRootContainer()
  const root = createRoot(rootContainer)
  root.render(<HomePagePublish />)
}

export default HomePagePublish
