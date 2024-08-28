import PropTypes from 'prop-types';
import { useContext, useEffect, useRef, useState } from 'react';
import { useActionData, useNavigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import { TINY_MCE_KEY } from '../../constants/env';
import ThemeContext from '../../context/themeContext';
import UserContext from '../../context/userContext';
import Form from '../../components/ui/form/Form';
import Fieldset from '../../components/ui/form/Fieldset';
import Label from '../../components/ui/form/Label';
import Input from '../../components/ui/form/Input';
import File from '../../components/ui/form/File';
import Button from '../../components/ui/button/Button';
import ErrorMessage from '../../components/errors/errorMessage';
import fieldNameIncludes from '../../helpers/form/fieldnameIncludes';
import FieldErrorMessage from '../../components/ui/form/FieldErrorMessage';
import style from './css/form.module.css';

export default function BlogForm({ formData, dispatch }) {
    const { user } = useContext(UserContext);
    const { theme } = useContext(ThemeContext);
    const [status, setStatus] = useState('typing');
    const postData = useActionData();
    const navigate = useNavigate();
    const fileRef = useRef(null);
    const post = postData?.post;
    const error = postData?.error;
    const disableButton = (() => {
        const areFieldsEmpty = Object.entries(formData).map(([key, value]) => {
            const notRequiredFields = new Set(['tags', 'type_tags', 'cover', 'status']);
            if (!notRequiredFields.has(key)) {
                return value.trim() === '';
            }

            return false;
        });
        // console.log(formData)
        if (areFieldsEmpty.includes(true) || status === 'submitting') return true;

        return false;
    })();

    useEffect(() => {
        if (error) setStatus('error');
        if (post) navigate(`/posts/${post._id}?post=true`, { state: post });
    }, [error, post, navigate]);

    return (
        <div className={`${style.post}`}>
            <div className='post__error'>
                {error &&
                    (() => {
                        const { messages } = error;
                        const noFieldErrors =
                            !fieldNameIncludes('cover', messages) &&
                            !fieldNameIncludes('title', messages) &&
                            !fieldNameIncludes('body', messages) &&
                            !fieldNameIncludes('tags', messages) &&
                            error;
                        if (noFieldErrors) {
                            return (
                                <div className='error__container'>
                                    <ErrorMessage message={messages} />
                                </div>
                            );
                        }

                        return ['cover', 'title', 'body', 'tags'].map((fName) => (
                            <FieldErrorMessage key={fName} fieldName={fName} error={error} />
                        ));
                    })()}
            </div>
            <div className='post__form'>
                <Form
                    action=''
                    method='POST'
                    encType='multipart/form-data'
                    onSubmit={() => {
                        setStatus('submitting');
                    }}
                >
                    <Fieldset fieldName={`${style.form__header}`}>
                        <div className={`${style.post__cover}`}>
                            <Label
                                name='Add cover image'
                                customStyles={`${style.file}`}
                                onKeyDown={(e) => {
                                    if (e.code === 'Enter') fileRef.current.click();
                                }}
                                tab
                            >
                                <File
                                    type='file'
                                    name='cover'
                                    filesAccept='.png, .jpeg, .jpg, .webp'
                                    onChange={(e) => {
                                        const image = e.target.files[0];
                                        if (image) {
                                            dispatch({
                                                type: 'ADD_COVER',
                                                value: image,
                                            });
                                        }
                                    }}
                                    onKeyDown={(e) => {
                                        const image = e.target.files[0];
                                        if (image) {
                                            if (e.code === 'Enter') {
                                                dispatch({
                                                    type: 'ADD_COVER',
                                                    value: image,
                                                });
                                            }
                                        }
                                    }}
                                    ref={fileRef}
                                />
                            </Label>
                        </div>

                        <div className={`${style.post__tile}`}>
                            <Label>
                                <Input
                                    type='text'
                                    name='title'
                                    value={formData.title}
                                    placeholder='New post title'
                                    onChange={(e) => {
                                        const { value } = e.target;

                                        dispatch({
                                            value,
                                            type: 'ADD_TITLE',
                                        });
                                    }}
                                />
                            </Label>
                        </div>

                        <div>
                            <ul className={`${style['post__tags--wrapper']} ${style.ul}`}>
                                {(() => {
                                    if (formData.tags.size > 0) {
                                        return (
                                            <>
                                                {[...formData.tags].map((tag) => (
                                                    <li key={tag}>
                                                        <div>
                                                            <Button
                                                                type='button'
                                                                size='xxs'
                                                                testId={`delete-${tag}`}
                                                                onClick={() => {
                                                                    dispatch({
                                                                        type: 'DELETE_TAGS',
                                                                        value: tag,
                                                                    });
                                                                }}
                                                                disabled={false}
                                                                customStyles={`${style.post__tags}`}
                                                            >
                                                                {`${tag} X`}
                                                            </Button>
                                                        </div>
                                                    </li>
                                                ))}
                                            </>
                                        );
                                    }
                                    return null;
                                })()}

                                <li>
                                    <div className={`${style.tags__input}`}>
                                        <Input
                                            type='hidden'
                                            name='tags'
                                            value={JSON.stringify([...formData.tags])}
                                        />
                                        <Label>
                                            <Input
                                                type='text'
                                                name='type_tags'
                                                isRequired={false}
                                                value={formData.type_tags}
                                                placeholder={
                                                    formData.tags.size !== 4
                                                        ? 'Press enter to add tags'
                                                        : 'Only 4 tags are allowed'
                                                }
                                                onChange={(e) => {
                                                    const { value } = e.target;

                                                    dispatch({
                                                        value,
                                                        type: 'TYPE_TAGS',
                                                    });
                                                }}
                                                onKeyDown={(e) => {
                                                    const { code, target } = e;
                                                    const { value } = target;

                                                    if (code === 'Enter') {
                                                        e.preventDefault();
                                                        if (formData.tags.size === 4) {
                                                            return;
                                                        }

                                                        dispatch({
                                                            value,
                                                            type: 'ADD_TAGS',
                                                        });
                                                    }
                                                }}
                                                isDisabled={formData.tags.size === 4}
                                            />
                                        </Label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </Fieldset>

                    <Fieldset fieldName='form__body'>
                        <div className={`${style.post__body}`}>
                            <Editor
                                key={theme}
                                textareaName='body'
                                apiKey={TINY_MCE_KEY}
                                init={{
                                    skin: theme === 'dark' ? 'oxide-dark' : 'snow',
                                    placeholder: 'Write your post content here',
                                    toolbar:
                                        'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                    tinycomments_mode: 'embedded',
                                    tinycomments_author: 'Author name',
                                    mergetags_list: [
                                        { value: `${user?.firstName}`, title: 'First Name' },
                                        { value: `${user?.lastName}`, title: 'Last Name' },
                                        { value: `${user?.username}`, title: 'Username' },
                                    ],
                                }}
                                value={formData.body}
                                onEditorChange={(newValue, _) => {
                                    dispatch({
                                        type: 'ADD_BODY',
                                        value: newValue,
                                    });
                                }}
                            />
                        </div>
                    </Fieldset>

                    <Fieldset fieldName={`${style.btn__wrapper}`}>
                        <Button
                            type='submit'
                            size='medium'
                            testId='post-submit'
                            isLoading={status === 'submitting'}
                            disabled={disableButton}
                            customStyles={`${style.button}`}
                        >
                            Publish
                        </Button>

                        <Input type='hidden' name='status' value={formData.status} />

                        <Button
                            type='button'
                            size='medium'
                            onClick={() => {
                                dispatch({
                                    type: 'ADD_STATUS',
                                    value: (() => {
                                        if (formData.status === true) return false;
                                        return true;
                                    })(),
                                });
                            }}
                            isLoading={status === 'submitting'}
                            customStyles={`${style.button}`}
                            disabled={disableButton}
                        >
                            {(() => {
                                if (formData.status === false) return 'Saved as draft copy';

                                return 'Saved as final copy';
                            })()}
                        </Button>
                    </Fieldset>
                </Form>
            </div>
        </div>
    );
}

BlogForm.propTypes = {
    formData: PropTypes.shape({
        cover: PropTypes.shape({
            lastModified: PropTypes.number,
            lastModifiedDate: PropTypes.instanceOf(Date),
            name: PropTypes.string,
            size: PropTypes.number,
            type: PropTypes.string,
            webkitRelativePath: PropTypes.string,
        }),
        title: PropTypes.string,
        type_tags: PropTypes.string,
        tags: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
        body: PropTypes.string,
        status: PropTypes.bool,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
};
