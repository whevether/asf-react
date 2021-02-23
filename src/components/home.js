import React from 'react';
import { Helmet } from 'react-helmet';
// import PropTypes from 'prop-types';

import { DatePicker } from 'antd';
/* eslint-disable react/no-multi-comp */ 
const Home = () =>{
    //  这是一个使用redux 封装axios中间件请求示例
    const head = () => {
        return (
            <Helmet>
              <title>主页</title>
              <meta property="og:title" content="主页" />
            </Helmet>
        );
    };
    return(
        <>
            {head()}
            <DatePicker onChange={(date, dateString)=> {console.log(date, dateString);}} />
        </>
    );
};
Home.propTypes = {
};
export default Home;