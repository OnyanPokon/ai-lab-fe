type ModelKeys = 'user' | 'role' | 'mode';

export default abstract class Model {
  static children: { [key in ModelKeys]?: ModelChildren | ModelChildren[] } = {
    user: undefined,
    role: undefined,
    mode: undefined
  };
}

export type ModelChildren = new (...args: any[]) => Model;
