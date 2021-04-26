import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { head } from 'utils/head';
import { Editor } from '@tinymce/tinymce-react';
const TinyEditor = (props) => {
  
  const [editorValue,setEditorValue] = useState(`
  <!DOCTYPE html>
  <html lang="zh-cn">
  <head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="renderer" content="webkit">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="PAGE-ENTER" content="RevealTrans(Duration=0,Transition=1)" />
  <title>响应式金属制品汽车配件类keep模板(自适应手机端)</title>
  <meta name="keywords" content="" />
  <meta name="description" content="" />
  <meta name="author" content="order by " />
  <link rel="stylesheet" type="text/css" href="https://react.keep-wan.me/skin/css/pintuer.css" />
  <link rel="stylesheet" type="text/css" href="https://react.keep-wan.me/skin/css/owl.carousel.css" />
  <link rel="stylesheet" type="text/css" href="https://react.keep-wan.me/skin/css/style.css" />
  <script type="text/javascript" src="https://react.keep-wan.me/skin/js/jquery.min.js"></script>
  <script type="text/javascript" src="https://react.keep-wan.me/skin/js/pintuer.js"></script>
  <script src="https://react.keep-wan.me/skin/js/jquery.flexslider-min.js"></script>
  <script src="https://react.keep-wan.me/skin/js/owl.carousel.js"></script>
  <script src="https://react.keep-wan.me/skin/js/main.js"></script>
  <script src="https://react.keep-wan.me/skin/js/index.js"></script>
  <!-- FOR IE9 below -->
  <!--[if lt IE 9]>
    <script src="https://react.keep-wan.me/skin/js/respond.js"></script>
    <![endif]-->
  
  </head>
  <body id="index_box_id">
  <!-- header begin--> 
  <header id="fh5co-header">
    <div class="layout head-middle  hidden-l">
      <div class="container">
        <div class="line">
          <div class="xl12 xs6 xm5">
            <div class="welcome-word">响应式金属制品汽车配件类keep模板(自适应手机端)</div>
          </div>
          <div class="xl12 xs6 xm7 head-info text-right">
            <div class="hot-tel"><span>电话:</span>020-66889777</div>
          </div>
        </div>
      </div>
    </div>
    <div class="layout fixed header-box">
      <div class="container">
        <div class="line">
          <div class="xl12 xs3 xm3 xb3">
            <div class="logo">
              <!-- <h1><a href="index.html" title="响应式金属制品汽车配件类keep模板(自适应手机端)"><img src=""/></a></h1> -->
            </div>
          </div>
          <div class="xl12 xs9 xm9 xb9">
            <div class="nav-navicon" id="nav-main1">
              <ul class="nav  nav-inline  nav-menu nav-right">
                <li  class='current'><a class="first-level" href='index.html'>首页</a></li>
                <li class=''><a class="first-level" href='a/gongsigaikuang/index.html'>关于我们 <span class="downward"></span></a> 
                  <ul class="drop-menu">
                    
                    
                    <li><a href="a/gongsigaikuang/index.html">公司概况</a></li>
                    
                    <li><a href="a/gongsigainian/index.html">公司概念</a></li>
                    
                    <li><a href="a/gongsiwangluo/index.html">公司网络</a></li>
                    
                    
                  </ul>
                   </li><li class=''><a class="first-level" href='a/products/index.html'>产品展示 <span class="downward"></span></a> 
                  <ul class="drop-menu">
                    
                    
                    <li><a href="a/shukong/index.html">数控加工零件</a></li>
                    
                    <li><a href="a/zxclj/index.html">自行车零件</a></li>
                    
                    <li><a href="a/jiqi/index.html">机器零件</a></li>
                    
                    <li><a href="a/jingmi/index.html">精密汽车零件</a></li>
                    
                    
                  </ul>
                   </li><li class=''><a class="first-level" href='a/news/index.html'>新闻中心 <span class="downward"></span></a> 
                  <ul class="drop-menu">
                    
                    
                    <li><a href="a/gongsixinwen/index.html">公司新闻</a></li>
                    
                    <li><a href="a/xingyexinwen/index.html">行业新闻</a></li>
                    
                    <li><a href="a/jishuzhanshi/index.html">技术展示</a></li>
                    
                    
                  </ul>
                   </li><li class=''><a class="first-level" href='a/service/index.html'>技术服务 <span style="display:none"></span></a> 
                    
                     </li><li class=''><a class="first-level" href='a/feedback/index.html'>在线留言 <span style="display:none"></span></a> 
                    
                     </li><li class=''><a class="first-level" href='a/contact/index.html'>联系我们 <span style="display:none"></span></a> 
                    
                     </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
   
  <!-- header end--> 
  <!-- picture begin-->
  <div class="layout" id="fh5co-hero">
    <div class="line">
      <div class="flexslider">
        <ul class="slides">
          <li style="background: transparent url(uploads/allimg/180125/1-1P1252200450-L.jpg) no-repeat scroll center center / cover ; width: 100%; float: left; margin-right: -100%; position: relative; opacity: 0; display: block; z-index: 1;"></li>
  <li style="background: transparent url(uploads/allimg/180125/1-1P1252201280-L.jpg) no-repeat scroll center center / cover ; width: 100%; float: left; margin-right: -100%; position: relative; opacity: 0; display: block; z-index: 1;"></li>
  <li style="background: transparent url(uploads/allimg/180125/1-1P1252201070-L.jpg) no-repeat scroll center center / cover ; width: 100%; float: left; margin-right: -100%; position: relative; opacity: 0; display: block; z-index: 1;"></li>
  
        </ul>
      </div>
    </div>
  </div>
  <div id="fh5co-keyword-list" class="layout">
    <div class="bg-keyword">
      <div class="container">
        <div class="line">
          <div class="xl12 xs8 xm9 hidden-l"> </div>
          <div class="xl12 xs4 xm3">
            <div class="top-search">
              <div class="float-right">
                <form name="serch-form" action="../plus/search.php.html" method="post">
                  <input name="q" type="text" class="inputkey form-control" id="search-keyword" style="color:#ccc" value="在这里搜索..." onFocus="if(this.value=='在这里搜索...'){this.value='';}"  onblur="if(this.value==''){this.value='在这里搜索...';}" />
                  <input class="go" type="submit" name="search" value="" / >
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--products begin-->
  <div id="fh5co-product-list" class="layout">
    <div class="bg-product">
      <div class="container">
        <div class="line fh5co-heading text-center"> <h2>产品展示</h2>
          <p class="desc">卓越，创新，积极进取，持续改进，精益求精</p> </div>
        <div class="line show-list">
          <div class="owl-carousel owl-carousel-carousel"> <div class="item margin-large-bottom text-center"><a href="a/jingmi/12.html" title="精密汽车零件012">
              <div class="media-img"><span class="zoomimgs piczoomimgs" style="background-image:url(uploads/allimg/180125/1-1P125211P50-L.jpg)"></span></div>
              <h3>精密汽车零件012</h3>
              </a></div>
  <div class="item margin-large-bottom text-center"><a href="a/jingmi/11.html" title="精密汽车零件011">
              <div class="media-img"><span class="zoomimgs piczoomimgs" style="background-image:url(uploads/allimg/180125/1-1P125211H90-L.jpg)"></span></div>
              <h3>精密汽车零件011</h3>
              </a></div>
  <div class="item margin-large-bottom text-center"><a href="a/jingmi/10.html" title="精密汽车零件010">
              <div class="media-img"><span class="zoomimgs piczoomimgs" style="background-image:url(uploads/allimg/180125/1-1P1252116430-L.jpg)"></span></div>
              <h3>精密汽车零件010</h3>
              </a></div>
  <div class="item margin-large-bottom text-center"><a href="a/jingmi/9.html" title="精密汽车零件009">
              <div class="media-img"><span class="zoomimgs piczoomimgs" style="background-image:url(uploads/allimg/180125/1-1P1252116000-L.jpg)"></span></div>
              <h3>精密汽车零件009</h3>
              </a></div>
  <div class="item margin-large-bottom text-center"><a href="a/jingmi/8.html" title="精密汽车零件008">
              <div class="media-img"><span class="zoomimgs piczoomimgs" style="background-image:url(uploads/allimg/180125/1-1P1252115150-L.jpg)"></span></div>
              <h3>精密汽车零件008</h3>
              </a></div>
  <div class="item margin-large-bottom text-center"><a href="a/jingmi/7.html" title="精密汽车零件007">
              <div class="media-img"><span class="zoomimgs piczoomimgs" style="background-image:url(uploads/allimg/180125/1-1P1252114400-L.jpg)"></span></div>
              <h3>精密汽车零件007</h3>
              </a></div>
  <div class="item margin-large-bottom text-center"><a href="a/jingmi/6.html" title="精密汽车零件006">
              <div class="media-img"><span class="zoomimgs piczoomimgs" style="background-image:url(uploads/allimg/180125/1-1P1252113560-L.jpg)"></span></div>
              <h3>精密汽车零件006</h3>
              </a></div>
  <div class="item margin-large-bottom text-center"><a href="a/jingmi/5.html" title="精密汽车零件005">
              <div class="media-img"><span class="zoomimgs piczoomimgs" style="background-image:url(uploads/allimg/180125/1-1P1252113240-L.jpg)"></span></div>
              <h3>精密汽车零件005</h3>
              </a></div>
  <div class="item margin-large-bottom text-center"><a href="a/jingmi/4.html" title="精密汽车零件004">
              <div class="media-img"><span class="zoomimgs piczoomimgs" style="background-image:url(uploads/allimg/180125/1-1P1252112360-L.jpg)"></span></div>
              <h3>精密汽车零件004</h3>
              </a></div>
  <div class="item margin-large-bottom text-center"><a href="a/jingmi/3.html" title="精密汽车零件003">
              <div class="media-img"><span class="zoomimgs piczoomimgs" style="background-image:url(uploads/allimg/180125/1-1P1252111590-L.jpg)"></span></div>
              <h3>精密汽车零件003</h3>
              </a></div>
  <div class="item margin-large-bottom text-center"><a href="a/jingmi/2.html" title="精密汽车零件002">
              <div class="media-img"><span class="zoomimgs piczoomimgs" style="background-image:url(uploads/allimg/180125/1-1P1252111220-L.jpg)"></span></div>
              <h3>精密汽车零件002</h3>
              </a></div>
  <div class="item margin-large-bottom text-center"><a href="a/jingmi/1.html" title="精密汽车零件001">
              <div class="media-img"><span class="zoomimgs piczoomimgs" style="background-image:url(uploads/allimg/180125/1-1P125210U80-L.jpg)"></span></div>
              <h3>精密汽车零件001</h3>
              </a></div>
   </div>
        </div>
      </div>
    </div>
  </div>
  <!--products end--> 
  <!--about begin-->
  <div id="fh5co-about-us" class="layout">
    <div class="bg-about">
      <div class="container">
        <div class="inner"> <span class="more"><a href="a/gongsigaikuang/index.html">更多&gt;&gt;</a></span>
          <div class="line fh5co-heading text-center"> <h2>关于我们</h2>
            <p class="desc">精密零件及高端珠宝公司</p> </div>
          <div class="show-list line">
            <div class="xl12 xs4 xm4 margin-large-bottom">
              <div class="media-img"> <img src="skin/images/about.jpg"/> </div>
            </div>
            <div class="xl12 xs8 xm8 content margin-large-bottom">
              <div class="desc"> <span class="t-top"></span> <span class="t-bottom"></span>
                <h2>响应式金属制品汽车配件类keep模板(自适应手机端)</h2>
                <div class="intro">  某某金属制品有限公司成立于2010，是一家集生产加工贸易为一体的实业公司。从事大型机械、模具钢材、汽车五金模具为主的加工制造企业。公司拥有近20套大型设备，提供6米以内的龙门电脑锣、龙门磨床、精铣边铣、平面铣、包包装材料全套加工服务。 在机械板、大型铸件、焊接件、汽车五金模具、表面处理、精密零件等方面有丰富的加工经验。 ... </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--about end--> 
  <!--News begin-->
  <div id="fh5co-news-list" class="layout">
    <div class="bg-news">
      <div class="container">
        <div class="line fh5co-heading text-center"> <h2>新闻中心</h2>
          <p class="desc">实时新闻，实时关注，最新进展</p> </div>
        <div class="line show-list">
          <div class="tab" data-toggle="hover">
            <div class="tab-head text-center">
              <ul class="tab-nav">
                
                <li><a href="#tab-art1">公司新闻</a></li>
                
                <li><a href="#tab-art2">行业新闻</a></li>
                
                <li><a href="#tab-art3">技术展示</a></li>
                
              </ul>
            </div>
            <div class="tab-body">
              <div class="tab-panel active" id="tab-art1">
                <div class="line-big">
                  <div class="xl12 xs6 xm6 margin-large-bottom"> <div class="media l-item">
                      <div class="media_img"><a href="a/gongsixinwen/18.html" class="zoomimgs artzoomimgs" style="background-image:url(uploads/allimg/180125/1-1P1252131400-L.jpg)" ></a></div>
                      <div class="media-body">
                        <h3><a href="a/gongsixinwen/18.html" title="汽车零部件市场需要渠道整合">汽车零部件市场需要渠道整合</a></h3>
                        <div class="time"> 2018/01/31</div>
                        <p class="desc"> 最近，阿斯顿马丁在全球范围的大型召回问题汽车涉及17590运营。根据公布的调查由阿斯顿马丁，主要原因为质量缺陷的汽车零部件供应商，他们的论文是... </p>
                        <p class="more"><a href="a/gongsixinwen/18.html"></a></p>
                      </div>
                    </div>
   </div>
                  <div class="xl12 xs6 xm6 margin-large-bottom">
                    <ul>
                      <li>
                        <div class="media media-x">
                          <div class="caldata float-left">
                            <div class="content text-center">
                              <p class="day">25</p>
                              <p class="mon-year">2018/01</p>
                            </div>
                          </div>
                          <div class="media-body">
                            <h4><a href="a/gongsixinwen/17.html" title="零部件售后市场集中度过低">零部件售后市场集中度过低</a></h4>
                            <p class="desc">中国的汽车配件售后市场最大的问题是浓度太低，渠道过于分散。辉集团、中国售后业务的陈伟春在接受记者采访时表示，在售后市场总经理，与卖方市场... </p>
                            <p class="more"><a href="a/gongsixinwen/17.html"></a></p>
                          </div>
                        </div>
                      </li>
  <li>
                        <div class="media media-x">
                          <div class="caldata float-left">
                            <div class="content text-center">
                              <p class="day">25</p>
                              <p class="mon-year">2018/01</p>
                            </div>
                          </div>
                          <div class="media-body">
                            <h4><a href="a/gongsixinwen/16.html" title="汽车零部件制造商如何面对新技术">汽车零部件制造商如何面对新技术</a></h4>
                            <p class="desc">雅克是一个大学aschenbroich CEO和董事会（Valeo法雷奥。他是在办公室，在法国政府和当选总统技术顾问什么是希拉克在1987年。2009年以来，他已是首席执行官... </p>
                            <p class="more"><a href="a/gongsixinwen/16.html"></a></p>
                          </div>
                        </div>
                      </li>
  <li>
                        <div class="media media-x">
                          <div class="caldata float-left">
                            <div class="content text-center">
                              <p class="day">25</p>
                              <p class="mon-year">2018/01</p>
                            </div>
                          </div>
                          <div class="media-body">
                            <h4><a href="a/gongsixinwen/15.html" title="轻巧舒适的完美结合">轻巧舒适的完美结合</a></h4>
                            <p class="desc">阿斯派德是圣马可四系列流行的头，轻+中空+表面设计可以满足大部分的骑行爱好者的自行车座垫的要求。阿斯派德不仅舒适，运动性能是一流的。碳FX，赛... </p>
                            <p class="more"><a href="a/gongsixinwen/15.html"></a></p>
                          </div>
                        </div>
                      </li>
  <li>
                        <div class="media media-x">
                          <div class="caldata float-left">
                            <div class="content text-center">
                              <p class="day">25</p>
                              <p class="mon-year">2018/01</p>
                            </div>
                          </div>
                          <div class="media-body">
                            <h4><a href="a/gongsixinwen/14.html" title="即将上市的那些包">即将上市的那些包</a></h4>
                            <p class="desc">2016赛季，SRAM主办的喀秋莎和AG2R两日游团队。两队使用ETAP无线电在环赛上轮变换。 在2016季的盘式制动器将允许专业体育场，在前面的文章中萧边也谈到了... </p>
                            <p class="more"><a href="a/gongsixinwen/14.html"></a></p>
                          </div>
                        </div>
                      </li>
  <li>
                        <div class="media media-x">
                          <div class="caldata float-left">
                            <div class="content text-center">
                              <p class="day">25</p>
                              <p class="mon-year">2018/01</p>
                            </div>
                          </div>
                          <div class="media-body">
                            <h4><a href="a/gongsixinwen/13.html" title="很酷的备件">很酷的备件</a></h4>
                            <p class="desc">2017年9月14日，第七届亚洲自行车展将在南京国际博览中心隆重开幕。展出的不仅是琳琅满目的豪华车，还有水晶晶莹闪亮的配件哦！今天，让我们一起来看... </p>
                            <p class="more"><a href="a/gongsixinwen/13.html"></a></p>
                          </div>
                        </div>
                      </li>
  
                    </ul>
                  </div>
                </div>
              </div>
              <div class="tab-panel" id="tab-art2">
                <div class="line-big">
                  <div class="xl12 xs6 xm6 margin-large-bottom"> <div class="media l-item">
                      <div class="media_img"><a href="a/xingyexinwen/24.html" class="zoomimgs artzoomimgs" style="background-image:url(uploads/allimg/180125/1-1P1252146170-L.jpg)" ></a></div>
                      <div class="media-body">
                        <h3><a href="a/xingyexinwen/24.html" title="金属镶件要热处理的原因。">金属镶件要热处理的原因。</a></h3>
                        <div class="time"> 2018/01/31</div>
                        <p class="desc"> 插入物用金属嵌件模制，以改善塑料制品的工作性和增加塑料制品的使用（如提高导电性或促进与其他部件的连接）。 由于金属插入件和塑料的热收缩率大... </p>
                        <p class="more"><a href="a/xingyexinwen/24.html"></a></p>
                      </div>
                    </div>
   </div>
                  <div class="xl12 xs6 xm6 margin-large-bottom">
                    <ul>
                      <li>
                        <div class="media media-x">
                          <div class="caldata float-left">
                            <div class="content text-center">
                              <p class="day">25</p>
                              <p class="mon-year">2018/01</p>
                            </div>
                          </div>
                          <div class="media-body">
                            <h4><a href="a/xingyexinwen/23.html" title="未来可能是路上的贵金属">未来可能是路上的贵金属</a></h4>
                            <p class="desc">有组织的5月17日，由中国有色金属工业协会金银分会、郴州市贵银实业有限公司、北京安泰科信息有限公司（中国）主办的第十一届年会在贵金属），湖南... </p>
                            <p class="more"><a href="a/xingyexinwen/23.html"></a></p>
                          </div>
                        </div>
                      </li>
  <li>
                        <div class="media media-x">
                          <div class="caldata float-left">
                            <div class="content text-center">
                              <p class="day">25</p>
                              <p class="mon-year">2018/01</p>
                            </div>
                          </div>
                          <div class="media-body">
                            <h4><a href="a/xingyexinwen/22.html" title="金属倒在木板上，惊慌失措。">金属倒在木板上，惊慌失措。</a></h4>
                            <p class="desc">锌：上海锌跌破40日线支撑，录得四连阴，材料天运行在24050-24500元/吨，下方关注24000元/吨的整数关口。查看详情 镍：镍价上涨从六月中旬没有经历一个有... </p>
                            <p class="more"><a href="a/xingyexinwen/22.html"></a></p>
                          </div>
                        </div>
                      </li>
  <li>
                        <div class="media media-x">
                          <div class="caldata float-left">
                            <div class="content text-center">
                              <p class="day">25</p>
                              <p class="mon-year">2018/01</p>
                            </div>
                          </div>
                          <div class="media-body">
                            <h4><a href="a/xingyexinwen/21.html" title="将是未来的金铜合金？">将是未来的金铜合金？</a></h4>
                            <p class="desc">众所周知，铜常被视为经济是否健康的指示器。历史上，当制造业和建筑业的总规模缩水，铜价下跌，整个制造业和建筑业正处于扩张期和铜价上涨时期。... </p>
                            <p class="more"><a href="a/xingyexinwen/21.html"></a></p>
                          </div>
                        </div>
                      </li>
  <li>
                        <div class="media media-x">
                          <div class="caldata float-left">
                            <div class="content text-center">
                              <p class="day">25</p>
                              <p class="mon-year">2018/01</p>
                            </div>
                          </div>
                          <div class="media-body">
                            <h4><a href="a/xingyexinwen/20.html" title="汽车工程塑料将取代更多的金属部">汽车工程塑料将取代更多的金属部</a></h4>
                            <p class="desc">奇瑞路虎揽胜极光，SUV的轻量化设计是比较好的车型，它被认为是同级SUV轻，而它的许多部件都是使用工程塑料。3月3日，中国工程塑料工业协会秘书长郑... </p>
                            <p class="more"><a href="a/xingyexinwen/20.html"></a></p>
                          </div>
                        </div>
                      </li>
  <li>
                        <div class="media media-x">
                          <div class="caldata float-left">
                            <div class="content text-center">
                              <p class="day">25</p>
                              <p class="mon-year">2018/01</p>
                            </div>
                          </div>
                          <div class="media-body">
                            <h4><a href="a/xingyexinwen/19.html" title="内需引导金属有望企稳">内需引导金属有望企稳</a></h4>
                            <p class="desc">国际、欧洲和美国的经济数据都不错：六月欧元区制造业采购经理人PMI初值和服务业PMI均高于预期，并创下一年来新高，表明制造业需求和服务需求均回升... </p>
                            <p class="more"><a href="a/xingyexinwen/19.html"></a></p>
                          </div>
                        </div>
                      </li>
  
                    </ul>
                  </div>
                </div>
              </div>
              <div class="tab-panel" id="tab-art3">
                <div class="line-big">
                  <div class="xl12 xs6 xm6 margin-large-bottom"> <div class="media l-item">
                      <div class="media_img"><a href="a/jishuzhanshi/33.html" class="zoomimgs artzoomimgs" style="background-image:url(uploads/allimg/180125/1-1P1252220110-L.jpg)" ></a></div>
                      <div class="media-body">
                        <h3><a href="a/jishuzhanshi/33.html" title="汽车零部件知识的详细分析">汽车零部件知识的详细分析</a></h3>
                        <div class="time"> 2018/01/31</div>
                        <p class="desc"> 我们不需要准确地理解汽车的所有部分，但我们需要知道汽车的四个主要部分， 即：汽车发动机。 ；②汽车底盘；③车身；④汽车电器与电子设备。 1，发... </p>
                        <p class="more"><a href="a/jishuzhanshi/33.html"></a></p>
                      </div>
                    </div>
   </div>
                  <div class="xl12 xs6 xm6 margin-large-bottom">
                    <ul>
                      <li>
                        <div class="media media-x">
                          <div class="caldata float-left">
                            <div class="content text-center">
                              <p class="day">25</p>
                              <p class="mon-year">2018/01</p>
                            </div>
                          </div>
                          <div class="media-body">
                            <h4><a href="a/jishuzhanshi/32.html" title="买几把洗水枪的小窍门">买几把洗水枪的小窍门</a></h4>
                            <p class="desc">有些车主选择自己动手洗车在家，因为它既经济又方便，有些洗车工具自然受到市民追捧，但购买水洗水枪除了看到水的状况外，还得考虑水枪的压力。只... </p>
                            <p class="more"><a href="a/jishuzhanshi/32.html"></a></p>
                          </div>
                        </div>
                      </li>
  <li>
                        <div class="media media-x">
                          <div class="caldata float-left">
                            <div class="content text-center">
                              <p class="day">25</p>
                              <p class="mon-year">2018/01</p>
                            </div>
                          </div>
                          <div class="media-body">
                            <h4><a href="a/jishuzhanshi/31.html" title="雨天镜看不到治疗方法">雨天镜看不到治疗方法</a></h4>
                            <p class="desc">下雨天不仅给我们的日常生活带来了许多不便，也给我们开车带来了许多不便。下雨天，我们经常发现左右两侧的后视镜覆盖水，无法清晰地看到汽车的左... </p>
                            <p class="more"><a href="a/jishuzhanshi/31.html"></a></p>
                          </div>
                        </div>
                      </li>
  <li>
                        <div class="media media-x">
                          <div class="caldata float-left">
                            <div class="content text-center">
                              <p class="day">25</p>
                              <p class="mon-year">2018/01</p>
                            </div>
                          </div>
                          <div class="media-body">
                            <h4><a href="a/jishuzhanshi/30.html" title="你知道汽车备用轮胎最长的寿命吗">你知道汽车备用轮胎最长的寿命吗</a></h4>
                            <p class="desc">爆胎的车主会发现一个现象：汽车备胎比普通轮胎小，而且大部分颜色鲜艳，为什么这样做？人胎胎也是，主要目的是提醒车主及时更换备胎。有人说，轮... </p>
                            <p class="more"><a href="a/jishuzhanshi/30.html"></a></p>
                          </div>
                        </div>
                      </li>
  <li>
                        <div class="media media-x">
                          <div class="caldata float-left">
                            <div class="content text-center">
                              <p class="day">25</p>
                              <p class="mon-year">2018/01</p>
                            </div>
                          </div>
                          <div class="media-body">
                            <h4><a href="a/jishuzhanshi/29.html" title="简单实用的维修技术">简单实用的维修技术</a></h4>
                            <p class="desc">汽车每天在不同的道路上行驶，难免会受到损坏。但有时车辆在行驶，村前不能开店怎么办，所以车主每天需要学习简单的维修技术，在紧急情况下使用。... </p>
                            <p class="more"><a href="a/jishuzhanshi/29.html"></a></p>
                          </div>
                        </div>
                      </li>
  <li>
                        <div class="media media-x">
                          <div class="caldata float-left">
                            <div class="content text-center">
                              <p class="day">25</p>
                              <p class="mon-year">2018/01</p>
                            </div>
                          </div>
                          <div class="media-body">
                            <h4><a href="a/jishuzhanshi/28.html" title="如何维护这五个部分">如何维护这五个部分</a></h4>
                            <p class="desc">漆底保护漆 冬天，露水大量的水，汽车表面非常潮湿，如果汽车表面有明显的划痕，油漆应做，以免划伤现场的水分和腐蚀。 轮胎维修以避免事故 轮胎的... </p>
                            <p class="more"><a href="a/jishuzhanshi/28.html"></a></p>
                          </div>
                        </div>
                      </li>
  
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--News end--> 
  <!--Partner begin-->
  <div id="fh5co-partner-list" class="layout">
    <div class="bg-partner">
      <div class="container">
        <div class="line fh5co-heading text-center"> <h2>合作伙伴</h2> </div>
        <div class="line show-list">
          <div class="owl-carousel partner-carousel-carousel"> <div class="item"> <a class="zoomimgs frizoomimgs" style="background-image:url(uploads/allimg/180125/1-1P1252303460-L.png)" title="网易163"></a></div>
  <div class="item"> <a class="zoomimgs frizoomimgs" style="background-image:url(uploads/allimg/180125/1-1P1252305010-L.jpg)" title="谷歌"></a></div>
  <div class="item"> <a class="zoomimgs frizoomimgs" style="background-image:url(uploads/allimg/180125/1-1P125230A10-L.jpg)" title="腾讯网"></a></div>
  <div class="item"> <a class="zoomimgs frizoomimgs" style="background-image:url(uploads/allimg/180125/1-1P125230J70-L.jpg)" title="阿里巴巴"></a></div>
  <div class="item"> <a class="zoomimgs frizoomimgs" style="background-image:url(uploads/allimg/180125/1-1P125230Q60-L.jpg)" title="百度"></a></div>
   </div>
        </div>
      </div>
    </div>
  </div>
  <!--Partner end--> 
  <!--footer--> 
  <footer>
    <div class="layout footer-top hidden-l">
      <div class="container">
        <div class="line-big">
          <div class="xl12 xs3 xm3 margin-large-bottom">
            <div class="plist"> <h2>联系我们</h2>
              <div class="contact-foot">
                <p>地址: 广东省广州市番禺经济开发区58号</p>
                <p>电话: 020-66889777</p>
                <p>传真: 020-66889888</p>
                <p>邮箱: admin@admin.com</p>
              </div>
            </div>
          </div>
          <div class="xl12 xs3 xm3 margin-large-bottom">
            <div class="plist">
              <h2>关于我们</h2>
              <ul>
                
                <li><a href="a/gongsigaikuang/index.html" title="公司概况">公司概况</a></li>
                
                <li><a href="a/gongsigainian/index.html" title="公司概念">公司概念</a></li>
                
                <li><a href="a/gongsiwangluo/index.html" title="公司网络">公司网络</a></li>
                
              </ul>
            </div>
          </div><div class="xl12 xs3 xm3 margin-large-bottom">
            <div class="plist">
              <h2>产品展示</h2>
              <ul>
                
                <li><a href="a/shukong/index.html" title="数控加工零件">数控加工零件</a></li>
                
                <li><a href="a/zxclj/index.html" title="自行车零件">自行车零件</a></li>
                
                <li><a href="a/jiqi/index.html" title="机器零件">机器零件</a></li>
                
                <li><a href="a/jingmi/index.html" title="精密汽车零件">精密汽车零件</a></li>
                
              </ul>
            </div>
          </div><div class="xl12 xs3 xm3 margin-large-bottom">
            <div class="plist">
              <h2>新闻中心</h2>
              <ul>
                
                <li><a href="a/gongsixinwen/index.html" title="公司新闻">公司新闻</a></li>
                
                <li><a href="a/xingyexinwen/index.html" title="行业新闻">行业新闻</a></li>
                
                <li><a href="a/jishuzhanshi/index.html" title="技术展示">技术展示</a></li>
                
              </ul>
            </div>
          </div> </div>
      </div>
    </div>
    <div class="layout  footer-bot">
      <div class="container">
        <div class="line-big">
          <div class="xl12 xs12 xm4">
            <div class="foot-flink">友情链接: <a href='javascript:void(9)' target='_blank'>网站模板</a>   <a href='javascript:void(9)' target='_blank'>keep模版</a>   <a href='javascript:void(9)' target='_blank'>keep模版</a>   <a href='javascript:void(0)' target='_blank'>keep模板</a>   <a href='javascript:void(9)' target='_blank'>企业网站模板</a>  </div>
          </div>
          <div class="xl12 xs12 xm8">
            <div class="Copyright">Copyright @ 2011-2018 keep帮 版权所有</div>
          </div>
        </div>
      </div>
    </div>
  </footer>
  
  <!--footer-->
  
  <div class="blank55"></div>
  <div id="toolbar" class="layout text-center">
    <div class="x4"><a href="index.html"><span class="icon-home"></span>首页</a></div>
    <div class="x4"><a href="tel:020-66889777"><span class="icon-phone"></span>电话</a></div>
    <div class="x4"><a href="a/contact/index.html"><span class="icon-user"></span>联系我们</a></div>
  </div>
  
  </body>
  </html>`);
  const handleEditor = (value) => {
    setEditorValue(value);
  };
  return(
    <div className="editor">
      {head('富文本编辑器')}
      <Editor id="editor" apiKey="f0ujtvkxmw64jnj6xstg4adv3vgxh73c5wbsgusq7si3pi1n" init={{
        'plugins': 'print preview fullpage  searchreplace autolink directionality  visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount  imagetools textpattern help', 
        'min_height': 500,
        'insert_button_items': 'insertfile',
        'language': 'zh_CN',
        'language_url': 'assets/langs/zh_CN.js',
        'importcss_append': true,
        'toolbar': 'formatselect | bold | file italic strikethrough forecolor backcolor  | link image media  | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent | removeformat | addcomment',
        'image_advtab': true,
        'images_upload_handler': (blobInfo,success,failure)=>{
          console.log(blobInfo);
          
        }
      }} outputFormat= "html"  value={editorValue} onEditorChange= {handleEditor} tagName="t_editor"/>
    </div>
  );
};
TinyEditor.propTypes = {

};
export default TinyEditor;