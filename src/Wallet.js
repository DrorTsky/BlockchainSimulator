import React from "react";
import PendingTransactionsTable from "./PendingTransactionsTable";

import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  mainTitle: {
    fontWeight: "bold",
  },
  title: {
    fontSize: 18,
    paddingBlock: "15px",
    fontWeight: "bold",
  },
  sub: {
    fontSize: 14,
    color: "textSecondary",
    paddingBottom: "30px",
  },
});

export default function Wallet(props) {
  const classes = useStyles();

  // const { walletNumber, address, balance } = props;

  return (
    <div>
      <div>
        <Typography variant="h3" gutterButtom className={classes.mainTitle}>
          Wallet details
        </Typography>
        <Typography className={classes.title} gutterButtom>
          Address:
        </Typography>
        <Typography className={classes.sub} gutterButtom>
          {props.address}
        </Typography>
        <Typography className={classes.title} gutterButtom>
          Balance:
        </Typography>
        <Typography className={classes.sub} gutterButtom>
          {props.balance}
        </Typography>
        <Divider />
      </div>
      <div>
        <Typography variant="h3" gutterButtom className={classes.mainTitle}>
          Transactions
        </Typography>
        <PendingTransactionsTable blocks={props.transactions} />
      </div>
    </div>
  );
}
