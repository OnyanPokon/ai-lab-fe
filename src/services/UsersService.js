/* eslint-disable no-unused-vars */
import { UserManagement } from '@/models';
import api from '@/utils/api';

export default class UsersService {
  /**
   * @param {string} token
   * @returns {Promise<{
   *  code: HTTPStatusCode;
   *  status: boolean;
   *  message: string;
   *  data?: Users[];
   * }>}
   * */
  static getAll({ token, ...filters }) {
    const params = Object.fromEntries(Object.entries(filters).filter(([_, v]) => v !== null && v !== undefined && v !== ''));
    const abortController = new AbortController();
    const response = api.get('/users', {
      token,
      signal: abortController.signal,
      params
    });

    return {
      abortController,
      response,
      parser: (apiData) => {
        const users = apiData?.users ?? apiData?.data ?? apiData ?? [];

        return UserManagement.fromApiData(users);
      }
    };
  }

  static async getTrialSummary(user_id, token) {
    const response = await api.get(`/trials/user/${user_id}/summary`, { token });
    if (!response.data) return response;
    return { ...response, data: response.data };
  }

  static async getQuotaSummary(user_id, token) {
    const response = await api.get(`/quota/user/${user_id}/summary`, { token });
    if (!response.data) return response;
    return { ...response, data: response.data };
  }

  /**
   * @param {Users} data
   * @param {string} token
   * @returns {Promise<{
   *  code: HTTPStatusCode;
   *  status: boolean;
   *  message: string;
   *  errors?: { [key: string]: string[] };
   * }}
   */
  static async store(data, token) {
    return await api.post('/users', { body: data, token });
  }

  /**
   * @param {number} id
   * @param {Users} data
   * @param {string} token
   * @returns {Promise<{
   *  code: HTTPStatusCode;
   *  status: boolean;
   *  message: string;
   *  errors?: { [key: string]: string[] };
   * }>}
   */
  static async update(id, data, token) {
    return await api.patch(`/users/edit/${id}`, { body: data, token });
  }

  /**
   * @param {number} id
   * @param {string} token
   * @returns {Promise<{
   *  code: HTTPStatusCode;
   *  status: boolean;
   *  message: string;
   * }>}
   */
  static async delete(id, token) {
    return await api.delete(`/users/${id}`, { token });
  }

  /**
   * @param {number[]} ids
   * @param {string} token
   * @returns {Promise<{
   *  code: HTTPStatusCode;
   *  status: boolean;
   *  message: string;
   * }>}
   */
  static async deleteBatch(ids, token) {
    return await api.delete(`/users/multi-delete/?id=${ids.join(',')}`, { token });
  }
}
