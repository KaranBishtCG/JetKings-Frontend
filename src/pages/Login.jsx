import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Designer.png";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const validUser = import.meta.env.VITE_USERNAME;
    const validPass = import.meta.env.VITE_PASSWORD;

    if (username === validUser && password === validPass) {
        navigate("/");
    } else {
        alert("Invalid Username / Password");
    }
    };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-b from-slate-100 via-slate-50 to-blue-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center">
          <img src={logo} alt="Jetkins Logo" className="max-w-[250px] w-full mx-auto" />
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-slate-900">
            Welcome Back
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            Please enter your details to access your account.
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">
                Username
              </label>

              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 py-3 text-white font-semibold"
            >
              Sign In →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}