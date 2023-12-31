const Select = ({ id, register, errors, options, label }) => {
  return (
    <div className="w-full">
      <select
        id={id}
        {...register(id)}
        className={`
        text-end
      text-green-900
				placeholder:text-gray-300
				font-semibold
				bg-transparent 
				py-1
				w-full 
				border-b-2
				border-t-0
				border-x-0
				border-gray-300 
				focus:outline-none
				focus:ring-0	
        ${errors[id] ? "focus:border-red-500" : "focus:border-green-500"}
				${errors[id] ? "border-red-400 " : "border-gray-300"}
        `}
      >
        <option value="" className="hidden">
          {label}
        </option>
        {options.map((op) => (
          <option key={op} value={op} className="text-end">
            {op}
          </option>
        ))}
      </select>
      {errors[id] && (
        <p className="text-red-500 text-right text-sm mt-1">
          {errors[id]?.message}
        </p>
      )}
    </div>
  );
};

export default Select;
