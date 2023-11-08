import Cookie from "js-cookie"

export const authenticate = async (response)=>{
    if(window !=="undefined"){
        await localStorage.setItem("token", response.data.token)   
    }
}

export const getUser= async() => {
    if(window !== "undefiend"){
        if(Cookie.get("username")){
            return  await Cookie.get("username")
        }
    }
}

export const authToken= async()=>{
        return await localStorage.getItem("token") 
}

