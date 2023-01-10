import {ImageProps} from 'react-native';

export interface UserList {
  email: string;
  password: string;
  image: ImageProps['source'];
}

const lucasPicture = require('../assets/images/lucas-picture.jpeg');
const matheusPicture = require('../assets/images/matheus-picture.jpeg');
const alanPicture = require('../assets/images/alan-picture.jpeg');
const victorPicture = require('../assets/images/victor-picture.jpeg');
const viniciusPicture = require('../assets/images/vinicius-picture.jpeg');
const juliaPicture = require('../assets/images/julia-picture.jpeg');
const mariaPicture = require('../assets/images/maria-picture.jpeg');
const talitaPicture = require('../assets/images/talita-picture.jpeg');
const ericaPicture = require('../assets/images/erica-picture.jpeg');

export const userList: UserList[] = [
  {
    email: 'email: lucas@taqtile.com.br',
    image: lucasPicture,
    password: 'senha: lucas1234',
  },
  {
    email: 'email: matheus@taqtile.com.br',
    image: matheusPicture,
    password: 'senha: matheus1234',
  },
  {
    email: 'email: alan@taqtile.com.br',
    image: alanPicture,
    password: 'senha: alan1234',
  },
  {
    email: 'email: victor@taqtile.com.br',
    image: victorPicture,
    password: 'senha: victor1234',
  },
  {
    email: 'email: vinicius@taqtile.com.br',
    image: viniciusPicture,
    password: 'senha: vinicius1234',
  },
  {
    email: 'email: julia@taqtile.com.br',
    image: juliaPicture,
    password: 'senha: julia1234',
  },
  {
    email: 'email: maria@taqtile.com.br',
    image: mariaPicture,
    password: 'senha: maria1234',
  },
  {
    email: 'email: talita@taqtile.com.br',
    image: talitaPicture,
    password: 'senha: talita1234',
  },
  {
    email: 'email: erica@taqtile.com.br',
    image: ericaPicture,
    password: 'senha: erica1234',
  },
];
