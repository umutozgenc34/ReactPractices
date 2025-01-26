import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Search,
  LogIn,
  UserPlus,
  BookOpen,
  LogOut,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import AuthModal from "./auth/AuthModal";
import LoginForm from "./auth/LoginForm";
import SignUpForm from "./auth/SignUpForm";
import axios from "axios";

const Header = () => {
  const { cartItems } = useCart();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [girisBasarili, setGirisBasarili] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();

  interface User {
    email: string;
    userName: string;
  }

  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (users.length > 0) {
      const matchedUser = users.find((user) => user.email === email);
      if (matchedUser) {
        setUsername(matchedUser.userName);
      }
    }
  }, [girisBasarili, email, users]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5098/api/Users");
        setUsers(response.data?.data);
        console.log("Kullanıcılar başarıyla yüklendi:", response.data?.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Kullanıcıları yüklerken hata oluştu:", error.message);
        } else {
          console.error("Kullanıcıları yüklerken hata oluştu:", error);
        }
      }
    };

    fetchUsers();
  }, [girisBasarili]);

  const handleLoginSuccess = () => {
    setIsLoginOpen(false);
    
  };

  const handleSignUpSuccess = async (userData: {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
  }) => {
    try {
      console.log("Gönderilen kullanıcı verisi:", userData); 
      const response = await axios.post(
        "http://localhost:5098/api/Users/register",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        console.log("Sunucudan gelen yanıt:", response.data);
        setIsSignUpOpen(false);
        
      } else {
        console.error("Beklenmeyen yanıt durumu:", response.status);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Kayıt sırasında hata oluştu:",
          error.response?.data || error.message
        );
      } else {
        console.error("Kayıt sırasında hata oluştu:", error);
      }
    }
  };

  const openLogin = () => {
    setIsSignUpOpen(false);
    setIsLoginOpen(true);
  };

  const openSignUp = () => {
    setIsLoginOpen(false);
    setIsSignUpOpen(true);
  };

  const handleLogout = () => {
    setGirisBasarili(false);
    setEmail("");
    setUsername("");
    
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5098/api/Courses/search?keyword=${searchKeyword}`
      );
      navigate("/search-results", { state: { results: response.data.data } });
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Learn
              </span>
            </Link>

            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Search for anything"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <nav className="flex items-center space-x-6">
              <button className="text-gray-700 hover:text-gray-900">
                Teach
              </button>
              <Link to="/cart" className="relative">
                <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-gray-900" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Link>
              <div
                className={`${
                  girisBasarili ? "hidden" : "flex items-center space-x-4"
                }`}
              >
                <button
                  onClick={openLogin}
                  className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Log in
                </button>
                <button
                  onClick={openSignUp}
                  className="flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Sign up
                </button>
              </div>

              {girisBasarili && (
                <div className="flex items-center space-x-4">
                  <div>Hoşgeldin: {username}</div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Log out
                  </button>
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        title="Log in to Learn"
      >
        <LoginForm
          setGirisBasarili={setGirisBasarili}
          email={email}
          setEmail={setEmail}
          onSuccess={handleLoginSuccess}
          onSignUpClick={openSignUp}
        />
      </AuthModal>

      <AuthModal
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
        title="Sign up for Learn"
      >
        <SignUpForm onSuccess={handleSignUpSuccess} onLoginClick={openLogin} />
      </AuthModal>
    </>
  );
};

export default Header;
