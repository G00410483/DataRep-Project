import { useEffect, useState } from "react";
import axios from "axios";
import Scooters from "./scooters";

function Read() {

    const [data, setData] = useState([]);

    useEffect(
        () => {

            axios.get('http://localhost:4000/api/scooters')
                .then(
                    (response) => {
                        setData(response.data)
                    }
                )
                .catch(
                    (error) => {
                        console.log(error);
                    }
                )

        }, []
    );
    const ReloadData = (e) => {
        axios.get('http://localhost:4000/api/scooters')
            .then(
                (response) => {
                    setData(response.data)
                }
            )
            .catch(
                (error) => {
                    console.log(error);
                }
            )

    }
    return (
        <div>
            <hr></hr>
            <h2 >ALL PRODUCTS</h2>
            <hr></hr>
            <Scooters myScooters={data} Reload={ReloadData}></Scooters>
        </div>
    );

}

export default Read;