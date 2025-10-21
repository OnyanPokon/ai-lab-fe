import { Card, Descriptions, Typography } from 'antd';

const Dashboard = () => {
  return (
    <div className="grid w-full grid-cols-12 gap-4">
      <div className="col-span-8 flex flex-col gap-y-4">
        <div className="rounded-lg bg-white p-3 dark:bg-dark-500">
          <Card
            className="h-full"
            style={{
              backgroundImage: `url('/image_asset/background/package_card_bg.png')`,
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }}
          >
            <div className="flex flex-col gap-y-4">
              <div className="inline-flex w-full items-center gap-x-2 rounded-full bg-[#b5b5e3] p-1">
                <span className="rounded-full bg-primary-500 px-5 py-1 text-xs text-white">Paket</span>
                <span className="text-xs font-bold text-primary-500">Trial</span>
              </div>
              <div className="flex flex-col gap-y-1 px-2">
                <Typography.Title level={5} style={{ margin: 0, color: '#111' }}>
                  Paket Trial 30 Hari
                </Typography.Title>
                <Typography.Text style={{ margin: 0, color: '#111' }}>Coding Xplorer - Adaptive with Robot New - id</Typography.Text>
              </div>
              <div className="flex flex-col gap-y-1 px-2">
                <Typography.Title level={1} style={{ margin: 0, color: '#111' }}>
                  Rp. 0, 00
                </Typography.Title>
                <Typography.Text style={{ margin: 0, color: '#111' }}>Harga per menit</Typography.Text>
              </div>
            </div>
          </Card>
        </div>
        <Card>
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Berlaku Hingga">2024-12-10</Descriptions.Item>
            <Descriptions.Item label="Sisa Menit">134 Min</Descriptions.Item>
          </Descriptions>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
