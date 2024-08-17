import formConstants from '../../constants/form';

const reducer = (state, action) => {
    const { type, value } = action;

    switch (type) {
        case formConstants.FIRST_NAME:
            return {
                ...state,
                [type]: value,
            };

        case formConstants.LAST_NAME:
            return {
                ...state,
                [type]: value,
            };

        case formConstants.EMAIL:
            return {
                ...state,
                [type]: value,
            };

        case formConstants.USERNAME:
            return {
                ...state,
                [type]: value,
            };
        default:
            throw new Error('Invalid type');
    }
};

export default reducer;
