// Efeito de brilho simples com CSS e JavaScript
function initWebGLBackground() {
    console.log('🔍 Procurando canvas...');
    const canvas = document.getElementById('webgl-canvas');
    
    if (!canvas) {
        console.error('❌ Canvas não encontrado! Verificando elementos...');
        const hero = document.querySelector('.hero');
        console.log('Hero encontrado:', hero);
        
        // Criar canvas se não existir
        const newCanvas = document.createElement('canvas');
        newCanvas.id = 'webgl-canvas';
        newCanvas.className = 'webgl-background';
        
        if (hero) {
            hero.appendChild(newCanvas);
            console.log('✅ Canvas criado e adicionado ao hero');
        } else {
            console.error('❌ Hero não encontrado');
            return;
        }
    } else {
        console.log('✅ Canvas encontrado:', canvas);
    }
    
    const finalCanvas = document.getElementById('webgl-canvas');
    console.log('🎨 Aplicando efeito de brilho...');
    
    // Forçar estilos visíveis
    finalCanvas.style.position = 'absolute';
    finalCanvas.style.top = '0';
    finalCanvas.style.left = '0';
    finalCanvas.style.width = '100%';
    finalCanvas.style.height = '100%';
    finalCanvas.style.pointerEvents = 'none';
    finalCanvas.style.zIndex = '1';
    finalCanvas.style.opacity = '0.6';
    
    // Gradiente mais visível
    finalCanvas.style.background = `
        radial-gradient(
            circle at 50% 30%,
            rgba(139, 92, 246, 0.6) 0%,
            rgba(139, 92, 246, 0.3) 30%,
            rgba(16, 185, 129, 0.2) 60%,
            transparent 100%
        )
    `;
    
    // Adicionar keyframes suaves e orgânicos
    const style = document.createElement('style');
    style.textContent = `
        @keyframes glowPulse {
            0% {
                background: radial-gradient(
                    circle at 50% 30%,
                    rgba(139, 92, 246, 0.3) 0%,
                    rgba(139, 92, 246, 0.15) 30%,
                    rgba(16, 185, 129, 0.1) 60%,
                    transparent 100%
                );
                transform: scale(1) translateY(0px);
            }
            25% {
                background: radial-gradient(
                    circle at 48% 32%,
                    rgba(139, 92, 246, 0.4) 0%,
                    rgba(139, 92, 246, 0.2) 30%,
                    rgba(16, 185, 129, 0.15) 60%,
                    transparent 100%
                );
                transform: scale(1.02) translateY(-2px);
            }
            50% {
                background: radial-gradient(
                    circle at 52% 28%,
                    rgba(139, 92, 246, 0.5) 0%,
                    rgba(139, 92, 246, 0.25) 30%,
                    rgba(16, 185, 129, 0.2) 60%,
                    transparent 100%
                );
                transform: scale(1.03) translateY(-1px);
            }
            75% {
                background: radial-gradient(
                    circle at 49% 31%,
                    rgba(139, 92, 246, 0.4) 0%,
                    rgba(139, 92, 246, 0.2) 30%,
                    rgba(16, 185, 129, 0.15) 60%,
                    transparent 100%
                );
                transform: scale(1.01) translateY(-1px);
            }
            100% {
                background: radial-gradient(
                    circle at 51% 29%,
                    rgba(139, 92, 246, 0.35) 0%,
                    rgba(139, 92, 246, 0.18) 30%,
                    rgba(16, 185, 129, 0.12) 60%,
                    transparent 100%
                );
                transform: scale(1.01) translateY(0px);
            }
        }
    `;
    document.head.appendChild(style);
    
    finalCanvas.style.animation = 'glowPulse 8s ease-in-out infinite';
    
    console.log('✅ Efeito de brilho aplicado com sucesso!');
    console.log('Canvas final:', finalCanvas);
    console.log('Estilos aplicados:', finalCanvas.style.cssText);
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM carregado, inicializando efeito...');
    setTimeout(() => {
        initWebGLBackground();
    }, 100);
});
