// Estado do quiz
let currentQuestionIndex = 1;
const totalQuestions = 15;

// Função para rolar até o quiz
function scrollToQuiz() {
    document.getElementById('quiz').scrollIntoView({ behavior: 'smooth' });
}

// Função para mudar de questão
function changeQuestion(direction) {
    const currentBlock = document.querySelector('.question-block.active');
    
    // Validar campos obrigatórios antes de avançar
    if (direction === 1) {
        const inputs = currentBlock.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (input.type === 'radio') {
                const radioGroup = currentBlock.querySelectorAll(`input[name="${input.name}"]`);
                const isChecked = Array.from(radioGroup).some(radio => radio.checked);
                if (!isChecked) {
                    isValid = false;
                }
            } else if (input.type === 'text' || input.type === 'email' || input.type === 'tel') {
                if (!input.value.trim()) {
                    isValid = false;
                }
            }
        });
        
        if (!isValid) {
            // Destacar campos não preenchidos com borda vermelha
            inputs.forEach(input => {
                if (input.type === 'radio') {
                    const radioGroup = currentBlock.querySelectorAll(`input[name="${input.name}"]`);
                    const isChecked = Array.from(radioGroup).some(radio => radio.checked);
                    if (!isChecked) {
                        radioGroup.forEach(radio => {
                            radio.style.border = '2px solid #ef4444';
                            radio.style.borderRadius = '4px';
                        });
                    }
                } else if (input.type === 'text' || input.type === 'email' || input.type === 'tel') {
                    if (!input.value.trim()) {
                        input.style.border = '2px solid #ef4444';
                    }
                }
            });
            
            // Remover bordas vermelhas após 3 segundos
            setTimeout(() => {
                inputs.forEach(input => {
                    if (input.type === 'radio') {
                        const radioGroup = currentBlock.querySelectorAll(`input[name="${input.name}"]`);
                        radioGroup.forEach(radio => {
                            radio.style.border = '';
                            radio.style.borderRadius = '';
                        });
                    } else {
                        input.style.border = '';
                    }
                });
            }, 3000);
            
            return;
        }
    }
    
    // Atualizar índice
    currentQuestionIndex += direction;
    
    // Limites
    if (currentQuestionIndex < 1) currentQuestionIndex = 1;
    if (currentQuestionIndex > totalQuestions) currentQuestionIndex = totalQuestions;
    
    // Atualizar visualização
    document.querySelectorAll('.question-block').forEach(block => {
        block.classList.remove('active');
    });
    
    const nextBlock = document.querySelector(`.question-block[data-question="${currentQuestionIndex}"]`);
    if (nextBlock) {
        nextBlock.classList.add('active');
    }
    
    // Scroll para o topo do formulário
    const quizSection = document.getElementById('quiz');
    if (quizSection) {
        quizSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Atualizar barra de progresso
    const progress = (currentQuestionIndex / totalQuestions) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('currentQuestion').textContent = currentQuestionIndex;
    
    // Atualizar botões
    document.getElementById('prevBtn').disabled = currentQuestionIndex === 1;
    
    if (currentQuestionIndex === totalQuestions) {
        document.getElementById('nextBtn').style.display = 'none';
        document.getElementById('submitBtn').style.display = 'block';
    } else {
        document.getElementById('nextBtn').style.display = 'block';
        document.getElementById('submitBtn').style.display = 'none';
    }
    
    // Rolar para o topo do quiz
    document.getElementById('quiz').scrollIntoView({ behavior: 'smooth' });
}

// Função para calcular pontuação
function calculateScore(formData) {
    let score = 0;
    
    // Melhores práticas (q1-q5, q11-q14)
    const bestPractices = ['q1', 'q2', 'q3', 'q4', 'q11', 'q13'];
    bestPractices.forEach(q => {
        if (formData.get(q) === 'sim') score += 10;
        else if (formData.get(q) === 'parcialmente') score += 5;
    });
    
    // Questão q5 (inversa)
    if (formData.get('q5') === 'nao') score += 10;
    else if (formData.get('q5') === 'nao_sei') score += 5;
    
    // Questão q12 (ferramentas)
    if (formData.get('q12') === '1-3') score += 10;
    else if (formData.get('q12') === '4-7') score += 5;
    
    return Math.min(score, 100);
}

