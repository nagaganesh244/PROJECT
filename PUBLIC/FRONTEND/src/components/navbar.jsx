import { NavLink } from "react-router-dom";

const Navbar = ({ isAuthenticated, searchTerm, setSearchTerm }) => {
  return (
    <nav className="bg-black px-4 py-3 flex justify-between relative items-center ml-8">
      <h1 className="text-white text-3xl">YOUTUBE</h1>

      <div className="absolute left-1/2 transform -translate-x-1/2 w-[60%] md:w-[50%] sm:w-[70%] flex ml-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 py-2 mx-11 rounded bg-gray-700 text-white focus:outline-none text-sm sm:text-base"
          placeholder="Search"
        />
        
      </div>

      <div className="ml-4">
        <ul className="flex items-center justify-end gap-9 text-[#3B3C4A] lg:flex-1 max-md:hidden dark:text-[#FFFFFF]">
          {isAuthenticated ? (
            <>
              <li>
                <NavLink to="/profile/">Profile</NavLink>
              </li>
              <li
                className="cursor-pointer"
                onClick={() => {
                  localStorage.removeItem("access");
                  window.location.href = "/";
                }}
              >
                Logout
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
            </>
          )}
          <li className="font-semibold">
            <NavLink to="/upload">Create Post</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
