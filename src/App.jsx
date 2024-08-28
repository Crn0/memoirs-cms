import { useContext, useEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import ThemeContext from './context/themeContext';
import Header from './components/ui/header';
import Footer from './components/ui/footer/Footer';
import style from './index.module.css';

function App() {
    const { theme, setTheme } = useContext(ThemeContext)
    

    return (
        <div className={`${style.app} ${theme === 'dark' ? style.dark : style.light}`}>
                    <Header setTheme={setTheme} />

                    <main className={`${style.main}`}>
                        <Outlet />
                    </main>

                    <Footer />
        </div>
    );
}

export default App;
