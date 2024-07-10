import { CONNECTIONS } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ConnectionsPage = async () => {
  return (
    <div className="relative flex flex-col gap-4">
      <h1 className="sticky top-0 z-[10] flex items-center justify-between border-b bg-background/50 p-6 text-4xl backdrop-blur-lg">
        Connections
      </h1>
      <div className="relative flex flex-col gap-4">
        <section className="flex flex-col gap-4 p-6 text-muted-foreground">
          Connect all your apps directly from here. You may need to connect
          these apps regularly to refresh verification
          {CONNECTIONS.map((connection) => (
            <Card className="flex w-full items-center justify-between">
              <CardHeader className="flex flex-col gap-4">
                <div className="flex flex-row gap-2">
                  <Image
                    src={connection.image}
                    alt={connection.title}
                    height={30}
                    width={30}
                    className="object-contain"
                  />
                </div>
                <div>
                  <CardTitle className="text-lg">{connection.title}</CardTitle>
                  <CardDescription>{connection.description}</CardDescription>
                </div>
              </CardHeader>
              <div className="flex flex-col items-center gap-2 p-4">
                {/* {connections[connection.type] ? (
                  <div className="border-bg-primary rounded-lg border-2 px-3 py-2 font-bold text-white">
                    Connected
                  </div>
                ) : ( */}
                <Link
                  href={
                    connection.title == "Discord"
                      ? process.env.NEXT_PUBLIC_DISCORD_REDIRECT
                      : connection.title == "Notion"
                      ? process.env.NEXT_PUBLIC_NOTION_AUTH_URL
                      : connection.title == "Slack"
                      ? process.env.NEXT_PUBLIC_SLACK_REDIRECT
                      : "#"
                  }
                  className=" rounded-lg bg-primary p-2 font-bold text-primary-foreground"
                >
                  Connect
                </Link>
                {/* )} */}
              </div>
            </Card>
          ))}
        </section>
      </div>
    </div>
  );
};

export default ConnectionsPage;
