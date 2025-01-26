import React, { useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import axios from "axios";

interface SignUpFormProps {
  onSuccess?: (userData: {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
  }) => Promise<void>;

  onLoginClick: () => void;
}

const SignUpForm = ({ onSuccess, onLoginClick }: SignUpFormProps) => {
  // Yeni state'ler eklendi
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // API'ye gönderilecek veri
    const data = {
      userName,
      firstName,
      lastName,
      email,
      password,
      role: "0", // Sabit 'role' değeri
    };

    try {
      const response = await axios.post(
        "http://localhost:5098/api/Users/register",
        data
      );

      // Başarılı ise mesaj göster
      if (response.status === 200) {
        setResponseMessage("Kayıt başarılı!");
        if (onSuccess) onSuccess(data);
      }
    } catch (error) {
      // Hata durumunda hata mesajı göster
      console.error("Kayıt hatası:", error);
      if (axios.isAxiosError(error)) {
        setResponseMessage(
          `Hata: ${error.response?.data?.message || error.message}`
        );
      } else {
        setResponseMessage("Kayıt sırasında bilinmeyen bir hata oluştu.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Kullanıcı Adı */}
      <div>
        <label
          htmlFor="userName"
          className="block text-sm font-medium text-gray-700"
        >
          Kullanıcı Adı
        </label>
        <div className="mt-1 relative">
          <input
            id="userName"
            name="userName"
            type="text"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <User className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Ad */}
      <div>
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-gray-700"
        >
          Adınız
        </label>
        <div className="mt-1 relative">
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Soyad */}
      <div>
        <label
          htmlFor="lastName"
          className="block text-sm font-medium text-gray-700"
        >
          Soyadınız
        </label>
        <div className="mt-1 relative">
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* E-posta */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          E-posta
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

      {/* Şifre */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Şifre
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

      {/* Gönder butonu */}
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Kayıt Ol
        </button>
      </div>

      {/* Hata veya başarı mesajı */}
      {responseMessage && (
        <div className="text-center text-red-500">{responseMessage}</div>
      )}

      {/* Zaten hesabı olanlar için giriş bağlantısı */}
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Zaten hesabınız var mı?{" "}
          <button
            type="button"
            onClick={onLoginClick}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Giriş Yap
          </button>
        </p>
      </div>
    </form>
  );
};

export default SignUpForm;
