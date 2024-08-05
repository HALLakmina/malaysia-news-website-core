const responseMessages = require("./responseMessages")

const okResponse = (res, data) => {
    return res.status(200).json(data)
}

const createResponse = (res, message = responseMessages.common.created()) => {
    return res.status(201).json({ message })
}

const createResponseWithJson = (res, data) => {
    return res.status(201).json(data)
}

const updateResponse = (res, message = responseMessages.common.updatedById() ) => {
    return res.status(200).json({ message })
}

const updateResponseWithJson = (res, data ) => {
    return res.status(200).json(data)
}

const disableResponse = (res, message = responseMessages.common.disableById() ) => {
    return res.status(200).json({ message })
}

const deleteResponse = (res, message = responseMessages.common.deletedById() ) => {
    return res.status(200).json({ message })
}

const validationErrorResponse = (res, error) => {
    return res.status(400).json(error)
}

const notFoundResponse = (res, message = responseMessages.common.notFound() ) => {
    return res.status(404).json({ message })
}

const conflictErrorResponse = (res, data) => {
    return res.status(409).json(data)
}

// Refactor 
const interServerErrorResponse = (res) => {
    return res.status(500).json({ message: `Internal Server Error` })
}

// Custom Methods 
const conflictErrorResponseMessageToJson = (res, message) => {
    return conflictErrorResponse(res, { message })
}

module.exports  = {
    okResponse,
    createResponse,
    createResponseWithJson,
    updateResponse,
    deleteResponse,
    notFoundResponse,
    validationErrorResponse,
    interServerErrorResponse,
    conflictErrorResponse,
    conflictErrorResponseMessageToJson,
}