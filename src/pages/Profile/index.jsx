import { Suspense, useContext, useEffect, useReducer, useState } from 'react';
import { Await, Navigate, useLoaderData, useParams } from 'react-router-dom';
import { DateTime } from 'luxon';
import UserContext from '../../context/userContext';
import ThemeContext from '../../context/themeContext';
import PostsList from './PostList';
import PostError from './Error';
import Spinner from '../../components/ui/spinner';
import style from './css/index.module.css';

import Button from '../../components/ui/button/Button';
import reducer from './reducer';
import EditForm from './EditForm';

export default function Profile() {
    const { user } = useContext(UserContext);
    const { theme } = useContext(ThemeContext);
    const { userId } = useParams();
    const { data } = useLoaderData();
    const [edit, setEdit] = useState(false);

    const [formData, dispatch] = useReducer(reducer, {
        firstName: user?.firstName,
        lastName: user?.lastName,
        username: user?.username,
        email: user?.email,
    });
    const fullName = `${user?.firstName} ${user?.lastName}`;
    const userName = `${user?.username}`;
    const email = `${user?.email}`;
    const date = DateTime.fromISO(user?.createdAt).toFormat('LLL dd yyyy');

    const onClick = () => setEdit((isEdit) => !isEdit);

    return (
        <>
            {(() => {
                if (user?._id === userId) {
                    return (
                        <>
                            <section>
                                {/* <div className='note'>
                                    <p>note: some features are not yet implemented</p>
                                </div> */}

                                <div
                                    className={`${style.profile} ${theme === 'dark' ? style.dark : ''}`}
                                >
                                    <div className='profile__actions'>
                                        <Button
                                            type='button'
                                            size='medium'
                                            onClick={onClick}
                                            disabled={false}
                                        >
                                            {(() => {
                                                if (!edit) return 'Edit profile';

                                                return 'Cancel';
                                            })()}
                                        </Button>
                                    </div>

                                    <div className='profile__details'>
                                        {(() => {
                                            if (edit) {
                                                return (
                                                    <div>
                                                        <EditForm
                                                            formData={formData}
                                                            dispatch={dispatch}
                                                            setEdit={setEdit}
                                                        />
                                                    </div>
                                                );
                                            }

                                            return (
                                                <>
                                                    <div className='profile__top'>
                                                        <h1>{`${fullName} (${userName})`}</h1>
                                                    </div>
                                                    <div className='profile__middle'>
                                                        <p> {email} </p>
                                                    </div>
                                                    <div className='profile__bottom'>
                                                        <p> {`Joined on ${date}`}</p>
                                                    </div>
                                                </>
                                            );
                                        })()}
                                    </div>
                                </div>
                            </section>

                            <section>
                                <Suspense fallback={<Spinner />}>
                                    <Await resolve={data} errorElement={<PostError />}>
                                        <PostsList />
                                    </Await>
                                </Suspense>
                            </section>
                        </>
                    );
                }

                return <Navigate to='/' replace />;
            })()}
        </>
    );
}
