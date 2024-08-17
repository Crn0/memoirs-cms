import { useAsyncError } from 'react-router-dom';

export default function PostError() {
    const error = useAsyncError();

    return (
        <div className='error'>
            <h1 className='error__code'>{error?.httpCode}</h1>
            <p className='error__message'>{error?.message || error}</p>
        </div>
    );
}
