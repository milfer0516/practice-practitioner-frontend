import { Link } from "react-router-dom";
const NavMenuIndex = () => {
	return (
		<>
			{/* Registro Y login */}
			<div className="flex flex-col lg:flex-row w-56 text-center gap-2">
				<Link
					to="/auth/register"
					className="text-white px-4 py-2 font-medium hover:text-gray-900 bg-fuchsia-700 w-full text-lg"
				>
					Registro
				</Link>
				<Link
					to="/auth/login"
					className="ml-4 text-white px-7 py-2 text-lg font-medium hover:text-gray-200 bg-fuchsia-700 w-full text-center"
				>
					Login
				</Link>
			</div>
		</>
	);
};

export default NavMenuIndex;
