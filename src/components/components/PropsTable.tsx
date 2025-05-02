import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

export interface SubProp {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface PropItem {
  name: string;
  type: string;
  default?: string;
  description: string;
  subProps?: SubProp[];
}

export interface PropGroup {
  name: string;
  items: PropItem[];
}

interface PropsTableProps {
  propGroups: PropGroup[] | undefined;
}

export const PropsTable: React.FC<PropsTableProps> = ({ propGroups }) => {
  if (!propGroups || propGroups.length === 0) {
    return (
      <Card className="border p-4 sm:p-6 shadow">
        <p className="text-zinc-500">
          No props available for this component.
        </p>
      </Card>
    );
  }

  return (
    <Tabs defaultValue={propGroups[0].name} className="w-full">
      <div className="overflow-x-auto">
        <TabsList className="mb-4 sm:mb-6 bg-zinc-100 dark:bg-zinc-800 p-0 shadow-sm flex">
          {propGroups.map((propGroup) => (
            <TabsTrigger
              key={propGroup.name}
              value={propGroup.name}
              className="px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base whitespace-nowrap data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-900"
            >
              {propGroup.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {propGroups.map((propGroup) => (
        <TabsContent
          key={propGroup.name}
          value={propGroup.name}
          className="space-y-4"
        >
          <div className="border shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-zinc-50 dark:bg-black border-b">
                    <th className="px-3 py-3 sm:px-6 sm:py-4 text-left font-medium w-1/6 min-w-[100px] border-r">
                      Name
                    </th>
                    <th className="px-3 py-3 sm:px-6 sm:py-4 text-left font-medium w-1/6 min-w-[100px] border-r">
                      Type
                    </th>
                    <th className="px-3 py-3 sm:px-6 sm:py-4 text-left font-medium w-1/5 min-w-[100px] border-r">
                      Default
                    </th>
                    <th className="px-3 py-3 sm:px-6 sm:py-4 text-left font-medium w-3/6 min-w-[200px]">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {propGroup.items.map((prop, index) => (
                    <React.Fragment key={`${propGroup.name}-${prop.name}`}>
                      <tr
                        className={`transition-colors ${
                          index % 2 === 0
                            ? "bg-white dark:bg-black"
                            : "bg-zinc-50 dark:bg-zinc-900"
                        }`}
                      >
                        <td className="px-2 py-3 text-start ml-1 sm:py-4 font-mono text-xs sm:text-sm font-semibold border-r break-all">
                          <code className="bg-gray-100 dark:bg-zinc-800 px-1 py-0.5 sm:px-2 sm:py-1">
                            {prop.name}
                          </code>
                        </td>
                        <td className="px-3 py-3 sm:py-4 font-mono text-xs sm:text-sm border-r break-all">
                          <code className="bg-gray-100 dark:bg-zinc-800 px-1 py-0.5 sm:px-2 sm:py-1">
                            {prop.type}
                          </code>
                        </td>
                        <td className="px-2 py-3 sm:py-4 text-xs sm:text-sm border-r break-all">
                          <code className="bg-gray-100 dark:bg-zinc-800 px-1 py-0.5 sm:px-2 sm:py-1">
                            {prop.default || "-"}
                          </code>
                        </td>
                        <td className="px-2 py-3 sm:py-4 text-xs sm:text-sm">
                          {prop.description}
                        </td>
                      </tr>
                      {prop.subProps && prop.subProps.length > 0 && (
                        <tr key={`${propGroup.name}-${prop.name}-subprops`}>
                          <td colSpan={4} className="p-0">
                            <div className="bg-zinc-50 dark:bg-zinc-900 border">
                              <div className="px-3 py-2 sm:px-3 sm:py-2 font-medium text-xs sm:text-sm bg-white dark:bg-black border-2 border-b">
                                Properties of {prop.name}
                              </div>
                              <div className="overflow-x-auto">
                                <table className="w-full border-collapse text-sm">
                                  <tbody className="divide-y">
                                    {prop.subProps.map((subProp, subIndex) => (
                                      <tr
                                        key={`${propGroup.name}-${prop.name}-${subProp.name}`}
                                        className={`transition-colors ${
                                          subIndex % 2 === 0
                                            ? "bg-white/50 dark:bg-black/30"
                                            : "bg-zinc-50/70 dark:bg-zinc-900/70"
                                        }`}
                                      >
                                        <td className="pl-6 sm:pl-10 pr-3 sm:pr-6 py-2 sm:py-3 font-mono text-xs sm:text-sm font-medium border-r w-1/6 min-w-[100px] break-all">
                                          <code className="bg-gray-100 dark:bg-zinc-800 px-1 py-0.5 sm:px-2 sm:py-1">
                                            {subProp.name}
                                          </code>
                                        </td>
                                        <td className="px-3 py-2 sm:px-3 sm:py-3 font-mono text-xs sm:text-sm border-r w-1/6 min-w-[100px] break-all">
                                          <code className="bg-gray-100 dark:bg-zinc-800 px-1 py-0.5 sm:px-2 sm:py-1">
                                            {subProp.type}
                                          </code>
                                        </td>
                                        <td className="px-3 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm border-r w-1/5 min-w-[100px] break-all">
                                          <code className="bg-gray-100 dark:bg-zinc-800 px-1 py-0.5 sm:px-2 sm:py-1">
                                            {subProp.default || "-"}
                                          </code>
                                        </td>
                                        <td className="px-3 py-2 sm:px-3 sm:py-3 text-xs sm:text-sm w-3/6 min-w-[200px]">
                                          {subProp.description}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};