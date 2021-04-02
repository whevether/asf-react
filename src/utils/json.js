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
  rules: [{required:true,message:'部门不能为空'}],
  options: {
    allowClear: true//是否显示清除框
  }
},{
  title: '账户名',
  fromType: 'input',
  inputType: 'text',
  name: 'username',
  placeholder: '请输入账户名',
  rules: [{required:true,message:'账户名不能为空'},{type: 'string',min: 2,max:50,message: '最少输入2个字符的账户名或最多输入50个字符的账户名'}],
  options: { //扩展配置
    allowClear: true//是否显示清除框
    // disabled: false
  }
},{
  title: '密码',
  fromType: 'input',
  inputType: 'password',
  name: 'password',
  placeholder: '请输入账户密码',
  rules: [{required:true,message:'账户密码不能为空'},{type: 'string',min: 2,max:50,message: '最少输入2个字符的账户密码或最多输入50个字符的账户密码'}],
  options: { //扩展配置
    allowClear: true//是否显示清除框
    // disabled: false
  }
},{
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
},{
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
},{
  title: '昵称',
  fromType: 'input',
  inputType: 'text',
  name: 'name',
  placeholder: '请输入昵称',
  rules: [{type: 'string',min: 2,max:50,message: '最少输入2个字符的昵称或最多输入50个字符的昵称'}],
  options: { //扩展配置
    allowClear: true//是否显示清除框
    // disabled: false
  }
},{
  title: '性别',
  fromType: 'select',
  name: 'sex',
  placeholder: '请选择性别',
  selOption: [{
    name: '未知',
    value: 0
  },{
    name: '男',
    value: 1
  },{
    name: '女',
    value: 2
  }],
  rules: [{required:true,message:'性别不能为空'}],
  options: {
    allowClear: true//是否显示清除框
  }
}];