export function setLocaleStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getLocaleStorage(key: string) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}

export function removeLocaleStorage(key: string) {
    localStorage.removeItem(key);
}