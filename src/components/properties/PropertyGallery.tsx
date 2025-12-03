import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

const PropertyGallery = ({ images, title }: PropertyGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full aspect-video overflow-hidden rounded-xl bg-muted">
      <img
        src={images[currentIndex]}
        alt={`${title} - Image ${currentIndex + 1}`}
        className="w-full h-full object-cover animate-fade-in"
        key={currentIndex}
      />
      
      {images.length > 1 && (
        <>
          <Button
            onClick={goToPrevious}
            size="icon"
            variant="secondary"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            onClick={goToNext}
            size="icon"
            variant="secondary"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full shadow-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-white w-6' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PropertyGallery;
