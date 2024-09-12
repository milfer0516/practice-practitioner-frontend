import Logo from "../components/Logo";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
	return (
		<>
			<div className="bg-gray-800 min-h-screen">
				<div className="py-10 lg:py-20 mx-auto w-[450px] ">
					<section className="w-40 mx-auto">
						<Logo />
					</section>
					<div className="mt-10">
						<Outlet />
					</div>
				</div>
			</div>
		</>
	);
};

export default AuthLayout;
