import React from 'react';
import { Select } from 'antd';
import { UserOutlined } from '@ant-design/icons';

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
        <UserOutlined />
        {" "}Jack
      </Option>
      <Option value="lucy">
        <UserOutlined />
        {" "}Lucy
      </Option>
      <Option value="tom">
        <UserOutlined />
        {" "}Tom
      </Option>
    </Select>
  )
};

export default CustomSelect;