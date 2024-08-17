const LocalStorage = (title) => {
    const add = (key, value) => {
        localStorage.setItem(key, value);
    };

    const get = (key) => localStorage.getItem(key);

    const has = (key) => {
        if (localStorage.getItem(key)) return true;

        return false;
    };

    const remove = (key) => localStorage.removeItem(key);

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

export default LocalStorage('Local Storage');
