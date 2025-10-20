import Model from './Model';

export interface IncomingApiData {
  id: string;
  name: string;
  slug: string;
  permissions: {
    id: string;
    name: string;
    slug: string;
  }[];
}

export interface OutgoingApiData {
  name: string;
  slug: string;
  permission_ids: string[];
}

interface FormValues {
  nama: string;
  slug: string;
  id_permission: string[];
}

type ReturnType<S, From, To> = S extends From[] ? To[] : To;

export default class Roles extends Model {
  constructor(
    public id: string,
    public nama: string,
    public slug: string,
    public permission: {
      id: string;
      nama: string;
      slug: string;
    }[]
  ) {
    super();
  }

  public static fromApiData<T extends IncomingApiData | IncomingApiData[]>(apiData: T): ReturnType<T, IncomingApiData, Roles> {
    if (Array.isArray(apiData)) return apiData.map((object) => this.fromApiData(object)) as ReturnType<T, IncomingApiData, Roles>;
    return new Roles(
      apiData.id,
      apiData.name,
      apiData.slug,
      apiData.permissions.map((permission) => ({
        id: permission.id,
        nama: permission.name,
        slug: permission.slug
      }))
    ) as ReturnType<T, IncomingApiData, Roles>;
  }

  public static toApiData<T extends FormValues | FormValues[]>(roles: T): ReturnType<T, FormValues, OutgoingApiData> {
    if (Array.isArray(roles)) return roles.map((object) => this.toApiData(object)) as ReturnType<T, FormValues, OutgoingApiData>;
    const apiData: OutgoingApiData = {
      name: roles.nama,
      slug: roles.slug,
      permission_ids: roles.id_permission
    };

    return apiData as ReturnType<T, FormValues, OutgoingApiData>;
  }
}

Model.children.role = Roles;
