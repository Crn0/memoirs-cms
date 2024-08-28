const reducer = (state, action) => {
    const { type, value } = action;

    switch (type) {
        case 'ADD_COVER': {
            return {
                ...state,
                cover: value,
            };
        }

        case 'ADD_TITLE': {
            return {
                ...state,
                title: value,
            };
        }

        case 'ADD_BODY': {
            return {
                ...state,
                body: value,
            };
        }

        case 'ADD_STATUS': {
            return {
                ...state,
                status: value,
            };
        }

        case 'TYPE_TAGS': {
            return {
                ...state,
                type_tags: value,
            };
        }

        case 'ADD_TAGS': {
            return {
                ...state,
                type_tags: '',
                tags: new Set([...state.tags, value]),
            };
        }

        case 'DELETE_TAGS': {
            const cloneState = structuredClone(state);

            cloneState.tags.delete(value);

            return cloneState;
        }

        default:
            throw new Error(`Unknown action: ${type}`);
    }
};

export const formState = {
    cover: {},
    title: '',
    type_tags: '',
    tags: new Set([]),
    body: '',
    status: false,
};

export default reducer;
