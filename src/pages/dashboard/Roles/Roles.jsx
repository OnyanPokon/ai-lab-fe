import { Delete, Detail, Edit } from '@/components/dashboard/button';
import Modul from '@/constants/Modul';
import { useAuth, useCrudModal, useNotification, usePagination, useService } from '@/hooks';
import useAbortableService from '@/hooks/useAbortableService';
import { AuthService, RolesService } from '@/services';
import { Card, Skeleton, Space } from 'antd';
import { Roles as RolesModel } from '@/models';
import React from 'react';
import { Action } from '@/constants';
import { DataTable, DataTableHeader } from '@/components';
import { formFields } from './FormFields';
import { slugify } from '@/utils/slugify';

const { DELETE, UPDATE, READ } = Action;

const Roles = () => {
  const modal = useCrudModal();
  const { success, error } = useNotification();
  const { token, user, onUnauthorized } = useAuth();
  const { execute, ...getAllRoles } = useAbortableService(RolesService.getAll, { onUnauthorized });
  const { execute: fetchPermissions, ...getAllPermissions } = useService(AuthService.getAllPermissions);
  const pagination = usePagination({ totalData: getAllRoles.totalData });
  const [filterValues, setFilterValues] = React.useState({ search: '' });

  const fetchRoles = React.useCallback(() => {
    execute({
      token: token,
      page: pagination.page,
      per_page: pagination.per_page,
      search: filterValues.search
    });
  }, [execute, filterValues.search, pagination.page, pagination.per_page, token]);

  React.useEffect(() => {
    fetchRoles();
    fetchPermissions(token);
  }, [fetchPermissions, fetchRoles, token]);

  const [selectedData, setSelectedData] = React.useState([]);

  const roles = getAllRoles.data ?? [];
  const permissions = getAllPermissions.data ?? [];

  const storeRoles = useService(RolesService.store, onUnauthorized);
  const updateRoles = useService(RolesService.store, onUnauthorized);
  const deleteRoles = useService(RolesService.delete, onUnauthorized);

  const column = [
    {
      title: 'Nama',
      dataIndex: 'nama',
      sorter: (a, b) => a.nama.length - b.nama.length,
      searchable: true
    }
  ];

  if (user && user.eitherCan([UPDATE, RolesModel], [DELETE, RolesModel], [READ, RolesModel])) {
    column.push({
      title: 'Aksi',
      render: (_, record) => (
        <Space size="small">
          <Edit
            title={`Edit ${Modul.ROLES}`}
            model={RolesModel}
            onClick={() => {
              modal.edit({
                title: `Edit ${Modul.ROLES}`,
                data: { ...record, id_permission: record.permission.map((p) => p.id) },
                formFields: formFields({ options: { permissions } }),
                onSubmit: async (values) => {
                  const { message, isSuccess } = await updateRoles.execute(record.id, { ...values, role: 'karyawan' }, token);
                  if (isSuccess) {
                    success('Berhasil', message);
                    fetchRoles({ token: token, page: pagination.page, per_page: pagination.per_page });
                  } else {
                    error('Gagal', message);
                  }
                  return isSuccess;
                }
              });
            }}
          />
          <Detail
            title={`Detail ${Modul.ROLES}`}
            model={RolesModel}
            onClick={() => {
              modal.show.description({
                title: record.name,
                data: []
              });
            }}
          />

          <Delete
            title={`Delete ${Modul.ROLES}`}
            model={RolesModel}
            onClick={() => {
              modal.delete.default({
                title: `Delete ${Modul.ROLES}`,
                data: { ...record, role: record.role.id },
                onSubmit: async () => {
                  const { isSuccess, message } = await deleteRoles.execute(record.id, token);
                  if (isSuccess) {
                    success('Berhasil', message);
                    fetchRoles({ token: token, page: pagination.page, per_page: pagination.per_page });
                  } else {
                    error('Gagal', message);
                  }
                  return isSuccess;
                }
              });
            }}
          />
        </Space>
      )
    });
  }

  const onCreate = () => {
    modal.create({
      title: `Tambah ${Modul.ROLES}`,
      formFields: formFields({ options: { permissions } }),
      onSubmit: async (values) => {
        const { message, isSuccess } = await storeRoles.execute({ ...values, slug: slugify(values.nama) }, token);
        if (isSuccess) {
          success('Berhasil', message);
          fetchRoles({ token: token, page: pagination.page, per_page: pagination.per_page });
        } else {
          error('Gagal', message);
        }
        return isSuccess;
      }
    });
  };

  return (
    <div>
      <Card>
        <Skeleton loading={getAllRoles.isLoading}>
          <DataTableHeader model={RolesModel} modul={Modul.ROLES} onStore={onCreate} selectedData={selectedData} onSearch={(values) => setFilterValues({ ...filterValues, search: values })} />
          <div className="w-full max-w-full overflow-x-auto">
            <DataTable data={roles} columns={column} loading={getAllRoles.isLoading} map={(role) => ({ key: role.id, ...role })} handleSelectedData={(_, selectedRows) => setSelectedData(selectedRows)} pagination={pagination} />
          </div>
        </Skeleton>
      </Card>
    </div>
  );
};

export default Roles;
