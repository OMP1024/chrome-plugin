import React, { useEffect, useRef, useState } from "react";

const Transparent = ({content}) => {

  const [offset, setOffset] = useState(0);
  const offsetRef = useRef(offset);
  offsetRef.current = offset;

  function changeColor() {
    setOffset(offsetRef.current + 0.005);
    console.log(offset);
  }

  useEffect(() => {
    console.log("xs: transparent");
    setTimeout(() => {
      getCount()
    },2000)
  },[])

  function geLinearGradient(r,g,b,offset){
    const step = 0.3

    const d = -offset*3 + (1-step)*(1-offset);


    return `linear-gradient(
            to right,
            rgba(${r},${g},${b},${getAlpha(d+step*0.5)}),
            rgba(${r},${g},${b},${getAlpha(d+step)}),
            rgba(${r},${g},${b},${getAlpha(d+step*1.5)}),
            rgba(${r},${g},${b},${getAlpha(d+step*2)}),
            rgba(${r},${g},${b},${getAlpha(d+step*2.5)}),
            rgba(${r},${g},${b},${getAlpha(d+step*3)}),
            rgba(${r},${g},${b},${getAlpha(d+step*3.5)}),
            rgba(${r},${g},${b},${getAlpha(d+step*4)}),
            rgba(${r},${g},${b},${getAlpha(d+step*4.5)}),
            rgba(${r},${g},${b},${getAlpha(d+step*5)}),
            rgba(${r},${g},${b},${getAlpha(d+step*5.5)}),
            rgba(${r},${g},${b},${getAlpha(d+step*6)}),
            rgba(${r},${g},${b},${getAlpha(d+step*6.5)}),
            rgba(${r},${g},${b},${getAlpha(d+step*7)}),
            rgba(${r},${g},${b},${getAlpha(d+step*7.5)}),
            rgba(${r},${g},${b},${getAlpha(d+step*8)}),
            rgba(${r},${g},${b},${getAlpha(d+step*8.5)}),
            rgba(${r},${g},${b},${getAlpha(d+step*9)}),
            rgba(${r},${g},${b},${getAlpha(d+step*9.5)}),
            rgba(${r},${g},${b},${getAlpha(d+step*10)})
            )`
  }

  function getAlpha(a){
    if(a<0){
      return 0;
    }else if (a>1){
      return 1;
    }else {
      return a;
    }
  }

  const getCount = () => {
    setTimeout(() => {
      changeColor();
      getCount();
    }, 10)
  }

  return (
    <div style={{
      background: 'black'
    }}>
      <div style={
        {
          background: geLinearGradient(0,3,200,offset),
          margin: '0 auto'
        }
      }>
        <h1 style={{
          color:'red',
          WebkitMask:geLinearGradient(0,0,0,offset)
        }}>${content}</h1>
      </div>

      {/*<button onClick={() => {*/}
      {/*  // changeColor()*/}
      {/*  getCount()*/}
      {/*}}>改变颜色</button>*/}
    </div>
  )
}

export default Transparent;
