import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import UserContext from '../../../context/userContext';
import ThemeContext from '../../../context/themeContext';
import Link from '../link/Link';
import Form from '../form/Form';
import Input from '../form/Input';
import Button from '../button/Button';
import currentTheme from '../../../helpers/theme/currentTheme';
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
    const currTheme = currentTheme(theme);

    return (
        <div
            className={`${theme} ${style.card} ${currTheme(style['card--light'], style['card--dark'])}`}
        >
            <div className='post__title__container'>
                <Link url={`/posts/${post._id}`} theme={theme}>
                    <p className='post__title'>{post.title}</p>
                </Link>
            </div>

            <div className='post__status'>
                <Form
                    action={`/dashboard/${user._id}/${user.username}`}
                    method='POST'
                    onSubmit={onSubmit}
                    customStyles={`${style.card__form}`}
                >
                    <Input type='hidden' name='status' value={privacy} />
                    <Input type='hidden' name='post_id' value={post._id} />
                    <Input type='hidden' name='form-id' value='POST_STATUS' />

                    <Link url={`/posts/${post._id}/edit`} customStyles={`${style.card__button} ${style['pad--04']}`}>
                        Edit
                    </Link>

                    <Button
                        type='submit'
                        size='xs'
                        customStyles={`${style.card__button}`}
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
    post: PropTypes.shape({
        author: PropTypes.shape({
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired,
            _id: PropTypes.string.isRequired,
        }).isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        cover: PropTypes.shape({
            url: PropTypes.string.isRequired,
            cloudinary_id: PropTypes.string.isRequired,
        }).isRequired,
        createdAt: PropTypes.string.isRequired,
        isPrivate: PropTypes.bool.isRequired,
        // eslint-disable-next-line react/forbid-prop-types
        updatedAt: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
    }).isRequired,
};
