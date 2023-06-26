import { FC } from 'react';
import { Spin as ASpin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import './Spin.scss';

export const Spin: FC<{ shadow?: boolean }> = ({ shadow }) => {
  return (
    <div className="spin">
      {shadow ? <div className="spin-shadow" /> : null}
      <ASpin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} />
    </div>
  );
};
