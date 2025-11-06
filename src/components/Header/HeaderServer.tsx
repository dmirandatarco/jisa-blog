import HeaderClient from "./HeaderClient";

export default function HeaderServer({ dataGeneral }: { dataGeneral?: any }) {
  return <HeaderClient dataGeneral={dataGeneral} />;
}