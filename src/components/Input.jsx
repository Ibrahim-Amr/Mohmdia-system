const Input = ({
  type,
  id,
  placeholder,
  register,
  autoFocus,
  errors,
  start,
}) => {
  return (
    <div className="w-full">
      <input
        type={type}
        id={id}
        {...register(id)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={`
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
        ${start ? "text-start" : "text-end"}
				`}
      />
      {errors[id] && (
        <p className="text-red-500 text-right text-sm mt-1">
          {errors[id]?.message}
        </p>
      )}
    </div>
  );
};

export default Input;
