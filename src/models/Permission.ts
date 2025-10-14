import { Action } from '@/constants';
import env from '@/utils/env';
import Model, { ModelChildren } from './Model';

export type ApiData = string;

interface ApiPermissionObject {
  id: string;
  name: string;
  slug: string;
}

export default class Permission extends Model {
  constructor(
    public name: string,
    public action: Action,
    public model: ModelChildren
  ) {
    super();
    if (!(model.prototype instanceof Model)) {
      throw new Error('Model must be an instance of Model');
    }
  }

  can(action: Action, model: ModelChildren) {
    return this.action.name === action.name && this.model === model;
  }
  static mergeUnique(rolePermissions: ApiPermissionObject[] = [], userPermissions: ApiPermissionObject[] = []): ApiPermissionObject[] {
    const combined = [...rolePermissions, ...userPermissions];
    return combined.filter((p, i, arr) => arr.findIndex((t) => t.slug === p.slug) === i);
  }

  static fromApiData(apiData: ApiData | ApiPermissionObject | (ApiData | ApiPermissionObject)[]): Permission | Permission[] {
    // 📦 Jika array
    if (Array.isArray(apiData)) {
      return apiData.flatMap((obj) => (typeof obj === 'string' ? this.fromApiData(obj) : this.fromApiData(obj.slug)));
    }

    if (typeof apiData === 'object' && apiData !== null && 'slug' in apiData) {
      return this.fromApiData(apiData.slug);
    }

    const slug = apiData.trim();
    const arrays = slug.includes('-') ? slug.split('-') : slug.split('_');
    const actionString = arrays.shift();
    const modelString = arrays.join('_');

    const action = Object.values(Action).find((act) => act.name.toLowerCase() === actionString?.toLowerCase()) ?? Action.NONE;

    env.dev(() => {
      if (!(modelString in Model.children)) {
        console.warn(`⚠️ Model "${modelString}" tidak ditemukan di Model.children`);
      }
    });

    const models = Model.children[modelString as keyof typeof Model.children];
    if (!models || (Array.isArray(models) && models.length === 0)) {
      return [];
    }

    if (Array.isArray(models)) {
      return models.map((model) => new Permission(slug, action, model));
    }
    return new Permission(slug, action, models);
  }

  static toApiData<T extends Permission | Permission[]>(permission: T): T extends Permission[] ? ApiData[] : ApiData {
    if (Array.isArray(permission)) {
      return permission.map((p) => this.toApiData(p)) as any;
    }
    return permission.name as any;
  }
}
