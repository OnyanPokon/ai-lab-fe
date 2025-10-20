type ModelKeys = 'user' | 'role';

export default abstract class Model {
  static children: { [key in ModelKeys]?: ModelChildren | ModelChildren[] } = {
    user: undefined,
    role: undefined
  };
}

export type ModelChildren = new (...args: any[]) => Model;
