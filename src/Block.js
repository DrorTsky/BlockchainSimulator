import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles({
  root: {
    minWidth: 250,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Block(props) {
  const classes = useStyles();

  function choseBlock() {
    props.handleClick(props.index);
  }

  return (
    <div className={classes.gridRoot}>
      <Container maxWidth="sm">
        <Card
          className={classes.root}
          variant="outlined"
          // style={{ paddingLeft: "25px" }}
        >
          <CardContent>
            <Typography variant="h5" component="h2">
              {props.index === 0 ? "Genesis Block" : "Block " + props.index}
            </Typography>
            <Divider />
            <Typography>Hash of this block</Typography>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {props.block.hash}
            </Typography>
            <Typography>Hash of previous block</Typography>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {props.block.previousHash}
            </Typography>
            <Divider />
            <Typography className={classes.title}>Nonce</Typography>
            <Typography className={classes.pos} color="textSecondary">
              {props.block.nonce}
            </Typography>
            <Divider />
            <Typography className={classes.title}>Time stamp</Typography>
            <Typography className={classes.pos} color="textSecondary">
              {props.block.timestamp}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={choseBlock}>
              Learn More
            </Button>
          </CardActions>
        </Card>
      </Container>
    </div>
  );
}
