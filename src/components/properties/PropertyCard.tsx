import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bed, Bath, Maximize, MapPin } from "lucide-react";
import { Property } from "@/data/dummyProperties";

interface PropertyCardProps {
  property: Property;
  onViewDetails: () => void;
  onBookTour: () => void;
}

const PropertyCard = ({ property, onViewDetails, onBookTour }: PropertyCardProps) => {
  const { t } = useTranslation();
  return (
    <Card className="overflow-hidden hover-lift animate-scale-in bg-card shadow-sm border-border/50">
      <div className="relative h-40 sm:h-48 overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-secondary text-secondary-foreground px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold shadow-md">
          {property.price}
        </div>
      </div>
      
      <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-base sm:text-lg text-foreground line-clamp-2">{property.title}</h3>
            <span className="text-lg sm:text-xl shrink-0" title={property.country}>
              {String.fromCodePoint(...[...property.countryCode.toUpperCase()].map(c => 127397 + c.charCodeAt(0)))}
            </span>
          </div>
          <div className="flex items-center text-muted-foreground text-xs sm:text-sm">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 shrink-0" />
            <span className="truncate">{property.city}, {property.country}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Bed className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
            <span className="truncate">{property.area}</span>
          </div>
        </div>

        <div className="flex gap-2 pt-1 sm:pt-2">
          <Button
            onClick={onViewDetails}
            variant="outline"
            size="sm"
            className="flex-1 rounded-full hover:bg-accent text-xs sm:text-sm py-1.5 sm:py-2"
          >
            {t("common.viewDetails")}
          </Button>
          <Button
            onClick={onBookTour}
            size="sm"
            className="flex-1 rounded-full bg-primary hover:bg-primary-dark text-xs sm:text-sm py-1.5 sm:py-2"
          >
            {t("common.bookTour")}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PropertyCard;
