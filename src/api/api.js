import axios from "axios"

export const apiMock = axios.create({
  baseURL: 'https://617323d6110a740017222fa5.mockapi.io/'
})

export const loadUfs = async () => {
  const baseUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
  return axios.get(baseUrl).then(response => response.data)

}

export const loadState = async (id) => {
  const baseUrl = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${id.substring(0, 2)}/municipios`
  return axios.get(baseUrl).then(response => response.data)

}
