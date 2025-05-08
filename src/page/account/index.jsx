import React, { useEffect, useState } from 'react';
import { head } from 'utils/head';
import { timeToDate } from 'utils/storage';
import { accountSearchFrom, accountFrom, assignFrom, passwordFrom, emailFrom, telphoneFrom } from 'utils/json';
import PropTypes from 'prop-types';
import * as accountAction from 'store/actions/account';
import * as commonAction from 'store/actions/common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Drawer, notification, Switch, Modal, Upload, Image, Tooltip } from 'antd';
import { ExclamationCircleOutlined, InboxOutlined, PlusCircleOutlined,DeleteOutlined } from '@ant-design/icons';
import { BaseFrom, BaseTable, AuthControl } from 'components/index';
import { useNavigate } from 'react-router-dom';
const Index = (props) => {
  const [showDarw, setShowDarw] = useState(false);
  const [fromData, setFromData] = useState(null);
  const [drawType, setDrawType] = useState(0); //0 添加账户 1修改账户, 2分配账户角色 3: 分配账户部门， 4分配账户岗位，  5 修改账户密码， 6 修改账户手机，7  修改账户邮箱,8 修改账户头像
  const [initFromValue, setInitFromValue] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [account, setAccount] = useState(null);
  let navigate = useNavigate();
  //获取账户列表
  useEffect(() => {
    props?.accountFunc?.fetchAccountList();
  }, []);
  // 分页对象
  const pagination = {
    total: props?.account?.listTotal,
    onChange: (p, size) => {
      setPage(p);
      setPageSize(size);
      props?.accountFunc?.fetchAccountList({ pageNo: p, pageSize: size });
    },
    current: page,
    pageSize: pageSize,
    pageSizeOptions: ['10', '20', '50', '100'],
    showTotal: (total) => `总条目: ${total} 条`,
    showSizeChanger: true
  };
  // 打开抽屉
  const onOpenDarw = (type) => {
    if (type === 0 || type === 1) {
      Promise.all([props?.commonFunc?.getDepartmentList(), props?.commonFunc?.getPostList()])
        .then(res => {
          let from = accountFrom.filter(f => {
            if (f.name === 'departmentId') {
              f.selOption = res[0];
            }
            if (f.name === 'postId') {
              f.selOption = res[1];
            }
            return f;
          });
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
          setDrawType(type);
          setFromData(from);
          setShowDarw(true);
        });
    } else if (type === 2) {
      props?.commonFunc?.getRoleList()
        .then(res => {
          let from = assignFrom('分配角色', '角色', res);
          setDrawType(type);
          setFromData(from);
          setShowDarw(true);
        });
    } else if (type === 3) {
      props?.commonFunc?.getDepartmentList()
        .then(res => {
          let from = assignFrom('分配部门', '部门', res, 'departmentId', 'cascader', '');
          setDrawType(type);
          setFromData(from);
          setShowDarw(true);
        });
    } else if (type === 4) {
      props?.commonFunc?.getPostList()
        .then(res => {
          let from = assignFrom('分配岗位', '岗位', res);
          setDrawType(type);
          setFromData(from);
          setShowDarw(true);
        });
    } else if (type === 5) {
      setDrawType(type);
      setFromData(passwordFrom());
      setShowDarw(true);
    } else if (type === 6) {
      setDrawType(type);
      setFromData(telphoneFrom());
      setShowDarw(true);
    } else if (type === 7) {
      setDrawType(type);
      setFromData(emailFrom());
      setShowDarw(true);
    }
  };
  //提交表单
  const onFinish = (data) => {
    if (drawType === 0) {
      data.departmentId = data.departmentId.slice(-1)[0];
      props?.accountFunc?.createAccount(data)
        .then(() => {
          notification['success']({
            message: '添加成功',
            description: '添加账户成功'
          });
          setShowDarw(false);
          props?.accountFunc?.fetchAccountList({ pageSize: pageSize });
        });
    } else if (drawType === 1) {
      data.departmentId = data.departmentId.slice(-1)[0];
      data.id = initFromValue.id;
      props?.accountFunc?.modifyAccount(data)
        .then(() => {
          notification['success']({
            message: '修改成功',
            description: '修改账户成功'
          });
          setShowDarw(false);
          props?.accountFunc?.fetchAccountList({ pageSize: pageSize });
        });
    } else if (drawType == 2) {
      data.id = initFromValue.id;
      props?.accountFunc?.assignAccountRole(data)
        .then(() => {
          notification['success']({
            message: '分配角色',
            description: '分配角色成功'
          });
          setShowDarw(false);
          props?.accountFunc?.fetchAccountList({ pageSize: pageSize });
        });
    } else if (drawType == 3) {
      data.id = initFromValue.id;
      data.departmentId = data.departmentId.slice(-1)[0];
      props?.accountFunc?.assignAccountDepartment(data)
        .then(() => {
          notification['success']({
            message: '分配部门',
            description: '分配部门成功'
          });
          setShowDarw(false);
          props?.accountFunc?.fetchAccountList({ pageSize: pageSize });
        });
    } else if (drawType == 4) {
      data.id = initFromValue.id;
      props?.accountFunc?.assignAccountPost(data)
        .then(() => {
          notification['success']({
            message: '分配岗位',
            description: '分配岗位成功'
          });
          setShowDarw(false);
          props?.accountFunc?.fetchAccountList({ pageSize: pageSize });
        });
    } else if (drawType == 5) {
      data.id = initFromValue.id;
      props?.accountFunc?.resetAccountPassword(data)
        .then(() => {
          notification['success']({
            message: '修改密码',
            description: '修改密码成功'
          });
          setShowDarw(false);
          props?.accountFunc?.fetchAccountList({ pageSize: pageSize });
        });
    } else if (drawType == 6) {
      data.id = initFromValue.id;
      props?.accountFunc?.modifyAccountTelPhone(data)
        .then(() => {
          notification['success']({
            message: '修改手机',
            description: '修改手机成功'
          });
          setShowDarw(false);
          props?.accountFunc?.fetchAccountList({ pageSize: pageSize });
        });
    } else if (drawType == 7) {
      data.id = initFromValue.id;
      props?.accountFunc?.modifyAccountEmail(data)
        .then(() => {
          notification['success']({
            message: '修改邮箱',
            description: '修改邮箱成功'
          });
          setShowDarw(false);
          props?.accountFunc?.fetchAccountList({ pageSize: pageSize });
        });
    }
  };
  // 提交表格查询
  const querySubmit = (e) => {
    props?.accountFunc?.fetchAccountList(e);
  };
  // 修改
  const list = [{
    name: '账户详情',
    permission: 'account.details',
    click: (data) => {
      navigate(`/control/account/details?id=${data?.id}`);
    }
  }, {
    name: '修改账户',
    permission: 'account.modify',
    click: (data) => {
      setInitFromValue({
        'id': data?.id,
        'tenancyId': data?.tenancyId,
        'status': data?.status,
        'postId': data?.posts.map(m => m.id),
        'departmentId': [data?.department?.pid, data?.department?.id],
        'username': data?.username,
        'password': data?.password,
        'telphone': data?.telPhone.replace('86+', ''),
        'email': data?.email,
        'name': data?.name,
        'sex': data?.sex
      });
      onOpenDarw(1);
    }
  }, {
    name: '分配账户角色',
    permission: 'account.assignrole',
    click: (data) => {
      setInitFromValue({
        'id': data?.id,
        'ids': data?.roles?.map(s => s.id)
      });
      onOpenDarw(2);
    }
  }, {
    name: '分配账户部门',
    permission: 'account.assigndepartment',
    click: (data) => {
      setInitFromValue({
        'id': data?.id,
        'departmentId': [data?.department?.pid, data?.department?.id],
      });
      onOpenDarw(3);
    }
  }, {
    name: '分配账户岗位',
    permission: 'account.assignpost',
    click: (data) => {
      setInitFromValue({
        'id': data?.id,
        'ids': data?.posts?.map(s => s.id),
      });
      onOpenDarw(4);
    }
  }, {
    name: '删除账户',
    permission: 'account.delete.[0-9]{1,100}',
    click: (data) => {
      Modal.confirm({
        title: '确人是否删除用户!!!',
        icon: <ExclamationCircleOutlined />,
        content: '删除用户之后用用户的所有数据都会删除',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          props?.accountFunc.deleteAccount(data?.id)
            .then(() => {
              notification['success']({
                message: '删除成功',
                description: '删除用户成功'
              });
              props?.accountFunc?.fetchAccountList({ pageSize: pageSize });
            });
        }
      });
    }
  }, {
    name: '修改账户密码',
    permission: 'account.resetpassword',
    click: (data) => {
      setInitFromValue({
        'id': data?.id
      });
      onOpenDarw(5);
    }
  }, {
    name: '修改账户手机',
    permission: 'account.modifytelphone',
    click: (data) => {
      setInitFromValue({
        'id': data?.id,
        'telphone': data?.telPhone.replace('86+', '')
      });
      onOpenDarw(6);
    }
  }, {
    name: '修改账户邮箱',
    permission: 'account.modifyemail',
    click: (data) => {
      setInitFromValue({
        'id': data?.id,
        'email': data?.email
      });
      onOpenDarw(7);
    }
  }, {
    name: '修改账户头像',
    permission: 'account.modifyavatar',
    click: (data) => {
      setAccount(data);
    }
  }];
  const columns = [{
    title: '账户ID',
    dataIndex: 'id',
    key: 'id',
    fixed: 'left',
    width: 100
  }, {
    title: '所属租户',
    dataIndex: 'tenancyId',
    width: 100,
    key: 'tenancyId',
    render: (text) => {
      let data = props?.tenancyList.find(f => f.id == text);
      return <span>{data?.name}</span>;
    }
  }, {
    title: '账户头像',
    dataIndex: 'avatar',
    key: 'avatar',
    width: 150,
     
    render: (text) => {
      return <img name="avatar" src={decodeURIComponent(text)} style={{ width: '50px', height: '50px', borderRadius: '50%', lineHeight: '50px' }} crossOrigin={text} />;
    }
  }, {
    title: '账户昵称',
    dataIndex: 'name',
    width: 100,
    key: 'name'
  }, {
    title: '账户名',
    dataIndex: 'username',
    width: 100,
    key: 'username'
  }, {
    title: '手机号码',
    dataIndex: 'telPhone',
    width: 100,
    key: 'telPhone'
  }, {
    title: '邮箱',
    dataIndex: 'email',
    width: 100,
    key: 'email'
  }, {
    title: '性别',
    dataIndex: 'sex',
    width: 60,
    key: 'sex',
    render: (text) => {
      let sexMap = {
        0: '未知',
        1: '男',
        2: '女'
      };
      return sexMap[text];
    }
  }, {
    title: '状态',
    dataIndex: 'status',
    width: 80,
    key: 'status',
     
    render: (text, record) => {
      let statusMap = {
        0: '禁用',
        1: '启用'
      };
      return props?.userInfo.actions.includes('account.modifystatus') ? <Switch checked={Boolean(text)} checkedChildren="启用"
        unCheckedChildren="禁用" onChange={(e) => {
          props?.accountFunc?.modifyAccountStatus({ id: record?.id, status: Number(e) }).then(() => {
            notification['success']({
              message: '修改成功',
              description: '修改账户状态成功'
            });
            props?.accountFunc?.fetchAccountList({ pageSize: pageSize });
          });
        }} /> : statusMap[text];
    }
  }, {
    title: '登录ip',
    width: 100,
    dataIndex: 'loginIp',
    key: 'loginIp'
  }, {
    title: '登录地址',
    dataIndex: 'loginLocation',
    width: 100,
    key: 'loginLocation'
  }, {
    title: '所属部门',
    dataIndex: 'department',
    width: 100,
    key: 'department',
     
    render: (text) => {
      return <span>{text?.name}</span>;
    }
  }, {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 100,
    key: 'createTime',
    render: (text) => {
      return timeToDate(text, 'YYYY-MM-DD  HH:mm:ss');
    }
  }, {
    title: '操作',
    width: 150,
    key: 'action',
    fixed: 'right',
     
    render: (record) => {
      return (<AuthControl userInfo={props?.userInfo} list={list} record={record} type="menu" />);
    }
  }];
  const mapDrawTitle = {
    0: '添加账户',
    1: '修改账户',
    2: '分配账户角色',
    3: '分配账户部门',
    4: '分配账户岗位',
    5: '修改账户密码',
    6: '修改账户手机',
    7: '修改账户邮箱',
    8: '修改账户头像'
  };
  return (
    <div className="list">
      {head('账户列表')}
      <BaseTable formObj={accountSearchFrom} querySubmit={querySubmit} dataSource={props?.account?.list} columns={columns} pagination={pagination} userInfo={props?.userInfo} list={[{ name: '添加账户', permission: 'account.create', type: 'primary', icon: <PlusCircleOutlined />, click: () => { setInitFromValue(null); onOpenDarw(0); } }]} />
      <Drawer
        title={mapDrawTitle[drawType]}
        width={720}
        open={showDarw}
        onClose={() => setShowDarw(false)}
      >
        <BaseFrom list={fromData} onFinish={onFinish} initialValues={initFromValue} onClose={() => setShowDarw(false)} />
      </Drawer>
      <Modal title="修改头像" open={account} closable={true} onCancel={() => setAccount(null)} onOk={() => setAccount(null)}>
        {
          account?.avatar && <div className="remove-avatar"><Tooltip title="删除"><DeleteOutlined size={22} onClick={() => setAccount({...account,avatar: null})}/></Tooltip><Image width="100%" height="100%" src={account?.avatar}/></div>
        }
        {
          !account?.avatar && <Upload.Dragger name="files" customRequest={(obj) => {
            let formData = new FormData();
            formData.append('file', obj.file);
            formData.append('type', 'avatar');
            props?.commonFunc?.upload(formData)
              .then(res => {
                if (res?.length <= 0) {
                  notification.error({ message: '上传头像为空，请确认' });
                  return;
                }
                props?.accountFunc.modifyAccountAvatar({ id: account?.id, avatar: res[0]?.url })
                  .then(() => {
                    props?.accountFunc?.fetchAccountList({ pageSize: pageSize });
                    setAccount(null);
                  });
              });
          }} beforeUpload={(file) => {
            const isImg = file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/svg+xml';
            if (!isImg) {
              notification.error({ message: '只能上传图片格式' });
            }
            return isImg;
          }} accept="image/*">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">单击或拖动文件到此区域进行上载</p>
          </Upload.Dragger>
        }
      </Modal>
    </div>
  );
};
Index.propTypes = {
  accountFunc: PropTypes.object,
  commonFunc: PropTypes.object,
  account: PropTypes.object,
  tenancyList: PropTypes.arrayOf(Object),
  userInfo: PropTypes.object
};
export default connect(state => ({
  account: state?.account,
  userInfo: state?.common?.data,
  tenancyList: state?.common?.tenancyList
}), dispatch => {
  return {
    accountFunc: bindActionCreators(accountAction, dispatch),
    commonFunc: bindActionCreators(commonAction, dispatch)
  };
})(Index);