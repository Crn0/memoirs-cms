import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { DateTime } from 'luxon';
import ThemeContext from '../../../context/themeContext';
import UserContext from '../../../context/userContext';
import ReplyForm from '../form/ReplyForm';
import Form from '../form/Form';
import Fieldset from '../form/Fieldset';
import Input from '../form/Input';
import Button from '../button/Button';
import currentTheme from '../../../helpers/theme/currentTheme';
import style from './css/comment.module.css';

export default function Comment({ id, commentsById, postAuthorId, currUserId }) {
    const { theme } = useContext(ThemeContext);
    const { user } = useContext(UserContext);
    const [status, setStatus] = useState('idle');
    const [reply, setReply] = useState(false);
  
    const comment = commentsById[id];
    const date = DateTime.fromISO(comment?.created_at).toFormat('LLL dd');
    const isAuth = !!user;
    const author = comment?.author;
    const currBoxShadow = currentTheme(theme);

    return (
        <>
            {(() => {
                if (commentsById[id] === undefined) return null;
                return (
                    <ul>
                        <details
                            className={`${currBoxShadow(style['comment--light'], style['comment--dark'])}`}
                            open
                        >
                            <summary>
                                {(() => {
                                    if (comment?.isDeleted) return <span>DELETED</span>;

                                    return (
                                        <span className={`${style.bold}`}>
                                            {`${author?.firstName} ${author?.lastName}`} •{' '}
                                            <span className={`${style['opacity--05']}`}>
                                                {date}
                                            </span>
                                        </span>
                                    );
                                })()}
                            </summary>

                            {!comment?.isDeleted && (
                                <div className={`${style.comment__body}`}>
                                    <p>{comment.body}</p>
                                </div>
                            )}

                            <li>
                                {comment?.replies?.length > 0 &&
                                    comment.replies.map((r) => (
                                        <Comment
                                            key={r}
                                            id={r}
                                            parentId={id}
                                            commentsById={commentsById}
                                            postAuthorId={postAuthorId}
                                            currUserId={currUserId}
                                        />
                                    ))}
                            </li>

                            {isAuth &&
                                (() => {
                                    if (reply)
                                        return (
                                            <ReplyForm
                                                cols={50}
                                                rows={5}
                                                id={id}
                                                btnSize='xxs'
                                                btnStyle={`${style.button} ${style['button--reply']}`}
                                                setReply={setReply}
                                            />
                                        );

                                    return (
                                        <div className={`${style.comment__btn}`}>
                                            {(() => {
                                                if (
                                                    (author?._id !== user?._id &&
                                                        postAuthorId !== currUserId) ||
                                                    comment?.isDeleted
                                                )
                                                    return null;

                                                return (
                                                    <Form
                                                        customStyles={`${style.form}`}
                                                        action=''
                                                        method='POST'
                                                        onSubmit={() => {
                                                            setStatus('submitting');
                                                        }}
                                                    >
                                                        <Fieldset fieldName='delete__field'>
                                                            <Input
                                                                type='hidden'
                                                                name='form-id'
                                                                value='DELETE_COMMENT'
                                                            />

                                                            <Input
                                                                type='hidden'
                                                                name='comment-id'
                                                                value={`${comment?._id}`}
                                                            />

                                                            <Button
                                                                type='submit'
                                                                customStyles={`${style.button}, ${style['button--delete']}`}
                                                                size='xxs'
                                                                disabled={status === 'submitting'}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </Fieldset>
                                                    </Form>
                                                );
                                            })()}

                                            {(() => {
                                                if (comment?.isDeleted) return null;

                                                return (
                                                    <Button
                                                        type='button'
                                                        customStyles={`${style.button}, ${style['button--reply']}`}
                                                        size='xxs'
                                                        onClick={() => setReply(true)}
                                                    >
                                                        Reply
                                                    </Button>
                                                );
                                            })()}
                                        </div>
                                    );
                                })()}
                        </details>
                    </ul>
                );
            })()}
        </>
    );
}

Comment.propTypes = {
    id: PropTypes.string.isRequired,
    commentsById: PropTypes.objectOf(
        PropTypes.shape({
            author: PropTypes.shape({
                firstName: PropTypes.string.isRequired,
                lastName: PropTypes.string.isRequired,
                username: PropTypes.string.isRequired,
                _id: PropTypes.string.isRequired,
            }).isRequired,
            body: PropTypes.string.isRequired,
            created_at: PropTypes.string.isRequired,
            isDeleted: PropTypes.bool.isRequired,
            isReply: PropTypes.bool.isRequired,
            likes: PropTypes.shape({
                // eslint-disable-next-line react/forbid-prop-types
                user: PropTypes.arrayOf(PropTypes.object),
                likes: PropTypes.number,
            }).isRequired,
            post: PropTypes.string.isRequired,
            // eslint-disable-next-line react/forbid-prop-types
            replies: PropTypes.array.isRequired,
            updatedAt: PropTypes.string.isRequired,
            _id: PropTypes.string.isRequired,
        }),
    ).isRequired,
    postAuthorId: PropTypes.string.isRequired,
    currUserId: PropTypes.string.isRequired,
};
