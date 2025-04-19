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
 *
 * @param {Object} props - The properties passed to the SearchBar component.
 * @param {function(string): void} props.onSearch - A callback function invoked when the form is submitted.
 * The callback receives the search input as its argument.
 *
 * @returns {JSX.Element} The rendered search bar component.
 */
const SearchBar: React.FC<SearchBarProps> = ({onSearch}) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;
    onSearch(input);
    setInput('');
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for a city"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;