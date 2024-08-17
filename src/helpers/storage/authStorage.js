const AuthStorage = (title) => {
    const storage = new Map();

    const add = (key, value) => {
        storage.set(key, value);
    };

    const get = (key) => {
        if (!has(key)) return null;

        return storage.get(key);
    };

    const has = (key) => storage.has(key);

    const remove = (key) => {
        storage.delete(key);
    };

    return Object.freeze({
        get title() {
            return title;
        },
        add,
        get,
        has,
        remove,
    });
};

export default AuthStorage('Auth Storage');
