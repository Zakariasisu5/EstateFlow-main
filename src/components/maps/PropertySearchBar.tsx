import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Property } from "@/data/dummyProperties";
import { cn } from "@/lib/utils";

interface PropertySearchBarProps {
  properties: Property[];
  onPropertySelect: (property: Property | null) => void;
  selectedProperty: Property | null;
}

const PropertySearchBar = ({ properties, onPropertySelect, selectedProperty }: PropertySearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredProperties = useMemo(() => {
    if (!searchQuery) return [];
    
    const query = searchQuery.toLowerCase();
    return properties.filter((property) => {
      return (
        property.title.toLowerCase().includes(query) ||
        property.city.toLowerCase().includes(query) ||
        property.country.toLowerCase().includes(query) ||
        property.location.toLowerCase().includes(query)
      );
    }).slice(0, 8); // Limit to 8 results for better UX
  }, [searchQuery, properties]);

  const handleSelect = (property: Property) => {
    onPropertySelect(property);
    setSearchQuery(`${property.title} - ${property.city}, ${property.country}`);
    setIsOpen(false);
  };

  const handleClear = () => {
    setSearchQuery("");
    onPropertySelect(null);
    setIsOpen(true);
  };

  return (
    <div className="relative w-full max-w-2xl">
      <Command className="rounded-lg border shadow-md bg-background">
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <CommandInput
            placeholder="Search by property name, city, or country..."
            value={searchQuery}
            onValueChange={(value) => {
              setSearchQuery(value);
              setIsOpen(value.length > 0);
            }}
            onFocus={() => setIsOpen(searchQuery.length > 0)}
            className="border-0 focus:ring-0"
          />
          {searchQuery && (
            <button
              onClick={handleClear}
              className="ml-2 text-sm text-muted-foreground hover:text-foreground"
            >
              Clear
            </button>
          )}
        </div>
        
        {isOpen && filteredProperties.length > 0 && (
          <CommandList className="max-h-[300px] overflow-y-auto">
            <CommandGroup heading="Properties">
              {filteredProperties.map((property) => (
                <CommandItem
                  key={property.id}
                  value={property.id}
                  onSelect={() => handleSelect(property)}
                  className={cn(
                    "cursor-pointer",
                    selectedProperty?.id === property.id && "bg-accent"
                  )}
                >
                  <div className="flex flex-col w-full">
                    <div className="font-medium">{property.title}</div>
                    <div className="text-sm text-muted-foreground">
                      📍 {property.city}, {property.country} • {property.price} • {property.bedrooms} beds
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        )}
        
        {isOpen && searchQuery && filteredProperties.length === 0 && (
          <CommandEmpty>No properties found.</CommandEmpty>
        )}
      </Command>
    </div>
  );
};

export default PropertySearchBar;
