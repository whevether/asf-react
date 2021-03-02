import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
// import PropTypes from 'prop-types';
/* eslint-disable react/no-multi-comp */
const Home = () => {
    const index1 = useRef(null);
    useEffect(() => {
    }, []);
    //  这是一个使用redux 封装axios中间件请求示例
    const head = () => {
        return (
            <Helmet>
                <title>主页</title>
                <meta property="og:title" content="主页" />
            </Helmet>
        );
    };
    return (
        <div className="dash">
            {head()}
            <div ref={index1} className="index1"></div>
        </div>
    );
};
Home.propTypes = {
};
export default Home;