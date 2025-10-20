import { InputType } from '@/constants';
import Modul from '@/constants/Modul';

export const formFields = ({ options }) => [
  {
    label: `Nama ${Modul.USER}`,
    name: 'name',
    type: InputType.TEXT,
    rules: [
      {
        required: true,
        message: `Nama ${Modul.USER} harus diisi`
      }
    ]
  },
  {
    label: `Email ${Modul.USER}`,
    name: 'email',
    type: InputType.TEXT,
    rules: [
      {
        required: true,
        message: `Nama ${Modul.USER} harus diisi`
      },
      {
        type: 'email',
        message: 'Format email tidak valid'
      }
    ]
  },
  {
    label: `Peran ${Modul.USER}`,
    name: 'role_id',
    type: InputType.SELECT,
    options: options.roles.map((item) => ({
      label: item.nama,
      value: item.id
    })),
    rules: [
      {
        required: true,
        message: `Nama ${Modul.ROLES} harus diisi`
      }
    ]
  }
];

export const usersFilterFields = ({ options }) => [
  {
    label: `Peran ${Modul.USER}`,
    name: 'role_id',
    type: InputType.SELECT,
    options: options.roles.map((item) => ({
      label: item.nama,
      value: item.id
    }))
  }
];
