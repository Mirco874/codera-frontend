import {Routes, Route, useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
import { NavBar } from '../../ui/components';
import { SideBar } from '../components';
import { CheckTaskDelivery, CheckTasksPage, ClassPage, 
         CreateTaskPage, 
         EditTaskPage, 
         MyClassesPage, 
         MyDeliveriesPage, 
         MyDeliveryPage, 
         PendingTaskPage, 
         PracticeCodePage, 
         ProfilePage, 
         ReviewDeliveryPage, 
         TaskPage } from '../pages';
import { existUserLogged } from '../helpers/userData';

export const CoderaRoutes = () => {
  const navigate =useNavigate();

  const verifyUserLogged= async() =>{
    const isUserLogged=await existUserLogged();
     if(!isUserLogged){
      navigate("/auth/login")
     }
  }

  useEffect(()=>{
    verifyUserLogged()
  },[])

  return (
    <div className='page'>

        <NavBar/>
        <SideBar />
        <Routes>
            <Route path="classes" element={<MyClassesPage/>} />
            <Route path="/classes/:classId" element={<ClassPage/>} />
            <Route path="/classes/:classId/pending-tasks" element={<PendingTaskPage/> } />
            <Route path="/classes/:classId/pending-tasks/:taskId" element={<TaskPage/> } />
            <Route path="/classes/:classId/delivered-tasks" element={<MyDeliveriesPage/>} />
            <Route path="/classes/:classId/delivered-tasks/:deliveryId" element={<MyDeliveryPage/>} />
            <Route path="/classes/:classId/create-task" element={<CreateTaskPage/>} />
            <Route path="/classes/:classId/check-tasks" element={<CheckTasksPage/>} />
            <Route path="/classes/:classId/check-tasks/edit/:taskId" element={<EditTaskPage/>} />
            <Route path="/classes/:classId/check-tasks/:taskId" element={<CheckTaskDelivery/>} /> 
            <Route path="/classes/:classId/check-tasks/:taskId/delivery/:deliveryId" element={<ReviewDeliveryPage/>} /> 
            <Route path="practice" element={<PracticeCodePage/>} />
            <Route path="profile" element={<ProfilePage/>} />
        </Routes>
    </div>
  )
}
