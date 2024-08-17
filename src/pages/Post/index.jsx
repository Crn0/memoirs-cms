import { Suspense } from 'react';
import { useLoaderData, Await, useLocation } from 'react-router-dom';
import Detail from './Detail';
import Spinner from '../../components/ui/spinner';
import PostError from './Error';

export default function PostDetail() {
    const loaderData = useLoaderData();
    const location = useLocation();

    const data = loaderData?.data;

    return (
        <>
            {(() => {
                if (location.state) return <Detail />;

                return (
                    <Suspense fallback={<Spinner />}>
                        <Await resolve={data} errorElement={<PostError />}>
                            <Detail />
                        </Await>
                    </Suspense>
                );
            })()}
        </>
    );
}
