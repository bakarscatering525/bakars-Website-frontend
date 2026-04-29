import apiClient from '../client';

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const contactAPI = {
  async sendMessage(payload: ContactPayload) {
    const response = await apiClient.post('/contact', payload);
    return response.data;
  },
};
