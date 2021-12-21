export const accountSearchFrom = [{
  title: '账户名',
  fromType: 'input',
  inputType: 'text',
  name: 'username',
  placeholder: '请输入账户名',
  rules: [{ type: 'string', min: 2, max: 50, message: '最少输入2个字符的账户名或最多输入50个字符的账户名' }]
}, {
  title: '手机号码',
  fromType: 'input',
  inputType: 'text',
  placeholder: '请输入手机号码',
  name: 'telphone',
  rules: [{ type: 'string', pattern: /^1[0-9]{10}$/, message: '输入的手机号码不正确' }]
}, {
  title: '邮箱地址',
  fromType: 'input',
  inputType: 'text',
  placeholder: '请输入邮箱地址',
  name: 'email',
  // eslint-disable-next-line  no-useless-escape
  rules: [{ type: 'string', pattern: /^[-\w\+]+(?:\.[-\w]+)*@[-a-z0-9]+(?:\.[a-z0-9]+)*(?:\.[a-z]{2,})$/, message: '输入的邮箱地址不正确不正确' }]
}];
export const accountFrom = [{
  title: '部门',
  fromType: 'cascader',
  name: 'departmentId',
  placeholder: '请选择部门',
  rules: [{ required: true, message: '部门不能为空' }],
  options: {
    allowClear: true//是否显示清除框
  }
}, {
  title: '账户名',
  fromType: 'input',
  inputType: 'text',
  name: 'username',
  placeholder: '请输入账户名',
  rules: [{ required: true, message: '账户名不能为空' }, { type: 'string', min: 2, max: 50, message: '最少输入2个字符的账户名或最多输入50个字符的账户名' }],
  options: { //扩展配置
    allowClear: true//是否显示清除框
    // disabled: false
  }
}, {
  title: '密码',
  fromType: 'input',
  inputType: 'password',
  name: 'password',
  placeholder: '请输入账户密码',
  rules: [{ required: true, message: '账户密码不能为空' }, { type: 'string', min: 2, max: 50, message: '最少输入2个字符的账户密码或最多输入50个字符的账户密码' }],
  options: { //扩展配置
    allowClear: true//是否显示清除框
    // disabled: false
  }
}, {
  title: '手机号码',
  fromType: 'input',
  inputType: 'text',
  name: 'telphone',
  placeholder: '请输入手机号码',
  rules: [{ type: 'string', pattern: /^1[0-9]{10}$/, message: '输入的手机号码不正确' }],
  options: { //扩展配置
    allowClear: true//是否显示清除框
    // disabled: false
  }
}, {
  title: '邮箱地址',
  fromType: 'input',
  inputType: 'text',
  name: 'email',
  placeholder: '请输入邮箱地址',
  // eslint-disable-next-line  no-useless-escape
  rules: [{ type: 'string', pattern: /^[-\w\+]+(?:\.[-\w]+)*@[-a-z0-9]+(?:\.[a-z0-9]+)*(?:\.[a-z]{2,})$/, message: '输入的邮箱地址不正确不正确' }],
  options: { //扩展配置
    allowClear: true//是否显示清除框
    // disabled: false
  }
}, {
  title: '昵称',
  fromType: 'input',
  inputType: 'text',
  name: 'name',
  placeholder: '请输入昵称',
  rules: [{ type: 'string', min: 2, max: 50, message: '最少输入2个字符的昵称或最多输入50个字符的昵称' }],
  options: { //扩展配置
    allowClear: true//是否显示清除框
    // disabled: false
  }
}, {
  title: '性别',
  fromType: 'select',
  name: 'sex',
  placeholder: '请选择性别',
  selOption: [{
    name: '未知',
    id: 0
  }, {
    name: '男',
    id: 1
  }, {
    name: '女',
    id: 2
  }],
  rules: [{ required: true, message: '性别不能为空' }],
  options: {
    allowClear: true//是否显示清除框
  }
}];

export const permissionSearchFrom = [{
  title: '权限名',
  fromType: 'input',
  inputType: 'text',
  name: 'name',
  placeholder: '请输入权限名',
  rules: [{ type: 'string', min: 2, max: 50, message: '最少输入2个字符的权限名或最多输入50个字符的权限名' }]
}];
//日志管理
export const audioSearchFrom = [{
  title: '账户名',
  fromType: 'input',
  inputType: 'text',
  name: 'account_name',
  placeholder: '请输入账户名',
  rules: [{ type: 'string', min: 2, max: 50, message: '最少输入2个字符的账户名或最多输入50个字符的账户名' }]
}, {
  title: '日志类型',
  fromType: 'select',
  name: 'logType',
  placeholder: '请选择日志类型',
  selOption: [{
    name: '登录日志',
    id: 1
  }, {
    name: '操作日志',
    id: 2
  }, {
    name: '错误日志',
    id: 3
  }],
  rules: [{ required: true, message: '日志类型不能为空' }],
  options: {
    allowClear: true//是否显示清除框
  }
}];
export const editorSearchFrom = [{
  title: '页面名',
  fromType: 'input',
  inputType: 'text',
  name: 'name',
  placeholder: '请输入页面名',
  rules: [{ type: 'string', min: 2, max: 50, message: '最少输入2个字符的页面名或最多输入50个字符的页面名' }]
},{
  title: '页面类型',
  fromType: 'select',
  name: 'type',
  placeholder: '请选择页面类型',
  optionLabel: 'label',
  selOption: [{id:0,name:'手机页面'},{id:1,name:'网站页面'}],
  options: {
    allowClear: true//是否显示清除框
  }
},];

