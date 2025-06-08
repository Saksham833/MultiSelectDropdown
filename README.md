# MultiSelectDropdown
 MultiSelectDropdown — Component Description 
 
 # Purpose:- 
The MultiSelectDropdown component provides a user-friendly UI to select multiple options from a dropdown list. It's especially useful when a form needs to accept a set of values like tags, categories, sender IDs, filters, etc.

# Component Features
Multi-selection using checkboxes.
Custom labels and values for each dropdown item.
Displays selected items as comma-separated values.
Click outside to close the dropdown.
Error text support (validation feedback).
Customizable width via props.
Designed with accessibility and clarity in mind.

| Prop Name       | Type                              | Description                                                                     |
| --------------- | --------------------------------- | ------------------------------------------------------------------------------- |
| `label`         | `string`                          | Label displayed above the dropdown.                                             |
| `placeholder`   | `string`                          | Placeholder text shown when nothing is selected.                                |
| `value`         | `DropdownItem[]`                  | An array of currently selected items.                                           |
| `dropdownData`  | `DropdownItem[]`                  | Full list of options to choose from. Each item should have `label` and `value`. |
| `onOptionClick` | `(items: DropdownItem[]) => void` | Callback fired when the selection changes, returning the new selected list.     |
| `errortext`     | `string` (optional)               | Optional error message to show validation issues.                               |
| `layer`         | `number` (optional)               | Not used in this version. Can be used for z-indexing dropdown overlays.         |
| `width`         | `string` (optional)               | Width of the dropdown. Default is `'300px'`.                                    |


 State Management
isOpen: toggles the dropdown open/close state.
selectedItems: tracks the currently selected values.
Uses useEffect to sync with external value changes and detect outside clicks.

