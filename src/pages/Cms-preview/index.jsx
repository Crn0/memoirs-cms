import { useReducer, useState } from 'react';
import Header from '../../components/ui/header/index';
import Preview from './Preview';
import BlogForm from './Form';
import Button from '../../components/ui/button/Button';
import Footer from '../../components/ui/footer/Footer';
import reducer, { formState } from './reducer';
import style from './css/index.module.css';

export default function CMSPreview() {
    const [formData, dispatch] = useReducer(reducer, formState);
    const [preview, setPreview] = useState(false);

    return (
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
    );
}
