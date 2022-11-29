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
      // y + "年" + mt + "月" + day + "-" + h + "时" + m + "分" + s + "秒"
      setShowTime(tt);
      t = setTimeout(time, 1000);
    };
    t = setTimeout(time, 1000);
  };
  useEffect(() => {
    onShowTime();
  }, []);
  return (
    <div className="large-screen">
      <div className="head">
        <div className="roll-text">
          热烈欢迎各位领导莅临指导
        </div>
        <h1>液奶事业部清洁数字化平台</h1>
        <div className="weather">
          <span className="showTime">
            {showTime}
          </span>
        </div>
      </div>
      <div className="data_main">
        <div className="main_left fl">
          <div className="left_1">

            <div id="chart_1" className="chart" style={{ width: '100%', height: '280px' }}></div>
          </div>
          <div className="left_2">

            <div id="chart_2" className="chart" style={{ width: '100%', height: '280px' }}></div>
          </div>
        </div>
        <div className="main_center fl">
          <div className="center_text">

            <div id="chart_map" style={{ width: '100%', height: '610px' }}></div>
          </div>
        </div>
        <div className="main_right fr">
          <div className="right_1">
            <div id="chart_3" className="echart" style={{ width: '100%', height: '280px' }}></div>
          </div>
          <div className="right_2">

            <div id="chart_4" className="echart fl" style={{ width: '80%', height: '230px' }}></div>
          </div>
        </div>
      </div>
      <div className="data_bottom">
        <div className="bottom_1 fl">

          <div className="main_table">
            <table>
              <thead>
                <tr>
                  <th>排名</th>
                  <th>车牌号</th>
                  <th>里程数(km)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>京A12345</td>
                  <td>134.2</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>京A12345</td>
                  <td>134.2</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>京A12345</td>
                  <td>134.2</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>京A12345</td>
                  <td>134.2</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>京A12345</td>
                  <td>134.2</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="bottom_center fl">
          <div className="bottom_2 fl">

            <div className="main_table">
              <table>
                <thead>
                  <tr>
                    <th>排名</th>
                    <th>车牌号</th>
                    <th>时长(h)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>京A12345</td>
                    <td>134.2</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>京A12345</td>
                    <td>134.2</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>京A12345</td>
                    <td>134.2</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>京A12345</td>
                    <td>134.2</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>京A12345</td>
                    <td>134.2</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="bottom_3 fl">

            <div className="main_table">
              <table>
                <thead>
                  <tr>
                    <th>排名</th>
                    <th>车牌号</th>
                    <th>速度(km/h)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>京A12345</td>
                    <td>134.2</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>京A12345</td>
                    <td>134.2</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>京A12345</td>
                    <td>134.2</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>京A12345</td>
                    <td>134.2</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>京A12345</td>
                    <td>134.2</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="bottom_4 fr">

          <div className="main_table">
            <table>
              <thead>
                <tr>
                  <th>排名</th>
                  <th>车牌号</th>
                  <th>次数(次)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>京A12345</td>
                  <td>134.2</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>京A12345</td>
                  <td>134.2</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>京A12345</td>
                  <td>134.2</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>京A12345</td>
                  <td>134.2</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>京A12345</td>
                  <td>134.2</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Index;