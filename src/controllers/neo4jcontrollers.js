


async function deleteMovie(req, res) {
    try {
        await moviesService.deleteMovie(req.body.movieID);
        return res.status(200).json({ message: "Task executed successfully"});

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}