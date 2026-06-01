interface BadgeProps {
  label: string;
  colorClass?: string;
}

export default function Badge({ label, colorClass = "bg-gray-100 text-gray-700" }: BadgeProps) {
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
      {label}
    </span>
  );
}
