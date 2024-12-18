import { useEffect, useState } from 'react';
import { Proposers } from './components/Proposers';
import { Gateway } from './components/Gateway';
import { Heading, Box, useColorMode, Text } from '@chakra-ui/react';

interface Proposer {
  slot: number;
  validator_index: number;
}

function Proposer() {
    const [proposers, setProposers] = useState<Proposer[]>([]); 
    const [timestamp, setTimestamp] = useState<string>(""); // Type the timestamp state

    const { colorMode } = useColorMode(); // To access the current color mode

    const updateProposers = async () => {
        setTimestamp(new Date().toLocaleString());
        console.log("timestamp");
        try {
            const response = await fetch(
                "http://135.181.191.125:58017/api/v1/proposers/lookahead?activeOnly=true&futureOnly=true"
            );
    
            console.log("response", response);
    
            const data: any = await response.json();
    
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
        <Box
            className="App"
            width="100%"
            p={4}
        >
            <Heading color={colorMode === 'light' ? 'black' : 'white'}>
                Holesky Proposer Statistics
            </Heading>
            <Text color={colorMode === 'light' ? 'black' : 'white'}>
                Available Aggregated Proposers || Last Updated: <span className="count">{timestamp}</span>
            </Text>
            <Text color={colorMode === 'light' ? 'black' : 'white'}>
                Average response latency: <span className="count">200ms (est)</span>
            </Text>
            <Text color={colorMode === 'light' ? 'black' : 'white'}>
                Total proposers: <span className="count">51,431</span>
            </Text>

            <Proposers proposers={proposers} />
            <Gateway />
        </Box>
    );
}

export default Proposer;
