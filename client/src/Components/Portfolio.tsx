import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";

type RoomCategory = "Bedroom" | "Living Room" | "Restroom" | "Kitchen";

interface Photo {
  public_id: string;
  url: string;
  category?: RoomCategory;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const photoVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0,
    y: -30,
    scale: 0.95,
    transition: { duration: 0.3 },
  },
};

const Portfolio = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/photos/list");
        if (!response.ok) throw new Error("Błąd pobierania zdjęć");
        const data: Photo[] = await response.json();
        setPhotos(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Coś poszło nie tak");
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <div className="w-full bg-[#faf9f6] flex justify-center pb-16">
      <div className="max-w-[82.5rem] flex flex-col items-center font-family-Geologica px-4">
        <h1 className="uppercase text-black mt-16 text-4xl sm:text-5xl md:text-6xl">
          portfolio
        </h1>

        {loading ? (
          <p className="mt-16 text-gray-600">Ładowanie zdjęć...</p>
        ) : error ? (
          <p className="mt-16 text-red-500">{error}</p>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-16 w-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {photos.length > 0 ? (
                photos.map((photo) => (
                  <motion.div
                    key={photo.public_id}
                    variants={photoVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                  >
                    <img
                      src={photo.url}
                      alt="Zdjęcie portfolio"
                      className="w-full h-80 object-cover rounded-lg shadow-md cursor-pointer"
                    />
                  </motion.div>
                ))
              ) : (
                <motion.p
                  key="no-photos"
                  className="text-center text-gray-600 col-span-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Brak zdjęć.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
