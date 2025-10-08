import { FacebookFilled, InstagramFilled, YoutubeFilled } from '@ant-design/icons';
import { Button, Image, Typography } from 'antd';

const Footer = () => {
  return (
    <footer className="w-full border-t bg-white dark:border-dark-400 dark:bg-dark-600">
      <div className="mx-auto w-full max-w-screen-xl px-4 pb-4 pt-24">
        <div className="grid w-full grid-cols-6 gap-12">
          <div className="col-span-6 flex flex-col gap-y-6 lg:col-span-2">
            <Image width={64} src="" />
            <small className="dark:text-white">Lorem ipsum Dolor Sit Amet</small>
            <div className="flex items-center gap-x-2">
              <Button type="primary" shape="circle" icon={<InstagramFilled />} />
              <Button type="primary" shape="circle" icon={<FacebookFilled />} />
              <Button type="primary" shape="circle" icon={<YoutubeFilled />} />
            </div>
          </div>
          <div className="col-span-6 grid grid-cols-12 gap-y-12 lg:col-span-4">
            <div className="col-span-12 flex flex-col gap-y-3 lg:col-span-4">
              <b className="dark:text-white">Quick Access</b>
              <Typography.Text>Home</Typography.Text>
              <Typography.Text>About</Typography.Text>
              <Typography.Text>Service</Typography.Text>
              <Typography.Text>Testimonial</Typography.Text>
              <Typography.Text>Contact</Typography.Text>
            </div>
            <div className="col-span-12 flex flex-col gap-y-3 lg:col-span-4">
              <b className="dark:text-white">Service</b>
              <Typography.Text>Web Design</Typography.Text>
              <Typography.Text>Web Development</Typography.Text>
              <Typography.Text>Seo Optimation</Typography.Text>
              <Typography.Text>Blog Writing</Typography.Text>
            </div>
            <div className="col-span-12 flex flex-col gap-y-3 lg:col-span-4">
              <b className="dark:text-white">Help & Support</b>
              <Typography.Text>Support Center</Typography.Text>
              <Typography.Text>Live Chat</Typography.Text>
              <Typography.Text>FAQ</Typography.Text>
              <Typography.Text>Terms & Condition</Typography.Text>
            </div>
          </div>
          <div className="col-span-6 flex items-center justify-center border-t py-6 dark:border-dark-400">
            <small className="text-gray-500">Design And Develop by Rafiq Daud</small>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
