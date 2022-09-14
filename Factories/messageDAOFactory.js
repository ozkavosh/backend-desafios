import MessageFileDAO from "../DAOs/MessageFileDAO.js"

const storageMapper = {
  file: () => MessageFileDAO.getInstance()
}

export const messageDAOFactory = storage => {
  const storageDAOFn =  storageMapper[storage] || storageMapper['file']
  const dao = storageDAOFn()
  return dao
}