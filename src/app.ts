#! /usr/bin/env node
import { program } from "commander";

import { bootstrap } from "./lib/bootstrap/bootstrap";
import { render } from "./lib/render/render";
import { generateManifest } from "./lib/manifest/generate-manifest";

program
  .name("powex-cli")
  .description("React framework to web extensions!")
  .version("0.1.0");

program
  .command("build")
  .description("build a Powex project")
  .action(async () => {
    const project = await bootstrap({
      writeFile: true,
    });

    await render(project);

    await generateManifest(project, {
      writeFile: true,
    });
  });

program.parse();
