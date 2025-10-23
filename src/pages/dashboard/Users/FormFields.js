import { InputType } from '@/constants';
import Modul from '@/constants/Modul';

export const formFields = () => [
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
    label: `Password ${Modul.USER}`,
    name: 'password',
    type: InputType.TEXT,
    extra: { type: 'password' },
    rules: [
      {
        required: true,
        message: `Password ${Modul.USER} harus diisi`
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
