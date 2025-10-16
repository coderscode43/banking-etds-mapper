const FilterSelect = ({ label, name, options, value, onChange }) => (
  <div className="w-full">
    <label className="font-semibold text-[var(--primary-color)]">{label}</label>
    <select
      name={name}
      id={name}
      className="custom-scrollbar mt-1 block h-[38px] w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm/6 text-gray-900 focus:outline-none"
      value={value}
      onChange={onChange}
    >
      <option value="">Select {label}</option>
      {options &&
        options?.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
    </select>
  </div>
);
export default FilterSelect;
