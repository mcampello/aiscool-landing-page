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
    const content = getInsightsByScore(score);
    return content.insights.map(insight => 
        `${insight.icone} <strong>${insight.titulo}</strong> ${insight.descricao}`
    );
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
        console.log('📤 Enviando dados para webhook:', payload);
        
        const response = await fetch('https://campello.app.n8n.cloud/webhook/876255b7-2665-4139-85c0-9f0d6502db88', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        
        console.log('📡 Resposta do webhook:', response.status, response.statusText);
        
        if (!response.ok) {
            throw new Error(`Webhook error: ${response.status}`);
        }
        
        console.log('✅ Dados enviados com sucesso para o webhook');
        return true;
    } catch (error) {
        console.error('❌ Erro ao enviar lead:', error);
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
    
    // Redirecionar para página de resultados com score
    const resultsUrl = `results-page.html?score=${score}&name=${encodeURIComponent(formData.get('nome') || '')}&email=${encodeURIComponent(formData.get('email') || '')}`;
    window.location.href = resultsUrl;
    
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
    
});



// Função para rolar até o quiz
function scrollToQuiz() {
    document.getElementById('quiz').scrollIntoView({ behavior: 'smooth' });
}