// Função para gerar insights personalizados
function generateInsights(formData, score) {
    const insights = [];
    
    // Insight 1: Baseado no resultado desejado
    const resultadoDesejado = formData.get('q7');
    let insight1 = '';
    if (resultadoDesejado === 'reduzir_tempo') {
        insight1 = '🎯 <strong>Seu foco principal é reduzir o tempo de processamento.</strong> Identificamos que sua maior oportunidade está na automação de fluxos de trabalho repetitivos, que pode liberar até 30% do tempo da sua equipe.';
    } else if (resultadoDesejado === 'precisao_consultas') {
        insight1 = '🎯 <strong>Você busca melhorar a precisão e velocidade das consultas.</strong> A implementação de um sistema de acesso inteligente a dados pode reduzir em até 80% o tempo gasto em pesquisas manuais.';
    } else {
        insight1 = '🎯 <strong>Você quer automatizar o atendimento via WhatsApp.</strong> Um agente conversacional bem implementado pode resolver até 70% das dúvidas dos clientes automaticamente, liberando sua equipe para casos mais complexos.';
    }
    insights.push(insight1);
    
    // Insight 2: Baseado no obstáculo
    const obstaculo = formData.get('q8');
    let insight2 = '';
    if (obstaculo === 'tentativas_falharam') {
        insight2 = '⚠️ <strong>Você já tentou automação antes sem sucesso.</strong> Nossa análise mostra que 85% das falhas ocorrem por falta de mapeamento adequado dos processos. Começar com uma documentação clara é fundamental.';
    } else if (obstaculo === 'falta_integracao') {
        insight2 = '⚠️ <strong>A integração entre sistemas é seu maior desafio.</strong> Sistemas legados podem ser integrados através de APIs modernas e middleware, sem necessidade de substituição completa.';
    } else {
        insight2 = '⚠️ <strong>Você precisa de ajuda para priorizar processos.</strong> Recomendamos começar pelo processo com maior volume de repetição e menor complexidade de decisão - geralmente oferece o melhor ROI inicial.';
    }
    insights.push(insight2);
    
    // Insight 3: Baseado na pontuação e documentação
    const documentacao = formData.get('q1');
    let insight3 = '';
    if (score >= 70) {
        insight3 = '✅ <strong>Sua empresa tem uma base sólida para automação.</strong> Com pontuação de ' + score + '/100, você está pronto para implementar soluções avançadas de IA com alto potencial de sucesso.';
    } else if (score >= 40) {
        insight3 = '📊 <strong>Sua empresa tem potencial, mas precisa de preparação.</strong> Com pontuação de ' + score + '/100, recomendamos começar documentando e padronizando processos antes da automação completa.';
    } else {
        insight3 = '🔧 <strong>Há trabalho de base a ser feito.</strong> Com pontuação de ' + score + '/100, o primeiro passo é mapear e documentar seus processos atuais para criar uma fundação sólida.';
    }
    insights.push(insight3);
    
    return insights;
}

// Função para gerar próximos passos
function generateNextSteps(formData, score) {
    const solucao = formData.get('q9');
    let nextSteps = '';
    
    if (solucao === 'implementacao_completa' && score >= 50) {
        nextSteps = '<strong>🚀 Você está qualificado para uma implementação completa!</strong><br><br>' +
                   'Baseado no seu perfil e necessidades, recomendamos agendar uma reunião individual para:<br>' +
                   '• Mapear em detalhes o processo que você deseja automatizar<br>' +
                   '• Apresentar casos de sucesso similares ao seu<br>' +
                   '• Elaborar uma proposta customizada com ROI projetado<br><br>' +
                   '<strong>Próximo passo:</strong> Entre em contato para agendar sua consultoria estratégica gratuita.';
    } else if ((solucao === 'consultoria' || solucao === 'implementacao_completa') && score >= 30) {
        nextSteps = '<strong>📚 Recomendamos começar com capacitação!</strong><br><br>' +
                   'Seu perfil indica que você se beneficiaria de um programa estruturado:<br>' +
                   '• Participe do nosso webinar "Como Otimizar Fluxos de Trabalho em Empresas de Serviços"<br>' +
                   '• Receba um guia completo de mapeamento de processos<br>' +
                   '• Acesse nossa biblioteca de casos de sucesso<br><br>' +
                   '<strong>Próximo passo:</strong> Inscreva-se no próximo webinar ou solicite acesso ao material educativo.';
    } else {
        nextSteps = '<strong>📖 Comece com os fundamentos!</strong><br><br>' +
                   'Para maximizar o sucesso da automação, recomendamos:<br>' +
                   '• Baixe nosso guia gratuito "Primeiros Passos na Automação Operacional"<br>' +
                   '• Assista aos vídeos tutoriais sobre mapeamento de processos<br>' +
                   '• Utilize nossos templates de documentação de fluxos de trabalho<br><br>' +
                   '<strong>Próximo passo:</strong> Acesse nosso centro de recursos gratuitos e comece a preparar sua empresa.';
    }
    
    return nextSteps;
}

