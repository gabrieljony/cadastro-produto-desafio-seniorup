import { http } from './config'

export default {

  get: () => {
    return http.get('categories')
  },

  post: (category) => {
    return http.post('categories', category);
  },

  put:(id, category)=>{
  	return http.put(`categories/${id}`, category);
  },

  delete:(id)=>{
  	return http.delete(`categories/${id}`);
  }
}