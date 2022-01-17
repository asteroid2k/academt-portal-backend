const app = require("./app");
const { Connect } = require("../config/db");

const PORT = process.env.PORT || 3000;

Connect();

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
