import '../styles/App.css';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';

/**import components */
import Main from './Main';
import Datatable from './Datatable';
/**react routes */
const router=createBrowserRouter([
  {
    path:'/',
    element:<Main></Main>
  },
  {
    path:'/getall',
    element:<Datatable></Datatable>
  }
])
function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
