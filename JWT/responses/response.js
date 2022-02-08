exports.structure = {
    success: {
        status: 'success',
        result: null,
        message: 'Request Processed or Fetched'
    },
    fail: {
        status: 'failed',
        result: null,
        message: 'The request or data fetching failed'
    },
    error: {
        status: 'error',
        result: null,
        message: 'There was an error during processing request'
    },
    autherr: {
        status: 'error',
        result: null,
        message: 'There was an authentication error'
    }
}
