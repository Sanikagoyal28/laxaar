
class Errorhandler extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}

const errorHandler = (err, req, res, next) => {
    const errStatus = err.statusCode || 500
    const errMsg = err.message || "Internal Server Error"

    res.status(errStatus).json({
        msg: errMsg,
        success: false,
        statusCode: errStatus,
        // stack: err.stack
    })
}

module.exports = {errorHandler, Errorhandler }