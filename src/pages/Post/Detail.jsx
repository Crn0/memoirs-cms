/* eslint-disable react/no-danger */
import { useContext } from 'react';
import { useAsyncValue, useLocation } from 'react-router-dom';
import { DateTime } from 'luxon';
import ThemeContext from '../../context/themeContext';
import UserContext from '../../context/userContext';
import purifyHTML from '../../helpers/sanitize/purifyHTML';
import Input from '../../components/ui/form/Input';
import CommentForm from './CommentForm';
import Comment from '../../components/ui/card/Comment';
import Link from '../../components/ui/link/Link';
import BaseError from '../../helpers/errors/baseError';

export default function PostDetail() {
    const asyncData = useAsyncValue();
    const location = useLocation();
    const { theme } = useContext(ThemeContext);
    const { user } = useContext(UserContext);

    const post = asyncData?.post || location.state;
    const comments = asyncData?.comments;
    const isAuth = !!user;
    const cover = post?.cover;
    const hasCover = cover?.url !== '';
    const imageUrl = cover?.url;
    const author = post?.author;
    const title = post?.title;
    const tags = post?.tags;
    const commentCount = comments?.filter?.((comment) => comment.isDeleted === false).length || 0;
    const date = DateTime.fromISO(post?.createdAt).toFormat('LLL dd');
    const cleanHTML = purifyHTML(post?.body);

    if (post === null) throw new BaseError('custom error', 400, 'Bad request');

    return (
        <div className={`${theme} wrapper`}>
            <div className='post__container'>
                <div className='post__header'>
                    {(() => {
                        if (hasCover) {
                            return (
                                <div className='cover__container'>
                                    <img
                                        className='post__cover'
                                        src={`${imageUrl}`}
                                        alt={`Cover of ${title}`}
                                    />
                                </div>
                            );
                        }

                        return null;
                    })()}
                    <div className='meta__container'>
                        <div className='post__meta'>
                            <p>{`${author?.firstName} ${author?.lastName}`}</p>

                            <p>{`Posted on ${date}`}</p>
                        </div>

                        <div className='post__title'>
                            <h1> {title} </h1>
                        </div>

                        {(() => {
                            if (tags?.length) {
                                return (
                                    <div className='post__tags'>
                                        {[...tags].map((tag) => (
                                            <p
                                                key={tag._id}
                                                className='post__tag'
                                            >{`#${tag.name}`}</p>
                                        ))}
                                    </div>
                                );
                            }

                            return null;
                        })()}
                    </div>
                </div>

                <div className='post__body' dangerouslySetInnerHTML={cleanHTML} />
            </div>

            <div className='comments_container'>
                <div className='comments__header'>
                    <div className='comments__count'>
                        <p> {`${commentCount} comments`} </p>
                    </div>

                    <div className='comments__form'>
                        {(() => {
                            if (isAuth) {
                                return (
                                    <CommentForm cols={0} rows={2} btnSize='medium'>
                                        <Input type='hidden' name='form-id' value='ADD_COMMENT' />
                                    </CommentForm>
                                );
                            }

                            return (
                                <p>
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
                        if (comments?.length) {
                            return comments?.map((comment) => (
                                <Comment
                                    key={`${comment._id} ${comment.isDeleted}`}
                                    comment={comment}
                                    postUserId={post.author._id}
                                />
                            ));
                        }

                        return 'There are no comments';
                    })()}
                </div>
            </div>
        </div>
    );
}
