import React, { useEffect, useState } from 'react';
const Index = () => {
  const [showTime, setShowTime] = useState('');
  const onShowTime = () => {
    let t = null;
    const time = () => {
      clearTimeout(t);
      let dt = new Date();
      let y = dt.getFullYear();
      let mt = dt.getMonth() + 1;
      let day = dt.getDate();
      let h = dt.getHours();//获取时
      let m = dt.getMinutes();//获取分
      let s = dt.getSeconds();//获取秒
      let tt = `${y}年${mt}月${day}-${h}时${m}分${s}秒`;
      console.log(tt);
      // y + "年" + mt + "月" + day + "-" + h + "时" + m + "分" + s + "秒"
      setShowTime(`${y}年${mt}月${day}-${h}时${m}分${s}秒`);
      t = setTimeout(time, 1000);
    };
    t = setTimeout(time, 1000);
  };
  useEffect(()=>{
    onShowTime();
  },[]);
  return (
    <div className="large-screen">
      <div className="head">
        <h1>液奶清洁部数字化平台</h1>
        <div className="weather">
          <span className="showTime">
            {showTime}
          </span>
        </div>
      </div>
    </div>
  );
};
export default Index;