export const getLocalStorage = (key) => {
    const result = localStorage.getItem(key);
    if (!result) return null;
    try {
        return JSON.parse(result);
    } catch {
        return null;
    }
};

export const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};