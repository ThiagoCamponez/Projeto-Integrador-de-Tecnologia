const RealizarAgServModel = require("../model/entidades/RealizarAgServModel");
const ServicoModel = require("../model/entidades/ServicoModel");

class RealizarAgServController {
    async obterTodos(req, res) {
        try {
            const realizarAgServModel = new RealizarAgServModel();
            const atividadesSust = await realizarAgServModel.obterTodos();
            return res.status(200).json(atividadesSust);
        } catch (error) {
            console.error('Erro ao obter todos os serviços:', error);
            return res.status(500).json({ message: 'Erro ao obter todos os serviços.' });
        }
    }

    async obterPorId(req, res) {
        const id = req.params.id;
        try {
            const realizarAgServModel = new RealizarAgServModel();
            const atividadeSust = await realizarAgServModel.obterPorId(id);
            if (atividadeSust) {
                return res.status(200).json(atividadeSust);
            } else {
                return res.status(404).json({ message: 'Serviço não encontrado.' });
            }
        } catch (error) {
            console.error('Erro ao obter serviço por ID:', error);
            return res.status(500).json({ message: 'Erro ao obter serviço.' });
        }
    }

    async adicionar(req, res) {
        const { 
            agserv_nomeSolicitante, 
            agserv_cpfSolicitante, 
            agserv_contatoSolicitante, 
            agserv_enderecoSolicitante, 
            agserv_bairroSolicitante, 
            agserv_numeroSolicitante, 
            id, // ID do tipo de serviço
            agserv_data, 
            agserv_horario, 
            agserv_descricaoServico 
        } = req.body;

        // Verificação de campos obrigatórios
        if (!agserv_nomeSolicitante || !agserv_cpfSolicitante || !agserv_contatoSolicitante || !agserv_enderecoSolicitante || !agserv_bairroSolicitante || !agserv_numeroSolicitante || !id || !agserv_data || !agserv_horario || !agserv_descricaoServico) {
            return res.status(400).json({ message: 'Por favor, informe todos os dados do serviço.' });
        }

        try {
            const servicoModel = new ServicoModel();
            const tipoServico = await servicoModel.obterPorId(id);

            if (!tipoServico) {
                return res.status(400).json({ message: 'Tipo de serviço inválido.' });
            }

            // Criação do novo serviço agendado
            const atividadeSust = new RealizarAgServModel(
                0, // ID será gerado automaticamente
                agserv_nomeSolicitante,
                agserv_cpfSolicitante,
                agserv_contatoSolicitante,
                agserv_enderecoSolicitante,
                agserv_bairroSolicitante,
                agserv_numeroSolicitante,
                id,
                agserv_data,
                agserv_horario,
                agserv_descricaoServico
            );

            await atividadeSust.adicionar();

            return res.status(200).json({ message: 'Serviço cadastrado com sucesso.' });
        } catch (error) {
            console.error('Erro ao adicionar serviço:', error);
            return res.status(500).json({ message: 'Erro ao cadastrar serviço.' });
        }
    }

    async atualizar(req, res) {
        const id = req.params.id;
        const {
            nomeSolicitante,
            cpfSolicitante,
            contatoSolicitante,
            enderecoSolicitante,
            bairroSolicitante,
            numeroSolicitante,
            tipoServico,
            data,
            horario,
            descricaoServico
        } = req.body;
    
        if (!nomeSolicitante || !cpfSolicitante || !contatoSolicitante || !enderecoSolicitante || !bairroSolicitante || !numeroSolicitante || !tipoServico || !data || !horario || !descricaoServico) {
            return res.status(400).json({ message: 'Por favor, informe todos os dados do serviço.' });
        }
    
        try {
            const atividadeSust = new RealizarAgServModel(
                id,
                nomeSolicitante,
                cpfSolicitante,
                contatoSolicitante,
                enderecoSolicitante,
                bairroSolicitante,
                numeroSolicitante,
                tipoServico,
                data,
                horario,
                descricaoServico
            );
    
            await atividadeSust.atualizar();
            return res.status(200).json({ message: 'Serviço atualizado com sucesso.' });
        } catch (error) {
            console.error('Erro ao atualizar serviço:', error);
            return res.status(500).json({ message: 'Erro ao atualizar serviço.', error: error.message });
        }
    }

    async excluir(req, res) {
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({ message: 'Por favor, informe o ID do serviço para exclusão.' });
        }

        try {
            const atividadeSust = new RealizarAgServModel();
            atividadeSust.id = id;

            await atividadeSust.excluir();

            return res.status(200).json({ message: 'Serviço excluído com sucesso.' });
        } catch (error) {
            console.error('Erro ao excluir serviço:', error);
            return res.status(500).json({ message: 'Erro ao excluir serviço.' });
        }
    }

    async filtrar(req, res) {
        const termoBusca = req.params.termoBusca || "";

        try {
            const realizarAgServModel = new RealizarAgServModel();
            const atividadesSust = await realizarAgServModel.filtrar(termoBusca);
            return res.status(200).json(atividadesSust);
        } catch (error) {
            console.error('Erro ao filtrar serviços:', error);
            return res.status(500).json({ message: 'Erro ao filtrar serviços.' });
        }
    }
}

module.exports = RealizarAgServController;
