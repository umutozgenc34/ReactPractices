import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import axios from "axios";

interface LoginFormProps {
  onSuccess?: () => void;
  onSignUpClick: () => void;
  setGirisBasarili: (girisBasarili: boolean) => void;
  email: string;
  setEmail: (email: string) => void;
}

const LoginForm = ({
  onSuccess,
  onSignUpClick,
  setGirisBasarili,
  email,
  setEmail,
}: LoginFormProps) => {
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5098/api/Auths/login",
        { email, password }
      );
      if (response.status == 201) {
        setResponseMessage(`Başarılı: ${response.data.message}`);
        console.log("Giriş başarılıdır");
        setGirisBasarili(true);
        if (onSuccess) onSuccess();
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setResponseMessage(
          `Hata: ${error.response?.data?.message || error.message}`
        );
      } else {
        setResponseMessage(`Hata: ${error}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email address
        </label>
        <div className="mt-1 relative">
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <div className="mt-1 relative">
          <input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Log in
        </button>
      </div>

      {responseMessage && (
        <div className="text-center text-red-500">{responseMessage}</div>
      )}
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={onSignUpClick}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign up
          </button>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
