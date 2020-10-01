import api from "./api";

const getAllHeroes = async () => {
    try {
        const response = await api.get("/hero");
        return response.data;
    } catch (err) {
        return err;
    }
};

export { getAllHeroes };
