import React from 'react';

/**
 * Represents the properties for a unit toggle component.
 */
interface UnitToggleProps {
  unit: 'metric' | 'imperial';
  toggleUnit: () => void;
}

/**
 * UnitToggle is a functional React component that provides a button to toggle between
 * measurement units, such as 'metric' and 'imperial'.
 *
 * @typedef {Object} UnitToggleProps
 * @property {'metric' | 'imperial'} unit - Indicates the current unit system.
 * @property {Function} toggleUnit - Callback function triggered when the user clicks the button to switch units.
 *
 * @component
 * @param {UnitToggleProps} props - Component props.
 * @returns {JSX.Element} A button element that toggles the measurement unit.
 */
const UnitToggle: React.FC<UnitToggleProps> = ({unit, toggleUnit}) => {
  return (
    <button className="unit-toggle" onClick={toggleUnit}>
      Switch to {unit === 'metric' ? 'Imperial' : 'Metric'}
    </button>
  );
};

export default UnitToggle;