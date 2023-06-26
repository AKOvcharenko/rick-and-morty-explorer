import { CharacterState } from 'consts';

export type CharacterT = {
  episode: {
    episode: string;
    name: string;
    id: string;
  }[];
  gender: string;
  image: string;
  location: {
    name: string;
  };
  status: CharacterState;
  species: string;
  name: string;
};
