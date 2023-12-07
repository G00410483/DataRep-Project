
import ScooterItem from "./scooterItem";

function Scooters(props) {

    return props.myScooters.map(
        (scooters) => {
            return <ScooterItem myScooter={scooters} key={scooters._id} reload={() => {props.Reload();}}></ScooterItem>
        }
    );

}

export default Scooters;
