import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageSelector from "@/components/LanguageSelector";
import ThemeToggle from "@/components/ThemeToggle";
import FilterBar from "@/components/filters/FilterBar";
import PropertyCard from "@/components/properties/PropertyCard";
import PropertyDetail from "@/components/properties/PropertyDetail";
import BookingModal from "@/components/booking/BookingModal";
import { dummyProperties, Property } from "@/data/dummyProperties";

const Properties = () => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState({ country: "all", city: "all" });
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showPropertyDetail, setShowPropertyDetail] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  const filteredProperties = useMemo(() => {
    return dummyProperties.filter((property) => {
      if (filters.country !== "all" && property.country !== filters.country) {
        return false;
      }
      if (filters.city !== "all" && property.city !== filters.city) {
        return false;
      }
      return true;
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-background">
      <ThemeToggle />
      
      <header className="border-b bg-card/50 backdrop-blur px-3 sm:px-4 py-3 sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Home className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            <h1 className="text-base sm:text-lg font-semibold">{t("common.appName")}</h1>
          </div>
          <LanguageSelector />
        </div>
      </header>

      <FilterBar onFilterChange={setFilters} />

      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
            {filters.country !== "all" || filters.city !== "all"
              ? `${t("properties.propertiesIn")} ${filters.city !== "all" ? filters.city + ", " : ""}${filters.country !== "all" ? filters.country : t("properties.allLocations")}`
              : t("properties.allProperties")}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            {filteredProperties.length} {filteredProperties.length === 1 ? t("properties.property") : t("properties.properties")} {t("properties.available")}
          </p>
        </div>

        {filteredProperties.length === 0 ? (
          <div className="text-center py-12 sm:py-16 px-4">
            <p className="text-lg sm:text-xl text-muted-foreground mb-4">
              {t("properties.noPropertiesFound")}
            </p>
            <Button
              onClick={() => setFilters({ country: "all", city: "all" })}
              variant="outline"
            >
              {t("common.clearFilters")}
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onViewDetails={() => {
                  setSelectedProperty(property);
                  setShowPropertyDetail(true);
                }}
                onBookTour={() => {
                  setSelectedProperty(property);
                  setShowBooking(true);
                }}
              />
            ))}
          </div>
        )}
      </main>

      <PropertyDetail
        property={selectedProperty}
        open={showPropertyDetail}
        onClose={() => setShowPropertyDetail(false)}
        onBookTour={() => {
          setShowPropertyDetail(false);
          setShowBooking(true);
        }}
      />

      <BookingModal
        property={selectedProperty}
        open={showBooking}
        onClose={() => setShowBooking(false)}
      />
    </div>
  );
};

export default Properties;
