import { useAuth, useService } from '@/hooks';
import { AuthService } from '@/services';
import { Avatar, Card, Descriptions, Typography } from 'antd';
import React from 'react';

const Dashboard = () => {
  const { token } = useAuth();
  const { execute, ...getAllDashboard } = useService(AuthService.dashboard);

  const fetchDashboard = React.useCallback(() => {
    execute(token);
  }, [execute, token]);

  React.useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const dashboard = getAllDashboard.data ?? {};

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
                {dashboard?.trialSummary?.hasTrials ? (
                  <>
                    <span className="rounded-full bg-primary-500 px-5 py-1 text-xs text-white">Trial</span>
                    <span className="text-xs font-bold text-primary-500">Paket</span>
                  </>
                ) : (
                  <>
                    <span className="rounded-full bg-primary-500 px-5 py-1 text-xs text-white">Paket</span>
                    <span className="text-xs font-bold text-primary-500">Trial</span>
                  </>
                )}
              </div>
              <div className="flex flex-col gap-y-1 px-2">
                {dashboard?.trialSummary?.hasTrials ? (
                  <>
                    <Typography.Title level={5} style={{ margin: 0, color: '#111' }}>
                      Paket Trial
                    </Typography.Title>
                    <Typography.Text style={{ margin: 0, color: '#111' }}>
                      Sisa Hari: {dashboard?.trialSummary?.data?.remainingDays ?? 0}- Sisa Menit: {dashboard?.trialSummary?.data?.remainingMinutes ?? 0}
                    </Typography.Text>
                  </>
                ) : (
                  <>
                    <Typography.Title level={5} style={{ margin: 0, color: '#111' }}>
                      Paket Apa Kek Bgtu
                    </Typography.Title>
                    <Typography.Text style={{ margin: 0, color: '#111' }}>
                      Sisa Hari: {dashboard?.trialSummary?.data?.remainingDays ?? 0}- Sisa Menit: {dashboard?.trialSummary?.data?.remainingMinutes ?? 0}
                    </Typography.Text>
                  </>
                )}
              </div>
              <div className="flex flex-col gap-y-1 px-2">
                <Typography.Title level={1} style={{ margin: 0, color: '#111' }}>
                  {dashboard?.quotaSummary?.data?.remainingQuota ?? 0} Menit
                </Typography.Title>
                <Typography.Text style={{ margin: 0, color: '#111' }}>
                  Total Kuota : {dashboard?.quotaSummary?.data?.totalQuota ?? 0} Menit - Kuota Terpakai : {dashboard?.quotaSummary?.data?.usedQuota ?? 0} Menit
                </Typography.Text>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div className="col-span-4 flex flex-col gap-y-4">
        <Card>
          <div className="mb-2 inline-flex w-full items-center gap-x-4 rounded-md bg-primary-500 px-4 py-3">
            <Avatar>U</Avatar>
            <div className="flex flex-col">
              <Typography.Title level={5} style={{ margin: 0, color: '#fff' }}>
                {dashboard?.user?.name}
              </Typography.Title>
              <small className="text-white">dashboard</small>
            </div>
          </div>
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Email">{dashboard?.user?.email}</Descriptions.Item>
          </Descriptions>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
