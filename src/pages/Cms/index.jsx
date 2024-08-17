import { useReducer, useState } from 'react';
import BlogForm from './Form';
import Preview from './Preview';
import Button from '../../components/ui/button/Button';
import reducer, { formState } from './reducer';

export default function CMS() {
    const [formData, dispatch] = useReducer(reducer, formState);
    const [preview, setPreview] = useState(false);

    return (
        <section>
            <div>
                <Button
                    type='button'
                    size='medium'
                    testId='blog_edit'
                    onClick={() => {
                        setPreview(false);
                    }}
                >
                    Edit
                </Button>

                <Button
                    type='button'
                    size='medium'
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
