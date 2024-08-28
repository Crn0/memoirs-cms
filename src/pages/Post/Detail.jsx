import { useContext, useEffect, useMemo } from 'react';
import { useAsyncValue, useLocation } from 'react-router-dom';
import { DateTime } from 'luxon';
import ThemeContext from '../../context/themeContext';
import UserContext from '../../context/userContext';
import purifyHTML from '../../helpers/sanitize/purifyHTML';
import Input from '../../components/ui/form/Input';
import CommentForm from '../../components/ui/form/CommentForm';
import Comment from '../../components/ui/card/Comment';
import Link from '../../components/ui/link/Link';
import currentTheme from '../../helpers/theme/currentTheme';
import localStorage from '../../helpers/storage/localStorage';
import style from './css/postDetail.module.css';

export default function PostDetail() {
    const asyncData = useAsyncValue();
    const { state } = useLocation();
    const { theme } = useContext(ThemeContext);
    const { user } = useContext(UserContext);
    const commentsById = asyncData.post.comments.reduce((_, obj) => {
        const map = { ..._ };
        map[obj._id] = obj;
        return map;
    }, {});
    const commentsId = Object.entries(commentsById).reduce((_, obj) => {
        if (obj[1].isReply) {
            return _;
        }

        return [..._, obj[1]._id];
    }, []);

    const isAuth = !!user;

    const post = asyncData?.post || state;
    const cover = post?.cover;
    const hasCover = post?.cover?.url !== '';
    const imageUrl = cover?.url;
    const author = post?.author;
    const title = post?.title;
    const commentCount = Object.keys(commentsById).length;

    const date = DateTime.fromISO(post?.createdAt).toFormat('LLL dd');
    const cleanHTML = purifyHTML(post?.body);

    const currTheme = currentTheme(theme);

    useEffect(() => {
        window.addEventListener('beforeunload', localStorage.remove('post'));
        return () => {
            window.removeEventListener('beforeunload', localStorage.remove('post'));
        };
    }, []);

    return (
        <>
            {(() => {
                if (hasCover) {
                    return (
                        <div className={`${style.post__cover}`}>
                            <img
                                className={`${style['cover--image']} ${style['w-100']}`}
                                src={`${imageUrl}`}
                                alt={`Cover of ${title}`}
                            />
                        </div>
                    );
                }

                return null;
            })()}
            <div className={`${style.wrapper}`}>
                <div
                    className={`${style['mw-100']} ${style.post} ${currTheme(style['post--light'], style['post--dark'])}`}
                >
                    <div className='post__header'>
                        <div className='meta__container'>
                            <div className='post__meta'>
                                <p
                                    className={`${style['font--bold__700']}`}
                                >{`${author?.firstName} ${author?.lastName}`}</p>

                                <p className={`${style['opacity--08']}`}>{`Posted on ${date}`}</p>
                            </div>

                            <div className='post__title'>
                                <h1> {title}</h1>

                                {(() => {
                                    if (post.tags.length <= 0) return null;

                                    return (
                                        <div className={`${style.post__tags}`}>
                                            {post.tags.map((tag) => (
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

                    <div
                        className={`${style.post__body}`}
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={cleanHTML}
                    />
                </div>

                <div
                    className={`${style.comment} ${style['mw-100']} ${currTheme(style['comment--light'], style['comment--dark'])}`}
                >
                    <div className='comments__header'>
                        <div className={`${style.comment__count}`}>
                            <p> {`${commentCount} comments`} </p>
                        </div>

                        <div className='comments__form'>
                            {(() => {
                                if (isAuth) {
                                    return (
                                        <CommentForm cols={50} rows={5} btnSize='lg'>
                                            <Input
                                                type='hidden'
                                                name='form-id'
                                                value='ADD_COMMENT'
                                            />
                                        </CommentForm>
                                    );
                                }

                                return (
                                    <p className={`${style['text--center']}`}>
                                        <Link url='/login' theme={theme}>
                                            Login
                                        </Link>{' '}
                                        or{' '}
                                        <Link url='/sign-up' theme={theme}>
                                            Sign-up
                                        </Link>{' '}
                                        to post an comment
                                    </p>
                                );
                            })()}
                        </div>
                    </div>

                    <div className='comments__list'>
                        {(() => {
                            if (commentsId?.length) {
                                return commentsId?.map((id) => (
                                    <Comment
                                        key={`${id} ${post.comments.length}`}
                                        id={id}
                                        commentsId={null}
                                        commentsById={commentsById}
                                        postAuthorId={post.author._id}
                                        currUserId={user._id}
                                    />
                                ));
                            }

                            return <p style={{ textAlign: 'center' }}>There are no comments</p>;
                        })()}
                    </div>
                </div>
            </div>
        </>
    );
}
