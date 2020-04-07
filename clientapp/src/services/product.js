import { http } from './config'

export default	{

  get:()=>{
		return http.get('products')
  },

	post:(id)=>{
		return http.post('products', id);
  },
    
	// put:(produto)=>{
	// 	return http.put('products',produto);
  // },

	// delete:(produto)=>{
	// 	return http.delete('products', { data: produto })
	// }
}