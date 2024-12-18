interface Proposer {
  slot: number;
  validator_index: number;
  // Add other fields as necessary
}

interface ProposersProps {
  proposers: Proposer[];

}

interface ProposerItemProps {
  item: Proposer;
}

export const Proposers = ({ proposers }: ProposersProps) => {
  return (
    <>
      <h2 style={{color:"black"}}>
        Total Proposers In Upcoming 32 Slots: <span className="count">{proposers.length}</span>
      </h2>
      <div className="proposer-section">
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Slot</th>
              <th>Validator Index</th>
              <th>Insurance Size</th>
              <th>Total Value Transacted</th>
            </tr>
          </thead>
          <tbody>
            {proposers.map((proposer, index) => (
              <ProposerItem key={index} item={proposer} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export const ProposerItem = ({ item }: ProposerItemProps) => {
  return (
    <tr className="bolt">
      <td>Agg</td>
      <td>{item.slot}</td>
      <td>{item.validator_index}</td>
      <td>_</td>
      <td>_</td>
    </tr>
  );
};
