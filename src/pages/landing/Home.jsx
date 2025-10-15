import { GoogleOutlined } from '@ant-design/icons';
import { Button, Card, Divider, Form, Input, Typography } from 'antd';
import { Sparkles, Heart, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const handleRegisterInput = (values) => {
    navigate('/register', { state: { email: values.email } });
  };
  return (
    <>
      <section className="relative flex items-center justify-center overflow-hidden bg-white dark:bg-dark-500">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-40 -top-40 h-96 w-96 animate-pulse rounded-full bg-gradient-to-br from-indigo-200 to-purple-300 opacity-50 mix-blend-multiply blur-3xl filter" style={{ animationDuration: '8s' }}></div>
          <div
            className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform animate-pulse rounded-full bg-gradient-to-br from-blue-200 to-indigo-300 opacity-50 mix-blend-multiply blur-3xl filter"
            style={{ animationDuration: '12s', animationDelay: '4s' }}
          ></div>
        </div>

        <div className="pointer-events-none absolute inset-0 hidden md:block">
          <div className="absolute left-[10%] top-20" style={{ animation: 'float 3s ease-in-out infinite', animationDelay: '0s' }}>
            <Card className="shadow-lg" style={{ background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', borderRadius: '16px', padding: '12px' }}>
              <Sparkles size={32} className="text-indigo-600" />
            </Card>
          </div>

          <div className="absolute right-[15%] top-32" style={{ animation: 'float 3s ease-in-out infinite', animationDelay: '1s' }}>
            <Card className="shadow-lg" style={{ background: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)', borderRadius: '16px', padding: '12px' }}>
              <Heart size={24} className="text-white" fill="currentColor" />
            </Card>
          </div>

          <div className="absolute bottom-32 left-[15%]" style={{ animation: 'float 3s ease-in-out infinite', animationDelay: '2s' }}>
            <Card className="shadow-lg" style={{ background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', borderRadius: '16px', padding: '12px' }}>
              <GoogleOutlined style={{ fontSize: '32px', color: '#4f46e5' }} />
            </Card>
          </div>

          <div className="absolute bottom-40 right-[12%]" style={{ animation: 'float 3s ease-in-out infinite', animationDelay: '1.5s' }}>
            <Card className="shadow-lg" style={{ background: 'linear-gradient(135deg, #fbbf24 0%, #f97316 100%)', borderRadius: '16px', padding: '12px' }}>
              <Shield size={24} className="text-white" />
            </Card>
          </div>

          <div className="absolute right-[8%] top-40 animate-bounce text-4xl" style={{ animationDuration: '3s', animationDelay: '0s' }}>
            💭
          </div>
          <div className="absolute left-[20%] top-1/3 animate-bounce text-3xl" style={{ animationDuration: '4s', animationDelay: '1s' }}>
            ✨
          </div>
          <div className="absolute bottom-1/3 right-[20%] animate-bounce text-4xl" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>
            💙
          </div>
          <div className="absolute right-[25%] top-1/4 animate-bounce text-2xl" style={{ animationDuration: '4.5s', animationDelay: '1.5s' }}>
            🌟
          </div>

          <div className="absolute left-1/4 top-10 h-3 w-3 animate-ping rounded-full bg-indigo-400 opacity-60" style={{ animationDuration: '3s' }}></div>
          <div className="absolute bottom-20 right-1/3 h-2 w-2 animate-ping rounded-full bg-pink-400 opacity-60" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
          <div className="absolute right-1/4 top-1/3 h-4 w-4 animate-ping rounded-full bg-purple-400 opacity-60" style={{ animationDuration: '5s', animationDelay: '2s' }}></div>
        </div>

        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        ></div>

        <div className="z-10 mx-auto flex min-h-screen w-full max-w-screen-xl flex-col items-center justify-center gap-x-10 px-4 py-20 sm:px-6 sm:py-28">
          <Typography.Title className="max-w-lg text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Lorem ipsum dolor sit amet consectetur adipiscing elit</Typography.Title>
          <Typography.Text className="mb-12 max-w-xl px-4 text-center text-base sm:mb-24 sm:text-lg md:text-xl lg:mb-36">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography.Text>
          <div className="flex w-full flex-col items-center gap-3 px-4 sm:w-auto sm:flex-row sm:gap-x-4 sm:px-0">
            <Button variant="solid" color="primary" size="large" shape="round" className="w-full sm:w-auto">
              Primary
            </Button>
            <Button variant="solid" size="large" shape="round" className="w-full sm:w-auto">
              Seccondary
            </Button>
          </div>
        </div>
        <img src="/image_asset/background/hero_bg.png" className="absolute bottom-0 z-[5] hidden w-11/12 sm:block" />
      </section>

      <section className="flex min-h-screen items-center justify-center bg-white p-4 dark:bg-dark-500 sm:p-6 lg:p-8">
        <div className="w-full max-w-7xl">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="order-2 space-y-6 sm:space-y-8 lg:order-1">
              <div className="flex flex-col gap-y-3 sm:gap-y-4">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary-500 bg-white px-3 py-2 text-xs font-medium text-primary-500 sm:px-4 sm:text-sm">
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>Curhat Aman & Nyaman</span>
                </div>
                <Typography.Title style={{ margin: 0 }} className="max-w-sm text-3xl sm:text-4xl lg:text-5xl">
                  Certakan Sekarang
                </Typography.Title>
                <Typography.Title level={5} style={{ margin: 0 }} className="text-base sm:text-lg">
                  Gema membantu masalahmu dengan dukungan AI yang memahami perasaanmu. Mulai percakapan rahasia tanpa penilaian.
                </Typography.Title>
              </div>

              <Card className="w-full">
                <Button icon={<GoogleOutlined />} size="large" className="w-full text-sm sm:text-base">
                  Lanjutkan Dengan Google
                </Button>
                <Divider plain>atau</Divider>
                <Form layout="vertical" onFinish={handleRegisterInput}>
                  <div className="mb-2 flex flex-col gap-y-3">
                    <Form.Item
                      name="email"
                      className="m-0"
                      rules={[
                        {
                          type: 'email',
                          message: 'Format email tidak valid'
                        }
                      ]}
                    >
                      <Input placeholder="Masukan Email" size="large" className="text-sm sm:text-base" />
                    </Form.Item>
                    <Form.Item className="m-0">
                      <Button block type="primary" htmlType="submit" size="large" className="text-sm sm:text-base">
                        Lanjutkan Dengan Email
                      </Button>
                    </Form.Item>
                  </div>
                  <small className="text-xs sm:text-sm">
                    Dengan melanjutkan, Anda menyetujui{' '}
                    <a href="#" className="text-color-primary-500 hover:text-color-primary-200 font-bold underline">
                      Syarat & Ketentuan
                    </a>{' '}
                    dan{' '}
                    <a href="#" className="text-color-primary-500 hover:text-color-primary-200 font-bold underline">
                      Kebijakan Privasi
                    </a>{' '}
                    kami.
                  </small>
                </Form>
              </Card>

              <div className="flex flex-col items-start gap-4 text-sm sm:flex-row sm:items-center sm:gap-6">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-indigo-600 sm:h-5 sm:w-5" />
                  <Typography.Text className="text-sm">100% Rahasia</Typography.Text>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-indigo-600 sm:h-5 sm:w-5" />
                  <Typography.Text className="text-sm">Tanpa Penilaian</Typography.Text>
                </div>
              </div>
            </div>
            <div className="relative order-1 hidden md:block lg:order-2">
              <div className="relative h-[400px] sm:h-[500px] lg:h-[600px]">
                <div className="absolute inset-0">
                  <div
                    className="absolute right-0 top-0 h-48 w-48 animate-pulse rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 opacity-70 mix-blend-multiply blur-3xl filter sm:h-60 sm:w-60 lg:h-72 lg:w-72"
                    style={{ animationDuration: '4s' }}
                  ></div>
                  <div
                    className="absolute bottom-0 left-0 h-48 w-48 animate-pulse rounded-full bg-gradient-to-br from-pink-400 to-rose-600 opacity-70 mix-blend-multiply blur-3xl filter sm:h-60 sm:w-60 lg:h-72 lg:w-72"
                    style={{ animationDuration: '5s', animationDelay: '1s' }}
                  ></div>
                  <div
                    className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 transform animate-pulse rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 opacity-70 mix-blend-multiply blur-3xl filter sm:h-60 sm:w-60 lg:h-72 lg:w-72"
                    style={{ animationDuration: '6s', animationDelay: '2s' }}
                  ></div>
                </div>
                <div className="relative z-10">
                  <div className="animate-float absolute right-4 top-8 max-w-[200px] sm:right-8 sm:max-w-xs lg:right-12" style={{ animationDelay: '0s' }}>
                    <div className="transform rounded-3xl rounded-tr-md bg-white p-4 shadow-2xl transition-transform duration-300 hover:scale-105 dark:bg-primary-800 sm:p-6">
                      <p className="text-xs leading-relaxed text-gray-700 dark:text-white sm:text-sm">Aku lagi bingung banget nih sama hidupku... 😔</p>
                      <div className="mt-3 flex items-center gap-2">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
                        <span className="text-xs text-gray-400">11:23</span>
                      </div>
                    </div>
                  </div>
                  <div className="animate-float absolute left-2 top-28 max-w-[220px] sm:left-4 sm:top-36 sm:max-w-sm lg:left-8" style={{ animationDelay: '0.5s' }}>
                    <div className="transform rounded-3xl rounded-tl-md bg-gradient-to-br from-indigo-600 to-purple-600 p-4 shadow-2xl transition-transform duration-300 hover:scale-105 sm:p-6">
                      <div className="mb-3 flex items-start gap-2 sm:gap-3">
                        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm sm:h-8 sm:w-8">
                          <Sparkles className="h-3 w-3 text-white sm:h-4 sm:w-4" />
                        </div>
                        <div>
                          <p className="text-xs leading-relaxed text-white sm:text-sm">Aku mengerti perasaanmu. Cerita aja dulu, aku siap mendengarkan tanpa menghakimi 💙</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="h-2 w-2 animate-bounce rounded-full bg-white/60" style={{ animationDelay: '0s' }}></div>
                          <div className="h-2 w-2 animate-bounce rounded-full bg-white/60" style={{ animationDelay: '0.2s' }}></div>
                          <div className="h-2 w-2 animate-bounce rounded-full bg-white/60" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                        <span className="ml-auto text-xs text-white/70">11:24</span>
                      </div>
                    </div>
                  </div>
                  <div className="animate-float absolute right-6 top-60 max-w-[180px] sm:right-12 sm:top-72 sm:max-w-xs lg:right-16 lg:top-80" style={{ animationDelay: '1s' }}>
                    <div className="transform rounded-3xl rounded-tr-md bg-white p-4 shadow-2xl transition-transform duration-300 hover:scale-105 dark:bg-primary-800 sm:p-6">
                      <p className="text-xs leading-relaxed text-gray-700 dark:text-white sm:text-sm">Terima kasih sudah mau dengerin ❤️</p>
                      <div className="mt-3 flex items-center gap-2">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-success-500"></div>
                        <span className="text-xs text-gray-400">11:25</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute left-2 top-12 animate-bounce text-2xl sm:left-4 sm:top-16 sm:text-3xl lg:text-4xl" style={{ animationDuration: '3s', animationDelay: '0s' }}>
                  💭
                </div>
                <div className="absolute right-2 top-36 animate-bounce text-xl sm:right-4 sm:top-48 sm:text-2xl lg:text-3xl" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                  ✨
                </div>
                <div className="absolute bottom-24 left-8 animate-bounce text-2xl sm:bottom-32 sm:left-12 sm:text-3xl lg:text-4xl" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>
                  💙
                </div>
                <div className="absolute bottom-36 right-12 animate-bounce text-xl sm:bottom-48 sm:right-20 sm:text-2xl lg:text-3xl" style={{ animationDuration: '4.5s', animationDelay: '1.5s' }}>
                  🌟
                </div>
                <div className="animate-float absolute bottom-4 left-2 rounded-xl bg-white/90 p-3 shadow-xl backdrop-blur-md dark:bg-primary-800 sm:bottom-8 sm:left-4 sm:rounded-2xl sm:p-4" style={{ animationDelay: '0.3s' }}>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-success-400 to-success-600 sm:h-10 sm:w-10 sm:rounded-xl lg:h-12 lg:w-12">
                      <Shield className="h-4 w-4 text-white sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-medium text-gray-500 dark:text-white sm:text-xs">100% Aman</p>
                      <p className="text-sm font-bold text-gray-900 dark:text-white sm:text-base lg:text-lg">Privasi Terjaga</p>
                    </div>
                  </div>
                </div>

                <div className="animate-float absolute bottom-16 right-2 rounded-xl bg-white/90 p-3 shadow-xl backdrop-blur-md dark:bg-primary-800 sm:bottom-24 sm:right-4 sm:rounded-2xl sm:p-4" style={{ animationDelay: '0.7s' }}>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-danger-400 to-danger-500 sm:h-10 sm:w-10 sm:rounded-xl lg:h-12 lg:w-12">
                      <Heart className="h-4 w-4 fill-current text-white sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-medium text-gray-500 dark:text-white sm:text-xs">Tersedia 24/7</p>
                      <p className="text-sm font-bold text-gray-900 dark:text-white sm:text-base lg:text-lg">Selalu Ada</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
