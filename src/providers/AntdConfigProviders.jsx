import { useStyle } from '@/hooks';
import { useTheme } from '@/hooks/useTheme';
import { ConfigProvider as StyleProvider, theme } from 'antd';
import PropTypes from 'prop-types';

export default function AntdConfigProviders({ children }) {
  const { styles } = useStyle();
  const { themeMode } = useTheme();
  return (
    <StyleProvider
      theme={{
        algorithm: themeMode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token:
          themeMode === 'dark'
            ? {
                colorBgBase: '#0B0B25',
                colorBgContainer: '#0B0B25',
                colorTextBase: '#f1f5f9',
                colorPrimary: '#3f41da',
                colorBorder: '#334155',
                fontFamily: 'Plus Jakarta Sans'
              }
            : {
                colorBgBase: '#ffffff',
                colorBgContainer: '#fff',
                colorTextBase: '#0f172a',
                colorPrimary: '#3f41da',
                colorBorder: '#e2e8f0',
                fontFamily: 'Plus Jakarta Sans'
              }
      }}
      button={{
        className: styles.customButton
      }}
      drawer={{
        padding: 0
      }}
    >
      {children}
    </StyleProvider>
  );
}
AntdConfigProviders.propTypes = {
  children: PropTypes.node.isRequired
};
