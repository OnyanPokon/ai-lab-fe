import { Delete, Edit } from '@/components/dashboard/button';
import Modul from '@/constants/Modul';
import { useAuth, useCrudModal, useNotification, usePagination, useService } from '@/hooks';
import useAbortableService from '@/hooks/useAbortableService';
import { ModesService } from '@/services';
import { Card, Space } from 'antd';
import { Modes as ModeModels } from '@/models';
import React from 'react';
import { Action } from '@/constants';
import { DataTable, DataTableHeader } from '@/components';
import { formFields } from './FormFields.js';

const { DELETE, UPDATE, READ } = Action;

const Modes = () => {
  const modal = useCrudModal();
  const { success, error } = useNotification();
  const { token, user, onUnauthorized } = useAuth();
  const { execute, ...getAllModes } = useAbortableService(ModesService.getAll, { onUnauthorized });

  const pagination = usePagination({ totalData: getAllModes.totalData });
  const [filterValues, setFilterValues] = React.useState({ search: '' });

  const fetchModes = React.useCallback(() => {
    execute({
      token: token,
      page: pagination.page,
      per_page: pagination.per_page,
      search: filterValues.search
    });
  }, [execute, filterValues.search, pagination.page, pagination.per_page, token]);

  React.useEffect(() => {
    fetchModes();
  }, [fetchModes, token]);

  const [selectedData, setSelectedData] = React.useState([]);

  const modes = getAllModes.data ?? [];

  console.log(modes);

  const storeMode = useService(ModesService.store, onUnauthorized);
  const updateMode = useService(ModesService.update, onUnauthorized);
  const deleteMode = useService(ModesService.delete, onUnauthorized);

  const column = [
    {
      title: 'Nama',
      dataIndex: 'nama',
      sorter: (a, b) => a.nama.length - b.nama.length,
      searchable: true
    },
    {
      title: 'Konteks',
      dataIndex: 'konteks',
      sorter: (a, b) => a.konteks.length - b.konteks.length,
      searchable: true
    },
    {
      title: 'Temperatur',
      dataIndex: 'temperatur',
      sorter: (a, b) => a.temperatur.length - b.temperatur.length,
      searchable: true
    }
  ];

  if (user && user.eitherCan([UPDATE, ModeModels], [DELETE, ModeModels], [READ, ModeModels])) {
    column.push({
      title: 'Aksi',
      render: (_, record) => (
        <Space size="small">
          <Edit
            title={`Edit ${Modul.MODE}`}
            model={ModeModels}
            onClick={() => {
              modal.edit({
                title: `Edit ${Modul.MODE}`,
                data: record,
                formFields: formFields(),
                onSubmit: async (values) => {
                  const { message, isSuccess } = await updateMode.execute(record.id, values, token);
                  if (isSuccess) {
                    success('Berhasil', message);
                    fetchModes({ token: token, page: pagination.page, per_page: pagination.per_page });
                  } else {
                    error('Gagal', message);
                  }
                  return isSuccess;
                }
              });
            }}
          />
          <Delete
            title={`Delete ${Modul.MODE}`}
            model={ModeModels}
            onClick={() => {
              modal.delete.default({
                title: `Delete ${Modul.MODE}`,
                data: record,
                onSubmit: async () => {
                  const { isSuccess, message } = await deleteMode.execute(record.id, token);
                  if (isSuccess) {
                    success('Berhasil', message);
                    fetchModes({ token: token, page: pagination.page, per_page: pagination.per_page });
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
      title: `Tambah ${Modul.MODE}`,
      formFields: formFields,
      onSubmit: async (values) => {
        const { message, isSuccess } = await storeMode.execute(values, token);
        if (isSuccess) {
          success('Berhasil', message);
          fetchModes({ token: token, page: pagination.page, per_page: pagination.per_page });
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
        <DataTableHeader model={ModeModels} modul={Modul.MODE} onStore={onCreate} selectedData={selectedData} onSearch={(values) => setFilterValues({ ...filterValues, search: values })} />
        <div className="w-full max-w-full overflow-x-auto">
          <DataTable data={modes} columns={column} loading={getAllModes.isLoading} map={(mode) => ({ key: mode.id, ...mode })} handleSelectedData={(_, selectedRows) => setSelectedData(selectedRows)} pagination={pagination} />
        </div>
      </Card>
    </div>
  );
};

export default Modes;
