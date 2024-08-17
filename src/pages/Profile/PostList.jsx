import { useContext, useEffect, useState } from 'react';
import { useActionData, useAsyncValue } from 'react-router-dom';
import ThemeContext from '../../context/themeContext';
import PostCard from '../../components/ui/card/Post';

export default function PostsList() {
    const dataAsync = useAsyncValue();
    const dataAction = useActionData();
    const { theme } = useContext(ThemeContext);
    const [posts, setPosts] = useState(dataAsync?.posts);

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
        <div className={`${theme} posts__list`}>
            {(() => {
                if (posts.length) {
                    return (
                        <>
                            <div className='post__status'>
                                <h2> Post </h2>
                            </div>
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
    );
}
