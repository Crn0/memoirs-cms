import formConstants from '../../constants/form';

const reducer = (state, action) => {
    const { type, value } = action;

    switch (type) {
        case formConstants['FIRST_NAME']: {
            return {
                ...state,
                [type]: value,
            };
        }

        case formConstants['LAST_NAME']: {
            return {
                ...state,
                [type]: value,
            };
        }

        case formConstants['EMAIL']: {
            return {
                ...state,
                [type]: value,
            };
        }

        case formConstants['USERNAME']: {
            return {
                ...state,
                [type]: value,
            };
        }

        case formConstants['PWD']: {
            return {
                ...state,
                [type]: value,
            };
        }

        case formConstants['CONFIRM_PWD']: {
            return {
                ...state,
                [type]: value,
            };
        }

        default:
            throw new Error(`Unknown action: ${type}`);
    }
};

export const formState = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirm_password: '',
};

export default reducer;
