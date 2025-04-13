import { useState } from "react";
import { useAddPuppyMutation } from "./puppySlice";
import { useNavigate } from "react-router-dom";

/**
 * @component
 * Users can add puppies to the roster by submitting this form.
 */
export default function PuppyForm() {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [addPuppy] = useAddPuppyMutation();
  const navigate = useNavigate();

  // Placeholder image
  const imageUrl = "https://loremflickr.com/200/300/dog";

  const postPuppy = async (event) => {
    event.preventDefault();
    try {
      const data = await addPuppy({ name, breed, imageUrl }).unwrap();
      console.log("Puppy added:", data);
      navigate("/");
    } catch (error) {
      console.error("Failed to add puppy:", error);
    }
  };

  return (
    <>
      <h2>Add a Puppy</h2>
      <form onSubmit={postPuppy}>
        <label>
          Name
          <input
            name="puppyName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Breed
          <input
            name="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          />
        </label>
        <button type="submit">Add to Roster</button>
      </form>
    </>
  );
}
