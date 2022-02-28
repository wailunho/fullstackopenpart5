import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
let config = {}

const setToken = (t) => {
  token = `bearer ${t}`
  config = {
    headers: { Authorization: token },
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async obj => {
  const { data } = await axios.post(baseUrl, obj, config)
  return data
}

const update = async (id, obj) => {
  return await axios.put(`${baseUrl}/${id}`, obj, config)
}

const remove = async (id) => {
  return await axios.delete(`${baseUrl}/${id}`, config)
}

export default {
  getAll,
  setToken,
  create,
  update,
  remove,
}