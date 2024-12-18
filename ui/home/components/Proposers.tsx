import { useColorMode, Text, Box, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { FC } from 'react';


interface Proposer {
  slot: number;
  validator_index: number;
}


interface ProposersProps {
  proposers: Proposer[];
}


interface ProposerItemProps {
  item: Proposer;
}


export const Proposers: FC<ProposersProps> = ({ proposers }) => {
  const { colorMode } = useColorMode();
  
  const textColor = colorMode === 'light' ? 'black' : 'white';



  return (
    <>

      <Text color={textColor} mb={4}>
        Total Proposers In Upcoming 32 Slots: <span className="count">{proposers.length}</span>
      </Text>
      

      <Box
        className="proposer-section"
        bg={colorMode === 'light' ? 'gray.50' : 'gray.700'} 
        p={4}
        borderRadius="md"
        overflowX="auto"
      >
        <Table variant="simple"> 
          <Thead>
            <Tr>

              <Th color="white">Type</Th>
              <Th color="white">Slot</Th>
              <Th color="white">Validator Index</Th>
              <Th color="white">Insurance Size</Th>
              <Th color="white">Total Value Transacted</Th>
            </Tr>
          </Thead>
          <Tbody>

            {proposers.map((proposer) => (
              <ProposerItem key={proposer.slot} item={proposer} colorMode={colorMode} />
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
  );
};


interface ProposerItemPropsWithColorMode extends ProposerItemProps {
  colorMode: 'light' | 'dark';
}


export const ProposerItem: FC<ProposerItemPropsWithColorMode> = ({ item, colorMode }) => {
  const textColor = colorMode === 'light' ? 'black' : 'white';
  
  return (
    <Tr
      className="bolt"
      bg={colorMode === 'light' ? 'white' : 'gray.800'} 
      _hover={{
        bg: colorMode === 'light' ? 'gray.100' : 'gray.600',
      }} 
    >
      <Td color={textColor}>Agg</Td>
      <Td color={textColor}>{item.slot}</Td>
      <Td color={textColor}>{item.validator_index}</Td>
      <Td color={textColor}>_</Td>
      <Td color={textColor}>_</Td>
    </Tr>
  );
};