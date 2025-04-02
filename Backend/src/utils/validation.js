const editValidation = (req) => {
    
        const allowedUpates = ['firstName', 'lastName', 'age', 'photoURL', 'gender','location','about'];
        const isEditAllowed = Object.keys(req.body).every((field) => 
                allowedUpates.includes(field))

        return isEditAllowed;
    
}

module.exports =  editValidation;