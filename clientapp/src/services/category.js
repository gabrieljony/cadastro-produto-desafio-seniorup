import { http } from './config'

export default {

  get: () => {
    return http.get('categories')
  },

  post: (id) => {
    return http.post('categories', id);
  },

  // put:(produto)=>{
  // 	return http.put('products',produto);
  // },

  // delete:(produto)=>{
  // 	return http.delete('products', { data: produto })
  // }
}