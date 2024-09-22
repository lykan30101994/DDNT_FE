export const localStorageUtil = (key: string) => {
    return {
        get() {
            return JSON.parse(localStorage.getItem(key) ?? "{}");
        },
        set(value: any) {
            localStorage.setItem(key, JSON.stringify(value));
        },
        remove() {
            localStorage.removeItem(key);
        },
    };
};
