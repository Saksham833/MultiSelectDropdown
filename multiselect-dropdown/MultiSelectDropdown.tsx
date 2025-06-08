import { useEffect, useRef, useState } from 'react';
import './multi-select-dropdown.scss';

type DropdownItem = {
  value: string;
  label: string;
};

type MultiSelectDropdownProps = {
  label: string;
  placeholder: string;
  value: DropdownItem[];
  dropdownData: DropdownItem[];
  onOptionClick: (items: DropdownItem[]) => void;
  errortext?: string;
  layer?: number;
  width?: string;
};

export default function MultiSelectDropdown({
  label,
  placeholder,
  value,
  dropdownData,
  onOptionClick,
  errortext = '',
  width = '300px',
}: MultiSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<DropdownItem[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedItems(value || []);
  }, [value]);

  const toggleOption = (item: DropdownItem) => {
    const alreadySelected = selectedItems.some((selected) => selected.value === item.value);
    const updatedItems = alreadySelected
      ? selectedItems.filter((selected) => selected.value !== item.value)
      : [...selectedItems, item];

    setSelectedItems(updatedItems);
    onOptionClick(updatedItems);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div className="multi-select-dropdown" ref={dropdownRef} style={{ width }}>
      <div className="dropdown-label">{label}</div>

      <div className={`dropdown-header ${errortext ? 'error' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <span className={selectedItems.length ? '' : 'placeholder'}>
          {selectedItems.length
            ? selectedItems.map((item) => item.label).join(', ')
            : placeholder}
        </span>
        <span className="arrow">{isOpen ? '▲' : '▼'}</span>
      </div>

      {errortext && <div className="error-text">{errortext}</div>}

      {isOpen && (
        <div className="dropdown-list">
          {dropdownData.map((item) => {
            const isChecked = selectedItems.some((selected) => selected.value === item.value);
            return (
              <div
                key={item.value}
                className={`dropdown-item ${isChecked ? 'checked' : ''}`}
                onClick={() => toggleOption(item)}
              >
                <input type="checkbox" checked={isChecked} readOnly />
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
