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
//中心端添加账户
export const centerCreateAccountFrom = () => {
  const selOption = [{
    id: true,
    name: '是'
  }, {
    id: false,
    name: '否'
  }];
  // 商户类型
  const shopType = [{
    id: 0,
    name: '空'
  }, {
    id: 1,
    name: 'JPOS'
  }, {
    id: 2,
    name: 'JWMS'
  }, {
    id: 4,
    name: 'JMart'
  }, {
    id: 8,
    name: 'JCRM'
  }, {
    id: 16,
    name: 'JOA'
  }, {
    id: 32,
    name: 'JMall'
  }, {
    id: 64,
    name: 'JMarket'
  }, {
    id: 128,
    name: 'JISV'
  }, {
    id: 256,
    name: 'JGroup'
  }, {
    id: 512,
    name: 'JPMS'
  }, {
    id: 1024,
    name: 'GPOS'
  }, {
    id: 2048,
    name: 'GAMS'
  }, {
    id: 4094,
    name: 'GEmporium'
  }, {
    id: 8192,
    name: 'EmporiumAgent'
  }, {
    id: 16384,
    name: 'GTMS'
  }];
  
  const arr = [{
    title: '账户名',
    fromType: 'input',
    inputType: 'text',
    name: 'name',
    placeholder: '请输入账户名',
    rules: [{ required: true, type: 'string', min: 2, max: 50, message: '最少输入2个字符的账户名或最多输入50个字符的账户名' }]
  }, {
    title: '商户类型',
    fromType: 'select',
    name: 'allowShopType',
    placeholder: '请选择商户类型',
    mode: 'multiple',
    optionLabel: 'label',
    selOption: shopType,
    rules: [{ required: true, message: '商户类型不能为空' }],
    options: {
      allowClear: true//是否显示清除框
    }
  }, {
    title: '账户抵扣金额',
    fromType: 'inputnumber',
    options: {
      min: 0.01,
      max: 100000,
      step: 0.01
    },
    name: 'balance',
    placeholder: '请输入账户抵扣金额',
    rules: [{ required: true, message: '账户抵扣金额不能为空' }]
  }, {
    title: '是否启用账户',
    fromType: 'select',
    name: 'isEnable',
    placeholder: '请选择是否启用账户',
    selOption: [{
      id: false,
      name: '禁用'
    }, {
      id: true,
      name: '启用'
    }],
    rules: [{ required: true, message: '是否启用商户不能为空' }],
    options: {
      allowClear: true//是否显示清除框
    }
  }, {
    title: '是否为平台账户',
    fromType: 'select',
    name: 'isPlatform',
    placeholder: '请选择平台类型',
    selOption: selOption,
    rules: [{ required: true, message: '是否为平台类型不能为空' }],
    options: {
      allowClear: true//是否显示清除框
    }
  }, {
    title: '是否为虚拟账户',
    fromType: 'select',
    name: 'isVisual',
    placeholder: '请选是否为虚拟账户类型',
    selOption: selOption,
    rules: [{ required: true, message: '是否为虚拟账户类型不能为空' }],
    options: {
      allowClear: true//是否显示清除框
    }
  }, {
    title: '是否允许提款',
    fromType: 'select',
    name: 'allowCashOut',
    placeholder: '请选是否为允许提款',
    selOption: selOption,
    rules: [{ required: true, message: '是否允许提款不能为空' }],
    options: {
      allowClear: true//是否显示清除框
    }
  }, {
    title: '是否允许收款',
    fromType: 'select',
    name: 'allowCashIn',
    placeholder: '请选是否允许收款',
    selOption: selOption,
    rules: [{ required: true, message: '是否允许收款不能为空' }],
    options: {
      allowClear: true//是否显示清除框
    }
  }, {
    title: '是否允许自动提款',
    fromType: 'select',
    name: 'autoCashOut',
    placeholder: '请选择是否允许自动提款',
    selOption: selOption,
    rules: [{ required: true, message: '是否允许自动提款不能为空' }],
    options: {
      allowClear: true//是否显示清除框
    }
  }, {
    title: '是否启用支付类型',
    fromType: 'select',
    name: 'payTypeEnable',
    placeholder: '请选择是否启用支付类型',
    selOption: [{
      id: 0,
      name: '禁用'
    }, {
      id: 1,
      name: '启用'
    }],
    rules: [{ required: true, message: '是否启用支付类型' }],
    options: {
      allowClear: true//是否显示清除框
    }
  }, {
    title: '提款手续费',
    fromType: 'inputnumber',
    name: 'cashOutRate',
    placeholder: '请输入提款手续费',
    options: {
      min: 0.01,
      max: 100000,
      step: 0.01
    },
    rules: [{ required: true, message: '提款手续费不能为空' }],
  }, {
    title: '默认手续费',
    fromType: 'inputnumber',
    name: 'defaultRate',
    placeholder: '请输入默认手续费',
    options: {
      min: 0.01,
      max: 100000,
      step: 0.01
    },
    rules: [{ required: true, message: '默认手续费不能为空' }],
  }, {
    title: '最小提款金额',
    fromType: 'inputnumber',
    name: 'minCashOut',
    placeholder: '请输入最小提款金额',
    options: {
      min: 0.01,
      max: 100000,
      step: 0.01
    }
  }, {
    title: '起始提款金额',
    fromType: 'inputnumber',
    name: 'seedCashOut',
    placeholder: '请输起始提款金额',
    options: {
      min: 0.01,
      max: 100000,
      step: 0.01
    }
  }, {
    title: '云支付账户名',
    fromType: 'input',
    inputType: 'text',
    name: 'cloudPayAccountName',
    placeholder: '请输入云支付账户名',
    rules: [{ type: 'string', min: 2, max: 50, message: '最少输入2个字符的账户名或最多输入50个字符的账户名' }]
  }, {
    title: '微信支付渠道key',
    fromType: 'input',
    inputType: 'text',
    name: 'posWxChannelKey',
    placeholder: '请输入微信支付渠道key',
    rules: [{ type: 'string', min: 2, max: 1000, message: '最少输入2个字符的账户名或最多输入1000个字符的微信支付渠道key' }]
  }, {
    title: '微信支付渠道key',
    fromType: 'input',
    inputType: 'text',
    name: 'posWxChannelKey',
    placeholder: '请输入微信支付渠道key',
    rules: [{ type: 'string', min: 2, max: 1000, message: '最少输入2个字符的账户名或最多输入1000个字符的微信支付渠道key' }]
  }, {
    title: '支付宝支付渠道key',
    fromType: 'input',
    inputType: 'text',
    name: 'posAliChannelKey',
    placeholder: '请输入支付宝支付渠道key',
    rules: [{ type: 'string', min: 2, max: 1000, message: '最少输入2个字符的账户名或最多输入1000个字符的支付宝支付渠道key' }]
  }, {
    title: '易极支付key',
    fromType: 'input',
    inputType: 'text',
    name: 'yijiChannelKey',
    placeholder: '请输入易极支付key',
    rules: [{ type: 'string', min: 2, max: 1000, message: '最少输入2个字符的账户名或最多输入1000个字符的易极支付key' }]
  }, {
    title: '默认支付宝账户',
    fromType: 'input',
    inputType: 'text',
    name: 'defaultAlipayMerNO',
    placeholder: '请输入默认支付宝账户',
    rules: [{ type: 'string', min: 2, max: 1000, message: '最少输入2个字符的账户名或最多输入1000个字符的默认支付宝账户' }]
  }, {
    title: '默认微信账户',
    fromType: 'input',
    inputType: 'text',
    name: 'defaultWepayMerNO',
    placeholder: '请输入默认微信账户',
    rules: [{ type: 'string', min: 2, max: 1000, message: '最少输入2个字符的账户名或最多输入1000个字符的默认微信账户' }]
  }, {
    title: '默认和包支付账户',
    fromType: 'input',
    inputType: 'text',
    name: 'defaultCmPayMerNO',
    placeholder: '请输入默认和包支付账户',
    rules: [{ type: 'string', min: 2, max: 1000, message: '最少输入2个字符的账户名或最多输入1000个字符的默认和包支付账户' }]
  }, {
    title: '默认翼支付账户',
    fromType: 'input',
    inputType: 'text',
    name: 'defaultBestpayMerNO',
    placeholder: '请输入默认默认翼支付账户',
    rules: [{ type: 'string', min: 2, max: 1000, message: '最少输入2个字符的账户名或最多输入1000个字符的默认翼支付账户' }]
  }, {
    title: '默认银联支付账户',
    fromType: 'input',
    inputType: 'text',
    name: 'defaultUnionPayMerNO',
    placeholder: '请输入默银联包支付账户',
    rules: [{ type: 'string', min: 2, max: 1000, message: '最少输入2个字符的账户名或最多输入1000个字符的默认沃钱包支付账户' }]
  }, {
    title: '默认沃钱包支付账户',
    fromType: 'input',
    inputType: 'text',
    name: 'defaultUnicompayMerNO',
    placeholder: '请输入默认沃钱包支付账户',
    rules: [{ type: 'string', min: 2, max: 1000, message: '最少输入2个字符的账户名或最多输入1000个字符的默认沃钱包支付账户' }]
  }, {
    title: '支付宝账户默认费率',
    fromType: 'inputnumber',
    name: 'defaultAliPayRate',
    placeholder: '请输入支付宝账户默认费率',
    options: {
      min: 0.01,
      max: 100000,
      step: 0.01
    }
  },{
    title: '微信账户默认费率',
    fromType: 'inputnumber',
    name: 'defaultWePayRate',
    placeholder: '请输微信账户默认费率',
    options: {
      min: 0.01,
      max: 100000,
      step: 0.01
    }
  }, {
    title: '和钱包账户默认费率',
    fromType: 'inputnumber',
    name: 'defaultCmPayRate',
    placeholder: '请输和钱包默认费率',
    options: {
      min: 0.01,
      max: 100000,
      step: 0.01
    }
  }, {
    title: '翼支付默认费率',
    fromType: 'inputnumber',
    name: 'defaultBestpayRate',
    placeholder: '请输入翼支付默认费率',
    options: {
      min: 0.01,
      max: 100000,
      step: 0.01
    }
  }, {
    title: '银联默认费率',
    fromType: 'inputnumber',
    name: 'defaultUnionPayRate',
    placeholder: '请输入银联默认费率',
    options: {
      min: 0.01,
      max: 100000,
      step: 0.01
    }
  }, {
    title: '沃钱包默认费率',
    fromType: 'inputnumber',
    name: 'defaultUnicompayRate',
    placeholder: '请输入沃钱包默认费率',
    options: {
      min: 0.01,
      max: 100000,
      step: 0.01
    }
  }, {
    title: '账户备注',
    fromType: 'input',
    inputType: 'text',
    name: 'remarks',
    placeholder: '请输入账户备注',
    rules: [{ type: 'string', min: 2, max: 1000, message: '最少输入2个字符的账户名或最多输入1000个字符的默认沃钱包支付账户' }]
  }];
  return arr;
};

//添加轮播图
export const imagesFrom = [{
  title: '首页轮播图',
  fromType: 'input',
  inputType: 'text',
  name: 'indexBanner',
  placeholder: '以英文逗号分割开首页轮播图片',
  rules: [{ type: 'string', min: 2, max: 1000, message: '最少输入2个字符的权限名或最多输入1000个字符的首页轮播图地址' }]
}, {
  title: '设备图',
  fromType: 'input',
  inputType: 'text',
  name: 'deviceBanner',
  placeholder: '以英文逗号分割开设备图片',
  rules: [{ type: 'string', min: 2, max: 1000, message: '最少输入2个字符的权限名或最多输入1000个字符的设备图地址' }]
}];
