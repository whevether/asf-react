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
  title: '岗位',
  fromType: 'select',
  mode: 'multiple',
  name: 'postId',
  placeholder: '请选择岗位',
  rules: [{ required: true, message: '岗位不能为空' }],
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
// 分配选择
export const assignFrom = (title, desc, opt, name = 'ids', fromType = 'select', model = 'multiple') => [{
  title: title,
  fromType: fromType,
  mode: model,
  name: name,
  placeholder: `请选择${desc}`,
  selOption: opt,
  rules: [{ required: true, message: `${desc}不能为空` }],
  options: {
    allowClear: true//是否显示清除框
  }
}];
// 手机号码
export const telphoneFrom = () => [{
  title: '手机号码',
  fromType: 'input',
  inputType: 'text',
  placeholder: '请输入手机号码',
  name: 'telphone',
  rules: [{ type: 'string', pattern: /^1[0-9]{10}$/, message: '输入的手机号码不正确' }]
}];
// 邮箱地址
export const emailFrom = () => [{
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
}];
// 密码
export const passwordFrom = () => [{
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
}];
//权限搜索
export const permissionSearchFrom = [{
  title: '权限名',
  fromType: 'input',
  inputType: 'text',
  name: 'name',
  placeholder: '请输入权限名',
  rules: [{ type: 'string', min: 2, max: 50, message: '最少输入2个字符的权限名或最多输入50个字符的权限名' }]
}, {
  title: '权限代码',
  fromType: 'input',
  inputType: 'text',
  name: 'code',
  placeholder: '请输入权限代码',
  rules: [{ type: 'string', min: 2, max: 50, message: '最少输入1个字符的权限代码或最多输入50个字符的权限代码' }]
}, {
  title: '权限类型',
  fromType: 'select',
  name: 'type',
  placeholder: '请选择类型',
  selOption: [{
    name: '菜单',
    id: 1
  }, {
    name: '菜单条目',
    id: 2
  }, {
    name: '功能',
    id: 3
  }],
  options: {
    allowClear: true//是否显示清除框
  }
}, {
  title: '权限状态',
  fromType: 'select',
  name: 'enable',
  placeholder: '请选择状态',
  selOption: [{
    name: '禁用',
    id: 0
  }, {
    name: '启用',
    id: 1
  }],
  options: {
    allowClear: true//是否显示清除框
  }
}, {
  title: '系统权限',
  fromType: 'select',
  name: 'isSystem',
  placeholder: '请选择是否为系统权限',
  selOption: [{
    name: '否',
    id: 0
  }, {
    name: '是',
    id: 1
  }],
  options: {
    allowClear: true//是否显示清除框
  }
}];
//菜单搜索
export const menuSearchFrom = [{
  title: '菜单名',
  fromType: 'input',
  inputType: 'text',
  name: 'title',
  placeholder: '请输入菜单名',
  rules: [{ type: 'string', min: 2, max: 50, message: '最少输入2个字符的菜单名或最多输入50个字符的菜单名' }]
}, {
  title: '菜单所属权限id',
  fromType: 'input',
  inputType: 'text',
  name: 'permissionId',
  placeholder: '菜单所属权限id',
  rules: [{ type: 'string', min: 2, max: 50, message: '最少输入1个字符的菜单所属权限id或最多输入50个字符的菜单所属权限id' }]
}, {
  title: '菜单地址',
  fromType: 'input',
  inputType: 'text',
  name: 'menuUrl',
  placeholder: '请输入菜单地址',
  rules: [{ type: 'string', min: 2, max: 50, message: '最少输入1个字符的菜单地址或最多输入50个字符的菜单地址' }]
}];
export const menuFrom = (options) => [{
  title: '菜单所属权限',
  fromType: 'cascader',
  selOption: options,
  name: 'permissionId',
  placeholder: '请选择菜单所属权限',
  rules: [{ required: true, message: '菜单所属权限不能为空' }],
  options: {
    allowClear: true//是否显示清除框
  }
}, {
  title: '菜单标题',
  fromType: 'input',
  inputType: 'text',
  name: 'title',
  placeholder: '请输入菜单标题',
  rules: [{ required: true, message: '菜单标题不能为空' }, { type: 'string', min: 2, max: 50, message: '最少输入2个字符的菜单名或最多输入50个字符的菜单标题' }]
}, {
  title: '菜单地址',
  fromType: 'input',
  inputType: 'text',
  name: 'menuUrl',
  placeholder: '请输入菜单地址',
  rules: [{ required: true, message: '菜单地址不能为空' }, { type: 'string', min: 2, max: 50, message: '最少输入1个字符的菜单地址或最多输入50个字符的菜单地址' }]
}, {
  title: '菜单图标',
  fromType: 'input',
  inputType: 'text',
  name: 'icon',
  placeholder: '请输入菜单图标',
  rules: [{ required: true, message: '菜单图标不能为空' }, { type: 'string', min: 2, max: 50, message: '最少输入1个字符的菜单图标或最多输入50个字符的菜单图标' }]
}, {
  title: '菜单副标题',
  fromType: 'input',
  inputType: 'text',
  name: 'subtitle',
  placeholder: '请输入菜单副标题',
  rules: [{ type: 'string', min: 2, max: 50, message: '最少输入1个字符的菜单副标题或最多输入50个字符的菜单副标题' }]
}, {
  title: '菜单外部链接',
  fromType: 'input',
  inputType: 'text',
  name: 'externalLink',
  placeholder: '请输入菜单外部链接',
  rules: [{ type: 'string', min: 2, max: 50, message: '最少输入1个字符的菜单外部链接或最多输入50个字符的菜单外部链接' }]
}, {
  title: '菜单重定向地址',
  fromType: 'input',
  inputType: 'text',
  name: 'menuRedirect',
  placeholder: '请输入菜单重定向地址',
  rules: [{ type: 'string', min: 2, max: 50, message: '最少输入1个字符的菜单重定向地址或最多输入50个字符的菜单重定向地址' }]
}, {
  title: '菜单说明',
  fromType: 'input',
  inputType: 'text',
  name: 'description',
  placeholder: '请输入菜单说明',
  rules: [{ type: 'string', min: 2, max: 50, message: '最少输入1个字符的菜单说明或最多输入50个字符的菜单说明' }]
}, {
  title: '是否隐藏菜单',
  fromType: 'select',
  name: 'menHidden',
  placeholder: '请选择是否隐藏菜单',
  selOption: [{
    name: '否',
    id: 0
  }, {
    name: '是',
    id: 1
  }],
  options: {
    allowClear: true//是否显示清除框
  }
}, {
  title: '是否为系统菜单',
  fromType: 'select',
  name: 'isSystem',
  placeholder: '请选择是否为系统菜单',
  selOption: [{
    name: '否',
    id: 0
  }, {
    name: '是',
    id: 1
  }],
  options: {
    allowClear: true//是否显示清除框
  }
}];
//api搜索
export const apiSearchFrom = [{
  title: 'api名称',
  fromType: 'input',
  inputType: 'text',
  name: 'name',
  placeholder: '请输入api名称',
  rules: [{ type: 'string', min: 2, max: 50, message: '最少输入2个字符的api名称或最多输入50个字符的api名称' }]
}, {
  title: 'api所属权限id',
  fromType: 'input',
  inputType: 'text',
  name: 'permissionId',
  placeholder: 'api所属权限id',
  rules: [{ type: 'string', min: 1, max: 50, message: '最少输入1个字符的api所属权限id或最多输入50个字符的api所属权限id' }]
}, {
  title: 'api地址',
  fromType: 'input',
  inputType: 'text',
  name: 'path',
  placeholder: '请输入api地址',
  rules: [{ type: 'string', min: 2, max: 50, message: '最少输入1个字符的api地址或最多输入50个字符的api地址' }]
}, {
  title: 'api状态',
  fromType: 'select',
  name: 'status',
  placeholder: '请选择api状态',
  selOption: [{
    name: '禁用',
    id: 0
  }, {
    name: '启用',
    id: 1
  }],
  options: {
    allowClear: true//是否显示清除框
  }
}, {
  title: 'api类型',
  fromType: 'select',
  name: 'type',
  placeholder: '请选择api类型',
  selOption: [{
    name: '开放api',
    id: 1
  }, {
    name: '授权api',
    id: 2
  }],
  options: {
    allowClear: true//是否显示清除框
  }
}, {
  title: 'api请求方法',
  fromType: 'select',
  name: 'httpMethods',
  mode: 'multiple',
  placeholder: '请选择api请求方法',
  selOption: [{
    name: 'get',
    id: 'get'
  }, {
    name: 'post',
    id: 'post'
  }, {
    name: 'put',
    id: 'put'
  }, {
    name: 'delete',
    id: 'delete'
  }],
  options: {
    allowClear: true//是否显示清除框
  }
}];
export const apiFrom = (options) => [{
  title: '菜单所属权限',
  fromType: 'cascader',
  selOption: options,
  name: 'permissionId',
  placeholder: '请选择菜单所属权限',
  rules: [{ required: true, message: '菜单所属权限不能为空' }],
  options: {
    allowClear: true//是否显示清除框
  }
}, {
  title: 'api名称',
  fromType: 'input',
  inputType: 'text',
  name: 'name',
  placeholder: '请输入api名称',
  rules: [{ required: true, message: 'api名称不能为空' }, { type: 'string', min: 2, max: 50, message: '最少输入2个字符的api名称或最多输入50个字符的api名称' }]
}, {
  title: 'api地址',
  fromType: 'input',
  inputType: 'text',
  name: 'path',
  placeholder: '请输入api地址',
  rules: [{ required: true, message: 'api地址不能为空' }, { type: 'string', min: 2, max: 50, message: '最少输入1个字符的api地址或最多输入50个字符的api地址' }]
}, {
  title: 'api状态',
  fromType: 'select',
  name: 'status',
  placeholder: '请选择api状态',
  selOption: [{
    name: '禁用',
    id: 0
  }, {
    name: '启用',
    id: 1
  }],
  options: {
    allowClear: true//是否显示清除框
  }
}, {
  title: '是否记录日志',
  fromType: 'select',
  name: 'isLogger',
  placeholder: '请选择是否记录日志',
  selOption: [{
    name: '否',
    id: 0
  }, {
    name: '是',
    id: 1
  }],
  options: {
    allowClear: true//是否显示清除框
  }
}, {
  title: '是否为系统权限',
  fromType: 'select',
  name: 'isSystem',
  placeholder: '请选择是否为系统权限',
  selOption: [{
    name: '否',
    id: 0
  }, {
    name: '是',
    id: 1
  }],
  options: {
    allowClear: true//是否显示清除框
  }
}, {
  title: 'api类型',
  fromType: 'select',
  name: 'type',
  placeholder: '请选择api类型',
  rules: [{ required: true, message: 'api类型不能为空' }],
  selOption: [{
    name: '开放api',
    id: 1
  }, {
    name: '授权api',
    id: 2
  }],
  options: {
    allowClear: true//是否显示清除框
  }
}, {
  title: 'api请求方法',
  fromType: 'select',
  name: 'httpMethods',
  mode: 'multiple',
  placeholder: '请选择api请求方法',
  rules: [{ required: true, message: 'api请求方法不能为空' }],
  selOption: [{
    name: 'get',
    id: 'get'
  }, {
    name: 'post',
    id: 'post'
  }, {
    name: 'put',
    id: 'put'
  }, {
    name: 'delete',
    id: 'delete'
  }],
  options: {
    allowClear: true//是否显示清除框
  }
}];

