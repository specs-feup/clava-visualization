# Clava Visualization Tool

Clava integration of LARA's web tool for visualization and analysis of the AST and its source code.

For more details, see the [LARA visualization tool repository](https://github.com/specs-feup/lara-visualization) and the [Clava repository](https://github.com/specs-feup/clava).

## Usage

Before using the tool, you must include the respective NPM package to your project:

```bash
npm install @specs-feup/clava-visualization
```

To launch or update the visualization tool, execute the following statements in your script:

```js
import VisualizationTool from "@specs-feup/clava-visualization/api/VisualizationTool.js";

await VisualizationTool.visualize();
```

Once ready, Clava will provide the URL that should be opened in the browser to access the web interface. The function can also change the AST root and URL domain and port.

Other properties will allow the user to know other important information from the server:

```js
VisualizationTool.isLaunched;  // true if the server is running
VisualizationTool.url;         // URL where the server is running
VisualizationTool.port;        // port to which the server is listening
VisualizationTool.hostname;    // hostname to which the server is listening
```

For more details, refer to the `GenericVisualizationTool` documentation, from [LARA](https://github.com/specs-feup/lara-framework).

## Development Environment

To configure the development environment, firstly do the [setup described in Clava-JS](do the setup described in Clava-JS). Then, clone the visualization tool repositories:

```bash
git clone -b feature/ast-visualization https://github.com/specs-feup/lara-visualization.git
git clone -b feature/ast-visualization https://github.com/specs-feup/clava-visualization.git
```

Edit the base folder's `package.json` to the following:

```bash
{
  "type": "module",
  "workspaces": [
    "clava/Clava-JS",
    "lara-framework/Lara-JS",
    "lara-visualization",
    "clava-visualization"
  ]
}
```

Then, execute the following commands to finish the compilation procedure:

```bash
npm install
npm run build -w lara-visualization
npm run build -w clava-visualization
npm install
```

After this, you you should be able to use the tool in your project by following the instructions described in the previous section.
