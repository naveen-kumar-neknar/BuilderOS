import { request } from './api';

export const getHealth = () => request('/health');
export const getTechnologies = () => request('/technologies');
export const getTechnology = (slug) => request(`/technologies/${encodeURIComponent(slug)}`);
export const startInstall = (slug, upgrade = false) => request('/install', {
  method: 'POST',
  body: JSON.stringify({ slug, upgrade: Boolean(upgrade) })
});
export const getInstallJob = (jobId) => request(`/install/${encodeURIComponent(jobId)}`);
export const getActivity = () => request('/activity');
export const askLeather = (payload) => request('/ai/assist', {
  method: 'POST',
  body: JSON.stringify(payload)
});

export default {
  getHealth,
  getTechnologies,
  getTechnology,
  startInstall,
  getInstallJob,
  getActivity,
  askLeather
};
