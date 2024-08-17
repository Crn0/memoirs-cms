import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import localStorage from '../helpers/storage/localStorage';

function ProtectedRoute({ children }) {
    const isLogin = localStorage.has('token');

    return (
        <>
            {(() => {
                if (isLogin) return children;

                return <Navigate to='/login' replace />;
            })()}
        </>
    );
}

ProtectedRoute.propTypes = {
    children: PropTypes.element.isRequired,
};

export default ProtectedRoute;
