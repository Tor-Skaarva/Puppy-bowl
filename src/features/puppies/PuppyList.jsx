import { useGetPuppiesQuery } from "./puppySlice";

export default function PuppyList({ setSelectedPuppyId }) {
  const { data: allPuppies, error, isLoading } = useGetPuppiesQuery();

  if (isLoading) return <h1>Loading puppies...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  return (
    <article>
      <h2>Roster</h2>
      <ul className="puppies">
        {allPuppies?.data?.players.map((p) => (
          <li key={p.id}>
            <h3>
              {p.name} #{p.id}
            </h3>
            <figure>
              <img src={p.imageUrl} alt={p.name} />
            </figure>
            <button onClick={() => setSelectedPuppyId(p.id)}>
              See details
            </button>
          </li>
        ))}
      </ul>
    </article>
  );
}
