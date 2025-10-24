import { useAuth, usePagination } from '@/hooks';
import useAbortableService from '@/hooks/useAbortableService';
import { ModesService } from '@/services';
import { Card, Typography } from 'antd';
import React from 'react';

const ModeList = () => {
  const { token, onUnauthorized } = useAuth();
  const { execute, ...getAllModes } = useAbortableService(ModesService.getAll, { onUnauthorized });

  const pagination = usePagination({ totalData: getAllModes.totalData });

  const fetchModes = React.useCallback(() => {
    execute({
      token: token,
      page: pagination.page,
      per_page: pagination.per_page
    });
  }, [execute, pagination.page, pagination.per_page, token]);

  React.useEffect(() => {
    fetchModes();
  }, [fetchModes, token]);

  const modes = getAllModes.data ?? [];

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 mb-2 flex flex-col gap-y-2 px-4">
        <Typography.Title level={4} style={{ margin: 0 }}>
          Daftar Mode
        </Typography.Title>
        <Typography.Text style={{ margin: 0 }}>Daftar mode yang tersedia</Typography.Text>
      </div>
      {modes.map((item) => (
        <Card
          style={{
            backgroundImage: `url('/image_asset/background/mode_card_bg.png')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
          key={item.id}
          className="col-span-4 border-2 transition-colors hover:border-primary-500"
        >
          <div className="flex flex-col gap-y-2">
            <Typography.Text style={{ margin: 0 }}>{item.role}</Typography.Text>
            <Typography.Title level={4} style={{ margin: 0 }}>
              {item.nama}
            </Typography.Title>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ModeList;
