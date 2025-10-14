type ModelKeys = 'user';

export default abstract class Model {
  static children: { [key in ModelKeys]?: ModelChildren | ModelChildren[] } = {
    user: undefined
  };
}

export type ModelChildren = new (...args: any[]) => Model;
