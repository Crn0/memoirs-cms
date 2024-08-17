const fieldMessage = (name, messages) => {
    const error = messages?.filter?.((error) => error.field === name);
    return error[0]?.message;
};

export default fieldMessage;
