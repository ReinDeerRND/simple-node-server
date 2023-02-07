import { app } from "./app";

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Dinosaurs app listening on port ${port}`);
});


export { app };
//для запуска tsc локально - npx tsc
