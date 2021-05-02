import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { head } from 'utils/head';
import { Editor } from '@tinymce/tinymce-react';
import { Button,Modal } from 'antd';
const TinyEditor = () => {
  const [visable,setVisable] = useState(false);
  const [editorValue,setEditorValue] = useState(`<!DOCTYPE html>
  <html lang="zh-cn">
  
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="renderer" content="webkit">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="PAGE-ENTER" content="RevealTrans(Duration=0,Transition=1)" />
    <title>湖南荆首建筑有限公司</title>
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
            <!-- <div class="xl12 xs3 xm3 xb3">
              <div class="logo">
                <h1><a href="index.html" title="湖南荆首建筑有限公司"><img src=""/></a></h1>
              </div>
            </div> -->
            <div class="xl12 xs12 xm12 xb12">
              <div class="nav-navicon" id="nav-main1">
                <ul class="nav  nav-inline  nav-menu nav-right">
                  <li class='current'><a class="first-level" href='index.html'>首页</a></li>
                  <li class=''><a class="first-level" href='a/gongsigaikuang/index.html'>关于我们 <span
                        class="downward"></span></a>
                    <ul class="drop-menu">
  
  
                      <li><a href="a/gongsigaikuang/index.html">公司概况</a></li>
  
                      <li><a href="a/gongsigainian/index.html">公司概念</a></li>
  
                      <li><a href="a/gongsiwangluo/index.html">公司网络</a></li>
  
  
                    </ul>
                  </li>
                  <li class=''><a class="first-level" href='a/products/index.html'>设备展示 <span
                        style="display:none"></span></a>
  
                  </li>
                  <li class=''><a class="first-level" href='a/products/index.html'>工程案例 <span
                        style="display:none"></span></a>
  
                  </li>
                  <li class=''><a class="first-level" href='a/news/index.html'>新闻中心 <span class="downward"></span></a>
                    <ul class="drop-menu">
  
  
                      <li><a href="a/gongsixinwen/index.html">公司新闻</a></li>
  
                      <li><a href="a/xingyexinwen/index.html">行业新闻</a></li>
  
                      <li><a href="a/jishuzhanshi/index.html">技术展示</a></li>
  
  
                    </ul>
                  </li>
                  <li class=''><a class="first-level" href='a/service/index.html'>资质证书<span
                        style="display:none"></span></a>
  
                  </li>
                  <li class=''><a class="first-level" href='a/feedback/index.html'>在线留言 <span
                        style="display:none"></span></a>
  
                  </li>
                  <li class=''><a class="first-level" href='a/contact/index.html'>联系我们 <span
                        style="display:none"></span></a>
  
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
            <li
              style="width: 100%; float: left; margin-right: -100%; position: relative; opacity: 1; display: block; z-index: 1;">
              <!-- <img src="uploads/allimg/180125/1-1P1252200450-L.jpg" alt="" style="height: 100%;width: 100%;"> -->
              <img src="https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00686-3143.jpg" alt="" style="height: 100%;width: 100%;">
            </li>
            <li
              style=" width: 100%; float: left; margin-right: -100%; position: relative; opacity: 1; display: block; z-index: 1;">
              <!-- <img src="uploads/allimg/180125/1-1P1252201280-L.jpg" alt="" style="height: 100%;width: 100%;"> -->
              <img src="https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00238-790.jpg" alt="" style="height: 100%;width: 100%;">
            </li>
            <li
              style=" width: 100%; float: left; margin-right: -100%; position: relative; opacity: 1; display: block; z-index: 1;">
              <!-- <img src="uploads/allimg/180125/1-1P1252201070-L.jpg" alt="" style="height: 100%;width: 100%;"> -->
              <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=613200305,3618982671&fm=26&gp=0.jpg" alt="" style="height: 100%;width: 100%;">
            </li>
  
          </ul>
        </div>
      </div>
    </div>
    <div id="fh5co-keyword-list" class="layout">
    <div class="bg-keyword">
      <div class="container">
        <div class="show_content padding-large-bottom " >
          <h2 class=text-center>免费获得工程报价</h2>
          <form action="javascript:void(0)"  class="form form-block" id="concat">
            <div class="form-group">
              <div class="field">
                <input type="text" class="input" id="name" name="name" size="50" data-validate="请输入您的姓名。" placeholder="姓名" />
              </div>
            </div>
            <div class="form-group">
              <div class="field">
                <input type="text" class="input" id="tel" name="telPhone" size="50"  placeholder="电话" />
              </div>
            </div>
            <div class="form-group">
              <div class="field">
                <input type="text" class="input" id="gcmj" name="area" size="50"  placeholder="工程面积" />
              </div>
            </div>
            <div class="form-group">
              <div class="field">
                <textarea  class="input" id="content" name="content"  data-validate="请输入内容" placeholder="内容"></textarea>
              </div>
            </div>
            <div class="form-button">
              <button class="button bg-main margin-small-right">提交</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- 为了保障工程质量我们都有哪些 -->
  <div class="layout footer-top" style="border-bottom: 1px solid #eee;">
    <div class="container">
      <div class="line-big">
        <h2 class="text-center" style="padding: 15px;">为了保障工程质量我们都有哪些</h2>
        <div class="xl12 xs4 xm4 margin-large-bottom text-center">
          <div style="
            padding: 70px 15px;
            border-radius: 15px;
            min-height: 260px;
            box-shadow: 0 0.375rem 1.1625rem 0.0875rem rgb(50 98 255 / 18%);
          ">
            <h3>25年用心做强夯</h3>
            <p>25年来荆首覆盖全国所有城市，主要承接1000-18000KN.m强夯施工</p>
          </div>
        </div>
        <div class="xl12 xs4 xm4 margin-large-bottom text-center">
          <div style="
          padding: 70px 15px;
          border-radius: 15px;
          min-height: 260px;
          box-shadow: 0 0.375rem 1.1625rem 0.0875rem rgb(50 98 255 / 18%);
          ">
            <h3>专业团队</h3>
            <p>自有强夯设备50多台，高中职称技术人员占比50%，工程技术管理人员占比15%业界口碑领先</p>
          </div>
        </div>
        <div class="xl12 xs4 xm4 margin-large-bottom text-center">
          <div style="
          padding: 70px 15px;
          border-radius: 15px;
          min-height: 260px;
          box-shadow: 0 0.375rem 1.1625rem 0.0875rem rgb(50 98 255 / 18%);
          ">
            <h3>用心服务</h3>
            <p>荆首强夯每年施工上百万平米，全程可视化操作，好评率高达98%</p>
          </div>
          
        </div>
      </div>
    </div>
  </div>
  <!-- 我们的服务 -->
  <div class="layout footer-top" style="border-bottom: 1px solid #eee;">
    <div class="container">
      <div class="line-big">
        <h2 class="text-center" style="padding: 15px;">我们的服务</h2>
        <p class="text-center">高效强夯可帮助作业者节省时间，快速优化改良基础，强夯置换</p>
        <div class="xl12 xs4 xm4 margin-large-bottom text-center" style="
          position: relative;
        ">
          <img style="height: 100%; width: 100%; min-height: 310px;" src="http://20666306.s21i.faiusr.com/2/ABUIABACGAAgz-OX8wUo_L3K3wQwtgc4lgc!450x450.jpg"/>
          <p style="
          position: absolute;
          bottom: 0px;
          color: #fff;
          text-align: left;
          padding-left: 5px;
          ">人工湖强夯</p>
        </div>
        <div class="xl12 xs4 xm4 margin-large-bottom text-center" style="
          position: relative;
        ">
          <img style="height: 100%; width: 100%; min-height: 310px;" src="http://20666306.s21i.faiusr.com/2/ABUIABACGAAgmfKX8wUojvPDyQQw9AM49wI!450x450.jpg"/>
          <p style="
          position: absolute;
          bottom: 0px;
          color: #fff;
          text-align: left;
          padding-left: 5px;
          ">厂房强夯</p>
        </div>
        <div class="xl12 xs4 xm4 margin-large-bottom text-center" style="
          position: relative;
        ">
          <img style="height: 100%; width: 100%; min-height: 310px;" src="http://20666306.s21i.faiusr.com/2/ABUIABACGAAgvu_X8wUopcGIJjDEBDixAw!450x450.jpg"/>
          <p style="
          position: absolute;
          bottom: 0px;
          color: #fff;
          text-align: left;
          padding-left: 5px;
          ">实时强夯</p>
        </div>
        <div class="xl12 xs4 xm4 margin-large-bottom text-center" style="
          position: relative;
        ">
          <img style="height: 100%; width: 100%; min-height: 310px;" src="http://20666306.s21i.faiusr.com/2/ABUIABACGAAg___X8wUoubW5vAMwlAQ4rAI!450x450.jpg"/>
          <p style="
          position: absolute;
          bottom: 0px;
          color: #fff;
          text-align: left;
          padding-left: 5px;
          ">路基强夯</p>
        </div>
        <div class="xl12 xs4 xm4 margin-large-bottom text-center" style="
          position: relative;
        ">
          <img style="height: 100%; width: 100%; min-height: 310px;" src="http://20666306.s21i.faiusr.com/2/ABUIABACGAAgl-OX8wUo9vDMmQYw2AQ4wgM!450x450.jpg"/>
          <p style="
          position: absolute;
          bottom: 0px;
          color: #fff;
          text-align: left;
          padding-left: 5px;
          ">港口强夯</p>
        </div>
        <div class="xl12 xs4 xm4 margin-large-bottom text-center" style="
          position: relative;
        ">
          <img style="height: 100%; width: 100%; min-height: 310px;" src="http://20666306.s21i.faiusr.com/2/ABUIABACGAAgmPGX8wUogKretQMw2AQ4wgM!450x450.jpg"/>
          <p style="
          position: absolute;
          bottom: 0px;
          color: #fff;
          text-align: left;
          padding-left: 5px;
          ">基地强夯</p>
        </div>
      </div>
    </div>
  </div>
  <!--products begin-->
  <div id="fh5co-product-list" class="layout">
    <div class="bg-product">
      <div class="container">
        <div class="line fh5co-heading text-center">
          <h2>资质展示</h2>
          <p class="desc">卓越，创新，积极进取，持续改进，精益求精</p>
        </div>
        <div class="line show-list">
          <div class="owl-carousel owl-carousel-carousel">
            <div class="item margin-large-bottom text-center"><a href="a/products/index.html" title="精密汽车零件012">
                <div class="media-img"><span class="zoomimgs piczoomimgs">
                    <img src="uploads/allimg/180125/1-1P125211P50-L.jpg" />
                  </span></div>
                <h3>精密汽车零件012</h3>
              </a></div>
            <div class="item margin-large-bottom text-center"><a href="a/products/index.html" title="精密汽车零件011">
                <div class="media-img"><span class="zoomimgs piczoomimgs"
                    >
                    <img src="uploads/allimg/180125/1-1P125211H90-L.jpg" />
                  </span></div>
                <h3>精密汽车零件011</h3>
              </a></div>
            <div class="item margin-large-bottom text-center"><a href="a/products/index.html" title="精密汽车零件010">
                <div class="media-img"><span class="zoomimgs piczoomimgs"
                    >
                    <img src="uploads/allimg/180125/1-1P1252116430-L.jpg" />
                  </span></div>
                <h3>精密汽车零件010</h3>
              </a></div>
            <div class="item margin-large-bottom text-center"><a href="a/products/index.html" title="精密汽车零件009">
                <div class="media-img"><span class="zoomimgs piczoomimgs"
                    >
                    <img src="uploads/allimg/180125/1-1P1252116000-L.jpg" />
                  </span></div>
                <h3>精密汽车零件009</h3>
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
            <div class="line fh5co-heading text-center">
              <h2>关于我们</h2>
              <p class="desc">精密零件及高端珠宝公司</p>
            </div>
            <div class="show-list line">
              <div class="xl12 xs4 xm4 margin-large-bottom">
                <div class="media-img"> <img src="https://react.keep-wan.me/skin/images/about.jpg" /> </div>
              </div>
              <div class="xl12 xs8 xm8 content margin-large-bottom">
                <div class="desc"> <span class="t-top"></span> <span class="t-bottom"></span>
                  <h2>湖南荆首建筑有限公司</h2>
                  <div class="intro">
                    某某金属制品有限公司成立于2010，是一家集生产加工贸易为一体的实业公司。从事大型机械、模具钢材、汽车五金模具为主的加工制造企业。公司拥有近20套大型设备，提供6米以内的龙门电脑锣、龙门磨床、精铣边铣、平面铣、包包装材料全套加工服务。
                    在机械板、大型铸件、焊接件、汽车五金模具、表面处理、精密零件等方面有丰富的加工经验。 ... </div>
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
          <div class="line fh5co-heading text-center">
            <h2>新闻中心</h2>
            <p class="desc">实时新闻，实时关注，最新进展</p>
          </div>
          <div class="line show-list">
            <div class="tab" data-toggle="hover">
              <div class="tab-body">
                <div class="tab-panel active" id="tab-art1">
                  <div class="line-big">
                    <div class="xl12 xs6 xm6 margin-large-bottom">
                      <div class="media l-item">
                        <div class="media_img"><a href="a/gongsixinwen/18.html" class="zoomimgs artzoomimgs"
                            >
                            <img src="https://react.keep-wan.me/uploads/allimg/180125/1-1P1252131400-L.jpg" />
                            </a></div>
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
                              <p class="desc">雅克是一个大学aschenbroich
                                CEO和董事会（Valeo法雷奥。他是在办公室，在法国政府和当选总统技术顾问什么是希拉克在1987年。2009年以来，他已是首席执行官... </p>
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
                              <p class="desc">阿斯派德是圣马可四系列流行的头，轻+中空+表面设计可以满足大部分的骑行爱好者的自行车座垫的要求。阿斯派德不仅舒适，运动性能是一流的。碳FX，赛...
                              </p>
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
                              <p class="desc">2016赛季，SRAM主办的喀秋莎和AG2R两日游团队。两队使用ETAP无线电在环赛上轮变换。
                                在2016季的盘式制动器将允许专业体育场，在前面的文章中萧边也谈到了... </p>
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
                              <p class="desc">2017年9月14日，第七届亚洲自行车展将在南京国际博览中心隆重开幕。展出的不仅是琳琅满目的豪华车，还有水晶晶莹闪亮的配件哦！今天，让我们一起来看...
                              </p>
                              <p class="more"><a href="a/gongsixinwen/13.html"></a></p>
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
          <div class="line fh5co-heading text-center">
            <h2>合作伙伴</h2>
          </div>
          <div class="line show-list">
            <div class="owl-carousel partner-carousel-carousel">
              <div class="item"> <a class="zoomimgs frizoomimgs"
                  style="background-image:url(uploads/allimg/180125/1-1P1252303460-L.png)" title="网易163"></a></div>
              <div class="item"> <a class="zoomimgs frizoomimgs"
                  style="background-image:url(uploads/allimg/180125/1-1P1252305010-L.jpg)" title="谷歌"></a></div>
              <div class="item"> <a class="zoomimgs frizoomimgs"
                  style="background-image:url(uploads/allimg/180125/1-1P125230A10-L.jpg)" title="腾讯网"></a></div>
              <div class="item"> <a class="zoomimgs frizoomimgs"
                  style="background-image:url(uploads/allimg/180125/1-1P125230J70-L.jpg)" title="阿里巴巴"></a></div>
              <div class="item"> <a class="zoomimgs frizoomimgs"
                  style="background-image:url(uploads/allimg/180125/1-1P125230Q60-L.jpg)" title="百度"></a></div>
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
            <div class="xl12 xs4 xm4 margin-large-bottom">
              <div class="plist">
                <h2>联系我们</h2>
                <div class="contact-foot">
                  <p>地址: 广东省广州市番禺经济开发区58号</p>
                  <p>电话: 020-66889777</p>
                  <p>传真: 020-66889888</p>
                  <p>邮箱: admin@admin.com</p>
                </div>
              </div>
            </div>
            <div class="xl12 xs4 xm4 margin-large-bottom">
              <div class="plist">
                <h2>关于我们</h2>
                <ul>
  
                  <li><a href="a/gongsigaikuang/index.html" title="公司概况">公司概况</a></li>
  
                  <li><a href="a/gongsigainian/index.html" title="公司概念">公司概念</a></li>
  
                  <li><a href="a/gongsiwangluo/index.html" title="公司网络">公司网络</a></li>
  
                </ul>
              </div>
            </div>
            <div class="xl12 xs4 xm4 margin-large-bottom">
              <div class="plist">
                <h2>新闻中心</h2>
                <ul>
  
                  <li><a href="a/gongsixinwen/index.html" title="公司新闻">公司新闻</a></li>
  
                  <li><a href="a/xingyexinwen/index.html" title="行业新闻">行业新闻</a></li>
  
                  <li><a href="a/jishuzhanshi/index.html" title="技术展示">技术展示</a></li>
  
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="layout  footer-bot">
        <div class="container">
          <div class="line-big">
            <div class="xl12 xs12 xm4">
              <div class="foot-flink">友情链接: <a href='javascript:void(9)' target='_blank'>网站模板</a> <a
                  href='javascript:void(9)' target='_blank'>keep模版</a> <a href='javascript:void(9)'
                  target='_blank'>keep模版</a> <a href='javascript:void(0)' target='_blank'>keep模板</a> <a
                  href='javascript:void(9)' target='_blank'>企业网站模板</a> </div>
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
  const onSubmit = () => {
    setVisable(true);
  };
  const onReset = () =>{
    
  };
  return(
    <div className="editor">
      {head('富文本编辑器')}
      <Editor id="editor" apiKey="f0ujtvkxmw64jnj6xstg4adv3vgxh73c5wbsgusq7si3pi1n" init={{
        'plugins': 'print preview fullpage  searchreplace autolink directionality  visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount  imagetools textpattern help', 
        'min_height': 1200,
        'insert_button_items': 'insertfile',
        'language': 'zh_CN',
        'language_url': 'assets/langs/zh_CN.js',
        'importcss_append': true,
        'toolbar': 'formatselect | bold | file italic strikethrough forecolor backcolor  | link image media  | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent | removeformat | addcomment',
        'image_advtab': true,
        // 'images_upload_handler': (blobInfo,success,failure)=>{
        //   console.log(blobInfo);
          
        // }
      }} outputFormat= "html"  value={editorValue} onEditorChange= {handleEditor} tagName="t_editor"/>
      <Modal width="100%" visible={visable} title="测试编辑html" onOk={() => {setVisable(false)}} onCancel={()=>{setVisable(false)}}>
        <div dangerouslySetInnerHTML={{__html:editorValue}} style={{width:'968',height:'100%'}} />
      </Modal>
      <div className="editor-btn">
        <Button type="primary" htmlType="button" onClick={onSubmit}>提交修改内容</Button>
        <Button type="primary" htmlType="button" danger onClick={onReset}>重置内容</Button>
      </div>
      
    </div>
  );
};
TinyEditor.propTypes = {

};
export default TinyEditor;