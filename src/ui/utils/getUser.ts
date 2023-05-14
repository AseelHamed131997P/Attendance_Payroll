const getUser = ()=>{
    let user = null;
    const localUser = localStorage.getItem("user");

    if (localUser) {
      user = JSON.parse(localUser);
      return user;
    }
  
  }

  export default getUser;
