import { request } from './api';

export const aiService = {
  async getStatus() {
    return request('/ai/status');
  },

  async sendMessage(messages, context = {}, apiKey = null) {
    return request('/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ messages, context, apiKey })
    });
  },

  async troubleshoot({ slug, error, logs, os }) {
    return request('/ai/troubleshoot', {
      method: 'POST',
      body: JSON.stringify({ slug, error, logs, os })
    });
  }
};

export default aiService;
