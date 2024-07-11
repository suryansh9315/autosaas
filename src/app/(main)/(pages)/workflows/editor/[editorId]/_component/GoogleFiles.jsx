import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { onAddTemplate } from "@/lib/editor-utils";
import React from "react";

const isGoogleFileNotEmpty = (file) => {
  return Object.keys(file).length > 0 && file.kind !== "";
};

const GoogleFiles = ({ gFile, nodeConnection, title }) => {
  if (!isGoogleFileNotEmpty(gFile)) {
    return null;
  }

  const details = ["kind", "name", "mimeType"];
  if (title === "Google Drive") {
    details.push("id");
  }
  return (
    <div className="flex flex-wrap gap-2">
      <Card>
        <CardContent className="flex flex-wrap gap-2 p-4">
          {details.map((detail) => (
            <div
              key={detail}
              onClick={() =>
                onAddTemplate(nodeConnection, title, gFile[detail])
              }
              className="flex cursor-pointer gap-2 rounded-full bg-white px-3 py-1 text-gray-500"
            >
              {detail}:{" "}
              <CardDescription className="text-black">
                {gFile[detail]}
              </CardDescription>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default GoogleFiles;
