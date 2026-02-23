->  created main folder
-> created backend and frotnend within that folder
-> cd into backend 
        -> npm init -y
        -> create a script to run the server in HMR     "dev":"node --watch index.js"
        -> type module 
        -> install required packages express jsonwebtoken mongoose bcryptjs  dotenv
        -> create a basic express server
-> cd frontend
        -> pnpm create vite@latest
        -> pnpm install tailwindcss @tailwindcss/vite
        -> follow the tailwind docs in website to add taiwindcss as a plugin

//BEGINNING WITH BACKEND
                -> create the apis.md file in the backend to debug what apis are needed
                -> created model inside the models folder in backend 
                        -> user model , product model , category model , order model 
                -> create a mongo db cluster in the mongo db site and get its url and put it in .env
                ->  connect to db with the help of a helper util usign mongoose

// api -writing
        - refer to apis.md file for apis





git fetch origin 
git reset --hard origin/main
git clean -fd

