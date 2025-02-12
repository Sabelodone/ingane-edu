import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFeatherAlt, FaBook, FaBrain, FaComments, FaMusic, FaStar, FaPalette } from "react-icons/fa";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Label } from "../components/ui/label";
import Textarea from '../components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from '../components/ui/badge'; 
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';
import { Link } from 'react-router-dom';  // Import Link component from react-router-dom

const Dashboard = () => {
  const [userData, setUserData] = useState({
    name: "Zanele Dlamini",
    email: "zanele@example.com",
    profilePicture: "https://api.dicebear.com/6.x/adventurer/svg?seed=Zanele",
    bio: "Avid reader and adventurer! Loves science and stories!",
    favoriteColor: "Purple",
    hobbies: ["Reading", "Music", "Gaming"],
  });

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const categories = [
    { title: "Izindatshana", icon: FaFeatherAlt, color: "bg-pink-400", emoji: "📜", path: "/izindatshana" },
    { title: "Izinganekwane", icon: FaBook, color: "bg-purple-500", emoji: "📚", path: "/izinganekwane" },
    { title: "Ukuphicaphica", icon: FaBrain, color: "bg-blue-500", emoji: "🧠", path: "/ukuphicaphica" },
    { title: "Izisho/Nezaga", icon: FaComments, color: "bg-green-500", emoji: "💬", path: "/izisho-nezaga" },
    { title: "Onkamisa", icon: FaMusic, color: "bg-yellow-400", emoji: "🎶", path: "/onkamisa" },
    { title: "Imisindo", icon: FaStar, color: "bg-red-500", emoji: "🌟", path: "/imisindo" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 p-8 font-sans">
      <header className="flex justify-between items-center mb-8">
        <motion.h1
          className="text-5xl font-bold text-purple-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Izici Zethu <span className="text-red-500">❤️</span>
        </motion.h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full" onClick={() => setIsProfileOpen(true)}>
                <Avatar>
                  <AvatarImage src={userData.profilePicture} alt={userData.name} />
                  <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View Profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </header>

      <AnimatePresence>
        {isProfileOpen && (
          <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>User Profile</DialogTitle>
                <DialogDescription>View and edit your profile information.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={userData.profilePicture} alt={userData.name} />
                    <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{userData.name}</h3>
                    <p className="text-sm text-gray-600">{userData.email}</p>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" value={userData.bio} readOnly className="bg-white text-gray-800" />
                </div>
                <div className="flex gap-2">
                  <FaPalette className="text-purple-500" />
                  <span className="text-gray-800">Favorite Color: {userData.favoriteColor}</span>
                </div>
                <div>
                  <Label>Hobbies</Label>
                  <div className="flex gap-2 mt-2">
                    {userData.hobbies.map((hobby) => (
                      <Badge key={hobby} variant="secondary">
                        {hobby}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className={`${category.color} hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <motion.div
                  className="text-white text-4xl mb-4"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, type: "spring" }}
                >
                  <category.icon />
                </motion.div>
                <motion.h2
                  className="text-3xl font-semibold text-gray-800 mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  {category.title}
                </motion.h2>
                <motion.p
                  className="text-gray-800 text-center mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  {category.emoji} Funda ngezinto ezimnandi ezizokhuthaza izingane.
                </motion.p>
                <Button
                  className="mt-4 bg-white text-purple-600 hover:bg-purple-100 transition-colors"
                  variant="secondary"
                >
                  <Link to={category.path} className="w-full h-full">Explore</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </main>
    </div>
  );
};

export default Dashboard;