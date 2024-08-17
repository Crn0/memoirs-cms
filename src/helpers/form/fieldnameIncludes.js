const fieldNameIncludes = (fieldName, array) => {
    if (!Array.isArray(array)) return false;

    const queue = [...array];
    while (queue.length) {
        const data = queue[0];

        if (data.field === fieldName) return true;

        queue.shift();
    }

    return false;
};

export default fieldNameIncludes;
