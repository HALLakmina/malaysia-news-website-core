const common = {
    created: (resource) => `${resource} Created Successfully.`,
    conflictById : (resource) => `${resource} Already Exists.`,
    updatedById: (resource) => `${resource} Updated Successfully.`,
    disableById: (resource) => `${resource} Disable Successfully.`,
    activeById: (resource) => `${resource} Active Successfully.`,
    deletedById: (resource) => `${resource} Deleted Successfully.`,
    notFound: (resource = 'Resource') => `${resource} Not Found.`,
}

module.exports = {
    common,
}