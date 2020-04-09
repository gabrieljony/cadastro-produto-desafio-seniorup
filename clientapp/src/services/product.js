import { http } from './config'

export default	{

  get:()=>{
		return http.get('products')
  },

	post:(product)=>{
		return http.post('products', product);
  },
    
	put:(id, product)=>{
		return http.put(`products/${id}`, product);
	},

	delete:(id)=>{
		return http.delete(`products/${id}`);
	}
}