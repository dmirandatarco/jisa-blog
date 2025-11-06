export default function SubHeaderTitle({ title }: { title?: string }) {
  if (!title) return null;
  return (
    <div className="md:px-16 px-6">
      <p className="text-JisaGris font-light md:text-lg text-sm py-2 text-center">{title}</p>
    </div>
  );
}
