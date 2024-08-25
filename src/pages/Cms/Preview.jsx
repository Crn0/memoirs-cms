/* eslint-disable react/no-danger */
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { DateTime } from 'luxon';
import ThemeContext from '../../context/themeContext';
import UserContext from '../../context/userContext';
import purifyHTML from '../../helpers/sanitize/purifyHTML';
import currentTheme from '../../helpers/theme/currentTheme';
import style from './css/preview.module.css';

export default function Preview({ formData }) {
    const { theme } = useContext(ThemeContext);
    const { user } = useContext(UserContext);
    const { cover, title, tags, body } = formData;

    const hasCover = cover.name && cover.name !== '';
    const date = DateTime.fromISO(new Date().toISOString()).toFormat('LLL dd');
    const cleanHTML = purifyHTML(body);

    const currTheme = currentTheme(theme);

    return (
        <>
            {(() => {
                if (hasCover) {
                    const imageUrl = URL.createObjectURL(cover);

                    return (
                        <div className={`${style.post__cover}`}>
                            <img
                                className={`${style['cover--image']} ${style['w-90']}`}
                                src={`${imageUrl}`}
                                alt={`Cover of ${title}`}
                            />
                        </div>
                    );
                }

                return null;
            })()}
            <div className={`${style.wrapper}`}>
                <div
                    className={`${style['mw-90']} ${style.post} ${currTheme(style['post--light'], style['post--dark'])}`}
                >
                    <div className='post__header'>
                        <div className='meta__container'>
                            <div className='post__meta'>
                                <p
                                    className={`${style['font--bold__700']}`}
                                >{`${user?.firstName} ${user?.lastName}`}</p>

                                <p className={`${style['opacity--08']}`}>{`Posted on ${date}`}</p>
                            </div>

                            <div className='post__title'>
                                <h1> {title} </h1>
                            </div>

                            {(() => {
                                if (tags.size) {
                                    return (
                                        <div className={`${style.post__tags}`}>
                                            {[...tags].map((tag) => (
                                                <p
                                                    key={tag}
                                                    className={`${style['tag--fnt']}`}
                                                >{`#${tag}`}</p>
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
        </>
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
