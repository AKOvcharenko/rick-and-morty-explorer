import classNames from 'classnames';
import { Tag, TagProps } from 'antd';
import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Spin } from 'components';
import { useGetCharacter } from 'hooks';
import { CharacterState } from 'consts';

import './Character.scss';

const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const STATUS_COLORS: { [key: string]: TagProps['color'] } = {
  [CharacterState.Alive]: 'green',
  [CharacterState.Dead]: 'red',
  [CharacterState.Unknown]: 'gray',
};

export const Character: FC = () => {
  const { characterId } = useParams();
  const { data, isFetching } = useGetCharacter({ characterId });
  const [randBackground] = useState(randomIntFromInterval(1, 7));

  return (
    <div
      className={classNames(
        'page',
        'character-page',
        `rand-background-${randBackground}`
      )}
    >
      {isFetching ? <Spin shadow /> : null}
      {data ? (
        <div className="character-wrapper">
          <div className="character-image">
            <img alt={data.name} src={data.image} />
          </div>
          <div className="character-info">
            <h2>
              {data.name}{' '}
              <Tag key={data.status} color={STATUS_COLORS[data.status]}>
                {data.status}
              </Tag>
            </h2>
            <p>
              <span className="bold">Origin: </span>
              <span>{data.location.name}</span>
            </p>
            <p>
              <span className="bold">Species: </span>
              <span>{`${data.species}/${data.gender}`}</span>
            </p>
            <p className="bold">
              <span>Episodes: </span>
              {data.episode.map(({ episode, name, id }) => (
                <Tag key={id} color="blue">{`${name}(${episode})`}</Tag>
              ))}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};
