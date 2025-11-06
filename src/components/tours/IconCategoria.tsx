type IconProps = { size?: number; className?: string };
type IconComp = (props: IconProps) => JSX.Element;

type Props = {
  icon: IconComp;
  title: string;
  subtitle: string;
  tamaño?: number;
  tamañoMobile?: number;
  className?: string;
  tamañotitulo?: string; // tailwind classes
};

export default function IconCategoria({
  icon: Icon,
  title,
  subtitle,
  tamaño = 40,
  tamañoMobile = 20,
  className = "",
  tamañotitulo = "md:text-xl text-xs",
}: Props) {
  return (
    <div className={`flex gap-x-4 md:justify-center justify-start items-center ${className}`}>
      {/* Icono responsive */}
      <div className="md:hidden block">
        <Icon size={tamañoMobile} />
      </div>
      <div className="md:block hidden">
        <Icon size={tamaño} />
      </div>

      {/* Textos */}
      <div className="flex flex-col">
        <span className={`font-bold ${tamañotitulo}`}>{title}</span>
        <span className="font-bold text-sm text-JisaGris">{subtitle}</span>
      </div>
    </div>
  );
}
