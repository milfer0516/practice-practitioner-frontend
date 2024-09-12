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
			<footer className="text-center mt-3">
				<p>
					© 2024 Milfer Muñoz. Todos los derechos reservados.{" "}
					{new Date().getFullYear()}
				</p>
				<p>
					Este sitio web fue diseñado y creado por <strong>Milfer Muñoz</strong>
					.
				</p>
				<p>
					Parte del contenido de este sitio web se basa en el trabajo de{" "}
					<strong>NombreDelAutor</strong>, disponible en su{" "}
					<a href="https://github.com/NombreDelAutor/Repositorio">
						repositorio de GitHub
					</a>
					.
				</p>
			</footer>
		</>
	);
} 

export default AppLayout