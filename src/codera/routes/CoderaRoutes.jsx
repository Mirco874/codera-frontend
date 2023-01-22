import {Routes, Route} from 'react-router-dom';
import { NavBar } from '../../ui/components';
import { SideBar } from '../components';
import { CheckTasksPage, ClassPage, 
         CreateTaskPage, 
         MyClassesPage, 
         MyDeliveriesPage, 
         MyDeliveryPage, 
         PendingTaskPage, 
         PracticeCodePage, 
         TaskPage } from '../pages';

export const CoderaRoutes = () => {
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
            <Route path="practice" element={<PracticeCodePage/>} />
        </Routes>
    </div>
  )
}
