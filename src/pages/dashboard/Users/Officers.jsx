import { Delete, Detail, Edit } from '@/components/dashboard/button';
import Modul from '@/constants/Modul';
import { useAuth, useCrudModal, useNotification, usePagination, useService } from '@/hooks';
import useAbortableService from '@/hooks/useAbortableService';
import { RolesService, UsersService } from '@/services';
import { Card, Space } from 'antd';
import { UserManagement as UserModel } from '@/models';
import React from 'react';
import { Action } from '@/constants';
import { DataTable, DataTableHeader } from '@/components';
import { formFields } from './FormFields';

const { DELETE, UPDATE, READ } = Action;

const Users = () => {
  const modal = useCrudModal();
  const { success, error } = useNotification();
  const { token, user, onUnauthorized } = useAuth();
  const { execute, ...getAllUsers } = useAbortableService(UsersService.getAll, { onUnauthorized });
  const { execute: fetchRoles, ...getAllRoles } = useAbortableService(RolesService.getAll, { onUnauthorized });

  const pagination = usePagination({ totalData: getAllUsers.totalData });
  const [filterValues, setFilterValues] = React.useState({ search: '' });

  const fetchUsers = React.useCallback(() => {
    execute({
      token: token,
      page: pagination.page,
      per_page: pagination.per_page,
      search: filterValues.search
    });
  }, [execute, filterValues.search, pagination.page, pagination.per_page, token]);

  React.useEffect(() => {
    fetchUsers();
    fetchRoles({ token: token });
  }, [fetchRoles, fetchUsers, token]);

  const [selectedData, setSelectedData] = React.useState([]);

  const users = getAllUsers.data ?? [];
  const roles = getAllRoles.data ?? [];

  const storeUser = useService(UsersService.store, onUnauthorized);
  const updateUser = useService(UsersService.store, onUnauthorized);
  const deleteUser = useService(UsersService.delete, onUnauthorized);

  const column = [
    {
      title: 'Nama',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      searchable: true
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email.length - b.email.length,
      searchable: true
    }
  ];

  if (user && user.eitherCan([UPDATE, UserModel], [DELETE, UserModel], [READ, UserModel])) {
    column.push({
      title: 'Aksi',
      render: (_, record) => (
        <Space size="small">
          <Edit
            title={`Edit ${Modul.USER}`}
            model={UserModel}
            onClick={() => {
              modal.edit({
                title: `Edit ${Modul.USER}`,
                formFields: formFields({ options: { roles } }),
                onSubmit: async (values) => {
                  const { message, isSuccess } = await updateUser.execute(record.id, { ...values, role: 'karyawan' }, token);
                  if (isSuccess) {
                    success('Berhasil', message);
                    fetchUsers({ token: token, page: pagination.page, per_page: pagination.per_page });
                  } else {
                    error('Gagal', message);
                  }
                  return isSuccess;
                }
              });
            }}
          />
          <Detail
            title={`Detail ${Modul.USER}`}
            model={UserModel}
            onClick={() => {
              modal.show.description({
                title: record.name,
                data: []
              });
            }}
          />
          <Delete
            title={`Delete ${Modul.USER}`}
            model={UserModel}
            onClick={() => {
              modal.delete.default({
                title: `Delete ${Modul.USER}`,
                data: { ...record, role: record.role.id },
                onSubmit: async () => {
                  const { isSuccess, message } = await deleteUser.execute(record.id, token);
                  if (isSuccess) {
                    success('Berhasil', message);
                    fetchUsers({ token: token, page: pagination.page, per_page: pagination.per_page });
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
      title: `Tambah ${Modul.USER}`,
      formFields: formFields({ options: { roles } }),
      onSubmit: async (values) => {
        const { message, isSuccess } = await storeUser.execute({ ...values, password: 'password' }, token);
        if (isSuccess) {
          success('Berhasil', message);
          fetchUsers({ token: token, page: pagination.page, per_page: pagination.per_page });
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
        <DataTableHeader model={UserModel} modul={Modul.USER} onStore={onCreate} selectedData={selectedData} onSearch={(values) => setFilterValues({ ...filterValues, search: values })} />
        <div className="w-full max-w-full overflow-x-auto">
          <DataTable data={users} columns={column} loading={getAllUsers.isLoading} map={(user) => ({ key: user.id, ...user })} handleSelectedData={(_, selectedRows) => setSelectedData(selectedRows)} pagination={pagination} />
        </div>
      </Card>
    </div>
  );
};

export default Users;
