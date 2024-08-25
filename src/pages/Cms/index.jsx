import { useReducer, useState } from 'react';
import BlogForm from './Form';
import Preview from './Preview';
import Button from '../../components/ui/button/Button';
import reducer, { formState } from './reducer';
import style from './css/index.module.css';

export default function CMS() {
    const [formData, dispatch] = useReducer(reducer, formState);
    const [preview, setPreview] = useState(false);

    return (
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
    );
}
