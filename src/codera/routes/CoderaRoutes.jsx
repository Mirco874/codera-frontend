import {Routes, Route} from 'react-router-dom';
import { NavBar } from '../../ui/components';
import { SideBar } from '../components';
import { ClassPage, MyClassesPage } from '../pages';

export const CoderaRoutes = () => {
  return (
    <>
        <NavBar/>
        <SideBar />

        <Routes>
            <Route  path="classes" element={<MyClassesPage/>} />
            <Route path="/classes/:classId" element={<ClassPage/>} />
        </Routes>

    </>
  )
}
