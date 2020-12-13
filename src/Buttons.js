import React, { useState, useEffect } from "react";
import PendingTransactionsTable from "./PendingTransactionsTable";
import Wallet from "./Wallet";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Input from "@material-ui/core/Input";

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  inputFields: {
    padding: "20px",
  },
}));

export default function Buttons(props) {
  const classes = useStyles();

  const [blocks, setBlocks] = useState(props.blocks);

  useEffect(() => {
    setBlocks(props.blocks);
    return () => {
      setBlocks([]);
    };
  });

  const [
    openFormDialogTransaction,
    setOpenFormDialogTransaction,
  ] = React.useState(false);

  const handleClickOpen = () => {
    setOpenFormDialogTransaction(true);
  };

  const handleClose = () => {
    setOpenFormDialogTransaction(false);
  };

  const [openWalletOne, setOpenWalletOne] = useState(false);
  const handleOpenWalletOne = () => {
    setOpenWalletOne(true);
  };

  const handleCloseWalletOne = () => {
    setOpenWalletOne(false);
  };
  const [openWalletTwo, setOpenWalletTwo] = useState(false);
  const handleOpenWalletTwo = () => {
    setOpenWalletTwo(true);
  };

  const handleCloseWalletTwo = () => {
    setOpenWalletTwo(false);
  };
  const [openWalletMiner, setOpenWalletMiner] = useState(false);
  const handleOpenWalletMiner = () => {
    setOpenWalletMiner(true);
  };

  const handleCloseWalletMiner = () => {
    setOpenWalletMiner(false);
  };

  const [openPendingTransactions, setOpenPendingTransactions] = React.useState(
    false
  );

  const handleOpenPendingTransactions = () => {
    setOpenPendingTransactions(true);
  };

  const handleClosePendingTransactions = () => {
    setOpenPendingTransactions(false);
  };

  const [openFormDialogSettings, setOpenFormDialogSettings] = React.useState(
    false
  );
  const handleClickOpenSettings = () => {
    setOpenFormDialogSettings(true);
  };

  const handleCloseSettings = () => {
    setOpenFormDialogSettings(false);
  };

  const handleMining = (e) => {
    e.preventDefault();
    props.setIsMined(!props.isMined);
    setBlocks([]);
    console.log(blocks);
    handleClosePendingTransactions();
  };

  //THE NEW_TRANSACTION INPUT USE_STATES
  const [transactionState, setTransactionState] = useState({
    fromAddress:
      "04d7ec238cd058837f44315fb8db2134f01daea15c10320c9173e7d5f68ff2d9d0ef2379ac378b3cd6456c61ce6b5e404113347792d55d4ce74f6817f6b4399b1b",
    toAddress: "",
    amount: "",
  });

  //HANDLES CHANGE FROM TRANSACTION FORM
  const handleTransactionChange = (e) => {
    const value = e.target.value;
    setTransactionState({
      ...transactionState,
      [e.target.name]: value,
    });
  };

  //HANDLES SUBMISSION FROM TRANSACTION FORM
  const handleSubmitTransaction = (e) => {
    e.preventDefault();
    props.setTransactionFromAddress(transactionState.fromAddress);
    props.setTransactionToAddress(transactionState.toAddress);
    props.setTransactionAmount(transactionState.amount);
    props.setIsChanged(!props.isChanged);
    // console.log(
    //   `${transactionState.fromAddress} ${transactionState.toAddress} ${transactionState.amount}`
    // );
    handleClose();
  };

  // THE SETTING INPUT USE_STATES
  const [settingsDifficultyValue, setSettingsDifficultyValue] = useState(1);
  const [settingsRewardValue, setSettingsRewardValue] = useState(100);

  //HANDLES SUBMISSION FROM SETTINGS FORM
  const handleSubmitSettings = (e) => {
    if (settingsDifficultyValue !== null) {
      props.difficulty(settingsDifficultyValue);
    }
    if (settingsRewardValue !== null) {
      props.reward(settingsRewardValue);
    }
    e.preventDefault();
    handleCloseSettings();
  };

  return (
    <div className={classes.buttons}>
      <ButtonGroup variant="text" aria-label="text primary button group">
        <Button
          style={{ fontSize: "18px", fontWeight: "bold" }}
          onClick={handleOpenWalletOne}
          color="inherit"
        >
          WALLET 1
        </Button>
        <Dialog
          open={openWalletOne}
          onClose={handleCloseWalletOne}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">WALLET 1</DialogTitle>
          <DialogContent>
            <Wallet
              address={"dror"}
              balance={props.wallet.balanceDror}
              transactions={props.wallet.transactionsDror}
            />
          </DialogContent>
        </Dialog>
        <Button
          style={{ fontSize: "18px", fontWeight: "bold" }}
          onClick={handleOpenWalletTwo}
          color="inherit"
        >
          WALLET 2
        </Button>
        <Dialog
          open={openWalletTwo}
          onClose={handleCloseWalletTwo}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">WALLET 2</DialogTitle>
          <DialogContent>
            <Wallet
              address={"vlad"}
              balance={props.wallet.balanceVlad}
              transactions={props.wallet.transactionsVlad}
            />
          </DialogContent>
        </Dialog>
        <Button
          style={{ fontSize: "18px", fontWeight: "bold" }}
          onClick={handleOpenWalletMiner}
          color="inherit"
        >
          MINERS WALLET
        </Button>
        <Dialog
          open={openWalletMiner}
          onClose={handleCloseWalletMiner}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">FULL NODES</DialogTitle>
          <DialogContent>
            <Wallet
              address={props.minersAddress}
              balance={props.wallet.balanceMiner}
              transactions={props.wallet.transactionsMiner}
            />
          </DialogContent>
        </Dialog>
        <Button
          style={{ fontSize: "18px", fontWeight: "bold" }}
          onClick={handleOpenPendingTransactions}
          color="inherit"
        >
          PENDING TRANSACTIONS
        </Button>
        <Dialog
          open={openPendingTransactions}
          onClose={handleClosePendingTransactions}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">PENDING TRANSACTIONS</DialogTitle>
          <DialogContent>
            <PendingTransactionsTable blocks={blocks} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClosePendingTransactions} color="primary">
              Cancel
            </Button>
            <Button onClick={handleMining} color="primary">
              Mine pending transactions
            </Button>
          </DialogActions>
        </Dialog>
        {/* ADD TRANSACTION BUTTON */}
        <Button
          style={{ fontSize: "18px", fontWeight: "bold" }}
          onClick={handleClickOpen}
          color="inherit"
        >
          ADD TRANSACTION
        </Button>
        <Dialog
          open={openFormDialogTransaction}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            ADD A NEW TRANSACTION
          </DialogTitle>
          <form action="/" method="POST" onSubmit={handleSubmitTransaction}>
            <DialogContent>
              <DialogContentText>
                Transfer some money to someone!
              </DialogContentText>
              <Input
                className={classes.inputFields}
                placeholder="From Address"
                required
                autoFocus
                type="text"
                margin="dense"
                id="fromAddress"
                name="fromAddress"
                value="04d7ec238cd058837f44315fb8db2134f01daea15c10320c9173e7d5f68ff2d9d0ef2379ac378b3cd6456c61ce6b5e404113347792d55d4ce74f6817f6b4399b1b"
                readOnly
                type="text"
                fullWidth
                inputProps={{ "aria-label": "description" }}
                onChange={handleTransactionChange}
              ></Input>
              <Input
                className={classes.inputFields}
                placeholder="To Address"
                required
                autoFocus
                type="text"
                margin="dense"
                id="toAddress"
                name="toAddress"
                type="text"
                fullWidth
                inputProps={{ "aria-label": "description" }}
                onChange={handleTransactionChange}
              ></Input>
              <Input
                className={classes.inputFields}
                placeholder="Amount"
                autoFocus
                required
                type="text"
                margin="dense"
                id="amount"
                name="amount"
                type="text"
                fullWidth
                inputProps={{ "aria-label": "description" }}
                onChange={handleTransactionChange}
              ></Input>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" label="Submit" color="primary">
                Sign and create transaction
              </Button>
            </DialogActions>
          </form>
        </Dialog>
        {/* ADD SETTING BUTTON */}
        <Button
          onClick={handleClickOpenSettings}
          style={{ fontSize: "18px", fontWeight: "bold" }}
          color="inherit"
        >
          Settings
        </Button>
        <Dialog
          open={openFormDialogSettings}
          onClose={handleCloseSettings}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">SETTINGS</DialogTitle>
          <form action="/" method="POST" onSubmit={handleSubmitSettings}>
            <DialogContent>
              <Input
                className={classes.inputFields}
                placeholder="difficulty"
                autoFocus
                type="text"
                margin="dense"
                fullWidth
                inputProps={{ "aria-label": "description" }}
                onChange={(e) => {
                  setSettingsDifficultyValue(e.target.value);
                }}
              />

              <Input
                className={classes.inputFields}
                placeholder="reward"
                autoFocus
                type="text"
                margin="dense"
                fullWidth
                inputProps={{ "aria-label": "description" }}
                onChange={(e) => {
                  setSettingsRewardValue(e.target.value);
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseSettings} color="primary">
                Cancel
              </Button>
              <Button type="submit" label="Submit" color="primary">
                Confirm
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </ButtonGroup>
    </div>
  );
}
