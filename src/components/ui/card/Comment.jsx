import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';
import ThemeContext from '../../../context/themeContext';
import UserContext from '../../../context/userContext';
import Form from '../form/Form';
import Fieldset from '../form/Fieldset';
import Input from '../form/Input';
import Button from '../button/Button';

export default function CommentCard({ comment, postUserId }) {
    const { theme } = useContext(ThemeContext);
    const { user } = useContext(UserContext);
    const [status, setStatus] = useState('idle');

    const date = DateTime.fromISO(comment?.created_at).toFormat('LLL dd');
    const isAuth = user !== null;
    const author = comment?.author;

    return (
        <>
            {(() => {
                if (comment.isDeleted === false) {
                    return (
                        <div className={`${theme} comment__detail`}>
                            <div className='comment__header'>
                                <p>{`${author.firstName} ${author.lastName}`}</p>

                                <p>{date}</p>
                            </div>

                            <div className='comment__body'>
                                <p>{comment.body}</p>
                            </div>

                            {isAuth &&
                                (() => {
                                    const currentUserId = user._id;
                                    if (comment.isDeleted) return null;

                                    if (
                                        author._id === currentUserId ||
                                        postUserId === currentUserId
                                    ) {
                                        return (
                                            <div className='comment__delete'>
                                                <Form
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
                                                            value={`${comment._id}`}
                                                        />

                                                        <Button
                                                            type='submit'
                                                            size='medium'
                                                            isLoading={status === 'submitting'}
                                                            disabled={status === 'submitting'}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </Fieldset>
                                                </Form>
                                            </div>
                                        );
                                    }

                                    return null;
                                })()}
                        </div>
                    );
                }

                return null;
            })()}
        </>
    );
}

CommentCard.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    comment: PropTypes.object.isRequired,
    postUserId: PropTypes.string.isRequired,
};
