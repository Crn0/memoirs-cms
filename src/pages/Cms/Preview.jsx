/* eslint-disable react/no-danger */
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { DateTime } from 'luxon';
import ThemeContext from '../../context/themeContext';
import UserContext from '../../context/userContext';
import purifyHTML from '../../helpers/sanitize/purifyHTML';

export default function Preview({ formData }) {
    const { theme } = useContext(ThemeContext);
    const { user } = useContext(UserContext);
    const { cover, title, tags, body } = formData;

    const hasCover = cover.name && cover.name !== '';
    const date = DateTime.fromISO(new Date().toISOString()).toFormat('LLL dd');
    const cleanHTML = purifyHTML(body);

    return (
        <div className={`${theme} wrapper`}>
            <div className='post__container'>
                <div className='post__header'>
                    {(() => {
                        if (hasCover) {
                            const imageUrl = URL.createObjectURL(cover);

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
                            <p>{`${user?.firstName} ${user?.lastName}`}</p>

                            <p>{`Posted on ${date}`}</p>
                        </div>

                        <div className='post__title'>
                            <h1> {title} </h1>
                        </div>

                        {(() => {
                            if (tags.size) {
                                return (
                                    <div className='post__tags'>
                                        {[...tags].map((tag) => (
                                            <p key={tag} className='post__tag'>{`#${tag}`}</p>
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
        </div>
    );
}

Preview.propTypes = {
    formData: PropTypes.shape({
        cover: PropTypes.shape({
            lastModified: PropTypes.number,
            lastModifiedDate: PropTypes.instanceOf(Date),
            name: PropTypes.string,
            size: PropTypes.number,
            type: PropTypes.string,
            webkitRelativePath: PropTypes.string,
        }),
        title: PropTypes.string,
        type_tags: PropTypes.string,
        tags: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
        body: PropTypes.string,
        status: PropTypes.bool,
    }).isRequired,
};
