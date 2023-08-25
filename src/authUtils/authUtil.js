function getUserType() {
   
    const currentPath = window.location.pathname;
  
    if (currentPath.startsWith('/user')) {
      return 'user';
    } else if (currentPath.startsWith('/vendor')) {
      return 'vendor';
    }
  
   
    // return 'user';
  }
  
  export { getUserType };