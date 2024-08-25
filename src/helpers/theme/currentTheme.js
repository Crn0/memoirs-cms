const currentTheme = (theme) => (light, dark) => {
    if (theme === 'dark') return dark;

    return light;
};

export default currentTheme;
