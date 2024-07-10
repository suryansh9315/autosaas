"use server";
import { db } from "@/lib/db";

export const onCreateNodesEdges = async (flowId, nodes, edges, flowPath) => {
  const flow = await db.workflows.update({
    where: {
      id: flowId,
    },
    data: {
      nodes,
      edges,
      flowPath: flowPath,
    },
  });
  if (flow) return { message: "flow saved" };
};

export const onFlowPublish = async (workflowId, state) => {
  console.log(state);
  const published = await db.workflows.update({
    where: {
      id: workflowId,
    },
    data: {
      publish: state,
    },
  });

  if (published.publish) return "Workflow published";
  return "Workflow unpublished";
};
