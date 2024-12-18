import { useEffect, useState } from 'react';
import axios from 'axios';
import { Proposers } from './components/Proposers';
import { Gateway } from './components/Gateway';



interface Proposer {
  slot: number;
  validator_index: number;

}

function Proposer() {
    const [proposers, setProposers] = useState<Proposer[]>([]); 
    const [timestamp, setTimestamp] = useState<string>(""); // Type the timestamp state

    const updateProposers = async () => {
        setTimestamp(new Date().toLocaleString());
        console.log("timestamp");
        try {
            const response = await fetch(
                "http://135.181.191.125:58017/api/v1/proposers/lookahead?activeOnly=true&futureOnly=true"
            );
    
        
            console.log("response",response);
    
            const data:any= await response.json();
    
            // Ensure the data matches the expected type
            const mappedProposers = data.map((item: any) => ({
                slot: item.slot,
                validator_index: item.validator_index,

            }));
            console.log("mapped_data", mappedProposers);
    
            setProposers(mappedProposers);
        } catch (error) {
            console.error("Error fetching proposers:", error);
        }
    };
    

    useEffect(() => {
        const id = setInterval(() => updateProposers(), 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="App" style={{width:"100%"}}>
            <h1 style={{color:'black'}}>Holesky Proposer Statistics</h1>
            <h2 style={{color:'black'}}>Available Aggregated Proposers || Last Updated: <span className="count">{timestamp}</span></h2>
            <h2 style={{color:'black'}}>Average response latency: <span className="count">200ms (est)</span></h2>
            <h2 style={{color:'black'}}>Total proposers: <span className="count">51,431</span></h2>

            <Proposers proposers={proposers} />
            <Gateway />
        </div>
    );
}

export default Proposer;
