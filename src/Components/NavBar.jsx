import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
const NavBar = () => {
	const location = useLocation();
	useEffect(() => {
		console.log(location.pathname + " From Navbar");
	}, [location]);

	return (
		<>
			<nav
				className="navbar navbar-expand-lg bg-body-tertiary"
				data-bs-theme="dark"
			>
				<div className="container-fluid">
					<NavLink className="navbar-brand" to="/">
						InoteBook
					</NavLink>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								{/*making tag active when clicking*/}
								<NavLink
									className={`nav-link ${
										location.pathname === "/" ? "active" : ""
									}`}
									aria-current="page"
									to=""
								>
									Home
								</NavLink>
							</li>
							<li className="nav-item">
								{/*adding active dynamicallly by NavLink*/}
								<NavLink
									className={({ isActive }) =>
										isActive ? "nav-link active" : "nav-link"
									}
									to="/about"
								>
									About
								</NavLink>
							</li>
							<li className="nav-item dropdown">
								<NavLink
									className="nav-link dropdown-toggle"
									to="#"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									Dropdown
								</NavLink>
								<ul className="dropdown-menu">
									<li>
										<a className="dropdown-item" to="#">
											Action
										</a>
									</li>
									<li>
										<a className="dropdown-item" to="#">
											Another action
										</a>
									</li>
									<li>
										<hr className="dropdown-divider" />
									</li>
									<li>
										<a className="dropdown-item" to="#">
											Something else here
										</a>
									</li>
								</ul>
							</li>
						</ul>
						<form className="d-flex" role="search">
							<input
								className="form-control me-2"
								type="search"
								placeholder="Search"
								aria-label="Search"
							/>
							<button className="btn btn-outline-success" type="submit">
								Search
							</button>
						</form>

						<div className="mx-2  d-flex justify-content-between">
							<NavLink
								className="btn btn-secondary mx-2 "
								to="/login"
								role="button"
							>
								Login
							</NavLink>
							<NavLink
								className="btn btn-secondary  "
								to="/signup"
								role="button"
							>
								Signup
							</NavLink>
						</div>
					</div>
				</div>
			</nav>
		</>
	);
};

export default NavBar;
