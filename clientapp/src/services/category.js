import { http } from './config'

export default {

  get: () => {
    return http.get('categories')
  },

  post: (categories) => {
    return http.post('categories', categories);
  },

  // put:(produto)=>{
  // 	return http.put('products',produto);
  // },

  // delete:(produto)=>{
  // 	return http.delete('products', { data: produto })
  // }
}