import React from 'react';
import { Helmet } from 'react-helmet';
// import PropTypes from 'prop-types';
/* eslint-disable react/no-multi-comp */
const Dash = () => {
    //  这是一个使用redux 封装axios中间件请求示例
    const head = () => {
        return (
            <Helmet>
                <title>控制台</title>
                <meta property="og:title" content="控制台" />
            </Helmet>
        );
    };
    return (
        <div className="dash">
            {head()}
        </div>
    );
};
Dash.propTypes = {
};
export default Dash;