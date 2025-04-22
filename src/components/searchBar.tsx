import React, {useState} from 'react';

/**
 * Represents the properties for the SearchBar component.
 *
 * @interface SearchBarProps
 *
 * @property {Function} onSearch - A callback function that gets triggered when a search is performed.
 * It accepts a single parameter, `city`, which is a string representing the searched city.
 */
interface SearchBarProps {
  onSearch: (city: string) => void;
}

/**
 * A functional React component representing a search bar.
 *
 * This component allows users to input a search term, typically for searching a city,
 * and triggers a callback when the form is submitted.
 * It includes validation to ensure the input is a valid city name.
 *
 * @param {Object} props - The properties passed to the SearchBar component.
 * @param {function(string): void} props.onSearch - A callback function invoked when the form is submitted.
 * The callback receives the search input as its argument.
 *
 * @returns {JSX.Element} The rendered search bar component.
 */
const SearchBar: React.FC<SearchBarProps> = ({onSearch}) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState<string>('');

  /**
   * Validates the input to ensure it's a valid city name.
   * A valid city name should:
   * - Not be empty
   * - Contain only letters, spaces, hyphens, and apostrophes
   * - Be at least 2 characters long
   * 
   * @param {string} value - The input value to validate
   * @returns {boolean} True if the input is valid, false otherwise
   */
  const validateInput = (value: string): boolean => {
    if (!value.trim()) {
      setError('Please enter a city name');
      return false;
    }

    if (value.trim().length < 2) {
      setError('City name must be at least 2 characters long');
      return false;
    }

    // Allow letters, spaces, hyphens, and apostrophes
    const cityNameRegex = /^[a-zA-Z\s\-']+$/;
    if (!cityNameRegex.test(value)) {
      setError('City name can only contain letters, spaces, hyphens, and apostrophes');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateInput(input)) {
      onSearch(input);
      setInput('');
    }
  };

  return (
    <div>
      <form className="search-bar" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for a city"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (error) validateInput(e.target.value); // Clear error when typing
          }}
        />
        <button type="submit">Search</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default SearchBar;
