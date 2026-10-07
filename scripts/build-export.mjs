import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const root = process.cwd();
const toStash = [
  { from: path.join(root, "app", "api"), to: path.join(root, ".app_api_stash") },
  { from: path.join(root, "app", "images"), to: path.join(root, ".app_images_stash") },
  { from: path.join(root, "app", "blog", "images"), to: path.join(root, ".app_blog_images_stash") },
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

  // Ensure both /blog/blogdashboard and /blogs/blogdashboard exist in out/
  const blogDashboardOut = path.join(root, "out", "blog", "blogdashboard");
  const blogsDashboardOut = path.join(root, "out", "blogs", "blogdashboard");
  if (fs.existsSync(blogDashboardOut)) {
    fs.cpSync(blogDashboardOut, blogsDashboardOut, { recursive: true, force: true });
  }

  // Ensure .htaccess is copied to out/.htaccess
  const htaccessSrc = path.join(root, "public", ".htaccess");
  const htaccessDest = path.join(root, "out", ".htaccess");
  if (fs.existsSync(htaccessSrc)) {
    fs.copyFileSync(htaccessSrc, htaccessDest);
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
