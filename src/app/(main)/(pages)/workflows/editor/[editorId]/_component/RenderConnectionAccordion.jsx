import { useNodeConnections } from "@/providers/connections-provider";
import React, { useState } from "react";

const RenderConnectionAccordion = ({ connection, state }) => {
  const {
    title,
    image,
    description,
    connectionKey,
    accessTokenKey,
    alwaysTrue,
    slackSpecial,
  } = connection

  const { nodeConnection } = useNodeConnections()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  

  return <div>RenderConnectionAccordion</div>;
};

export default RenderConnectionAccordion;
