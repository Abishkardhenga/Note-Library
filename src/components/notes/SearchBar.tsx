import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  value, 
  onChange, 
  placeholder 
}) => {
  return (
    <div className="relative mb-6">
      <Search 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
        size={20} 
      />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};