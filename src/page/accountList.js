import React from 'react';
import {head} from 'utils/head';
import PropTypes from 'prop-types';
const AccountList = (props) => {
  return(
    <div className="tabble-list">
      {head('账户列表')}
    </div>
  );
};
AccountList.propTypes = {

};
export default AccountList;