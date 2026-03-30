import React from 'react';
import { ProTable } from '@ant-design/pro-components';
import PropTypes from 'prop-types';

/**
 * 仅用于详情页等纯展示表格：dataSource + columns，无搜索、无工具栏。
 * 列表页请直接使用 ProTable + request。
 */
export default function ProTableCompat({ dataSource, columns, pagination, rowSelection, scroll, style }) {
  return (
    <ProTable
      rowKey="id"
      dataSource={dataSource || []}
      columns={columns}
      search={false}
      toolBarRender={false}
      options={false}
      pagination={pagination ?? false}
      rowSelection={rowSelection}
      scroll={scroll}
      style={style}
    />
  );
}

ProTableCompat.propTypes = {
  dataSource: PropTypes.array,
  columns: PropTypes.array.isRequired,
  pagination: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  rowSelection: PropTypes.object,
  scroll: PropTypes.object,
  style: PropTypes.object,
};
