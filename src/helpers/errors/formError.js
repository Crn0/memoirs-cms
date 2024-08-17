import BaseError from './baseError';

class FormError extends BaseError {
    constructor(message, errors, code, name = 'FormError') {
        super(name, code, message, errors);
    }
}

export default FormError;
