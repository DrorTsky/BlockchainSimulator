import React from "react";
import Block from "./Block";

import GridList from "@material-ui/core/GridList";
import { makeStyles } from "@material-ui/core/styles";
import { GridListTile } from "@material-ui/core";
import Container from "@material-ui/core/Container";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}));

export default function BlockGrid(props) {
  const classes = useStyles();
  const blocks = props.getBlocksHandler();

  function passingId(id) {
    props.onChange(id);
  }

  return (
    <Container maxWidth="md">
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={2.5}>
          {blocks.map((block, index) => (
            <GridListTile
              key={index}
              style={{ minHeight: "340px", width: "500px" }}
            >
              <Block block={block} index={index} handleClick={passingId} />
            </GridListTile>
          ))}
        </GridList>
      </div>
    </Container>
  );
}
