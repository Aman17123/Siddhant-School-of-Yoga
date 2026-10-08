import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const root = process.cwd();
const toStash = [
  { from: path.join(root, "app", "api"), to: path.join(root, ".app_api_stash") },
  { from: path.join(root, "app", "images"), to: path.join(root, ".app_images_stash") },
  { from: path.join(root, "app", "blog", "images"), to: path.join(root, ".app_blog_images_stash") },
  { from: path.join(root, "proxy.ts"), to: path.join(root, ".proxy_stash") },
];

console.log(" Preparing static export for Hostinger...");

try {
  for (const item of toStash) {
    if (fs.existsSync(item.from)) {
      fs.renameSync(item.from, item.to);
    }
  }

  console.log("⚡ Running Next.js build...");
  execSync("npx next build --webpack", { stdio: "inherit" });

  // Ensure legacy blogdashboard redirects to /blog/dashboard/
  const blogDashboardSrc = path.join(root, "out", "blog", "dashboard");
  const blogDashboardDestinations = [
    path.join(root, "out", "blog", "blogdashboard"),
  ];
  if (fs.existsSync(blogDashboardSrc)) {
    for (const dest of blogDashboardDestinations) {
      fs.cpSync(blogDashboardSrc, dest, { recursive: true, force: true });
    }
  }

  // Ensure all blog images are guaranteed inside out/blog/images and out/images
  const publicBlogImages = path.join(root, "public", "blog", "images");
  const publicImages = path.join(root, "public", "images");
  const outBlogImages = path.join(root, "out", "blog", "images");
  const outImages = path.join(root, "out", "images");

  if (!fs.existsSync(outBlogImages)) fs.mkdirSync(outBlogImages, { recursive: true });
  if (!fs.existsSync(outImages)) fs.mkdirSync(outImages, { recursive: true });

  if (fs.existsSync(publicBlogImages)) {
    fs.cpSync(publicBlogImages, outBlogImages, { recursive: true, force: true });
  }
  if (fs.existsSync(publicImages)) {
    fs.cpSync(publicImages, outImages, { recursive: true, force: true });
    // Also copy all images into out/blog/images as backup
    fs.cpSync(publicImages, outBlogImages, { recursive: true, force: true });
  }

  // Ensure .htaccess is copied to out/.htaccess
  const htaccessSrc = path.join(root, "public", ".htaccess");
  const htaccessDest = path.join(root, "out", ".htaccess");
  if (fs.existsSync(htaccessSrc)) {
    fs.copyFileSync(htaccessSrc, htaccessDest);
  }

  // Automatically sync current build hashes (CSS & JS chunks) into blog-template.html
  const outCssDir = path.join(root, "out", "_next", "static", "css");
  const blogTemplatePath = path.join(root, "public", "api", "blog-template.html");
  if (fs.existsSync(outCssDir) && fs.existsSync(blogTemplatePath)) {
    let tpl = fs.readFileSync(blogTemplatePath, "utf-8");
    const cssFiles = fs.readdirSync(outCssDir).filter(f => f.endsWith(".css"));
    if (cssFiles.length > 0) {
      cssFiles.sort((a, b) => fs.statSync(path.join(outCssDir, a)).size - fs.statSync(path.join(outCssDir, b)).size);
      tpl = tpl.replace(/<link[^>]*href="\/_next\/static\/css\/[^"]*"[^>]*>\s*/gi, "");
      const newLinks = cssFiles.map(f => `<link rel="stylesheet" href="/_next/static/css/${f}" data-precedence="next"/>`).join("\n") + "\n";
      tpl = tpl.replace(/<\/head>/i, newLinks + "</head>");
    }

    const slugChunkDir = path.join(root, "out", "_next", "static", "chunks", "app", "blog", "[slug]");
    if (fs.existsSync(slugChunkDir)) {
      const pageFiles = fs.readdirSync(slugChunkDir).filter(f => f.startsWith("page-") && f.endsWith(".js"));
      if (pageFiles.length > 0) {
        tpl = tpl.replace(
          /<script[^>]*src="\/_next\/static\/chunks\/app\/blog\/(?:%5Bslug%5D|\[slug\])\/page-[^"]+\.js"[^>]*><\/script>/gi,
          `<script src="/_next/static/chunks/app/blog/%5Bslug%5D/${pageFiles[0]}" async=""></script>`
        );
      }
    }

    const chunksDir = path.join(root, "out", "_next", "static", "chunks");
    if (fs.existsSync(chunksDir)) {
      const c2273 = fs.readdirSync(chunksDir).filter(f => f.startsWith("2273-") && f.endsWith(".js"));
      if (c2273.length > 0) {
        tpl = tpl.replace(
          /<script[^>]*src="\/_next\/static\/chunks\/2273-[^"]+\.js"[^>]*><\/script>/gi,
          `<script src="/_next/static/chunks/${c2273[0]}" async=""></script>`
        );
      }
    }

    fs.writeFileSync(blogTemplatePath, tpl, "utf-8");
    console.log(" Synced latest CSS & JS hashes into blog-template.html");
  }

  // Ensure PHP API and fallback scripts are copied to out/
  const apiSrc = path.join(root, "public", "api");
  const apiDest = path.join(root, "out", "api");
  if (fs.existsSync(apiSrc)) {
    fs.cpSync(apiSrc, apiDest, { recursive: true, force: true });
  }

  const blogPostPhpSrc = path.join(root, "public", "blog-post.php");
  const blogPostPhpDest = path.join(root, "out", "blog-post.php");
  if (fs.existsSync(blogPostPhpSrc)) {
    fs.copyFileSync(blogPostPhpSrc, blogPostPhpDest);
  }

  console.log("\n Static export complete! All files generated in the 'out/' folder.");
} finally {
  for (const item of toStash) {
    if (fs.existsSync(item.to)) {
      try {
        if (fs.existsSync(item.from)) {
          fs.rmSync(item.from, { recursive: true, force: true });
        }
        fs.renameSync(item.to, item.from);
      } catch (e) {
        console.error("Error restoring", item.from, e);
      }
    }
  }
  console.log(" Restored development routes for npm run dev.");
}