// Mapeamento de campos para nomes descritivos
function transformPayload(formData, score) {
    const data = Object.fromEntries(formData);
    
    return {
        // Informações de contato
        nome: data.nome,
        email: data.email,
        whatsapp: data.whatsapp,
        
        // Melhores práticas
        fluxos_documentados: data.q1,
        mede_tempo_tarefas: data.q2,
        regras_triagem: data.q3,
        integracao_chat: data.q4,
        validacao_manual_dados: data.q5,
        
        // Qualificação
        situacao_atual: data.q6,
        resultado_desejado_90_dias: data.q7,
        obstaculo_principal: data.q8,
        tipo_solucao: data.q9,
        observacoes_adicionais: data.q10 || '',
        
        // Práticas adicionais
        base_conhecimento: data.q11,
        quantidade_ferramentas: data.q12,
        metricas_performance: data.q13,
        tamanho_equipe: data.q14,
        
        // Metadata
        score: score,
        timestamp: new Date().toISOString()
    };
}

// Função para enviar dados ao webhook
async function sendToWebhook(formData, score) {
    try {
        const payload = transformPayload(formData, score);
        
        const response = await fetch('https://campello.app.n8n.cloud/webhook/876255b7-2665-4139-85c0-9f0d6502db88', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            throw new Error(`Webhook error: ${response.status}`);
        }
        
        return true;
    } catch (error) {
        console.error('Erro ao enviar lead:', error);
        return false;
    }
}

// Função para exibir resultados
function displayResults(formData) {
    const score = calculateScore(formData);
    const insights = generateInsights(formData, score);
    const nextSteps = generateNextSteps(formData, score);
    
    // Determinar status
    let status = '';
    if (score >= 70) {
        status = 'Excelente! Você tem fortes fundamentos operacionais.';
    } else if (score >= 40) {
        status = 'Bom potencial! Algumas melhorias são necessárias.';
    } else {
        status = 'Oportunidade de crescimento! Vamos construir a base juntos.';
    }
    
    // Atualizar DOM
    document.getElementById('scoreNumber').textContent = score;
    document.getElementById('scoreStatus').textContent = status;
    
    document.getElementById('insight1').innerHTML = insights[0];
    document.getElementById('insight2').innerHTML = insights[1];
    document.getElementById('insight3').innerHTML = insights[2];
    
    document.getElementById('nextSteps').innerHTML = nextSteps;
    
    // Esconder quiz e mostrar resultados
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    
    // Rolar para resultados
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
    
    // Enviar dados ao webhook de forma assíncrona (não bloqueia a UX)
    sendToWebhook(formData, score);
}

// Event listener para o formulário
document.getElementById('quizForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.innerHTML;
    
    // Mostrar loading
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="animation: spin 1s linear infinite;"><circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2" stroke-dasharray="50" stroke-linecap="round" fill="none"/></svg> Processando...';
    
    // Adicionar CSS de animação se não existir
    if (!document.getElementById('spinnerStyle')) {
        const style = document.createElement('style');
        style.id = 'spinnerStyle';
        style.textContent = '@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }';
        document.head.appendChild(style);
    }
    
    // Aguardar um pouco para dar tempo do loading aparecer
    setTimeout(() => {
        const formData = new FormData(this);
        displayResults(formData);
        
        // Restaurar botão (caso usuário volte)
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }, 500);
}.bind(document.getElementById('quizForm')));

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('prevBtn').disabled = true;
    document.getElementById('currentQuestion').textContent = currentQuestionIndex;
    document.getElementById('totalQuestions').textContent = totalQuestions;
    
    // Máscara para WhatsApp
    const whatsappField = document.querySelector('input[name="whatsapp"]');
    if (whatsappField) {
        whatsappField.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
            
            if (value.length > 0) {
                if (value.length <= 2) {
                    value = `(${value}`;
                } else if (value.length <= 7) {
                    value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
                } else if (value.length <= 11) {
                    value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
                } else {
                    value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
                }
            }
            
            e.target.value = value;
        });
    }
    
    // Criar partículas saindo da fonte de luz
    createFloatingParticles();
});

// Função para criar partículas flutuantes
function createFloatingParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 40;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Posição aleatória na parte inferior com alturas diferentes
        particle.style.left = (Math.random() * 100) + '%';
        const startHeight = Math.random() * 60 + 10; // 10px a 70px do fundo
        particle.style.bottom = startHeight + 'px';
        
        // Start Y para animação (altura inicial)
        particle.style.setProperty('--start-y', '0px');
        
        // Drift aleatório para movimento lateral mais suave
        const drift = (Math.random() - 0.5) * 80;
        particle.style.setProperty('--drift', drift + 'px');
        
        // Delay aleatório mais espalhado para movimento orgânico
        const delay = Math.random() * 15 + 2; // 2s a 17s
        particle.style.animationDelay = delay + 's';
        
        // Duração aleatória para cada partícula
        const duration = Math.random() * 4 + 6; // 6s a 10s
        particle.style.animationDuration = duration + 's';
        
        particlesContainer.appendChild(particle);
    }
}


// Função para rolar até o quiz
function scrollToQuiz() {
    document.getElementById('quiz').scrollIntoView({ behavior: 'smooth' });
}


