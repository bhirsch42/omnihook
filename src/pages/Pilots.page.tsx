import { Link } from "@tanstack/react-router";

type FormInputProps = {
  label: string;
  className?: string;
};

export function FormInput({ label, className }: FormInputProps) {
  return (
    <div className={` ${className}`}>
      <label className="block text-sm text-textcolor-300 mb-1">
        {">"} {label}
      </label>
      <input
        type="text"
        className="w-full bg-bgcolor-800 border-b-bgcolor-700 border-b-2 outline-none py-1 px-2 focus:border-b-bgcolor-50 transition-colors"
      />
    </div>
  );
}

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function Button({ className, children, ...buttonProps }: ButtonProps) {
  return (
    <button
      {...buttonProps}
      className={`${className} bg-bgcolor-700 hover:bg-bgcolor-600 transition-colors px-2 py-1 rounded outline-none focus:border-bgcolor-400 border border-transparent`}
    >
      {children}
    </button>
  );
}

export function Pilots() {
  return (
    <>
      <div className="flex h-80 justify-center items-center">
        <form className="p-3 w-80 border-2 border-bgcolor-700">
          <FormInput label="Pilot Name" className="mb-3" />
          <FormInput label="Callsign" className="mb-4" />
          <div className="flex justify-end">
            <Button type="submit">Register Pilot</Button>
          </div>
        </form>
      </div>
    </>
  );
}
