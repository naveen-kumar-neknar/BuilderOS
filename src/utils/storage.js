const KEYS = {
  INSTALLED: 'hackwave_installed_v1',
  STACK: 'hackwave_stack_v1',
  BOOKMARKS: 'hackwave_bookmarks_v1',
  USER_PACKAGES: 'hackwave_user_packages_v1'
};

const DEFAULT_INSTALLED = [];

export const getStoredInstalled = () => {
  try {
    const data = localStorage.getItem(KEYS.INSTALLED);
    return data ? JSON.parse(data) : DEFAULT_INSTALLED;
  } catch {
    return DEFAULT_INSTALLED;
  }
};

export const saveStoredInstalled = (list) => {
  try {
    localStorage.setItem(KEYS.INSTALLED, JSON.stringify(list));
  } catch {
    console.error('Storage error', e);
  }
};

export const getStoredStack = () => {
  try {
    const data = localStorage.getItem(KEYS.STACK);
    return data ? JSON.parse(data) : [];
  } catch {
    return ['hyperterminal-x', 'reqcraft-pro', 'neurodev-agent'];
  }
};

export const saveStoredStack = (list) => {
  try {
    localStorage.setItem(KEYS.STACK, JSON.stringify(list));
  } catch {
    console.error('Storage error', e);
  }
};

export const getStoredBookmarks = () => {
  try {
    const data = localStorage.getItem(KEYS.BOOKMARKS);
    return data ? JSON.parse(data) : [];
  } catch {
    return ['hyperterminal-x', 'surreal-studio'];
  }
};

export const saveStoredBookmarks = (list) => {
  try {
    localStorage.setItem(KEYS.BOOKMARKS, JSON.stringify(list));
  } catch {
    console.error('Storage error', e);
  }
};

export const getStoredUserPackages = () => {
  try {
    const data = localStorage.getItem(KEYS.USER_PACKAGES);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveStoredUserPackages = (list) => {
  try {
    localStorage.setItem(KEYS.USER_PACKAGES, JSON.stringify(list));
  } catch (e) {
    console.error('Storage error', e);
  }
};
