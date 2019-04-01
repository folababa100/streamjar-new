# streamjar-main

Getting Started
1. Open the frontend folder and run `npm install` to install all dependencies
    - If there are missing dependencies, run `npm install missing_dependency`
2. Once all dependencies are installed, execute `npm run build` to build the frontend
    - If the build fails and is missing dependencies, run `npm install missing_dependency` and then retry `npm run build`
3. Next, open the backend/server folder
4. Run `npm install` to install all dependencies
5. Connect the frontend build to the backend by using a symbolic link by using `ln -s src dest`
    - An example would be `ln -s ~/streamjar-main/frontend/build ~/streamjar-main/server`
    - The server folder should now have a build directory in it which changes everytime the frontend build folder changes
6. Start the backend server with `npm start` or `npm run` -> I forgot which command it was when writing this Readme
