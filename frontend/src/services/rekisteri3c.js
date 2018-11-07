import axios from 'axios'
// const baseUrl = 'http://localhost:5000/api/persons'
// const baseUrl = 'https://safe-headland-53320.herokuapp.com/api/persons'
const baseUrl = '/api/persons'
// 2018-11-05

const getAll = () => {
  return axios.get(baseUrl)
}

const getAllPersons = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
// (method) AxiosStatic.create(config?: AxiosRequestConfig): AxiosInstance
// (method) AxiosInstance.post<any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<any>
const create = (newObject) => {
  axios.create()
  return axios.post(baseUrl, newObject)
}

// (method) AxiosInstance.put<any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<any>
const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

// (method) AxiosInstance.delete(url: string, config?: AxiosRequestConfig): AxiosPromise<any>
// axios.delete(url[, config])
const remove = (id, newObject) => {
  return axios.delete(`${baseUrl}/${id}`, newObject)
}

const getById = (id, newObject) => {
  return axios.get(`${baseUrl}/${id}`, newObject)
}


export default { getAll, getAllPersons, create, update, remove, getById }