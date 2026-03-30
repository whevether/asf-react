import { useSearchParams } from "react-router-dom";
import { head } from 'utils/head';
import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import * as commonAction from 'store/actions/common';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
/* eslint-disable react/no-danger */
const  HtmlRender = (props)=>{
  let [searchParams] = useSearchParams();
	const [data,setData] = useState({});
	useEffect(()=>{
		props.getAbout({type:searchParams.get('type'),countryCode: searchParams.get('countryCode')})
			.then(res=>{
				setData(res);
			});
	},[]);
  return (
		<>
		{head(`${data?.title}`)}
		<div dangerouslySetInnerHTML={{__html:data?.content}} style={{background: '#fff',padding: '20px',zIndex: 999,width: '100%',boxSizing: 'border-box',position:'relative',wordBreak: 'break-all',boxDecorationBreak: 'slice'}}/>
		</>
  );
};
HtmlRender.propTypes = {
	getAbout: PropTypes.func,
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(commonAction,dispatch);
};
export default connect(null,mapDispatchToProps)(HtmlRender);