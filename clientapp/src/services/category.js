import { http } from './config'

export default {

  get: () => {
    return http.get('categories')
  },

  post: (category) => {
    return http.post('categories', category);
  },

  // put:(produto)=>{
  // 	return http.put('products',produto);
  // },

  // delete:(produto)=>{
  // 	return http.delete('products', { data: produto })
  // }
}