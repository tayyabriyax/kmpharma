export default function InputField({
    label,
    id,
    type = "text",
    value,
    onChange,
    placeholder,
    required = false,
    icon,
    readOnly = false,
}) {
    return (
        <div>
            <label
                htmlFor={id}
                className="mb-1 block text-sm font-medium text-gray-700"
            >
                {label}
            </label>

            <div className="relative">
                {icon}

                <input
                    id={id}
                    name={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    readOnly={readOnly}
                    className={`
                        w-full py-2 pr-3 pl-10 rounded-lg border
                        text-gray-700
                        ${readOnly
                            ? "bg-gray-100 border-gray-200 cursor-not-allowed text-gray-500 focus:ring-0 focus:outline-none"
                            : "bg-white border-gray-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"}
                    `}
                />
            </div>
        </div>
    );
}
