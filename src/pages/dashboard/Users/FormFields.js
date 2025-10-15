import { InputType } from '@/constants';
import Modul from '@/constants/Modul';

export const formFields = () => [
  {
    label: `Nama ${Modul.USER}`,
    name: 'nama',
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
  }
];
