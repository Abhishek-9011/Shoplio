interface InputProps {
  reference?: any;
  placeholder: string;
  type?: string;
}

export const Input = ({
  reference,
  placeholder,
  type = "text",
}: InputProps) => (
  <input
    ref={reference}
    type={type}
    placeholder={placeholder}
    className="w-full  px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white/50 backdrop-blur-sm placeholder-gray-700 "
  />
);