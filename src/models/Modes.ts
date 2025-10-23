import Model from './Model';

export interface IncomingApiData {
  id: string;
  name: string;
  context: string;
  temperature: number;
}

export interface OutgoingApiData {
  name: string;
  context: string;
  temperature: number;
}

interface FormValue {
  nama: string;
  konteks: string;
  temperatur: number;
}

type ReturnType<S, From, To> = S extends From[] ? To[] : To;

export default class Modes extends Model {
  constructor(
    public id: string,
    public nama: string,
    public konteks: string,
    public temperatur: number
  ) {
    super();
  }

  public static fromApiData<T extends IncomingApiData | IncomingApiData[]>(apiData: T): ReturnType<T, IncomingApiData, Modes> {
    if (Array.isArray(apiData)) return apiData.map((object) => this.fromApiData(object)) as ReturnType<T, IncomingApiData, Modes>;
    return new Modes(apiData.id, apiData.name, apiData.context, apiData.temperature) as ReturnType<T, IncomingApiData, Modes>;
  }

  public static toApiData<T extends FormValue | FormValue[]>(modes: T): ReturnType<T, FormValue, OutgoingApiData> {
    if (Array.isArray(modes)) return modes.map((object) => this.toApiData(object)) as ReturnType<T, FormValue, OutgoingApiData>;
    const apiData: OutgoingApiData = {
      name: modes.nama,
      context: modes.konteks,
      temperature: modes.temperatur
    };

    return apiData as ReturnType<T, FormValue, OutgoingApiData>;
  }
}

Model.children.mode = Modes;
