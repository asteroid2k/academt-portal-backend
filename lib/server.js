const app = require("./app");
const { Connect } = require("../config/db");
const { init } = require("../config/mailer");

const PORT = process.env.PORT || 3000;

Connect();
init();

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
