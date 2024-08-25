import { Suspense, useContext, useReducer, useState } from 'react';
import { Await, Navigate, useLoaderData, useParams } from 'react-router-dom';
import { DateTime } from 'luxon';
import UserContext from '../../context/userContext';
import ThemeContext from '../../context/themeContext';
import EditForm from './EditForm';
import Button from '../../components/ui/button/Button';
import Spinner from '../../components/ui/spinner';
import PostsList from './PostList';
import PostError from './Error';
import reducer from './reducer';
import currentTheme from '../../helpers/theme/currentTheme';
import style from './css/index.module.css';

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
    const currTheme = currentTheme(theme);

    return (
        <>
            {(() => {
                if (user?._id === userId) {
                    return (
                        <>
                            <section className={`${style['f-center']}`}>
                                {/* <div className='note'>
                                    <p>note: some features are not yet implemented</p>
                                </div> */}

                                <div
                                    className={`${style.profile} ${style['profile--mx-w']} ${currTheme(style['profile--light'], style['profile--dark'])}`}
                                >
                                    <div className='profile__actions'>
                                        <Button
                                            customStyles={`${style.button}`}
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
                            <section className={`${style['profile__section--margin']}`}>
                                <Suspense
                                    fallback={<Spinner customStyle={`${style.profile__spinner}`} />}
                                >
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
