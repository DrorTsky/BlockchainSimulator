import React from "react";

// import BlockGrid from "./BlockGrid";

import Typography from "@material-ui/core/Typography";
import BlockchainService from "./BlockchainService";

const Home = (props) => {
  return (
    <div>
      <h1>THIS IS OUR BLOCKCHAIN</h1>
      <Typography variant="h8" paddingBottom="30px" gutterButtom>
        Each card represents a block on the chain
      </Typography>
      <h1></h1>
      <BlockchainService {...props} />
    </div>
  );
};

export default Home;
