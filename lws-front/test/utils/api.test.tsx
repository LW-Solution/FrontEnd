import axios from "axios"

describe("Testando a conexao com o backend de estacoes metricas" , () => {

    it("Teste da rota get dos alertas", async () => {
        const response = await axios.get("http://host.docker.internal:3001/alert")
        const objectSubject = response.data
        expect(objectSubject).toEqual([])
    })
})