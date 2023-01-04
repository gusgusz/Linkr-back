import { connectionDb } from "../database/db.js";

export const getPosts = async (req, res) => {
  try{
  const response = await connectionDb.query(
    `SELECT * FROM posts order by "createdAt" desc Limit 20;`
    );
    if(response.rowCount === 0) {
      return res.status(404).send("There are no posts yet");
    }
  res.status(200).send(response.rows);
  } catch (error) {
    res.status(500).send("An error occurred while trying to fetch the posts, please refresh the page");
  }
}