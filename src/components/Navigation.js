import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBars, FaTimes, FaBell, FaUserCircle, FaCog } from "react-icons/fa"; // Import icons
import { Button } from "./ui/button";
import { useTheme } from "./ThemeContext";
import { useAuth } from "./AuthContext"; // Import the authentication hook
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Textarea from "./ui/textarea";

const Navigation = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false); // State for side drawer
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown menu
  const [notifications, setNotifications] = useState(3); // State for notifications
  const [userData, setUserData] = useState({
    name: "Zanele Dlamini",
    email: "zanele@example.com",
    profilePicture: "https://api.dicebear.com/6.x/adventurer/svg?seed=Zanele",
    bio: "Avid reader and adventurer! Loves science and stories!",
    favoriteColor: "Purple",
    hobbies: ["Reading", "Music", "Gaming"],
  });

  const { isAuthenticated, user, logout } = useAuth(); // Get authentication state

  const toggleDrawer = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold text-primary">
          Ingane Edu
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center space-x-4">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="outline"
              onClick={() => setTheme(theme === "default" ? "space" : "default")}
              className="font-bold"
            >
              {theme === "default" ? "🌙" : "☀️"}
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button asChild className="bg-accent text-white hover:bg-accent-hover font-bold">
              <Link to="/signin">Qala Lapha</Link>
            </Button>
          </motion.div>

          {/* Avatar Dropdown - Only shown if logged in */}
          {isAuthenticated && (
            <div className="flex items-center space-x-4 relative">
              {/* Notifications */}
              <Button variant="outline" size="icon" className="relative">
                <FaBell className="h-4 w-4" />
                <span className="sr-only">Notifications</span>
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full" />
                )}
              </Button>

              {/* Profile Avatar Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <img
      src={userData?.profilePicture || "/default-avatar.png"} // Default avatar if no profile picture is provided
      alt="User Avatar"
      className="avatar" // You can add some class for styling
    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{userData?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{userData?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  {/* Profile Settings */}
                  <DropdownMenuItem>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" className="w-full justify-start">
                          <FaUserCircle className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Edit Profile</DialogTitle>
                          <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Name
                            </Label>
                            <Input
                              id="name"
                              name="name"
                              value={userData?.name}
                              onChange={handleProfileChange}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                              Email
                            </Label>
                            <Input
                              id="email"
                              name="email"
                              value={userData?.email}
                              onChange={handleProfileChange}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="bio" className="text-right">
                              Bio
                            </Label>
                            <Textarea
                              id="bio"
                              name="bio"
                              value={userData?.bio}
                              onChange={handleProfileChange}
                              className="col-span-3"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button variant="primary" onClick={() => setUserData(userData)}>
                            Save
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </DropdownMenuItem>

                  {/* Settings */}
                  <DropdownMenuItem>
                    <FaCog className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  {/* Log out */}
                  <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="sm:hidden flex items-center">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button onClick={toggleDrawer} className="p-2">
              {isOpen ? <FaTimes size={30} className="text-primary" /> : <FaBars size={30} className="text-primary" />}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Side Drawer for Mobile */}
      <div
        className={`fixed top-0 right-0 z-40 w-3/4 h-full bg-white shadow-xl transition-transform transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button onClick={toggleDrawer} className="p-2">
              <FaTimes size={30} className="text-primary" />
            </Button>
          </motion.div>
        </div>
        <div className="flex flex-col items-center justify-center space-y-6">
          <Link
            to="/"
            className="text-xl font-bold text-primary hover:text-accent transition-all"
            onClick={toggleDrawer}
          >
            Home
          </Link>
          <Link
            to="/signin"
            className="text-xl font-bold text-primary hover:text-accent transition-all"
            onClick={toggleDrawer}
          >
            Qala Lapha
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
