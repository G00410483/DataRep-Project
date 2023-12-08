// Importing the ScooterItem component from the specified file path
import ScooterItem from "./scooterItem";

// Defining a functional component named Scooters, which takes 'props' as its parameter
function Scooters(props) {
    
    // Using the map function to iterate over the 'myScooters' array passed as a prop
    return props.myScooters.map(
        // For each 'scooters' item in the array, create a ScooterItem component
        (scooters) => {
            // Rendering the ScooterItem component with the current 'scooters' item as a prop
            // Key attribute is used for optimization and should be a unique identifier
            return <ScooterItem myScooter={scooters} key={scooters._id} reload={() => {props.Reload();}}></ScooterItem>
        }
    );
}
export default Scooters;
