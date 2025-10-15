import { Action } from '@/constants';
import { useAuth } from '@/hooks';
import strings from '@/utils/strings';
import { InfoOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import PropTypes from 'prop-types';

export default function Detail({ title = strings('detail'), onClick, model, action = Action.READ }) {
  const { user } = useAuth();
  if (action !== Action.NONE && (!user || user.cant(action, model))) return null;

  return (
    <Tooltip title={title}>
      <Button variant="text" color="green" onClick={onClick} size="middle" icon={<InfoOutlined />} />
    </Tooltip>
  );
}

Detail.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  model: PropTypes.func.isRequired,
  action: PropTypes.oneOf(Object.values(Action))
};
