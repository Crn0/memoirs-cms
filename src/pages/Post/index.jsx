import { Suspense } from 'react';
import { useLoaderData, Await } from 'react-router-dom';
import Detail from './Detail';
import Spinner from '../../components/ui/spinner';
import PostError from './Error';
import style from './css/index.module.css';

export default function PostDetail() {
    const { data } = useLoaderData();

    return (
        <Suspense fallback={<Spinner customStyle={`${style.spinner}`} />}>
            <Await resolve={data} errorElement={<PostError />}>
                <section>
                    <Detail />
                </section>
            </Await>
        </Suspense>
    );
}
