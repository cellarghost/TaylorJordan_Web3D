# INFO FOR EXAMINERS

This website is available at my Sussex web space, [please click here](http://users.sussex.ac.uk/~tj227/IM/WEB3D/) to view!

## Running locally

To run this application locally, you must have NPM installed. 
Once NPM is installed, inside of this directory, run:
```npm install```

For hosting on the sussex web space, the 3D scene is hard-coded to it's location on the sussex web server.
To fix this, go to /scene/scene3D.tsx and do the following:
- Comment-out line 4 (Ctrl+/ if your code editor has JSX support -- otherwise, wrap the line like: ```{/* code here */}```)
- Uncomment line 5.


To run the application, run:
```npx vite```.

This project uses the following tools:
- Vite
- React
- React-Router v7
- ThreeJS
- TypeScript

The production build is located in /builds/client.




