import React from 'react';

interface UnitToggleProps {
  unit: 'metric' | 'imperial';
  toggleUnit: () => void;
}

const UnitToggle: React.FC<UnitToggleProps> = ({unit, toggleUnit}) => {
  return (
    <button className="unit-toggle" onClick={toggleUnit}>
      Switch to {unit === 'metric' ? 'Imperial' : 'Metric'}
    </button>
  );
};

export default UnitToggle;