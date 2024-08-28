import { useEffect, useMemo, useReducer, useState } from 'react';
import ThemeContext from '../../context/themeContext';
import Header from '../../components/ui/header/index';
import Preview from './Preview';
import BlogForm from './Form';
import Button from '../../components/ui/button/Button';
import Footer from '../../components/ui/footer/Footer';
import reducer, { formState } from './reducer';
import localStorage from '../../helpers/storage/localStorage';
import style from './css/index.module.css';

export default function CMSPreview() {
    const [formData, dispatch] = useReducer(reducer, formState);
    const [preview, setPreview] = useState(false);
    const [theme, setTheme] = useState(() => {
        if (localStorage.has('theme')) return localStorage.get('theme');

        return 'dark';
    });

    const themeMemo = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

    useEffect(() => {
        document.body.style.backgroundColor = theme === 'light' ? '#F5F5F5' : 'black';
    }, [theme]);

    return (
        <ThemeContext.Provider value={themeMemo}>
            <div className={`${style.app}`}>
                <Header />
                <main>
                    <section>
                        <div className={`${style.btn__wrapper}`}>
                            <Button
                                customStyles={`${style.button} ${!preview ? style['button--active'] : ''}`}
                                type='button'
                                size='lg'
                                testId='blog_edit'
                                onClick={() => {
                                    setPreview(false);
                                }}
                            >
                                Edit
                            </Button>

                            <Button
                                customStyles={`${style.button} ${preview ? style['button--active'] : ''}`}
                                type='button'
                                size='lg'
                                testId='blog_preview'
                                onClick={() => {
                                    setPreview(true);
                                }}
                            >
                                Preview
                            </Button>
                        </div>

                        {(() => {
                            if (preview === false) {
                                return <BlogForm formData={formData} dispatch={dispatch} />;
                            }
                            return <Preview formData={formData} />;
                        })()}
                    </section>
                </main>

                <Footer />
            </div>
        </ThemeContext.Provider>
    );
}
