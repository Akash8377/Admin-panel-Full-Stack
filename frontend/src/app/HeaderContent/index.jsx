import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, Menu, Dropdown } from 'antd';

import {
  AppstoreOutlined,
  SettingOutlined,
  MailOutlined,
  LogoutOutlined,
  BellOutlined,
} from '@ant-design/icons';
import photo from '../../style/images/photo.jpg';

import { logout } from '@/redux/auth/actions';
import history from '@/utils/history';
import uniqueId from '@/utils/uinqueId';

export default function HeaderContent() {
  const dispatch = useDispatch();
  const { SubMenu } = Menu;

  const profileDropdown = (
    <div className="profileDropdown whiteBox shadow" style={{ minWidth: '200px' }}>
      <div className="pad15" onClick={() => history.push('/profile')} style={{ cursor: 'pointer' }}>
        <Avatar size="large" className="last" src={photo} style={{ float: 'left' }} />
        <div className="info">
          <p className="strong">Akash Choudhary</p>
          <p>akashchoudhary8377@gmail.com</p>
        </div>
      </div>
      <div className="line"></div>
      <div>
        <Menu>
          
              <Menu.Item key={'Help'} >
            <Link to={'/help'} />
            Help
          </Menu.Item>
          <Menu.Item key={'PrivacyPolicy'} >
            <Link to={'/privacyPolicy'} />
            Privacy Policy
          </Menu.Item>
          <Menu.Item key={'Term&Condition'} >
            <Link to={'/term&Condition'} />
            Term & Conditions
          </Menu.Item>
        </Menu>
      </div>
      <div className="line"></div>
      <div>
        <Menu>
          <Menu.Item
            icon={<LogoutOutlined />}
            key={`${uniqueId()}`}
            onClick={() => history.push('/logout')}
          >
            logout
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
  return (
    <div className="headerIcon" style={{ position: 'absolute', right: 0, zIndex: '99' }}>
      <Dropdown overlay={profileDropdown} trigger={['click']} placement="bottomRight">
        {/* <Badge dot> */}
        <Avatar className="last" src={photo} />
        {/* </Badge> */}
      </Dropdown>

      <Avatar icon={<AppstoreOutlined />} />

      <Avatar icon={<BellOutlined />} />
    </div>
  );
}
