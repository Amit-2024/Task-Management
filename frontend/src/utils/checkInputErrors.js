
const checkInputErrors = ({ title, description, dueDate }) => {
    if(!title || !description || !dueDate){
        return false
    }

    return true
}

export default checkInputErrors
