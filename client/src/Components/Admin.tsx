import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("adminToken", data.token || "true");
        navigate("/panel");
      } else setError(data.message || "Niepoprawny login lub hasło");
    } catch {
      setError("Błąd serwera. Spróbuj ponownie później.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f7f1] flex items-center justify-center px-4">
      <div className="relative -translate-y-24 bg-white max-w-md w-full rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-1">
          Panel Administratora
        </h2>
        <p className="text-center text-gray-600 text-sm mb-6">
          Zaloguj się, aby uzyskać dostęp do panelu
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-semibold mb-1">
              Nazwa użytkownika
            </label>
            <input
              type="text"
              placeholder="Wpisz nazwę użytkownika"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Hasło</label>
            <input
              type="password"
              placeholder="Wpisz hasło"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          <button
            type="submit"
            className={`w-full py-2 rounded-lg text-white ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-black hover:bg-gray-800"
            }`}
            disabled={loading}
          >
            {loading ? "Logowanie..." : "Zaloguj się"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
