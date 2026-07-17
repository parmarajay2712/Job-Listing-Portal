import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { LogOut, User2, BarChart3, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!user?.fullname) return "U";
    const names = user.fullname.trim().split(" ");
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return names[0][0].toUpperCase();
  };

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 md:px-6">
        <div>
          <Link to="/">
            <h1 className="text-xl md:text-2xl font-bold cursor-pointer hover:text-gray-700 transition-colors">
              Job<span className="text-[#F83002]"> Listing Portal</span>
            </h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt={user?.fullname || "User"}
                  />
                  <AvatarFallback className="bg-[#6A38C2] text-white font-medium">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="">
                  <div className="flex gap-2 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt={user?.fullname || "User"}
                      />
                      <AvatarFallback className="bg-[#6A38C2] text-white font-medium">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col my-2 text-gray-600">
                    {user && user.role === "student" && (
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <User2 />
                        <Button variant="link">
                          {" "}
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                    )}

                    {user && user.role === "recruiter" && (
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <BarChart3 />
                        <Button variant="link">
                          {" "}
                          <Link to="/recruiter/dashboard">Dashboard</Link>
                        </Button>
                      </div>
                    )}

                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link">
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4 shadow-lg">
          <ul className="flex flex-col font-medium gap-1 py-2">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link
                    to="/admin/companies"
                    className="block py-3 px-3 rounded-lg hover:bg-gray-50 min-h-[44px] flex items-center"
                    onClick={closeMobileMenu}
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/jobs"
                    className="block py-3 px-3 rounded-lg hover:bg-gray-50 min-h-[44px] flex items-center"
                    onClick={closeMobileMenu}
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/"
                    className="block py-3 px-3 rounded-lg hover:bg-gray-50 min-h-[44px] flex items-center"
                    onClick={closeMobileMenu}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/jobs"
                    className="block py-3 px-3 rounded-lg hover:bg-gray-50 min-h-[44px] flex items-center"
                    onClick={closeMobileMenu}
                  >
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/browse"
                    className="block py-3 px-3 rounded-lg hover:bg-gray-50 min-h-[44px] flex items-center"
                    onClick={closeMobileMenu}
                  >
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Mobile Auth/Profile Section */}
          <div className="border-t border-gray-100 pt-3 mt-1">
            {!user ? (
              <div className="flex flex-col gap-2">
                <Link to="/login" onClick={closeMobileMenu}>
                  <Button variant="outline" className="w-full min-h-[44px]">
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={closeMobileMenu}>
                  <Button className="w-full bg-[#6A38C2] hover:bg-[#5b30a6] min-h-[44px]">
                    Signup
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3 px-3 py-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt={user?.fullname || "User"}
                    />
                    <AvatarFallback className="bg-[#6A38C2] text-white font-medium text-sm">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-sm">{user?.fullname}</h4>
                    <p className="text-xs text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>

                {user.role === "student" && (
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 py-3 px-3 rounded-lg hover:bg-gray-50 text-gray-600 min-h-[44px]"
                    onClick={closeMobileMenu}
                  >
                    <User2 className="w-4 h-4" />
                    <span className="text-sm">View Profile</span>
                  </Link>
                )}

                {user.role === "recruiter" && (
                  <Link
                    to="/recruiter/dashboard"
                    className="flex items-center gap-2 py-3 px-3 rounded-lg hover:bg-gray-50 text-gray-600 min-h-[44px]"
                    onClick={closeMobileMenu}
                  >
                    <BarChart3 className="w-4 h-4" />
                    <span className="text-sm">Dashboard</span>
                  </Link>
                )}

                <button
                  onClick={() => {
                    logoutHandler();
                    closeMobileMenu();
                  }}
                  className="flex items-center gap-2 py-3 px-3 rounded-lg hover:bg-gray-50 text-gray-600 min-h-[44px] w-full text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
