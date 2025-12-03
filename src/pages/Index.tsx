import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, MessageCircle, Building2, Bed, Bath, Maximize2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LanguageSelector from "@/components/LanguageSelector";
import ChatInterface from "@/components/chat/ChatInterface";
import ThemeToggle from "@/components/ThemeToggle";
import heroBackground from "@/assets/hero-background.jpg";
import { dummyProperties } from "@/data/dummyProperties";

const Index = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);

  if (showChat) {
    return (
      <div className="flex flex-col h-screen bg-background">
        <ThemeToggle />
        <header className="border-b bg-card/50 backdrop-blur px-3 sm:px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <Home className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              <h1 className="text-base sm:text-lg font-semibold">{t("common.appName")}</h1>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/properties")}
              className="gap-1 sm:gap-2 text-xs sm:text-sm"
            >
              <Building2 className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{t("common.browseProperties")}</span>
              <span className="sm:hidden">{t("common.browse")}</span>
            </Button>
          </div>
          <LanguageSelector />
        </header>
        <ChatInterface />
      </div>
    );
  }

  const featuredProperties = dummyProperties.slice(0, 3);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      {/* Gradient Overlay for better text readability */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      
      <ThemeToggle />
      
      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Hero Section */}
        <div className="flex-1 flex items-center justify-center p-4 pb-8">
          <div className="max-w-4xl w-full text-center space-y-6 sm:space-y-8 animate-fade-in">
            <div className="space-y-3 sm:space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary text-primary-foreground shadow-2xl animate-scale-in backdrop-blur-sm">
                <Home className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white px-2 [text-shadow:_0_4px_12px_rgb(0_0_0_/40%)]">
                {t("home.title")}
              </h1>
              
              <p className="text-lg sm:text-xl text-white/95 max-w-2xl mx-auto leading-relaxed px-4 [text-shadow:_0_2px_8px_rgb(0_0_0_/60%)]">
                {t("home.subtitle")}
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4 px-2">
              <LanguageSelector />
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => setShowChat(true)}
                  size="lg"
                  className="rounded-full bg-primary hover:bg-primary/90 text-base sm:text-lg py-6 sm:py-7 shadow-2xl hover:shadow-primary/50 hover:scale-105 transition-all animate-scale-in backdrop-blur-sm"
                >
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                  {t("home.chatWithAI")}
                </Button>
                <Button
                  onClick={() => navigate("/properties")}
                  size="lg"
                  variant="outline"
                  className="rounded-full text-base sm:text-lg py-6 sm:py-7 shadow-2xl hover:shadow-white/20 bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50 backdrop-blur-sm hover:scale-105 transition-all animate-scale-in"
                >
                  <Building2 className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                  {t("home.browseAll")}
                </Button>
                <Button
                  onClick={() => navigate("/map")}
                  size="lg"
                  variant="outline"
                  className="rounded-full text-base sm:text-lg py-6 sm:py-7 shadow-2xl hover:shadow-white/20 bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50 backdrop-blur-sm hover:scale-105 transition-all animate-scale-in"
                >
                  {t("home.worldMap")}
                </Button>
              </div>

              <p className="text-sm sm:text-base text-white/90 font-medium [text-shadow:_0_2px_4px_rgb(0_0_0_/40%)]">
                {t("home.features")}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto pt-6 sm:pt-8 px-2">
              <div className="text-center space-y-2 animate-fade-in backdrop-blur-sm bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all" style={{ animationDelay: '200ms' }}>
                <div className="text-2xl sm:text-3xl">🇺🇸</div>
                <p className="text-xs sm:text-sm text-white/90 font-medium">{t("home.unitedStates")}</p>
              </div>
              <div className="text-center space-y-2 animate-fade-in backdrop-blur-sm bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all" style={{ animationDelay: '300ms' }}>
                <div className="text-2xl sm:text-3xl">🇬🇭</div>
                <p className="text-xs sm:text-sm text-white/90 font-medium">{t("home.ghana")}</p>
              </div>
              <div className="text-center space-y-2 animate-fade-in backdrop-blur-sm bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all" style={{ animationDelay: '400ms' }}>
                <div className="text-2xl sm:text-3xl">🇬🇧</div>
                <p className="text-xs sm:text-sm text-white/90 font-medium">{t("home.unitedKingdom")}</p>
              </div>
              <div className="text-center space-y-2 animate-fade-in backdrop-blur-sm bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all" style={{ animationDelay: '500ms' }}>
                <div className="text-2xl sm:text-3xl">🇳🇬</div>
                <p className="text-xs sm:text-sm text-white/90 font-medium">{t("home.nigeria")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Properties Section */}
        <div className="relative z-10 pb-8 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6 [text-shadow:_0_2px_8px_rgb(0_0_0_/60%)]">
              {t("home.featuredProperties")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {featuredProperties.map((property, index) => (
                <Card
                  key={property.id}
                  onClick={() => navigate("/properties")}
                  className="group cursor-pointer overflow-hidden bg-background/95 backdrop-blur-md hover:bg-background transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-slide-in-right border-2 border-primary/20 hover:border-primary/40"
                  style={{ animationDelay: `${600 + index * 150}ms` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      {property.price}
                    </div>
                    <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm text-foreground px-3 py-1 rounded-full text-xs font-medium">
                      {property.countryCode === "US" ? "🇺🇸" : property.countryCode === "GB" ? "🇬🇧" : "🇯🇵"} {property.city}
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {property.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {property.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Bed className="w-4 h-4" />
                        <span>{property.bedrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="w-4 h-4" />
                        <span>{property.bathrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Maximize2 className="w-4 h-4" />
                        <span>{property.area}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
