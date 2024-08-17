import PropTypes from 'prop-types';
import { useContext } from 'react';
import ThemeContext from '../../../context/themeContext';

export default function Label({
    name,
    customStyles,
    children,
    ariaLabel,
    tab = false,
    onKeyDown = () => {},
}) {
    const { theme } = useContext(ThemeContext);

    return (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label className={`${theme}`}>
            {(() => {
                if (name) {
                    if (tab)
                        return (
                            <span
                                tabIndex='0'
                                role='button'
                                aria-label={ariaLabel}
                                onKeyDown={onKeyDown}
                                className={`${customStyles === undefined ? '' : customStyles}`}
                            >
                                {name}
                            </span>
                        );

                    return (
                        <span className={`${customStyles === undefined ? '' : customStyles}`}>
                            {name}
                        </span>
                    );
                }

                return null;
            })()}
            {children}
        </label>
    );
}

Label.propTypes = {
    name: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element])
        .isRequired,
    customStyles: PropTypes.string,
    tab: PropTypes.bool,
    onKeyDown: PropTypes.func,
    ariaLabel: PropTypes.string,
};
