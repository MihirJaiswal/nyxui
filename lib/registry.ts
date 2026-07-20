import { allDocs } from "content-collections";
import { componentsData } from "@/registry/Data";
import type { DocSection } from "@/lib/docs";

export function getRegistryCounts() {
  return {
    components: Object.keys(componentsData.components || {}).length,
    templates: Object.keys(componentsData.templates || {}).length,
    blocks: Object.keys(componentsData.blocks || {}).length,
  };
}

export function getPublishedDocCount(section: DocSection): number {
  return allDocs.filter(
    (doc) => doc.slugAsParams.startsWith(`${section}/`) && doc.published,
  ).length;
}
