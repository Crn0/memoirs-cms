import PropTypes from 'prop-types';
import { useContext, forwardRef } from 'react';
import ThemeContext from '../../../context/themeContext';
// import './css/file.module.css';

// eslint-disable-next-line prefer-arrow-callback
const File = forwardRef(function File(
    {
        name,
        customStyles,
        onChange,
        onKeyDown = () => {},
        filesAccept = '.png, .jpeg, .jpg, .webp',
    },
    ref,
) {
    const { theme } = useContext(ThemeContext);
    return (
        <input
            ref={ref}
            type='file'
            className={`${theme} ${customStyles === undefined ? '' : customStyles}`}
            name={name}
            onChange={onChange}
            onKeyDown={onKeyDown}
            accept={filesAccept}
        />
    );
});

File.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    customStyles: PropTypes.string,
    filesAccept: PropTypes.string,
    onKeyDown: PropTypes.func,
};

export default File;
