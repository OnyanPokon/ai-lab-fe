import { useAuth, useNotification, useService } from '@/hooks';
import { SettingsService } from '@/services';
import { Anchor, Button, Card, Form, Input, InputNumber, Switch } from 'antd';
import React from 'react';

const Settings = () => {
  const { token } = useAuth();
  const { success, error } = useNotification();
  const { execute, ...getAllSettings } = useService(SettingsService.getAll);
  const saveSettings = useService(SettingsService.update);

  const fetchSettings = React.useCallback(() => {
    execute(token);
  }, [execute, token]);

  React.useEffect(() => {
    fetchSettings();
  }, [fetchSettings, token]);

  const settings = React.useMemo(() => getAllSettings.data ?? [], [getAllSettings.data]);

  const anchorItems = [
    {
      key: 'trial-settings',
      href: '#trial-settings',
      title: 'Pengaturan Trial'
    }
  ];

  const renderInputByType = (key, value) => {
    const type = typeof value;
    if (type === 'number') {
      return <InputNumber className="w-full" placeholder={`Masukan ${key}`} size="large" min={0} />;
    } else if (!isNaN(value) && value !== '' && value !== null) {
      return <InputNumber className="w-full" placeholder={`Masukan ${key}`} size="large" min={0} />;
    } else if (type === 'boolean') {
      return <Switch />;
    } else {
      return <Input className="w-full" placeholder={`Masukan ${key}`} size="large" />;
    }
  };
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-10 flex w-full flex-col gap-y-4">
        <div className="flex w-full flex-col gap-y-6">
          {settings.map((item) => (
            <Card key={item.id} title={'Pengaturan 1'}>
              <Form
                initialValues={item}
                layout="vertical"
                className="w-full"
                onFinish={async (values) => {
                  const { message, isSuccess } = await saveSettings.execute(item.id, values, token);
                  if (isSuccess) {
                    success('Berhasil', message);
                  } else {
                    error('Gagal', message);
                  }
                  return isSuccess;
                }}
              >
                {Object.entries(item)
                  .filter(([key]) => !['id', 'created_at', 'updated_at'].includes(key))
                  .map(([key, value]) => (
                    <Form.Item
                      key={key}
                      label={key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                      name={key}
                      rules={[
                        {
                          required: true,
                          message: `Mohon masukan ${key}!`
                        }
                      ]}
                    >
                      {renderInputByType(key, value)}
                    </Form.Item>
                  ))}

                <Form.Item>
                  <Button loading={saveSettings.isLoading} type="primary" htmlType="submit">
                    Simpan Pengaturan
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          ))}
        </div>
      </div>
      <div className="col-span-2">
        <Anchor items={anchorItems} />
      </div>
    </div>
  );
};

export default Settings;
