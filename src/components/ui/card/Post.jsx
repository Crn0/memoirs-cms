import PropTypes from 'prop-types';
import { useContext } from 'react';
import { DateTime } from 'luxon';
import ThemeContext from '../../../context/themeContext';
import Link from '../link/Link';
import style from './css/post.module.css';
import currentTheme from '../../../helpers/theme/currentTheme';

export default function PostCard({ post }) {
    const { theme } = useContext(ThemeContext);
    const hasCover = post.cover.url;
    const { firstName } = post.author;
    const { lastName } = post.author;
    const { tags } = post;
    const date = DateTime.fromISO(post?.createdAt).toFormat('LLL dd');

    const currTheme = currentTheme(theme);

    return (
        <div
            className={`${currTheme(style['card--light'], style['card--dark'])}`}
        >
            {hasCover && (
                <div className={`${style.card__cover}`}>
                    <img
                        className={`${style['cover--image']}`}
                        src={post.cover.url}
                        alt={`Cover of ${post.title}`}
                    />
                </div>
            )}

            <div className={`${style.card__body}`}>
                <div className="post__top">
                    <div className="post__author">
                        <p>{`${firstName} ${lastName}`}</p>
                        <time className={`${style.card__date}`}>{date}</time>
                    </div>
                </div>

                <div className="post__bottom">
                    <Link
                        url={`/posts/${post._id}`}
                        theme={theme}
                        customStyle={`${style.card__title}`}
                    >
                        <p>{post.title}</p>
                    </Link>
                    {(() => {
                        if (tags.length <= 0) return null;

                        return (
                            <div className={`${style.card__tags}`}>
                                {tags.map((tag) => (
                                    <p
                                        key={tag.name}
                                        className={`${style['tag--fnt']}`}
                                    >{`#${tag.name}`}</p>
                                ))}
                            </div>
                        );
                    })()}
                </div>
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
        tags: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
            })
        ),
        createdAt: PropTypes.string.isRequired,
        isPrivate: PropTypes.bool.isRequired,
        // eslint-disable-next-line react/forbid-prop-types
        updatedAt: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
    }).isRequired,
};