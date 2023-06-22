import { FC } from 'react';
import { Card } from 'antd';
import { capitalize } from 'lodash-es';
import { Link } from 'react-router-dom';

import { CharacterState } from 'consts';
import './CharacterCard.scss';

const { Meta } = Card;

type CharacterCardT = {
  id: string;
  name: string;
  image: string;
  status: CharacterState;
};

export const CharacterCard: FC<CharacterCardT> = ({
  id,
  name,
  image,
  status,
}) => {
  return (
    <Link
      key={id}
      to={`/character/${id}`}
      title={`Status is ${capitalize(status)}`}
    >
      <Card
        hoverable
        rootClassName={status}
        className="character-card"
        cover={<img alt={name} src={image} />}
      >
        <Meta title={name} />
      </Card>
    </Link>
  );
};
