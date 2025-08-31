import { useState, useEffect } from "react";

interface Photo {
  url: string;
  public_id: string;
}

export default function OraczewskiMoment() {
  const [files, setFiles] = useState<Photo[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/";
  };
  const fetchFiles = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/photos/list");
      const data: Photo[] = await res.json();
      setFiles(data);
    } catch (err) {
      console.error("Błąd pobierania zdjęć:", err);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Wybierz plik!");
    setLoading(true);

    const formData = new FormData();
    formData.append("photo", selectedFile);

    try {
      const res = await fetch("http://localhost:5000/api/photos/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setSelectedFile(null);
        setPreview(null);
        fetchFiles();
      } else {
        alert("Błąd dodawania zdjęcia");
      }
    } catch (err) {
      console.error("Błąd uploadu:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (publicId: string) => {
    if (!confirm("Czy na pewno chcesz usunąć to zdjęcie?")) return;
    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:5000/api/photos/delete/${encodeURIComponent(
          publicId
        )}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        fetchFiles();
      } else {
        alert("Nie udało się usunąć zdjęcia");
      }
    } catch (err) {
      console.error("Błąd usuwania:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">OraczewskiMoment - CMS zdjęć</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Wyloguj
      </button>
      <div className="mb-6 flex flex-col sm:flex-row items-center gap-4 border-1 border-black p-4 m-4">
        <input
          type="file"
          onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
          className="border-1 border-black p-4 bg-black text-white rounded-md cursor-pointer"
        />
        <button
          onClick={handleUpload}
          disabled={loading || !selectedFile}
          className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Trwa upload..." : "Dodaj zdjęcie"}
        </button>
      </div>

      {preview && (
        <div className="mb-6">
          <p className="mb-2 font-semibold">Podgląd wybranego pliku:</p>
          <img
            src={preview}
            alt="preview"
            className="w-48 h-48 object-cover border rounded"
          />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {files.map((file) => (
          <div
            key={file.public_id}
            className="border rounded p-2 relative group"
          >
            <img
              src={file.url}
              alt={file.public_id}
              className="w-full h-40 object-cover rounded"
            />
            <button
              onClick={() => handleDelete(file.public_id)}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 hover:bg-red-600 transition"
            >
              Usuń
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
