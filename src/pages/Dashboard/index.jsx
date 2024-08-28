import { Suspense, useContext } from 'react';
import { Await, Navigate, useLoaderData } from 'react-router-dom';
import UserContext from '../../context/userContext';
import PostsList from './PostList';
import PostError from './Error';
import style from './css/index.module.css';
import Spinner from '../../components/ui/spinner';

export default function Dashboard() {
    const { user } = useContext(UserContext);
    const { data } = useLoaderData();

    return (
        <>
            {(() => {
                if (['Author', 'Admin'].includes(user.membership)) {
                    return (
                        <section
                            className={`${style.dashboard} ${style['dashboard__section--margin']}`}
                        >
                            <Suspense
                                fallback={<Spinner customStyle={`${style.dashboard__spinner}`} />}
                            >
                                <Await resolve={data} errorElement={<PostError />}>
                                    <PostsList />
                                </Await>
                            </Suspense>
                        </section>
                    );
                }

                return <Navigate to='/' replace />;
            })()}
        </>
    );
}
