import React from "react";
import BlockGrid from "./BlockGrid";
import BlockContentTable from "./BlockContentTable";
import Divider from "@material-ui/core/Divider";

const { Blockchain, Transaction } = require("savjeecoin");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

const myKey = ec.keyFromPrivate("4001");
/*
getBalanceOfAddress
getAllTransactionsForWallet
 */

// From that we can calculate your public key (which doubles as your wallet address)
const myWalletAddress = myKey.getPublic("hex");

console.log("Public key:", myWalletAddress);
console.log("Private key:", myKey.getPrivate("hex"));

class BlockchainService extends React.Component {
  blockchainInstance = new Blockchain();

  constructor(props) {
    super(props);
    this.blockchainInstance.difficulty = this.props.difficulty;
    this.blockchainInstance.reward = this.props.reward;
    this.blockchainInstance.minePendingTransactions("my-wallet-address");

    this.getBlocks = this.getBlocks.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      selectedBlockId: null,
      difficulty: this.props.difficulty,
      reward: this.props.reward,
      blocks: this.getBlocks(),
    };

    this.init();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.difficulty !== this.props.difficulty) {
      this.setState({ difficulty: parseInt(this.props.difficulty) });
      this.blockchainInstance.difficulty = parseInt(this.props.difficulty);
    }
    if (prevProps.reward !== this.props.reward) {
      this.setState({ reward: parseInt(this.props.reward) });
      this.blockchainInstance.miningReward = parseInt(this.props.reward);
    }
    if (prevProps.isChanged !== this.props.isChanged) {
      var transaction = new Transaction(
        this.props.transactionFromAddress,
        this.props.transactionToAddress,
        parseInt(this.props.transactionAmount)
      );
      transaction.signTransaction(myKey);
      this.blockchainInstance.addTransaction(transaction);
      this.props.pendingBlocks(this.blockchainInstance.pendingTransactions);
    }
    if (prevProps.isMined !== this.props.isMined) {
      this.blockchainInstance.minePendingTransactions(myWalletAddress);
      this.setState({ blocks: this.getBlocks() });
      this.props.pendingBlocks(this.blockchainInstance.pendingTransactions);
      this.props.setMinersAddress(myWalletAddress);
      this.props.setWallet((prevState) => ({
        balanceDror: this.blockchainInstance.getBalanceOfAddress("dror"),
        balanceVlad: this.blockchainInstance.getBalanceOfAddress("vlad"),
        balanceMiner: this.blockchainInstance.getBalanceOfAddress(
          myWalletAddress
        ),
        transactionsDror: this.blockchainInstance.getAllTransactionsForWallet(
          "dror"
        ),
        transactionsVlad: this.blockchainInstance.getAllTransactionsForWallet(
          "vlad"
        ),
        transactionsMiner: this.blockchainInstance.getAllTransactionsForWallet(
          myWalletAddress
        ),
      }));
    }
  }
  handleClick = (blockId) => {
    this.setState({ selectedBlockId: blockId });
  };

  getBlocks() {
    return this.blockchainInstance.chain;
  }

  init() {
    for (let index = 1; index < 19; index++) {
      var transaction = new Transaction(
        myWalletAddress,
        "vlad",
        parseInt(10 + index)
      );
      transaction.signTransaction(myKey);
      this.blockchainInstance.addTransaction(transaction);
      this.props.pendingBlocks(this.blockchainInstance.pendingTransactions);
      if (index % 4 === 0) {
        this.blockchainInstance.minePendingTransactions(myWalletAddress);
        this.setState({ blocks: this.getBlocks() });
        this.props.pendingBlocks(this.blockchainInstance.pendingTransactions);
        this.props.setMinersAddress(myWalletAddress);
        this.props.setWallet((prevState) => ({
          balanceDror: this.blockchainInstance.getBalanceOfAddress("dror"),
          balanceVlad: this.blockchainInstance.getBalanceOfAddress("vlad"),
          balanceMiner: this.blockchainInstance.getBalanceOfAddress(
            myWalletAddress
          ),
          transactionsDror: this.blockchainInstance.getAllTransactionsForWallet(
            "dror"
          ),
          transactionsVlad: this.blockchainInstance.getAllTransactionsForWallet(
            "vlad"
          ),
          transactionsMiner: this.blockchainInstance.getAllTransactionsForWallet(
            myWalletAddress
          ),
        }));
      }
    }
  }

  render() {
    return (
      <div>
        <BlockGrid
          onChange={this.handleClick}
          getBlocksHandler={this.getBlocks}
        />
        <Divider />
        <h1>Transaction inside Block temp</h1>
        <BlockContentTable
          blocks={this.getBlocks()}
          blockId={this.state.selectedBlockId || 1}
          // status={user.id === this.state.selectedBlockId ? true : false}
        />
        {/* <BlockContentTable
          blocks={this.blockchainInstance.pendingTransactions}
          blockId={this.state.selectedBlockId || 1}
        /> */}
      </div>
    );
  }
}

export default BlockchainService;
