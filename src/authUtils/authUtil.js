function getUserType() {

   
   
    const currentPath = window.location.pathname;
  
    if (currentPath.startsWith('/user')) {
      const userToken = localStorage.getItem('userToken')
     if(userToken){
      return{type:'user' ,token:userToken}
     }
    } else if (currentPath.startsWith('/vendor')) {
      const vendorToken = localStorage.getItem('vendorToken')
      if(vendorToken){
        return{type:'vendor',token:vendorToken}
      }
    }
  
   
    return null
  }
  
  export { getUserType };