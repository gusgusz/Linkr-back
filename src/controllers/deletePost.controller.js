import deletePostRepositories from "../repositories/deletePost.repositories.js";

export default async function deletePostController(req,res) {
    try {
        const { id }= req.params;

        const deletedPost = await deletePostRepositories(id);

        if(deletedPost === 0) res.status(404);

        res.sendStatus(204);

    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    };
};
