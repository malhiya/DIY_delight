// import React from 'react'
// import { useRoutes } from 'react-router-dom'
// import Navigation from './components/Navigation'
// import ViewBags from './pages/ViewBags'
// import EditBag from './pages/EditBag'
// import CreateBag from './pages/CreateBag'
// import BagDetails from './pages/BagDetails'
// import './App.css'

// const App = () => {
//   let element = useRoutes([
//     {
//       path: '/',
//       element: <CreateBag title='Bagistry| Customize' />
//     },
//     {
//       path:'/customcars',
//       element: <ViewBags title='Bagistry | Custom Cars' />
//     },
//     {
//       path: '/customcars/:id',
//       element: <BagDetails title='Bagistry | View' />
//     },
//     {
//       path: '/edit/:id',
//       element: <EditBag title='Bagistry | Edit' />
//     }
//   ])

//   return (
//     <div className='app'>

//       <Navigation />

//       { element }

//     </div>
//   )
// }

// export default App
import React from 'react'
import { useRoutes } from 'react-router-dom'
import Navigation from './components/Navigation'
import ViewBags from './pages/ViewBags'
import EditBag from './pages/EditBag'
import CreateBag from './pages/CreateBag'
import BagDetails from './pages/BagDetails'
import './App.css'

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <CreateBag title='DIY Delight | Create' />
    },
    {
      path: '/bags',
      element: <ViewBags title='DIY Delight | All Bags' />
    },
    {
      path: '/bags/:id',
      element: <BagDetails title='DIY Delight | View' />
    },
    {
      path: '/bags/:id/edit',
      element: <EditBag title='DIY Delight | Edit' />
    }
  ])

  return (
    <div className='app'>
      <Navigation />
      { element }
    </div>
  )
}

export default App