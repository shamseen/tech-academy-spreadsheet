export default function HomePage({ names }) {
  return (
    <>
      {names.map((name, i) => {
        return <p key={i}>{name}</p>;
      })}
    </>
  );
}
