import React, { useEffect, useState } from 'react';
import { head } from 'utils/head';
import { timeToDate } from 'utils/storage';
import { inputFrom, departmentFrom, assignFrom } from 'utils/json';
import PropTypes from 'prop-types';
import * as departmentAction from 'store/actions/department';
import * as commonAction from 'store/actions/common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dropdown, Drawer, Switch, notification, Modal } from 'antd';
import { DownOutlined, ExclamationCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { BaseFrom, BaseTable, AuthControl } from 'components/index';
import { useNavigate } from 'react-router-dom';
const Index = (props) => {
  const [showDarw, setShowDarw] = useState(false);
  const [fromData, setFromData] = useState(null);
  const [drawType, setDrawType] = useState(0); // 0 添加 部门: 修改部门
  const [initFromValue, setInitFromValue] = useState(null);
  const [page,setPage] = useState(1);
  const [pageSize,setPageSize] = useState(200);
  let navigate = useNavigate();
  //获取部门列表
  useEffect(() => {
    props?.departmentFunc?.fetchDepartmentList({pageSize: pageSize });
  }, []);
  // 分页对象
  const pagination = {
    total: props?.department?.listTotal,
    onChange: (p, size) => {
      setPage(p);
      setPageSize(size);
      props?.departmentFunc?.fetchDepartmentList({ pageNo: p, pageSize: size });
    },
    current: page,
    pageSize: pageSize,
    pageSizeOptions: ['200', '500', '1000'],
    showTotal: (total) => `总条目: ${total} 条`,
    showSizeChanger: true
  };
  // 打开抽屉
  const onOpenDarw = (type) => {
    if (type === 0) {
      props?.commonFunc?.getDepartmentList()
        .then(res => {
          setDrawType(type);
          if (!res.some(f => f.value === 0)) {
            res.unshift({ label: '顶级部门', value: '0', children: [] });
          }
          let from = departmentFrom(res);
          //判断是否为超级管理员。如果为则显示选择租户
          if (props?.userInfo?.roleName?.indexOf('superadmin') > -1 && props?.userInfo?.tenancyId === '1') {
            from.unshift({
              title: '租户',
              fromType: 'select',
              name: 'tenancyId',
              selOption: props?.tenancyList,
              placeholder: '请选择租户',
              rules: [{ required: true, message: '租户不能为空' }],
              options: {
                allowClear: true//是否显示清除框
              }
            });
          }
          setFromData(from);
          setShowDarw(true);
        });
    } else if (type === 1) {
      Promise.all([props?.commonFunc?.getRoleList(), props?.commonFunc?.getDepartmentList()])
        .then(res => {
          setDrawType(type);
          if (!res[1].some(f => f.value === 0)) {
            res[1].unshift({ label: '顶级部门', value: '0', children: [] });
          }
          let from = departmentFrom(res[1], res[0]);
          //判断是否为超级管理员。如果为则显示选择租户
          if (props?.userInfo?.roleName?.indexOf('superadmin') > -1 && props?.userInfo?.tenancyId === '1') {
            from.unshift({
              title: '租户',
              fromType: 'select',
              name: 'tenancyId',
              selOption: props?.tenancyList,
              placeholder: '请选择租户',
              rules: [{ required: true, message: '租户不能为空' }],
              options: {
                allowClear: true//是否显示清除框
              }
            });
          }
          setFromData(from);
          setShowDarw(true);
        });
    } else if (type === 2) {
      props?.commonFunc?.getRoleList()
        .then(res => {
          setDrawType(type);
          setFromData(assignFrom('分配角色', '角色', res));
          setShowDarw(true);
        });
    }
  };
  //提交表单
  const onFinish = (data) => {
    if (drawType === 0) {
      props?.departmentFunc?.createDepartment(data)
        .then(() => {
          notification['success']({
            message: '添加成功',
            description: '添加部门成功'
          });
          setShowDarw(false);
          setTimeout(() => {
            props?.departmentFunc?.fetchDepartmentList({pageSize: pageSize });
          }, 500);
        });
    } else if (drawType === 1) {
      data.id = initFromValue.id;
      props?.departmentFunc?.modifyDepartment(data)
        .then(() => {
          notification['success']({
            message: '修改成功',
            description: '修改部门成功'
          });
          setShowDarw(false);
          setTimeout(() => {
            props?.departmentFunc?.fetchDepartmentList({ pageSize: pageSize });
          }, 500);
        });
    } else if (drawType === 2) {
      data.id = initFromValue.id;
      props?.departmentFunc?.assignRole(data)
        .then(() => {
          notification['success']({
            message: '分配成功',
            description: '分配部门角色成功'
          });
          setShowDarw(false);
          setTimeout(() => {
            props?.departmentFunc?.fetchDepartmentList({ pageSize: pageSize });
          }, 500);
        });
    }
  };
  // 提交表格查询
  const querySubmit = (e) => {
    props?.departmentFunc?.fetchDepartmentList(e);
  };
  // 修改
  const list = [{
    name: '修改部门',
    permission: 'department.modify',
    isAction: true,
    click: (data) => {
      props?.departmentFunc?.detailsDepartment({ id: data?.id })
        .then(res => {
          setInitFromValue({
            'id': res?.id,
            'tenancyId': res?.tenancyId,
            'name': res?.name,
            'enable': res?.enable,
            'sort': res?.sort,
            'departmentId': res?.id,
            'roleIds': res?.roles?.map(m => m.id)
          });
          onOpenDarw(1);
        });
    }
  }, {
    name: '部门详情',
    permission: 'department.details',
    click: (data) => {
      navigate(`/control/department/details?id=${data?.id}`);
    }
  }, {
    name: '分配部门角色',
    permission: 'department.assign',
    click: (data) => {
      props?.departmentFunc?.detailsDepartment({ id: data?.id })
        .then(res => {
          setInitFromValue({
            'id': res?.id,
            'ids': res?.roles?.map(m => m.id)
          });
          onOpenDarw(2);
        });
    }
  }, {
    name: '删除部门',
    permission: 'department.delete.[0-9]{1,100}',
    click: (data) => {
      Modal.confirm({
        title: '确人删除部门!!!',
        icon: <ExclamationCircleOutlined />,
        content: '删除部门之后将无法恢复,会影响其他用户，请谨慎操作!!!',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          props?.departmentFunc.deleteDepartment(data?.id)
            .then(() => {
              notification['success']({
                message: '删除成功',
                description: '删除部门成功'
              });
              setTimeout(() => {
                props?.departmentFunc?.fetchDepartmentList({ pageSize: pageSize });
              }, 500);
            });
        }
      });
    }
  }];
  const menu = (record) => {
    return (
      <AuthControl userInfo={props?.userInfo} list={list} record={record} type="menu" />
    );
  };
  const columns = [{
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    fixed: 'left',
    width: 100
  }, {
    title: '部门名称',
    dataIndex: 'name',
    width: 100,
    key: 'name'
  },{
    title: '所属租户',
    dataIndex: 'tenancyId',
    width: 100,
    key: 'tenancyId',
    render: (text)=>{
      let data = props?.tenancyList.find(f=>f.id == text);
      return <span>{data?.name}</span>;
    }
  }, {
    title: '部门状态',
    dataIndex: 'enable',
    width: 80,
    key: 'enable',
    render: (text, record) => {
      const mapStatus = {
        0: '禁用',
        1: '启用'
      };
      return props?.userInfo.actions.includes('department.modifystatus') ? <Switch checked={Boolean(text)} checkedChildren="启用"
        unCheckedChildren="禁用" onChange={(e) => {
          props?.departmentFunc?.modifyStatus({ id: record?.id, status: Number(e) }).then(() => {
            notification['success']({
              message: '修改成功',
              description: '修改部门状态成功'
            });
            props?.departmentFunc?.fetchDepartmentList({pageSize: pageSize});
          });
        }} /> : mapStatus[text];
    }
  },{
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 100,
    render: (text) => {
      return timeToDate(text, 'YYYY-MM-DD  HH:mm:ss');
    }
  }, {
    title: '操作',
    key: 'action',
    width: 150,
    fixed: 'right',
    // eslint-disable-next-line
    render: (text) => {
      return (<Dropdown overlay={menu(text)} name="action">
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          操作 <DownOutlined />
        </a>
      </Dropdown>);
    }
  }];
  const mapTitle = {
    0: '添加部门',
    1: '修改部门'
  };
  return (
    <div className="list">
      {head('部门列表')}
      <BaseTable formObj={inputFrom('部门名称', 'name')} querySubmit={querySubmit} dataSource={props?.department?.list} columns={columns} pagination={pagination} userInfo={props?.userInfo} list={[{ name: '添加部门', permission: 'department.create', type: 'primary', icon: <PlusCircleOutlined />, click: () => { setInitFromValue(null); onOpenDarw(0); } }]} />
      <Drawer
        title={mapTitle[drawType]}
        width={720}
        open={showDarw}
        onClose={() => setShowDarw(false)}
      >
        <BaseFrom list={fromData} onFinish={onFinish} initialValues={initFromValue} onClose={() => setShowDarw(false)} />
      </Drawer>
    </div>
  );
};
Index.propTypes = {
  departmentFunc: PropTypes.object,
  commonFunc: PropTypes.object,
  userInfo: PropTypes.object,
  department: PropTypes.object,
  tenancyList: PropTypes.arrayOf(Object),
  roleName: PropTypes.string,
  initialValues: PropTypes.object
};
export default connect(state => ({
  userInfo: state?.common?.data,
  department: state?.department,
  tenancyList: state?.common?.tenancyList
}), dispatch => {
  return {
    departmentFunc: bindActionCreators(departmentAction, dispatch),
    commonFunc: bindActionCreators(commonAction, dispatch)
  };
})(Index);