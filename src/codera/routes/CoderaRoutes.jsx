import {Routes, Route} from 'react-router-dom';
import { NavBar } from '../../ui/components';
import { MyClassesPage } from '../pages';

export const CoderaRoutes = () => {
  return (
    <>
        <NavBar/>
        <Routes>
            <Route path="classes" element={<MyClassesPage/>} />
        </Routes>
    </>
  )
}
