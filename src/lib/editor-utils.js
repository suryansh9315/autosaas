import { getDiscordConnectionUrl } from "@/app/(main)/(pages)/connections/_actions/discord-connection";
import {
  getNotionConnection,
  getNotionDatabase,
} from "@/app/(main)/(pages)/connections/_actions/notion-connection";
import {
  getSlackConnection,
  listBotChannels,
} from "@/app/(main)/(pages)/connections/_actions/slack-connection";

export const onDragStart = (event, nodeType) => {
  event.dataTransfer.setData("application/reactflow", nodeType);
  event.dataTransfer.effectAllowed = "move";
};

export const onSlackContent = (nodeConnection, event) => {
  nodeConnection.setSlackNode((prev) => ({
    ...prev,
    content: event.target.value,
  }));
};

export const onDiscordContent = (nodeConnection, event) => {
  nodeConnection.setDiscordNode((prev) => ({
    ...prev,
    content: event.target.value,
  }));
};

export const onContentChange = (nodeConnection, nodeType, event) => {
  if (nodeType === "Slack") {
    onSlackContent(nodeConnection, event);
  } else if (nodeType === "Discord") {
    onDiscordContent(nodeConnection, event);
  } else if (nodeType === "Notion") {
    onNotionContent(nodeConnection, event);
  }
};

export const onAddTemplateSlack = (nodeConnection, template) => {
  nodeConnection.setSlackNode((prev) => ({
    ...prev,
    content: `${prev.content} ${template}`,
  }));
};

export const onAddTemplateDiscord = (nodeConnection, template) => {
  nodeConnection.setDiscordNode((prev) => ({
    ...prev,
    content: `${prev.content} ${template}`,
  }));
};

export const onAddTemplate = (nodeConnection, title, template) => {
  if (title === "Slack") {
    onAddTemplateSlack(nodeConnection, template);
  } else if (title === "Discord") {
    onAddTemplateDiscord(nodeConnection, template);
  }
};

export const onConnections = async (
  nodeConnection,
  editorState,
  googleFile
) => {
  if (editorState.editor.selectedNode.data.title == "Discord") {
    const connection = await getDiscordConnectionUrl();
    if (connection) {
      nodeConnection.setDiscordNode({
        webhookURL: connection.url,
        content: "",
        webhookName: connection.name,
        guildName: connection.guildName,
      });
    }
  }
  if (editorState.editor.selectedNode.data.title == "Notion") {
    const connection = await getNotionConnection();
    if (connection) {
      nodeConnection.setNotionNode({
        accessToken: connection.accessToken,
        databaseId: connection.databaseId,
        workspaceName: connection.workspaceName,
        content: {
          name: googleFile.name,
          kind: googleFile.kind,
          type: googleFile.mimeType,
        },
      });

      if (nodeConnection.notionNode.databaseId !== "") {
        const response = await getNotionDatabase(
          nodeConnection.notionNode.databaseId,
          nodeConnection.notionNode.accessToken
        );
      }
    }
  }
  if (editorState.editor.selectedNode.data.title == "Slack") {
    const connection = await getSlackConnection();
    if (connection) {
      nodeConnection.setSlackNode({
        appId: connection.appId,
        authedUserId: connection.authedUserId,
        authedUserToken: connection.authedUserToken,
        slackAccessToken: connection.slackAccessToken,
        botUserId: connection.botUserId,
        teamId: connection.teamId,
        teamName: connection.teamName,
        userId: connection.userId,
        content: "",
      });
    }
  }
};

export const fetchBotSlackChannels = async (token, setSlackChannels) => {
  await listBotChannels(token)?.then((channels) => setSlackChannels(channels));
};

export const onNotionContent = (nodeConnection, event) => {
  nodeConnection.setNotionNode((prev) => ({
    ...prev,
    content: event.target.value,
  }));
};
