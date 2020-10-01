import api from "./api";

const getAllThreats = async () => {
    try {
        const response = await api.get("/threat");
        return response.data;
    } catch (err) {
        return err;
    }
};

export { getAllThreats };
