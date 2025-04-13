import { useGetPuppyQuery, useDeletePuppyMutation } from "./puppySlice";

/**
 * @component
 * Displays detailed information about a selected puppy.
 */
export default function PuppyDetails({ selectedPuppyId, setSelectedPuppyId }) {
  const { data: puppy, isLoading } = useGetPuppyQuery(selectedPuppyId);
  const [deletePuppy] = useDeletePuppyMutation();

  const removePuppy = async () => {
    try {
      await deletePuppy(selectedPuppyId).unwrap();
      setSelectedPuppyId(null); // clear selection
    } catch (err) {
      console.error("Failed to delete puppy:", err);
    }
  };

  if (!selectedPuppyId) return <p>Please select a puppy.</p>;
  if (isLoading) return <p>Loading puppy details...</p>;
  if (!puppy) return <p>Puppy not found.</p>;

  return (
    <aside>
      <h2>Selected Puppy</h2>
      <h3>
        {puppy.name} #{puppy.id}
      </h3>
      <p> Status: {puppy.status} </p>
      <p>{puppy.breed}</p>
      <p>Team: {puppy.team?.name ?? "Unassigned"}</p>
      <button onClick={removePuppy}>Remove from roster</button>
      <figure>
        <img src={puppy.imageUrl} alt={puppy.name} />
      </figure>
    </aside>
  );
}
