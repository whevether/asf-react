import React from 'react';
import {head} from 'utils/head';
const Error401 = ()=>{
  return (
    <div>
      {head('401')}
      401没有权限
    </div>
  );
};
export default Error401;