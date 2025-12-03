import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Property } from "@/data/dummyProperties";
import PropertyGallery from "./PropertyGallery";
import VirtualTourViewer from "@/components/tours/VirtualTourViewer";
import PropertyMap from "@/components/maps/PropertyMap";
import { MapPin, Bed, Bath, Maximize, Calendar, School, ShoppingBag, Bus, CheckCircle, Eye, Images, Map } from "lucide-react";

interface PropertyDetailProps {
  property: Property | null;
  open: boolean;
  onClose: () => void;
  onBookTour: () => void;
}

const PropertyDetail = ({ property, open, onClose, onBookTour }: PropertyDetailProps) => {
  const { t } = useTranslation();
  if (!property) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{property.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Tabs defaultValue="gallery" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="gallery" className="gap-2">
                <Images className="w-4 h-4" />
                {t("propertyDetail.photos")}
              </TabsTrigger>
              <TabsTrigger value="tour" className="gap-2">
                <Eye className="w-4 h-4" />
                {t("propertyDetail.tour360")}
              </TabsTrigger>
              <TabsTrigger value="map" className="gap-2">
                <Map className="w-4 h-4" />
                {t("propertyDetail.location")}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="gallery" className="mt-4">
              <PropertyGallery images={property.images} title={property.title} />
            </TabsContent>
            
            <TabsContent value="tour" className="mt-4">
              <VirtualTourViewer imageUrl={property.panoramaUrl} />
            </TabsContent>
            
            <TabsContent value="map" className="mt-4">
              <PropertyMap property={property} />
            </TabsContent>
          </Tabs>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">{property.price}</div>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="w-4 h-4 mr-1" />
                {property.location}
              </div>
            </div>
            <Button onClick={onBookTour} size="lg" className="rounded-full bg-primary hover:bg-primary-dark">
              <Calendar className="w-4 h-4 mr-2" />
              {t("booking.bookTour")}
            </Button>
          </div>

          <div className="flex gap-6 py-4 border-y">
            <div className="flex items-center gap-2">
              <Bed className="w-5 h-5 text-primary" />
              <span className="font-semibold">{property.bedrooms}</span>
              <span className="text-muted-foreground">{t("properties.bedrooms")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="w-5 h-5 text-primary" />
              <span className="font-semibold">{property.bathrooms}</span>
              <span className="text-muted-foreground">{t("properties.bathrooms")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Maximize className="w-5 h-5 text-primary" />
              <span className="font-semibold">{property.area}</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">{t("propertyDetail.description")}</h3>
            <p className="text-muted-foreground leading-relaxed">{property.description}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">{t("propertyDetail.keyFeatures")}</h3>
            <div className="grid grid-cols-2 gap-2">
              {property.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">{t("propertyDetail.nearbyPlaces")}</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-medium">
                  <School className="w-4 h-4 text-blue-500" />
                  {t("propertyDetail.schools")}
                </div>
                {property.nearbyPlaces.schools.map((school, index) => (
                  <p key={index} className="text-sm text-muted-foreground">{school}</p>
                ))}
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-medium">
                  <ShoppingBag className="w-4 h-4 text-green-500" />
                  {t("propertyDetail.shopping")}
                </div>
                {property.nearbyPlaces.malls.map((mall, index) => (
                  <p key={index} className="text-sm text-muted-foreground">{mall}</p>
                ))}
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-medium">
                  <Bus className="w-4 h-4 text-yellow-600" />
                  {t("propertyDetail.transport")}
                </div>
                {property.nearbyPlaces.transport.map((transport, index) => (
                  <p key={index} className="text-sm text-muted-foreground">{transport}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyDetail;
