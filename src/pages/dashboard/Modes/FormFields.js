import { InputType } from '@/constants';
import Modul from '@/constants/Modul';

export const formFields = () => [
  {
    label: `Nama ${Modul.MODE}`,
    name: 'nama',
    type: InputType.TEXT,
    rules: [
      {
        required: true,
        message: `Nama ${Modul.MODE} harus diisi`
      }
    ]
  },
  {
    label: `Role ${Modul.MODE}`,
    name: 'role',
    type: InputType.SELECT,
    options: [
      {
        label: 'System',
        value: 'system'
      },
      {
        label: 'User',
        value: 'user'
      },
      {
        label: 'Assistant',
        value: 'assistant'
      }
    ],
    rules: [
      {
        required: true,
        message: `Role ${Modul.MODE} harus diisi`
      }
    ]
  },
  {
    label: `Konteks ${Modul.MODE}`,
    name: 'konteks',
    type: InputType.LONGTEXT,
    rules: [
      {
        required: true,
        message: `Koteks ${Modul.MODE} harus diisi`
      }
    ]
  },
  {
    label: `Temperatur ${Modul.MODE}`,
    name: 'temperatur',
    type: InputType.NUMBER,
    rules: [
      {
        required: true,
        message: `Koteks ${Modul.MODE} harus diisi`
      }
    ],
    extra: {
      step: '0.1'
    }
  }
];
