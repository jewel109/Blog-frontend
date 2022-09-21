import React from "react";
import {styled, Typography} from "@mui/material"
import Header from "./Header";

const Div = styled("div")(({}) => ({
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  height:"100vh"
}))

 function NotFounding()  {
  return (
    <Div>
      <Typography variant="h4">
        404 NOT FOUND
      </Typography>
    </Div>
  )
}

export default function NotFound() {
  return (
  <>
  <Header/>
  <NotFounding/>
  </>
  )
}
