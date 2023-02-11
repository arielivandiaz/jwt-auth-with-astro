
export const createError = (req, res, status, error) => {
    const err = new Error(error);
    err.status = status;
    res
        .status(status || 500)
        .send({
            message: err.message,
            status,
            error: req.app.get('env') === 'development' ? err : {}
        });
};
