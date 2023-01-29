
import { useState } from "react";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useFetch } from "../../../hooks";
import { Button, InfoMessage, TextInput } from "../../../ui/components";
import { Loading } from "../../components";
import { putFromAPI } from "../../helpers/putFromAPI";
import "./ProfilePage.css"

export const ProfilePage = () => {

  const [ profileData, setProfileData ]= useState({
                                                    photo: "",
                                                    email:"",
                                                    fullName: ""
                                                    });
                                                  
  const { data: userData, isLoading: userLoading, fetchData: reloadUserData } =useFetch("users/me");

  useEffect(()=>{
    if(userData!==null){
        setProfileData({
            photo: userData.photo,
            email: userData.email,
            fullName:userData.fullName
        })
    }

  },[userData,userLoading])

  const onProfileChange=({ target })=>{
    const { name, value } =target;
    setProfileData({...profileData, [name]: value})
  }



  const updateProfile =async ()=>{
    try {
        await putFromAPI("users/me", {
            fullName:profileData.fullName,
            photo: profileData.photo  
        });

        toast.success("profile updated successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout( ()=> {reloadUserData();}, 1000);
          
    } catch (error) {
        
        toast.error("Server error", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
    }

  }


  return (
    <div className="main-content">
      <section className="main-layout">
        <div className="my-profile">
            <p className="header6"> <b>My Profile</b></p>
            <InfoMessage text="In this section you can edit your profile."/>
                <form className="profile-form">
                 {
                    userLoading ? <Loading/>
                    :<>
                        <img  className="my-profile-photo" src={profileData.photo}  alt={profileData.fullName} />

                        <label><b>Email: </b>{` ${profileData.email}`}</label>

                        <label><b>Photo link*:</b></label>
                        <TextInput 
                            width="100%"  
                            name="photo"
                            value={profileData.photo} 
                            onChange={onProfileChange} 
                        />


                        <label><b>Name*:</b></label>
                        <TextInput  
                            width="100%" 
                            name="fullName" 
                            value={profileData.fullName} 
                            onChange={onProfileChange} 
                        />
                        
                        <Button 
                            text="Save" 
                            borderRadius="10px" 
                            type="white"  
                            height="35px"
                            width="100px" 
                            onClickFunction={updateProfile}
                        />

                    </> 
                 }

                </form>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        </div>
      </section>
    </div>
  );
};
