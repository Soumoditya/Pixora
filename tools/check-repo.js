const fs = require("fs");
const path = require("path");
const problems = [];
function warn(msg) { problems.push(msg); }

const root = process.cwd();
const fpath = path.join(root, "src", "firebase.js");
if (!fs.existsSync(fpath)) warn("Missing src/firebase.js");
else {
  const f = fs.readFileSync(fpath, "utf8");
  ["apiKey","authDomain","projectId","appId"].forEach(k=>{
    if (!f.includes(k)) warn(`src/firebase.js missing key: ${k}`);
  });
  if (!f.includes("USE_CLOUDINARY = true")) warn("USE_CLOUDINARY not enabled");
}

const walk = dir => {
  fs.readdirSync(dir).forEach(fn=>{
    const full = path.join(dir,fn);
    if (fs.statSync(full).isDirectory()) return walk(full);
    if (full.endsWith(".js")||full.endsWith(".jsx")) {
      const txt = fs.readFileSync(full,"utf8");
      if (txt.includes("YOUR_CLOUD_NAME")||txt.includes("YOUR_UNSIGNED_PRESET")) warn(`${full} contains placeholders`);
    }
  });
};
walk(path.join(root,"src"));

const pkgPath = path.join(root,"package.json");
if (!fs.existsSync(pkgPath)) warn("Missing package.json");

if (problems.length===0) console.log("OK: repo checks passed");
else { console.error("REPO CHECK FAILED:"); problems.forEach((p,i)=>console.error(`${i+1}. ${p}`)); process.exit(2); }
