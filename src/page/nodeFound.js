import React from 'react';
import {head} from 'utils/head';
// import PropTypes from 'prop-types';
const NotFoundPage = () => {
  // staticContext.notFound = true;
  return (<div className="notfound">
    {head('404')}
    <img src="../../assets/404.svg"/>
  </div>);
};
// NotFoundPage.propTypes = {
//   staticContext: PropTypes.object
// };
export default NotFoundPage;