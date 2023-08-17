import React from 'react';


export const routesConfig = [
  {
    path: '/',
    component: 'Dashboard',
  },
  {
    path: '/customer',
    component: 'Customer',
  },
  {
    path: '/invoice',
    component: 'Invoice',
  },
  {
    path: '/quote',
    component: 'Quote',
  },
  {
    path: '/payment/invoice',
    component: 'PaymentInvoice',
  },
  {
    path: '/employee',
    component: 'Employee',
  },
  {
    path: '/admin',
    component: 'Admin',
  },
  {
    path: '/settings',
    component: 'Settings/Settings',
  },
  {
    path:'/banner',
    component:'banner'
  },
  {
    path: '/payment/mode',
    component: 'PaymentMode',
  },
  {
    path: '/role',
    component: 'Role',
  },
  {
    path: '/profile',
    component: 'Profile',
  },
  {
    path: '/help',
    component:'Help'
  },
  {
    path: '/privacyPolicy',
    component:'PrivacyPolicy'
  },
  {
    path: '/term&Condition',
    component:'TermCondition'
  },
  {
    path: '/clientChat',
    component:'ClientChat'
  },
  {
    path: '/adminChat',
    component:'AdminChat'
  }
];
