import { Button, Typography } from 'antd';

const Home = () => {
  return (
    <>
      <section className="relative flex items-center justify-center bg-white dark:bg-dark-500">
        <div className="z-10 mx-auto flex min-h-screen w-full max-w-screen-xl flex-col items-center justify-center gap-x-10 px-6 py-28 text-3xl">
          <Typography.Title className="max-w-lg text-center">Lorem ipsum dolor sit amet consectetur adipiscing elit</Typography.Title>
          <Typography.Text className="mb-36 max-w-xl text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Typography.Text>
          <div className="inline-flex items-center gap-x-4">
            <Button variant="solid" color="primary" size="large" shape="round">
              Primary
            </Button>
            <Button variant="solid" size="large" shape="round">
              Seccondary
            </Button>
          </div>
        </div>
        <img src="/image_asset/background/hero_bg.png" className="absolute bottom-0 z-[5] w-11/12" />
      </section>
    </>
  );
};

export default Home;
