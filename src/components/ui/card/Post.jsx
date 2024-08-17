import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import UserContext from '../../../context/userContext';
import ThemeContext from '../../../context/themeContext';
import Link from '../link/Link';
import Form from '../form/Form';
import Input from '../form/Input';
import Button from '../button/Button';
import style from './css/post.module.css';

export default function PostCard({ post }) {
    const { user } = useContext(UserContext);
    const { theme } = useContext(ThemeContext);
    const [privacy, setPrivacy] = useState(() => post.isPrivate);
    const [status, setStatus] = useState('idle');

    const onSubmit = () => {
        setPrivacy((prev) => {
            if (prev === 'true') return false;

            return true;
        });
        setStatus('submitting');
    };

    return (
        <div className={`${theme} ${style.post__card}`}>
            <div className='post__title__container'>
                <Link url={`/posts/${post._id}`} theme={theme}>
                    <p className='post__title'>{post.title}</p>
                </Link>
            </div>

            <div className='post__status'>
                <Form
                    action={`/users/${user._id}/${user.username}`}
                    method='POST'
                    onSubmit={onSubmit}
                    customStyles={`${style.form}`}
                >
                    <Input type='hidden' name='status' value={privacy} />
                    <Input type='hidden' name='post_id' value={post._id} />
                    <Input type='hidden' name='form-id' value='POST_STATUS' />

                    <p>
                        {(() => {
                            if (post.isPrivate) return 'Draft';

                            return 'Publish';
                        })()}
                    </p>

                    <Button
                        type='submit'
                        size='small'
                        isLoading={status === 'submitting'}
                        disabled={status === 'submitting'}
                    >
                        {(() => {
                            if (post.isPrivate) return 'Publish';

                            return 'Draft';
                        })()}
                    </Button>
                </Form>
            </div>
        </div>
    );
}

PostCard.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    post: PropTypes.object.isRequired,
};
