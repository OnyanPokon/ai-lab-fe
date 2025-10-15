import { GoogleOutlined, UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography, Divider, Card } from 'antd';
import { Sparkles, Heart, Shield, MessageCircle, Star, Zap } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Register = () => {
  const location = useLocation();
  return (
    <>
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white p-4 dark:bg-dark-500 sm:p-6">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 transform animate-pulse rounded-full bg-gradient-to-br from-blue-200 to-indigo-300 opacity-50 mix-blend-multiply blur-3xl filter sm:h-96 sm:w-96"
            style={{ animationDuration: '12s', animationDelay: '4s' }}
          ></div>
        </div>
        <div className="pointer-events-none absolute inset-0">
          {/* Floating Icon Cards */}
          <div className="absolute left-[5%] top-10 hidden sm:left-[10%] sm:top-20 sm:block" style={{ animation: 'float 3s ease-in-out infinite', animationDelay: '0s' }}>
            <Card className="shadow-lg" style={{ background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', borderRadius: '16px', padding: '12px' }}>
              <Sparkles size={28} className="text-indigo-600" />
            </Card>
          </div>

          <div className="absolute right-[8%] top-16 hidden sm:right-[15%] sm:top-32 md:block" style={{ animation: 'float 3s ease-in-out infinite', animationDelay: '1s' }}>
            <Card className="shadow-lg" style={{ background: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)', borderRadius: '16px', padding: '12px' }}>
              <Heart size={22} className="text-white" fill="currentColor" />
            </Card>
          </div>

          <div className="absolute bottom-20 left-[8%] hidden sm:bottom-32 sm:left-[15%] md:block" style={{ animation: 'float 3s ease-in-out infinite', animationDelay: '2s' }}>
            <Card className="shadow-lg" style={{ background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', borderRadius: '16px', padding: '12px' }}>
              <MessageCircle size={28} className="text-indigo-600" />
            </Card>
          </div>

          <div className="absolute bottom-24 right-[10%] hidden sm:bottom-40 sm:right-[12%] sm:block" style={{ animation: 'float 3s ease-in-out infinite', animationDelay: '1.5s' }}>
            <Card className="shadow-lg" style={{ background: 'linear-gradient(135deg, #fbbf24 0%, #f97316 100%)', borderRadius: '16px', padding: '10px' }}>
              <Star size={20} className="text-white" fill="currentColor" />
            </Card>
          </div>

          {/* Floating Emojis */}
          <div className="absolute right-[5%] top-32 hidden animate-bounce text-3xl sm:block sm:text-4xl" style={{ animationDuration: '3s', animationDelay: '0s' }}>
            💭
          </div>
          <div className="absolute left-[15%] top-[20%] hidden animate-bounce text-2xl sm:text-3xl md:block" style={{ animationDuration: '4s', animationDelay: '1s' }}>
            ✨
          </div>
          <div className="absolute bottom-[25%] right-[18%] hidden animate-bounce text-3xl sm:text-4xl md:block" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>
            💙
          </div>
          <div className="absolute right-[20%] top-[30%] hidden animate-bounce text-xl sm:text-2xl lg:block" style={{ animationDuration: '4.5s', animationDelay: '1.5s' }}>
            🌟
          </div>

          {/* Decorative Circles */}
          <div className="absolute left-1/4 top-16 h-2 w-2 animate-ping rounded-full bg-indigo-400 opacity-60 sm:h-3 sm:w-3" style={{ animationDuration: '3s' }}></div>
          <div className="absolute bottom-32 right-1/3 hidden h-2 w-2 animate-ping rounded-full bg-pink-400 opacity-60 sm:block" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
          <div className="absolute right-1/4 top-1/3 hidden h-3 w-3 animate-ping rounded-full bg-purple-400 opacity-60 sm:h-4 sm:w-4 md:block" style={{ animationDuration: '5s', animationDelay: '2s' }}></div>
        </div>

        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        ></div>
        <div className="relative z-10 mx-auto w-full max-w-md pt-24">
          <div className="mb-6 text-center">
            <Typography.Title level={2} className="m-0 mb-2 text-2xl sm:text-3xl">
              Buat Akun Baru
            </Typography.Title>
            <Typography.Text className="text-sm text-gray-600 dark:text-gray-300 sm:text-base">Mulai perjalanan curhatmu dengan aman</Typography.Text>
          </div>

          <Card className="backdrop-blur-sm">
            <Button icon={<GoogleOutlined />} size="large" className="mb-4 w-full">
              Daftar dengan Google
            </Button>
            <Divider plain className="text-sm text-gray-400">
              atau daftar dengan email
            </Divider>
            <Form layout="vertical" requiredMark={false}>
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: 'Username wajib diisi' },
                  { min: 3, message: 'Username minimal 3 karakter' }
                ]}
              >
                <Input prefix={<UserOutlined className="text-gray-400" />} placeholder="Username" size="large" />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Email wajib diisi' },
                  { type: 'email', message: 'Format email tidak valid' }
                ]}
              >
                <Input defaultValue={location.state.email || ''} prefix={<MailOutlined className="text-gray-400" />} placeholder="Email" size="large" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: 'Password wajib diisi' },
                  { min: 8, message: 'Password minimal 8 karakter' }
                ]}
              >
                <Input.Password prefix={<LockOutlined className="text-gray-400" />} placeholder="Password" size="large" />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                dependencies={['password']}
                rules={[
                  { required: true, message: 'Konfirmasi password wajib diisi' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Password tidak cocok'));
                    }
                  })
                ]}
              >
                <Input.Password prefix={<LockOutlined className="text-gray-400" />} placeholder="Konfirmasi Password" size="large" />
              </Form.Item>
              <Form.Item className="mb-4">
                <Button type="primary" htmlType="submit" size="large" block>
                  Buat Akun
                </Button>
              </Form.Item>
              <div className="text-center text-sm text-gray-600 dark:text-gray-300">
                Sudah punya akun?{' '}
                <a href="/login" className="font-semibold text-primary-500 hover:text-primary-600">
                  Masuk di sini
                </a>
              </div>
            </Form>
            <Divider className="my-5" />
            <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
              <div className="flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-green-500" />
                <span>Aman</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="h-4 w-4 text-pink-500" fill="currentColor" />
                <span>Privasi Terjaga</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-yellow-500" fill="currentColor" />
                <span>Gratis</span>
              </div>
            </div>
          </Card>
          <div className="mt-6 px-4 text-center text-xs text-gray-500" style={{ animation: 'fadeInUp 0.6s ease-out', animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards' }}>
            Dengan mendaftar, kamu menyetujui{' '}
            <a href="#" className="font-medium text-primary-500 underline hover:text-primary-600">
              Syarat & Ketentuan
            </a>{' '}
            dan{' '}
            <a href="#" className="font-medium text-primary-500 underline hover:text-primary-600">
              Kebijakan Privasi
            </a>{' '}
            kami.
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
