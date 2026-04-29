import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then((data) => {
      console.log(
        `database connection has been established ${data.connection.host}`,
      );
    })
    .catch((error) => {
      console.log(error.message);
    });
};
