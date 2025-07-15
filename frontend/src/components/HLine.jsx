export default function HLine({ marginY }) {
  const style = marginY ? { marginBottom: marginY, marginTop: marginY } : null;

  return <hr className="border-gray-300 w-full" style={style}></hr>;
}
