import { LogOut, User } from "lucide-react";
import Logo from "../assets/seedling-solid-full.svg";
import useLogout from "../hooks/useLogout";
import { useNavigate } from "react-router" 

const Navbar = () => {
  const logout = useLogout();
  const navigate = useNavigate();

  const signOut = async () => {
    await logout();
    navigate("/login")
  }

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1 flex items-center gap-2">
        <h1 className="font-semibold text-2xl tracking-tight max-w-xl">
          Plant Watering
        </h1>

        <img src={Logo} className="w-8 h-8" />
      </div>
      <div className="flex gap-2">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full bg-base-100">
              <User className="mx-auto mt-1.5" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow border"
          >
            <li>
              <span>
                <LogOut className="rotate-180" />
                <button className="font-semibold" onClick={signOut}>Logout</button>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
