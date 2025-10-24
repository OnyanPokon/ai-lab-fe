import { Delete } from '@/components/dashboard/button';
import Modul from '@/constants/Modul';
import { useAuth, useCrudModal, useNotification, usePagination, useService } from '@/hooks';
import useAbortableService from '@/hooks/useAbortableService';
import { RolesService, UsersService } from '@/services';
import { Button, Card, Skeleton, Space, Tag, Tooltip } from 'antd';
import { UserManagement as UserModel } from '@/models';
import React from 'react';
import { Action } from '@/constants';
import { DataTable, DataTableHeader } from '@/components';
import { formFields, usersFilterFields } from './FormFields';
import { ClockCircleOutlined, ExclamationOutlined } from '@ant-design/icons';

const { DELETE, UPDATE, READ } = Action;

const Users = () => {
  const modal = useCrudModal();
  const { success, error } = useNotification();
  const { token, user, onUnauthorized } = useAuth();
  const { execute, ...getAllUsers } = useAbortableService(UsersService.getAll, { onUnauthorized });
  const { execute: fetchRoles, ...getAllRoles } = useAbortableService(RolesService.getAll, { onUnauthorized });

  const pagination = usePagination({ totalData: getAllUsers.totalData });
  const [filterValues, setFilterValues] = React.useState({ search: '', role_id: null });

  const fetchUsers = React.useCallback(() => {
    execute({
      token: token,
      page: pagination.page,
      per_page: pagination.per_page,
      search: filterValues.search,
      role_id: filterValues.role_id
    });
  }, [execute, filterValues.role_id, filterValues.search, pagination.page, pagination.per_page, token]);

  React.useEffect(() => {
    fetchUsers();
    fetchRoles({ token: token });
  }, [fetchRoles, fetchUsers, token]);

  const [selectedData, setSelectedData] = React.useState([]);

  const users = getAllUsers.data ?? [];
  const roles = getAllRoles.data ?? [];
  const [userTrialSummary, setUserTrialSummary] = React.useState();
  const [userQuotaSummary, setUserQuotaSummary] = React.useState();

  const storeUser = useService(UsersService.store, onUnauthorized);
  const deleteUser = useService(UsersService.delete, onUnauthorized);
  const getUserTrialSummary = useService(UsersService.getTrialSummary);
  const getUserQuotaSummary = useService(UsersService.getQuotaSummary);

  const column = [
    {
      title: 'Nama',
      dataIndex: 'nama',
      sorter: (a, b) => a.nama.length - b.nama.length,
      searchable: true
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email.length - b.email.length,
      searchable: true
    },
    {
      title: 'Role',
      dataIndex: ['role', 'slug'],
      sorter: (a, b) => a.role.slug.length - b.role.slug.length,
      searchable: true,
      render: (_, record) => {
        const slug = record.role?.slug;

        let color = 'default';
        if (slug === 'admin') color = '#4647ba';
        else if (slug === 'user') color = '#447ed3';
        else color = 'gray';

        return <Tag color={color}>{record.role?.slug}</Tag>;
      }
    }
  ];

  if (user && user.eitherCan([UPDATE, UserModel], [DELETE, UserModel], [READ, UserModel])) {
    column.push({
      title: 'Aksi',
      render: (_, record) => (
        <Space size="small">
          <Delete
            title={`Delete ${Modul.USER}`}
            model={UserModel}
            onClick={() => {
              modal.delete.default({
                title: `Delete ${Modul.USER}`,
                data: record,
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
          {record.role.slug === 'user' && (
            <>
              <Tooltip title="Informasi Trials">
                <Button
                  icon={<ExclamationOutlined />}
                  variant="text"
                  color="green"
                  loading={getUserTrialSummary.isLoading}
                  onClick={async () => {
                    const { isSuccess, message } = await getUserTrialSummary.execute(record.id, token);
                    if (isSuccess) {
                      setUserTrialSummary(getUserTrialSummary.data);
                      modal.show.description({
                        title: 'Informasi Trial User',
                        data: [
                          {
                            key: 'hasTrial',
                            label: `Trial Tersedia`,
                            children: userTrialSummary?.hasTrials ? 'Ya' : 'Tidak'
                          },
                          {
                            key: 'isActive',
                            label: `Status Trial`,
                            children: userTrialSummary?.isActive ? 'Aktif' : 'Tidak Aktif'
                          },
                          {
                            key: 'remainingDays',
                            label: `Sisa Hari Trial`,
                            children: userTrialSummary?.remainingDays ?? 0
                          },
                          {
                            key: 'remainingMinutes',
                            label: `Sisa Menit Trial`,
                            children: userTrialSummary?.remainingMinutes ?? 0
                          }
                        ]
                      });
                    } else {
                      error('Gagal', message);
                    }
                    return isSuccess;
                  }}
                />
              </Tooltip>
              <Tooltip title="Informasi Kuota">
                <Button
                  icon={<ClockCircleOutlined />}
                  variant="text"
                  color="green"
                  loading={getUserQuotaSummary.isLoading}
                  onClick={async () => {
                    const { isSuccess, message } = await getUserQuotaSummary.execute(record.id, token);
                    if (isSuccess) {
                      setUserQuotaSummary(getUserQuotaSummary.data);
                      modal.show.description({
                        title: 'Informasi Trial User',
                        data: [
                          {
                            key: 'totalQuota',
                            label: `Total Kuota`,
                            children: userQuotaSummary?.totalQuota ?? 0
                          },
                          {
                            key: 'usedQuota',
                            label: `Kuota yang digunakan`,
                            children: userQuotaSummary?.usedQuota ?? 0
                          },
                          {
                            key: 'remainingQuota',
                            label: `Sisa Quota`,
                            children: userQuotaSummary?.remainingQuota ?? 0
                          }
                        ]
                      });
                    } else {
                      error('Gagal', message);
                    }
                    return isSuccess;
                  }}
                />
              </Tooltip>
            </>
          )}
        </Space>
      )
    });
  }

  const onCreate = () => {
    const adminRoleId = roles.find((role) => role.slug === 'admin')?.id;
    modal.create({
      title: `Tambah ${Modul.USER}`,
      formFields: formFields(),
      onSubmit: async (values) => {
        const { message, isSuccess } = await storeUser.execute({ ...values, role_id: adminRoleId }, token);
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

  const filter = {
    formFields: usersFilterFields({ options: { roles } }),
    initialData: {
      role_id: filterValues.role_id
    },
    isLoading: getAllUsers.isLoading,
    onSubmit: (values) => {
      setFilterValues({
        role_id: values.role_id
      });
    }
  };

  return (
    <div>
      <Card>
        <Skeleton loading={getAllUsers.isLoading}>
          <DataTableHeader model={UserModel} modul={Modul.USER} filter={filter} onStore={onCreate} selectedData={selectedData} onSearch={(values) => setFilterValues({ ...filterValues, search: values })} />
          <div className="w-full max-w-full overflow-x-auto">
            <DataTable data={users} columns={column} loading={getAllUsers.isLoading} map={(user) => ({ key: user.id, ...user })} handleSelectedData={(_, selectedRows) => setSelectedData(selectedRows)} pagination={pagination} />
          </div>
        </Skeleton>
      </Card>
    </div>
  );
};

export default Users;
