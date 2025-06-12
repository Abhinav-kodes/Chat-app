// Import each component by name from flowbite-react
import { Link } from "react-router-dom";
import "../App.css"
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";
const Navbara = () => {
   const { logout, authUser } = useAuthStore();
  
  return (
    // Use the imported components directly (e.g., <NavbarBrand> instead of <Navbar.Brand>)
   <header
    className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
            <div className="w-9 h-9 rounded-lg bg-purple-400 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary-600" />
            </div>
            <h1 className="text-lg font-bold">Chatty</h1>
          </Link>
          </div>
          <div className="flex items-center gap-8">
            <Link 
              to={"/settings"}
              className={`btn btn-sm gap-2 flex transition-colors`}>
                <Settings className="w-5 h-5" />
                <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link to={"/profile"} className={`btn flex btn-sm gap-2`}>
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="flex gap-2 items-center" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbara;
