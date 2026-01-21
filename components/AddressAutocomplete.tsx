import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Search, Loader2, X } from 'lucide-react';

interface AddressSuggestion {
  display_name: string;
  lat: string;
  lon: string;
  address?: {
    road?: string;
    suburb?: string;
    city?: string;
    town?: string;
    village?: string;
    state_district?: string;
    state?: string;
    postcode?: string;
    country?: string;
  };
}

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelect?: (suggestion: AddressSuggestion) => void;
  placeholder?: string;
  language: 'en' | 'ta';
}

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
  value,
  onChange,
  onSelect,
  placeholder,
  language
}) => {
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();

  // Fetch suggestions from OpenStreetMap Nominatim
  const fetchSuggestions = async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      // Add "Tamil Nadu" to improve results for TN addresses
      const searchQuery = `${query}, Tamil Nadu, India`;
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5&addressdetails=1&countrycodes=in`,
        {
          headers: {
            'Accept-Language': language === 'ta' ? 'ta' : 'en',
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSuggestions(data);
        setShowSuggestions(data.length > 0);
      }
    } catch (error) {
      console.error('Error fetching address suggestions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [value]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSelectSuggestion(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSelectSuggestion = (suggestion: AddressSuggestion) => {
    onChange(suggestion.display_name);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    if (onSelect) {
      onSelect(suggestion);
    }
  };

  const clearInput = () => {
    onChange('');
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
      <div className="relative">
        <textarea
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={3}
          className="w-full px-4 py-3 pr-20 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent transition-all resize-none"
        />
        <div className="absolute right-3 top-3 flex items-center gap-2">
          {isLoading && (
            <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
          )}
          {value && !isLoading && (
            <button
              type="button"
              onClick={clearInput}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
          <Search className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto"
        >
          <div className="px-3 py-2 bg-gray-50 border-b border-gray-100">
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <MapPin size={12} />
              {language === 'en' ? 'Select an address or continue typing' : 'முகவரியைத் தேர்ந்தெடுக்கவும் அல்லது தொடர்ந்து தட்டச்சு செய்யவும்'}
            </p>
          </div>
          {suggestions.map((suggestion, index) => (
            <button
              key={`${suggestion.lat}-${suggestion.lon}-${index}`}
              type="button"
              onClick={() => handleSelectSuggestion(suggestion)}
              className={`w-full px-4 py-3 text-left hover:bg-tn-green/5 transition-colors flex items-start gap-3 border-b border-gray-50 last:border-b-0 ${
                index === selectedIndex ? 'bg-tn-green/10' : ''
              }`}
            >
              <MapPin className="w-5 h-5 text-tn-green flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800 line-clamp-2">
                  {suggestion.display_name}
                </p>
                {suggestion.address?.postcode && (
                  <p className="text-xs text-gray-500 mt-1">
                    PIN: {suggestion.address.postcode}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Helper text */}
      <p className="text-xs text-gray-500 mt-2">
        <span className="text-tn-green font-bold">Tip: </span>
        {language === 'en'
          ? 'Type your address. If not in suggestions, just enter the full address manually and continue.'
          : 'உங்கள் முகவரியை தட்டச்சு செய்யவும். பரிந்துரைகளில் இல்லையென்றால், முழு முகவரியை கைமுறையாக உள்ளிட்டு தொடரவும்.'}
      </p>
    </div>
  );
};

export default AddressAutocomplete;
