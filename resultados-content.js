// Conteúdo dos resultados do formulário - EDITÁVEL
const resultadosContent = {
    // Título principal da seção de resultados
    titulo: "Seus 3 Principais Insights",
    
    // Subtítulo/descrição
    subtitulo: "Com base nas suas respostas, identificamos as principais oportunidades de automação",
    
    // Insights baseados no score
    insights: {
        // Score baixo (0-30)
        baixo: [
            {
                icone: "🎯",
                titulo: "Você busca melhorar a **precisão e velocidade das consultas**",
                descricao: "A implementação de um sistema de acesso inteligente a dados pode reduzir em até 80% o tempo gasto em pesquisas manuais."
            },
            {
                icone: "⚠️",
                titulo: "Você já tentou **automação antes sem sucesso**",
                descricao: "Nossa análise mostra que 85% das falhas ocorrem por falta de mapeamento adequado dos processos. Começar com uma documentação clara é fundamental."
            },
            {
                icone: "📊",
                titulo: "Sua empresa tem potencial, mas precisa de **preparação**",
                descricao: "Com pontuação de 45/100, recomendamos começar documentando e padronizando processos antes da automação completa."
            }
        ],
        
        // Score médio (31-60)
        medio: [
            {
                icone: "🚀",
                titulo: "Você está pronto para **automação inteligente**",
                descricao: "Sua empresa tem uma base sólida. A implementação de IA pode gerar economia de 40-60% no tempo operacional."
            },
            {
                icone: "⚡",
                titulo: "Foque em **processos repetitivos** primeiro",
                descricao: "Identificamos 3-5 processos que consomem mais tempo da sua equipe. Automatizá-los pode liberar 20+ horas semanais."
            },
            {
                icone: "🎯",
                titulo: "ROI esperado: **300-500%** em 6 meses",
                descricao: "Com a automação adequada, você pode reduzir custos operacionais e aumentar a produtividade significativamente."
            }
        ],
        
        // Score alto (61-100)
        alto: [
            {
                icone: "🏆",
                titulo: "Você é um **candidato ideal** para automação avançada",
                descricao: "Sua empresa está preparada para implementar soluções de IA sofisticadas que podem transformar completamente suas operações."
            },
            {
                icone: "💎",
                titulo: "Potencial de **economia de 70%+** em processos",
                descricao: "Com sua infraestrutura atual, a automação pode gerar resultados excepcionais em curto prazo."
            },
            {
                icone: "🚀",
                titulo: "Pronto para **próxima geração** de automação",
                descricao: "Recomendamos soluções avançadas como IA generativa, machine learning e integração completa de sistemas."
            }
        ]
    },
    
    // Próximos passos baseados no score
    proximosPassos: {
        baixo: [
            "Documentar processos atuais",
            "Identificar gargalos operacionais", 
            "Treinar equipe em ferramentas básicas",
            "Criar roadmap de automação gradual"
        ],
        medio: [
            "Implementar automação em 2-3 processos",
            "Integrar sistemas existentes",
            "Monitorar resultados e otimizar",
            "Expandir automação progressivamente"
        ],
        alto: [
            "Implementar IA avançada",
            "Automatizar processos complexos",
            "Integrar múltiplos sistemas",
            "Otimizar continuamente"
        ]
    },
    
    // Call-to-action baseado no score
    cta: {
        baixo: {
            titulo: "Vamos Preparar Sua Empresa",
            descricao: "Comece com uma consultoria gratuita para mapear seus processos",
            botao: "Agendar Consultoria Gratuita"
        },
        medio: {
            titulo: "Implemente Sua Automação",
            descricao: "Nossa equipe pode ajudar você a automatizar seus processos em 30 dias",
            botao: "Começar Implementação"
        },
        alto: {
            titulo: "Transforme Sua Empresa com IA",
            descricao: "Vamos criar uma solução personalizada de automação avançada",
            botao: "Falar com Especialista"
        }
    },
    
    // Mensagens de score
    mensagensScore: {
        baixo: "Quase lá, falta pouco",
        medio: "Empresa Pronta para Automação", 
        alto: "Em Estágio Ideal para Automatizar"
    }
};

// Função para obter insights baseado no score
function getInsightsByScore(score) {
    if (score <= 30) {
        return {
            insights: resultadosContent.insights.baixo,
            proximosPassos: resultadosContent.proximosPassos.baixo,
            cta: resultadosContent.cta.baixo,
            mensagem: resultadosContent.mensagensScore.baixo
        };
    } else if (score <= 60) {
        return {
            insights: resultadosContent.insights.medio,
            proximosPassos: resultadosContent.proximosPassos.medio,
            cta: resultadosContent.cta.medio,
            mensagem: resultadosContent.mensagensScore.medio
        };
    } else {
        return {
            insights: resultadosContent.insights.alto,
            proximosPassos: resultadosContent.proximosPassos.alto,
            cta: resultadosContent.cta.alto,
            mensagem: resultadosContent.mensagensScore.alto
        };
    }
}