export const roleSearchFrom = [{
  title: '角色名称',
  fromType: 'input',
  inputType: 'text',
  name: 'name',
  placeholder: '请输入角色名称',
  rules: [{ type: 'string', min: 2, max: 50, message: '最少输入2个字符的角色名称或最多输入50个字符的角色名称' }]
}, {
  title: '是否启用角色',
  fromType: 'select',
  name: 'enable',
  placeholder: '请选择是否启用状态',
  selOption: [{
    name: '禁用',
    id: 0
  }, {
    name: '启用',
    id: 1
  }],
  options: {
    allowClear: true//是否显示清除框
  }
}];
export const roleFrom = (options) => {
  let arr = [{
    title: '角色名称',
    fromType: 'input',
    inputType: 'text',
    name: 'name',
    placeholder: '请输入角色名称',
    rules: [{ type: 'string', min: 2, max: 50, message: '最少输入2个字符的角色名称或最多输入50个字符的角色名称' }]
  }, {
    title: '是否启用角色',
    fromType: 'select',
    name: 'enable',
    placeholder: '请选择是否启用状态',
    selOption: [{
      name: '禁用',
      id: 0
    }, {
      name: '启用',
      id: 1
    }],
    options: {
      allowClear: true//是否显示清除框
    }
  }, {
    title: '权限说明',
    fromType: 'input',
    inputType: 'text',
    name: 'description',
    placeholder: '请输入权限说明',
    rules: [{ type: 'string', min: 2, max: 50, message: '最少输入2个字符的权限说明或最多输入50个字符的权限说明' }]
  }]
  if (options) {
    arr.unshift({
      title: '角色所属权限',
      fromType: 'select',
      selOption: options,
      mode: 'multiple',
      name: 'permissionId',
      placeholder: '请选择角色所属权限',
      rules: [{ required: true, message: '角色所属权限不能为空' }],
      options: {
        allowClear: true//是否显示清除框
      }
    });
  }
  return arr;
};
//权限添加
export const permissionFrom = (opt) => [{
  title: '父级权限',
  fromType: 'cascader',
  name: 'parentId',
  placeholder: '父级权限',
  selOption: opt,
  rules: [{ required: true, message: '父级权限不能为空' }],
  options: {
    allowClear: true//是否显示清除框
  }
}, {
  title: '权限代码(页面路径,不包含域名)',
  fromType: 'input',
  inputType: 'text',
  name: 'code',
  placeholder: '请输入权限代码(页面路径)',
  rules: [{ required: true, message: '权限类型不能为空' }, { type: 'string', min: 1, max: 50, message: '最少输入1个字符的权限代码(页面路径)或最多输入50个字符的权限代码(页面路径)' }]
}, {
  title: '权限名称',
  fromType: 'input',
  inputType: 'text',
  name: 'name',
  placeholder: '请输入权限名称',
  rules: [{ required: true, message: '权限类型不能为空' }, { type: 'string', min: 2, max: 50, message: '最少输入2个字符的权限名或最多输入50个字符的权限名称' }]
}, {
  title: '权限说明',
  fromType: 'input',
  inputType: 'text',
  name: 'description',
  placeholder: '请输入权限说明',
  rules: [{ type: 'string', min: 2, max: 50, message: '最少输入2个字符的权限说明或最多输入50个字符的权限说明' }]
}, {
  title: '权限类型',
  fromType: 'select',
  name: 'type',
  placeholder: '请选择权限类型',
  selOption: [{
    name: '菜单',
    id: 1
  }, {
    name: '菜单条目',
    id: 2
  }, {
    name: '功能',
    id: 3
  }],
  rules: [{ required: true, message: '权限类型不能为空' }],
  options: {
    allowClear: true//是否显示清除框
  }
}, {
  title: '是否为系统权限',
  fromType: 'select',
  name: 'isSystem',
  placeholder: '请选择是否为系统权限',
  selOption: [{
    name: '否',
    id: 0
  }, {
    name: '是',
    id: 1
  }],
  options: {
    allowClear: true//是否显示清除框
  }
}, {
  title: '排序',
  fromType: 'inputnumber',
  name: 'sort',
  placeholder: '请输入排序'
}, {
  title: '是否启用',
  fromType: 'select',
  name: 'enable',
  placeholder: '请选择是否启用',
  selOption: [{
    name: '否',
    id: 0
  }, {
    name: '是',
    id: 1
  }],
  options: {
    allowClear: true//是否显示清除框
  }
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
/* 富文本 */
export const editorSearchFrom = [{
  title: '页面名',
  fromType: 'input',
  inputType: 'text',
  name: 'name',
  placeholder: '请输入页面名',
  rules: [{ type: 'string', min: 2, max: 50, message: '最少输入2个字符的页面名或最多输入50个字符的页面名' }]
}, {
  title: '页面类型',
  fromType: 'select',
  name: 'type',
  placeholder: '请选择页面类型',
  optionLabel: 'label',
  selOption: [{ id: 0, name: '手机页面' }, { id: 1, name: '网站页面' }],
  options: {
    allowClear: true//是否显示清除框
  }
},];

//添加轮播图
export const imagesFrom = [{
  title: '页面名称',
  fromType: 'input',
  inputType: 'text',
  name: 'name',
  placeholder: '请输入页面名称',
  rules: [{ required: true, message: '页面名称不能为空' }, { type: 'string', min: 2, max: 1000, message: '最少输入2个字符的页面名称' }]
}, {
  title: '页面路径',
  fromType: 'input',
  inputType: 'text',
  name: 'path',
  placeholder: '请输入页面路径,例如:/var/www/html/441/a/gongsixinwen/index.html',
  rules: [{ required: true, message: '页面路径不能为空' }, { type: 'string', min: 2, max: 1000, message: '最少输入2个字符的页面路径' }]
}, {
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
