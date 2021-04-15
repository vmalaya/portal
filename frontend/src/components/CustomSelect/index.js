import React from 'react';
import { Select } from 'antd';
import { UserAddOutlined, UsergroupAddOutlined } from '@ant-design/icons';

const { Option } = Select;

const CustomSelect = ({targetType}) => {
  return (
    <Select
      showSearch
      style={{ width: '100%' }}
      placeholder={`Select a ${targetType}`}
      optionFilterProp="children"
      filterOption={(input, option) =>
        option.children[2].toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      <Option value="jack">
      {targetType === "user" ? <UserAddOutlined /> : <UsergroupAddOutlined />}
        {" "}Jack
      </Option>
      <Option value="lucy">
      {targetType === "user" ? <UserAddOutlined /> : <UsergroupAddOutlined />}
        {" "}Lucy
      </Option>
      <Option value="tom">
      {targetType === "user" ? <UserAddOutlined /> : <UsergroupAddOutlined />}
        {" "}Tom
      </Option>
    </Select>
  )
};

export default CustomSelect;