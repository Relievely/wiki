import {app} from './app';

const port = process.env.PORT;

app.listen(port, () => console.log(`Wiki service listening on port: ${port}`))