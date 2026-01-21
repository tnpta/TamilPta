import React, { useState, useEffect, useRef } from 'react';
import { School, Search, Loader2, X } from 'lucide-react';

interface SchoolSuggestion {
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

interface SchoolAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelect?: (suggestion: SchoolSuggestion) => void;
  placeholder?: string;
  language: 'en' | 'ta';
}

const SchoolAutocomplete: React.FC<SchoolAutocompleteProps> = ({
  value,
  onChange,
  onSelect,
  placeholder,
  language
}) => {
  const [suggestions, setSuggestions] = useState<SchoolSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();

  // Fetch school suggestions from OpenStreetMap Nominatim
  const fetchSuggestions = async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      // Search for schools in Tamil Nadu
      const searchQuery = `${query} school, Tamil Nadu, India`;
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
        // Filter results that are likely schools
        const schoolResults = data.filter((item: SchoolSuggestion) =>
          item.display_name.toLowerCase().includes('school') ||
          item.display_name.toLowerCase().includes('பள்ளி') ||
          item.display_name.toLowerCase().includes('vidyalaya') ||
          item.display_name.toLowerCase().includes('matric') ||
          item.display_name.toLowerCase().includes('higher secondary')
        );
        setSuggestions(schoolResults.length > 0 ? schoolResults : data);
        setShowSuggestions(data.length > 0);
      }
    } catch (error) {
      console.error('Error fetching school suggestions:', error);
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

  const extractSchoolName = (displayName: string): string => {
    // Try to extract just the school name from the full display name
    const parts = displayName.split(',');
    if (parts.length > 0) {
      return parts[0].trim();
    }
    return displayName;
  };

  const handleSelectSuggestion = (suggestion: SchoolSuggestion) => {
    const schoolName = extractSchoolName(suggestion.display_name);
    onChange(schoolName);
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
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full px-4 py-3 pr-20 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tn-green focus:border-transparent transition-all"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
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
              <School size={12} />
              {language === 'en' ? 'Select a school or continue typing' : 'பள்ளியைத் தேர்ந்தெடுக்கவும் அல்லது தொடர்ந்து தட்டச்சு செய்யவும்'}
            </p>
          </div>
          {suggestions.map((suggestion, index) => {
            const schoolName = extractSchoolName(suggestion.display_name);
            const location = suggestion.display_name.split(',').slice(1, 3).join(',');
            return (
              <button
                key={`${suggestion.lat}-${suggestion.lon}-${index}`}
                type="button"
                onClick={() => handleSelectSuggestion(suggestion)}
                className={`w-full px-4 py-3 text-left hover:bg-tn-green/5 transition-colors flex items-start gap-3 border-b border-gray-50 last:border-b-0 ${
                  index === selectedIndex ? 'bg-tn-green/10' : ''
                }`}
              >
                <School className="w-5 h-5 text-tn-green flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800">
                    {schoolName}
                  </p>
                  {location && (
                    <p className="text-xs text-gray-500 mt-0.5 truncate">
                      {location}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Helper text */}
      <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
        <span className="text-tn-green">*</span>
        {language === 'en'
          ? 'Start typing to see school suggestions, or enter your school name manually'
          : 'பள்ளி பரிந்துரைகளைப் பார்க்க தட்டச்சு செய்யத் தொடங்கவும், அல்லது உங்கள் பள்ளி பெயரை கைமுறையாக உள்ளிடவும்'}
      </p>
    </div>
  );
};

export default SchoolAutocomplete;
