const fs = require("fs");
const path = require("path");

module.exports = {
    siteUrl: "https://nyxui.vercel.app",
    generateRobotsTxt: true,
    sitemapSize: 7000,
    generateIndexSitemap: true,
    exclude: [],
    transform: async (path) => {
        let priority = 0.7
        let changefreq = "weekly"

        if (path === "/") {
            priority = 1.0
            changefreq = "weekly"
        } else if (path.startsWith("/components")) {
            priority = 0.9
            changefreq = "daily"
        } else if (path.startsWith("/templates")) {
            priority = 0.8
            changefreq = "weekly"
        } else if (path.startsWith("/category")) {
            priority = 0.6
            changefreq = "weekly"
        }

        return {
            loc: path,
            changefreq,
            priority,
            lastmod: new Date().toISOString(),
        }
    },
    robotsTxtOptions: {
        policies: [
            { userAgent: "*", allow: "/" },
        ],
    },
    additionalPaths: async (config) => {
        const projectRoot = __dirname

        const mdxDir = (relative) => path.join(projectRoot, relative)
        const listMdxSlugs = (dirPath) => {
            try {
                const abs = mdxDir(dirPath)
                if (!fs.existsSync(abs)) return []
                return fs
                    .readdirSync(abs)
                    .filter((f) => f.endsWith(".mdx"))
                    .map((f) => f.replace(/\.mdx$/, ""))
            } catch {
                return []
            }
        }

        const componentSlugs = listMdxSlugs("content/docs/components")
        const templateSlugs = listMdxSlugs("content/docs/templates")
        const blockSlugs = listMdxSlugs("content/docs/blocks")

        // Attempt to derive categories from component MDX frontmatter tags
        const deriveCategories = () => {
            const dir = mdxDir("content/docs/components")
            if (!fs.existsSync(dir)) return []
            const tags = new Set()
            for (const file of fs.readdirSync(dir)) {
                if (!file.endsWith(".mdx")) continue
                try {
                    const content = fs.readFileSync(path.join(dir, file), "utf8")
                    // naive frontmatter block extraction
                    const match = content.match(/^---[\s\S]*?---/)
                    if (match) {
                        const fm = match[0]
                        const listMatch = fm.match(/tags:\s*\[(.*?)\]/)
                        if (listMatch && listMatch[1]) {
                            listMatch[1]
                                .split(",")
                                .map((t) => t.trim().replace(/^['\"]|['\"]$/g, ""))
                                .filter(Boolean)
                                .forEach((t) => tags.add(t.toLowerCase().replace(/\s+/g, "-")))
                        }
                    }
                } catch {
                    // ignore
                }
            }
            return Array.from(tags)
        }

        const categorySlugs = deriveCategories()

        const staticRoutes = [
            "/",
            "/docs",
            "/components",
            "/templates",
            "/blocks",
            "/category",
            "/playground",
        ]

        const dynamicRoutes = [
            ...componentSlugs.map((s) => `/components/${s}`),
            ...templateSlugs.map((s) => `/templates/${s}`),
            ...blockSlugs.map((s) => `/blocks/${s}`),
            // Preview pages for blocks
            ...blockSlugs.map((s) => `/preview/${s}`),
            // Category pages
            ...categorySlugs.map((s) => `/category/${s}`),
        ]

        return [...staticRoutes, ...dynamicRoutes].map((loc) => ({
            loc,
            changefreq: loc === "/components" ? "daily" : "weekly",
            priority: loc === "/" ? 1.0 : loc.startsWith("/components/") ? 0.9 : 0.7,
            lastmod: new Date().toISOString(),
        }))
    },
}
