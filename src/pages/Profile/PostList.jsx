import { useContext, useEffect, useState } from 'react';
import { useActionData, useAsyncValue } from 'react-router-dom';
import ThemeContext from '../../context/themeContext';
import PostCard from '../../components/ui/card/Post';
import currentTheme from '../../helpers/theme/currentTheme';
import style from './css/postList.module.css';

export default function PostsList() {
    const dataAsync = useAsyncValue();
    const dataAction = useActionData();
    const { theme } = useContext(ThemeContext);
    const [posts, setPosts] = useState(dataAsync?.posts);

    const currTheme = currentTheme(theme);

    useEffect(() => {
        const updatedPost = dataAction?.post;

        if (updatedPost !== undefined && updatedPost !== null) {
            setPosts((prev) =>
                prev.map((prevPost) => {
                    if (prevPost._id === updatedPost._id) {
                        return {
                            ...prevPost,
                            isPrivate: updatedPost.isPrivate,
                        };
                    }

                    return prevPost;
                }),
            );
        }
    }, [dataAction]);

    return (
        <>
            <div className='post__status'>
                <h2
                    className={`${style['text--center']} ${style['font--size__2']} ${currTheme(style['color--light'], style['color--dark'])}`}
                >
                    {' '}
                    Post{' '}
                </h2>
            </div>
            <div className={`${theme} ${style.post__list}`}>
                {(() => {
                    if (posts.length) {
                        return (
                            <>
                                {posts.map((post) => (
                                    <PostCard post={post} key={`${post._id} ${post.isPrivate}`} />
                                ))}
                            </>
                        );
                    }

                    return null;
                })()}

                {(() => {
                    if (posts.length === 0) {
                        return (
                            <div className='note'>
                                <p> There are no posts.</p>
                            </div>
                        );
                    }

                    return null;
                })()}
            </div>
        </>
    );
}
