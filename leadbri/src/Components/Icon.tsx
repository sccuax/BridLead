// src/components/Icon.tsx
import English from '../Assets/Icons/english.svg';
import Spanish from '../Assets/Icons/spanish.svg';
import IconFigma from '../Assets/Icons/figma-icon.svg'
import DocsIcon from '../Assets/Icons/Docs-icon.svg'

const icons = {
  english: English,
  spanish: Spanish,
  figma: IconFigma,
  docs: DocsIcon,
};

interface IconProps {
  name: 'english' | 'spanish' | 'figma' | 'docs';
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