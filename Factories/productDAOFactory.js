import ProductFileDAO from "../DAOs/ProductFileDAO.js"

const storageMapper = {
  file: () => ProductFileDAO.getInstance()
}

export const productDAOFactory = storage => {
  const storageDAOFn =  storageMapper[storage] || storageMapper['file']
  const dao = storageDAOFn()
  return dao
}