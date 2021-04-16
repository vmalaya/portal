import React from 'react';
import { Select } from 'antd';
import { UserAddOutlined, UsergroupAddOutlined } from '@ant-design/icons';

const { Option } = Select;

const CustomSelect = ({ targetType, options, onChange }) => {
  return (
    <Select
      showSearch
      style={{ width: '100%' }}
      placeholder={`Select a ${targetType}`}
      optionFilterProp="children"
      onChange={onChange}
      filterOption={(input, option) =>
        option.children[2].toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {options && options.length && options.map((option) => (
        <Option value={option.uuid || option.id}>
          {targetType === "user" ? <UserAddOutlined /> : <UsergroupAddOutlined />}
          {" "}{option.username || option.name}
        </Option>
      ))
      }
    </Select>
  )
};

export default CustomSelect;