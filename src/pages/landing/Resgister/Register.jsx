import { useNotification, useService } from '@/hooks';
import { AuthService } from '@/services';
import { GoogleOutlined, UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography, Divider, Card } from 'antd';
import { Sparkles, Heart, Shield, MessageCircle, Star, Zap, Mail } from 'lucide-react';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const storeUser = useService(AuthService.register);
  const { success, error } = useNotification();

  const [form] = Form.useForm();
  const [registrationEmail, setRegistrationEmail] = React.useState(null);
  const [isVerificationStep, setIsVerificationStep] = React.useState(false);

  const handleRegistration = async (values) => {
    const { message, isSuccess } = await storeUser.execute({ ...values });
    if (isSuccess) {
      success('Berhasil', message);
      setRegistrationEmail(values.email);
      setIsVerificationStep(true);
      // Auto hide after 5 seconds (optional)
      // setTimeout(() => navigate('/login'), 5000);
    } else {
      error('Gagal', message);
    }
    return isSuccess;
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <>
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white p-4 dark:bg-dark-500 sm:p-6">
        {/* Background Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 transform animate-pulse rounded-full bg-gradient-to-br from-blue-200 to-indigo-300 opacity-50 mix-blend-multiply blur-3xl filter sm:h-96 sm:w-96"
            style={{ animationDuration: '12s', animationDelay: '4s' }}
          ></div>
        </div>

        {/* Floating Decorative Elements */}
        <div className="pointer-events-none absolute inset-0">
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

        {/* Grid Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        ></div>

        {/* Main Content */}
        <div className="relative z-10 mx-auto w-full max-w-md pt-24">
          {/* ========== FORM REGISTRATION VIEW ========== */}
          {!isVerificationStep ? (
            <>
              <div className="mb-6 text-center">
                <Typography.Title level={2} className="m-0 mb-2 text-2xl sm:text-3xl">
                  Buat Akun Baru
                </Typography.Title>
                <Typography.Text className="text-sm text-gray-600 dark:text-gray-300 sm:text-base">Mulai perjalanan curhatmu dengan aman</Typography.Text>
              </div>

              <Card className="shadow-2xl backdrop-blur-sm">
                <Button icon={<GoogleOutlined />} size="large" className="mb-4 w-full">
                  Daftar dengan Google
                </Button>
                <Divider plain className="text-sm text-gray-400">
                  atau daftar dengan email
                </Divider>
                <Form
                  form={form}
                  layout="vertical"
                  requiredMark={false}
                  onFinish={handleRegistration}
                  initialValues={{
                    email: location.state?.email || ''
                  }}
                >
                  <Form.Item
                    name="name"
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
                    <Input prefix={<MailOutlined className="text-gray-400" />} placeholder="Email" size="large" />
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
                    <Button type="primary" htmlType="submit" size="large" block loading={storeUser.isLoading}>
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
              <div className="mt-6 px-4 text-center text-xs text-gray-500">
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
            </>
          ) : (
            // ========== EMAIL VERIFICATION VIEW ==========
            <>
              <div className="mb-6 text-center">
                <Typography.Title level={2} className="m-0 mb-2 text-2xl sm:text-3xl">
                  Verifikasi Email
                </Typography.Title>
                <Typography.Text className="text-sm text-gray-600 dark:text-gray-300 sm:text-base">Kami telah mengirimkan link verifikasi ke emailmu</Typography.Text>
              </div>

              <Card className="shadow-2xl">
                {/* Success Icon Section */}
                <div className="mb-6 flex justify-center">
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-emerald-100">
                    <Mail className="h-10 w-10 animate-pulse text-green-600" />
                  </div>
                </div>

                {/* Main Message */}
                <div className="mb-8 text-center">
                  <Typography.Title level={4} className="m-0 mb-3 text-lg font-semibold">
                    Cek Email Kamu
                  </Typography.Title>
                  <div className="mb-4 rounded-lg bg-gray-100 p-4 dark:bg-dark-600">
                    <Typography.Text className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">Email dikirim ke:</Typography.Text>
                    <Typography.Text className="block text-base font-semibold text-primary-600 dark:text-primary-400">{registrationEmail}</Typography.Text>
                  </div>
                  <Typography.Text className="mb-6 block text-sm text-gray-600 dark:text-gray-300">Klik link verifikasi dalam email untuk mengaktifkan akun kamu. Link berlaku selama 24 jam.</Typography.Text>
                </div>

                {/* Divider */}
                <Divider />

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button type="primary" size="large" block onClick={handleBackToLogin}>
                    Lanjutkan ke Login
                  </Button>

                  <Button size="large" block onClick={() => window.open(`https://mail.google.com`, '_blank')}>
                    Buka Gmail
                  </Button>
                </div>

                {/* Spam Notice */}
                <div className="mt-6 rounded-lg bg-yellow-50 p-3 text-center dark:bg-yellow-900/20">
                  <Typography.Text className="text-xs text-gray-700 dark:text-gray-300">
                    Email tidak masuk? Cek folder <strong>Spam</strong> atau <strong>Promosi</strong>
                  </Typography.Text>
                </div>
              </Card>

              {/* Footer */}
              <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                <Typography.Text>
                  Belum menerima email?{' '}
                  <a href="#" className="font-semibold text-primary-500 hover:text-primary-600">
                    Kirim ulang
                  </a>
                </Typography.Text>
              </div>
            </>
          )}
        </div>

        {/* Custom Styles */}
      </section>
    </>
  );
};

export default Register;
