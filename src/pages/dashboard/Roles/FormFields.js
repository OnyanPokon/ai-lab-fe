import { InputType } from '@/constants';
import Modul from '@/constants/Modul';

export const formFields = ({ options }) => [
  {
    label: `Nama ${Modul.ROLES}`,
    name: 'nama',
    type: InputType.TEXT,
    rules: [
      {
        required: true,
        message: `Nama ${Modul.ROLES} harus diisi`
      }
    ]
  },
  {
    label: `Permissions ${Modul.ROLES}`,
    name: 'id_permission',
    type: InputType.SELECT,
    mode: 'multiple',
    options: options.permissions.map((item) => ({
      label: item.name,
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