// 中心端账户
export const centerAccountSearchFrom = [{
  title: '账户名',
  fromType: 'input',
  inputType: 'text',
  name: 'name',
  placeholder: '请输入账户名',
  rules: [{ type: 'string', min: 2, max: 50, message: '最少输入2个字符的账户名或最多输入50个字符的账户名' }]
}];

export const centerShopSearchFrom = [{
  title: '商户名',
  fromType: 'input',
  inputType: 'text',
  name: 'name',
  placeholder: '请输入商户名',
  rules: [{ type: 'string', min: 2, max: 50, message: '最少输入2个字符的商户名或最多输入50个字符的商户名' }]
}];
export const centerProgramSearchFrom = [{
  title: '应用名',
  fromType: 'input',
  inputType: 'text',
  name: 'name',
  placeholder: '请输入应用名',
  rules: [{ type: 'string', min: 2, max: 50, message: '最少输入2个字符的应用名或最多输入50个字符的应用名' }]
}];

//添加轮播图
export const imagesFrom = [{
  title: '页面名称',
  fromType: 'input',
  inputType: 'text',
  name: 'name',
  placeholder: '请输入页面名称',
  rules: [{ required: true, message: '页面名称不能为空' },{ type: 'string', min: 2, max: 1000, message: '最少输入2个字符的页面名称' }]
},{
  title: '页面路径',
  fromType: 'input',
  inputType: 'text',
  name: 'path',
  placeholder: '请输入页面路径,例如:/var/www/html/441/a/gongsixinwen/index.html',
  rules: [{ required: true, message: '页面路径不能为空' },{ type: 'string', min: 2, max: 1000, message: '最少输入2个字符的页面路径' }]
},{
  title: 'seo元数据',
  fromType: 'input',
  inputType: 'text',
  name: 'meta',
  placeholder: 'html格式可以输入多个。空格隔开,格式类似: <meta name="keywords" content="">',
  rules: [{ type: 'string', min: 2, max: 1000, message: '最少输入2个字符的seo元数据或最多输入1000个字符的seo元数据' }]
}, {
  title: '首页轮播图',
  fromType: 'input',
  inputType: 'text',
  name: 'indexBanner',
  placeholder: '以英文逗号分割开首页轮播图片',
  rules: [{ type: 'string', min: 2, max: 1000, message: '最少输入2个字符的首页轮播图或最多输入1000个字符的首页轮播图地址' }]
}, {
  title: '资质证书',
  fromType: 'input',
  inputType: 'text',
  name: 'deviceBanner',
  placeholder: '以英文逗号分割开资质证书图片',
  rules: [{ type: 'string', min: 2, max: 1000, message: '最少输入2个字符的资质证书地址或最多输入1000个字符的资质证书地址' }]
}, {
  title: '合作伙伴',
  fromType: 'input',
  inputType: 'text',
  name: 'hezuo',
  placeholder: '以英文逗号分割开合作伙伴图片',
  rules: [{ type: 'string', min: 2, max: 1000, message: '最少输入2个字符的合作伙伴图片或最多输入1000个字符的合作伙伴图地址' }]
}];
//股票收益
export const fundamentalsFrom = [{
  title: '数据表',
  fromType: 'select',
  name: 'table',
  placeholder: '请选择数据表',
  selOption: [{
    name: '资产负债',
    id: 'balance'
  }, {
    name: '利润',
    id: 'income'
  }, {
    name: '现金流',
    id: 'cash_flow'
  }, {
    name: '市值数据',
    id: 'valuation'
  }, {
    name: '上市公司股本变动',
    id: 'finance.STK_XR_XD'
  },{
    name: '合并利润表',
    id: 'finance.STK_INCOME_STATEMENT'
  },{
    name: '合并现金流表',
    id: 'finance.STK_CASHFLOW_STATEMENT'
  },{
    name: '合并资产负债表',
    id: 'finance.STK_BALANCE_SHEET'
  },{
    name: '上市公司基本信息',
    id: 'finance.STK_COMPANY_INFO'
  },{
    name: '上市公司状态变动',
    id: 'finance.STK_STATUS_CHANGE'
  },{
    name: '股票上市信息',
    id: 'finance.STK_LIST'
  },{
    name: '获取所有股票信息',
    id: 'all_securities'
  },{
    name: '获取融资融券信息',
    id: 'getMtss'
  },{
    name: '沪深市场每日成交概况',
    id: 'finance.STK_EXCHANGE_TRADE_INFO'
  }],
  rules: [{ required: true, message: '数据表不能为空' }],
  options: {
    allowClear: true//是否显示清除框
  }
}, {
  title: '查询时间',
  fromType: 'input',
  inputType: 'text',
  name: 'date',
  placeholder: '查询日期2019-03-04或者年度2018或者季度2018q1 2018q2 2018q3 2018q4',
  rules: [{required: true, message: '查询日期不能为空' }]
}];
