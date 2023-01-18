import {Routes, Route} from 'react-router-dom';
import { NavBar } from '../../ui/components';
import { SideBar } from '../components';
import { ClassPage, MyClassesPage, PracticeCodePage } from '../pages';

export const CoderaRoutes = () => {
  return (
    <div className='page'>
        <NavBar/>
        <SideBar />

        <Routes>
            <Route path="classes" element={<MyClassesPage/>} />
            <Route path="/classes/:classId" element={<ClassPage/>} />
            <Route path="practice" element={<PracticeCodePage/>} />
        </Routes>

    </div>
  )
}
