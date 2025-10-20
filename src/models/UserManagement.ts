import Model from './Model';

export interface IncomingApiData {
  id: number;
  name: string;
  email: string;
  role: {
    id: string;
    name: string;
    slug: string;
  };
  created_at: string;
  updated_at: string;
}

type ReturnType<S, From, To> = S extends From[] ? To[] : To;

export default class UserManagement extends Model {
  constructor(
    public id: number,
    public nama: string,
    public email: string,
    public role: {
      id: string;
      nama: string;
      slug: string;
    },
    public created_at: string,
    public updated_at: string
  ) {
    super();
  }

  public static fromApiData<T extends IncomingApiData | IncomingApiData[]>(apiData: T): ReturnType<T, IncomingApiData, UserManagement> {
    if (Array.isArray(apiData)) return apiData.map((object) => this.fromApiData(object)) as ReturnType<T, IncomingApiData, UserManagement>;
    return new UserManagement(
      apiData.id,
      apiData.name,
      apiData.email,
      {
        id: apiData.role.id,
        nama: apiData.role.name,
        slug: apiData.role.slug
      },
      apiData.created_at,
      apiData.updated_at
    ) as ReturnType<T, IncomingApiData, UserManagement>;
  }
}

Model.children.user = UserManagement;
