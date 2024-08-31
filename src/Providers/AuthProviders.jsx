

// import UseAxiosPublic from "../Hooks/UseAxiosPublic";
import { createContext, useEffect, useState } from "react";
import app from "../Firebase/Firebase.config";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";



export const AuthContext = createContext(null)

const AuthProviders = ({children}) => {
    const auth=getAuth(app)
const googleProvider = new GoogleAuthProvider()
    const [user,setUser]=useState(null)
const [loading,setLoading]=useState(true)
const axiosPublic = UseAxiosPublic()
const googleSigin=()=>{
    setLoading(true)
  return signInWithPopup(auth,googleProvider)
}


const createUser=(email,password)=>{
    setLoading(true)
  return  createUserWithEmailAndPassword(auth,email,password)
}
// const updateuserprofile=(name,photo)=>{
//  return   updateProfile(auth.currentUser, {
//         displayName: name, photoURL: photo
//       })
// }
const updateuserprofile =(name,photo) => {
    setLoading(true)
           
         return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        })
            .then( async() => {
         
                setLoading(false);
                await auth.currentUser.reload()
                setUser(auth.currentUser)
            })
            .catch((error) => {
          
                setLoading(false);
            });
    
}

const updateUser=(u)=>{
    setUser(u)
}

const signInUser=(email,password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth,email,password);
}

const logout=()=>{
    setLoading(true)
    return signOut(auth);
   
}

useEffect(()=>{

    const unsubscribe=onAuthStateChanged(auth,currentUser=>{
        setUser(currentUser);
        console.log('effeect',currentUser);

        if(currentUser){
            const userInfo={email:currentUser.email}
            console.log(userInfo);
           axiosPublic.post('/jwt',userInfo)
            .then(res=>{
                console.log(res.data.token);
                if(res.data.token){
                    localStorage.setItem('access-token',res.data.token);
                    setLoading(false)
                }
            })
        }
        else{
            localStorage.removeItem('access-token')
            setLoading(false)
        }
        
       
    });
    return ()=>{
        unsubscribe();
    }
},[auth,axiosPublic])
    const authInfo={
        user,setUser,loading,setLoading,
        createUser,signInUser,logout,updateuserprofile,googleSigin,updateUser
    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;