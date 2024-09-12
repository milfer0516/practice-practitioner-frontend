import { Outlet } from 'react-router-dom'
import Logo from "../components/Logo";

import NavMenu from "../components/NavMenuIndex";
const AppLayout = () => {
  return (
		<>
			<header className="bg-gray-800 py-5">
				<div className="max-w-screen-2xl mx-auto flex flex-row justify-between lg:justify-around items-center">
					<div className="w-36 ml-5">
						<Logo />
					</div>
					<NavMenu />
				</div>
				
			</header> 

			<section className="max-w-screen-2xl mx-auto mt-10 p-5">
				<Outlet />              
			</section>	
			<footer>
				<p className='text-center'>Todos los derechos son reservados {' '}
				{ new Date().getFullYear() }</p>
			</footer>
		</>
	)
} 

export default AppLayout