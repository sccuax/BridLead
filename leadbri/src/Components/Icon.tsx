// src/components/Icon.tsx
import English from '../Assets/Icons/english.svg';
import Spanish from '../Assets/Icons/spanish.svg';

const icons = {
  english: English,
  spanish: Spanish,
};

interface IconProps {
  name: 'english' | 'spanish';
  className?: string;
  [key: string]: any;
}

export default function Icon({ name, className = '', ...props }: IconProps) {
  const IconComponent = icons[name];

  if (!IconComponent) {
    console.warn(`Icono '${name}' no encontrado.`);
    return null;
  }

  return <IconComponent className={className} {...props} />;
}