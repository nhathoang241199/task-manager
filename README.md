1. Install

```bash
yarn
```

2. Run Mock API Server port 5001

```bash
# install json-server
npm install -g json-server
# run json-server
json-server --watch db.json --port 5001
```

3. Run FE

```bash
# create env file
cp .env.example .env
# run app
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
