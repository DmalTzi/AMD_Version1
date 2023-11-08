import Cookie from "js-cookie"

const liff = window.liff;

export const loginLIFF = async () => {

        await liff.init({ liffId: '2000223015-nyb7qWER' });

        if (liff.isLoggedIn()) {
            const profile = await liff.getProfile();
            const { displayName, userId, pictureUrl } = profile;
            
            Cookie.set("name", displayName)
            Cookie.set("userLineID", userId)
            Cookie.set("pictureUrl", pictureUrl)

            
        } else {
            console.log('User not logged in');
            liff.login();
        }

};

export const fist_login_LIFF = async() =>{

        await liff.init({ liffId: '2000223015-YWzwEWxp' });

        if (liff.isLoggedIn()) {
            const profile = await liff.getProfile();
            const { displayName, userId, pictureUrl } = profile;
            
            Cookie.set("name", displayName)
            Cookie.set("userLineID", userId)
            Cookie.set("pictureUrl", pictureUrl)
    
            
        } else {
            console.log('User not logged in');
            liff.login();
        }

    
}

export const getUserId = async()=>{
    if(Cookie.get("userLineID")){
        return Cookie.get("userLineID")
    }
}

export const closeWindows=async()=>{
    liff.closeWindow()
}