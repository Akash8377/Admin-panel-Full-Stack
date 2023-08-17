import React from 'react';

import BannerCrudModule from '@/modules/Banner';
import BannerForm from '@/forms/BannerForm';

export default function Banner() {
  const entity = 'Banner';
  const searchConfig = {
    displayLabels: ['Banner name', 'size'],
    searchFields: 'Admin,name,surname',
    outputValue: '_id',
  };

  const PANEL_TITLE = 'Banner Panel';
  const dataTableTitle = 'Banner Lists';
  const entityDisplayLabels = ['Admin'];

  const readColumns = [
    { title: 'Banner Name', dataIndex: 'Banner name' },
    { title: 'Size', dataIndex: 'size' },
    { title: 'Admin', dataIndex: 'Admin' },
    { title: "Banner Role", dataIndex: 'role.displayName' },
  ];

  const dataTableColumns = [
    { title: 'Banner Name', dataIndex: 'Banner name' },
    { title: 'Size', dataIndex: 'size' },
    { title: 'Admin', dataIndex: 'Admin' },
    { title: "Banner Role", dataIndex: ['role', 'displayName'] },
  ];
  const ADD_NEW_ENTITY = 'Add new Banner';
  const DATATABLE_TITLE = 'Banner List';
  const ENTITY_NAME = 'Banner';
  const CREATE_ENTITY = 'Create Banner';
  const UPDATE_ENTITY = 'Update Banner';

  const config = {
    entity,
    PANEL_TITLE,
    dataTableTitle,
    ENTITY_NAME,
    CREATE_ENTITY,
    ADD_NEW_ENTITY,
    UPDATE_ENTITY,
    DATATABLE_TITLE,
    readColumns,
    dataTableColumns,
    searchConfig,
    entityDisplayLabels,
  };
  return (
    <BannerCrudModule
      createForm={<BannerForm />}
      updateForm={<BannerForm isUpdateForm={true} />}
      config={config}
    />
  );
}
