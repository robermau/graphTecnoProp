
import Calculadora from '../../pages/Calculadora/Calculadora'




const Layout = () => {
  return (
     <div className='flex flex-col '>

      <div className='grow'>
        <div className='flex justify-center'>
          <div className='w-full '>
           <Calculadora />
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Layout
