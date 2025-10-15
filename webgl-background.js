// Efeito de brilho simples com CSS e JavaScript
function initWebGLBackground() {
    const canvas = document.getElementById('webgl-canvas');
    if (!canvas) {
        console.log('Canvas não encontrado');
        return;
    }
    
    console.log('Inicializando efeito de brilho...');
    
    // Criar gradiente animado com CSS
    canvas.style.background = `
        radial-gradient(
            circle at 50% 30%,
            rgba(139, 92, 246, 0.3) 0%,
            rgba(139, 92, 246, 0.1) 30%,
            rgba(16, 185, 129, 0.1) 60%,
            transparent 100%
        )
    `;
    
    canvas.style.animation = 'glowPulse 4s ease-in-out infinite alternate';
    
    // Adicionar keyframes via JavaScript
    const style = document.createElement('style');
    style.textContent = `
        @keyframes glowPulse {
            0% {
                background: radial-gradient(
                    circle at 50% 30%,
                    rgba(139, 92, 246, 0.2) 0%,
                    rgba(139, 92, 246, 0.05) 30%,
                    rgba(16, 185, 129, 0.05) 60%,
                    transparent 100%
                );
                transform: scale(1);
            }
            50% {
                background: radial-gradient(
                    circle at 50% 30%,
                    rgba(139, 92, 246, 0.4) 0%,
                    rgba(139, 92, 246, 0.15) 30%,
                    rgba(16, 185, 129, 0.1) 60%,
                    transparent 100%
                );
                transform: scale(1.05);
            }
            100% {
                background: radial-gradient(
                    circle at 50% 30%,
                    rgba(139, 92, 246, 0.3) 0%,
                    rgba(139, 92, 246, 0.1) 30%,
                    rgba(16, 185, 129, 0.08) 60%,
                    transparent 100%
                );
                transform: scale(1.02);
            }
        }
    `;
    document.head.appendChild(style);
    
    console.log('Efeito de brilho aplicado!');
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, inicializando efeito...');
    initWebGLBackground();
});
