import { useReducer, useState } from 'react';
import { useActionData, useLoaderData } from 'react-router-dom';
import BlogForm from './Form';
import Preview from './Preview';
import Button from '../../components/ui/button/Button';
import reducer, { formState } from './reducer';
import style from './css/index.module.css';

export default function CMSEdit() {
    const data = useLoaderData();
    const [formData, dispatch] = useReducer(reducer, formState, () => {
        if (data?.post) {
            const { post } = data;
            return {
                ...formState,
                title: post.title,
                tags: new Set(post.tags.map((t) => t.name)),
                body: post.body,
                status: post.isPrivate,
                _id: post._id,
            };
        }

        return formState;
    });
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
