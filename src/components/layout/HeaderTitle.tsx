type Props = {
  title: string;
  etiqueta?: keyof JSX.IntrinsicElements; // "h1" | "h2" | ...
};

export default function HeaderTitle({ title, etiqueta = "h2" }: Props) {
  const Tag = etiqueta as any;
  return (
    <Tag className="uppercase text-JisaCyan font-semibold md:text-5xl text-4xl md:text-left text-center">
      {title}
    </Tag>
  );
}
