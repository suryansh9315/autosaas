import React, { useState } from "react";
import { AccordionContent } from "@/components/ui/accordion";
import { useNodeConnections } from "@/providers/connections-provider";
import { EditorState } from "@/providers/editor-provider";
import { useFuzzieStore } from "@/store";
import MultipleSelector from "@/components/ui/multiple-selector";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

const RenderConnectionAccordion = ({ connection, state }) => {
  const {
    title,
    image,
    description,
    connectionKey,
    accessTokenKey,
    alwaysTrue,
    slackSpecial,
  } = connection;
  const { nodeConnection } = useNodeConnections();
  const { slackChannels, selectedSlackChannels, setSelectedSlackChannels } =
    useFuzzieStore();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const connectionData = nodeConnection[connectionKey];

  const isConnected =
    alwaysTrue ||
    (nodeConnection[connectionKey] &&
      accessTokenKey &&
      connectionData[accessTokenKey]);

  return (
    <AccordionContent key={title}>
      {state.editor.selectedNode.data.title === title && (
        <>
          <Card className="flex w-full items-center justify-between">
            <CardHeader className="flex flex-col gap-4">
              <div className="flex flex-row gap-2">
                <Image
                  src={image}
                  alt={title}
                  height={30}
                  width={30}
                  className="object-contain"
                />
              </div>
              <div>
                <CardTitle className="text-lg">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </div>
            </CardHeader>
            <div className="flex flex-col items-center gap-2 p-4">
              {{ [title]: isConnected }[title] ? (
                <div className="border-bg-primary rounded-lg border-2 px-3 py-2 font-bold text-white">
                  Connected
                </div>
              ) : (
                <Link
                  href={
                    title == "Discord"
                      ? process.env.NEXT_PUBLIC_DISCORD_REDIRECT
                      : title == "Notion"
                      ? process.env.NEXT_PUBLIC_NOTION_AUTH_URL
                      : title == "Slack"
                      ? process.env.NEXT_PUBLIC_SLACK_REDIRECT
                      : "#"
                  }
                  className=" rounded-lg bg-primary p-2 font-bold text-primary-foreground"
                >
                  Connect
                </Link>
              )}
            </div>
          </Card>
          {slackSpecial && isConnected && (
            <div className="p-6">
              {slackChannels?.length ? (
                <>
                  <div className="mb-4 ml-1">
                    Select the slack channels to send notification and messages:
                  </div>
                  <MultipleSelector
                    value={selectedSlackChannels}
                    onChange={setSelectedSlackChannels}
                    defaultOptions={slackChannels}
                    placeholder="Select channels"
                    emptyIndicator={
                      <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        no results found.
                      </p>
                    }
                  />
                </>
              ) : (
                "No Slack channels found. Please add your Slack bot to your Slack channel"
              )}
            </div>
          )}
        </>
      )}
    </AccordionContent>
  );
};

export default RenderConnectionAccordion;
