import { Action, Role } from '@/constants';
import Model, { ModelChildren } from './Model';
import Permission from './Permission';

export interface IncomingApiData {
  id: string;
  email: string;
  name: string;
  role: {
    id: string;
    name: string;
    slug: string;
    permissions: {
      id: string;
      name: string;
      slug: string;
    }[];
  };
  permissions: {
    id: string;
    name: string;
    slug: string;
  }[];
}

export interface untranslatedIncoming {}

interface OutgoingApiData {
  email: IncomingApiData['email'];
}

export default class User extends Model {
  constructor(
    public id: string,
    public email: string,
    public name: string,
    public token: string,
    public role: Role,
    public roleId: string,
    public permissions: Permission[] = []
  ) {
    super();
  }

  is(role: Role) {
    return this.role === role;
  }

  can(action: Action, model: ModelChildren) {
    return this.permissions.some((permission) => permission.can(action, model));
  }

  cant(action: Action, model: ModelChildren) {
    return !this.can(action, model);
  }

  eitherCan(...permissions: [Action, ModelChildren][]) {
    return permissions.some(([action, model]) => this.can(action, model));
  }

  cantDoAny(...permissions: [Action, ModelChildren][]) {
    return !this.eitherCan(...permissions);
  }

  static fromApiData(apiData: IncomingApiData, token: string): User {
    const roles = {
      Administrator: Role.ADMIN
    };
    const role = roles[apiData.role.name as keyof typeof roles] || null;
    const uniquePermissions = Permission.mergeUnique(apiData.role?.permissions, apiData.permissions);

    const rawPermissions = Permission.fromApiData(uniquePermissions);
    const permissions = Array.isArray(rawPermissions) ? rawPermissions : [rawPermissions];

    return new User(apiData.id, apiData.email, apiData.name, token, role, apiData.role.id, permissions);
  }

  static toApiData(user: User): OutgoingApiData {
    return {
      email: user.email
    };
  }
}

Model.children.user = User;
