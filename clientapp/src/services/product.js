import { http } from './config'

export default	{

  get:()=>{
		return http.get('products')
  },

	post:(product)=>{
		return http.post('products', product);
  },
    
	// put:(produto)=>{
	// 	return http.put('products',produto);
  // },

	// delete:(produto)=>{
	// 	return http.delete('products', { data: produto })
	// }
}