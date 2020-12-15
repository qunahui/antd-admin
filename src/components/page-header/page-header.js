import React from 'react'
import { PageHeader, Button, Dropdown, Menu, message } from 'antd';

import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons';

import './page-header.scss'

const handleMenuClick = (e) => {
  message.info('Clicked')
  console.log('click', e);
}

const userMenu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1" icon={<LogoutOutlined />}>
      Sign out
    </Menu.Item>
  </Menu>
);

const CustomPageHeader = (props) => {
  return (
    <div className="site-page-header">
      <PageHeader
        title="Title"
        subTitle="This is a subtitle"
        extra={[
          <Button key="2"><SettingOutlined /></Button>,
          <Dropdown key="1" overlay={userMenu}>
            <Button type="primary">
              Username <UserOutlined />
            </Button>
          </Dropdown>  
        ]}
      />
    </div>
  )
}

export default CustomPageHeader