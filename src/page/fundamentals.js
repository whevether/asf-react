import React, { useEffect, useState } from 'react';
import { head } from 'utils/head';
import { fundamentalsFrom } from 'utils/json';
import PropTypes from 'prop-types';
import * as commonAction from 'store/actions/common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BaseTable } from 'components/index';
const Fundamentals = (props) => {
  const [from,setFrom]  = useState(null);
  // 提交表格查询
  const querySubmit = (e) => {
    props?.commonFunc?.getFundamentals(e,e.table.includes('finance') ? 1 : 0);
  };
  useEffect(()=>{
    props?.commonFunc?.getAllSecurities()
      .then(res=>{
        const filterData = res?.result?.list.map(item=>{
          item.name = item?.display_name;
          item.id = item?.code;
          return item;
        });
        fundamentalsFrom.push({
          title: '股票代码',
          fromType: 'select',
          name: 'code',
          selOption: filterData,
          placeholder: '请选股票代码',
          showSearch: true,
          rules: [{ required: true, message: '股票代码不能为空' }],
          options: {
            allowClear: true//是否显示清除框
          }
        });
        setFrom(fundamentalsFrom);
      });
  },[]);
  return (
    <div className="list">
      {head('股票收益列表')}
      {
        from && <BaseTable formObj={from} querySubmit={querySubmit} dataSource={props?.fundamentals?.list} columns={props?.fundamentals?.columns}  />
      }
    </div>
  );
};
Fundamentals.propTypes = {
  commonFunc: PropTypes.object,
  fundamentals: PropTypes.object,
};
export default connect(state => ({
  fundamentals: state?.common?.fundamentals
}), dispatch => {
  return{
    commonFunc:bindActionCreators(commonAction, dispatch)
  };
})(Fundamentals);