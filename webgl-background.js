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
    
    // Adicionar keyframes mais visíveis
    const style = document.createElement('style');
    style.textContent = `
        @keyframes glowPulse {
            0% {
                background: radial-gradient(
                    circle at 50% 30%,
                    rgba(139, 92, 246, 0.4) 0%,
                    rgba(139, 92, 246, 0.2) 30%,
                    rgba(16, 185, 129, 0.15) 60%,
                    transparent 100%
                );
                transform: scale(1);
            }
            50% {
                background: radial-gradient(
                    circle at 50% 30%,
                    rgba(139, 92, 246, 0.8) 0%,
                    rgba(139, 92, 246, 0.4) 30%,
                    rgba(16, 185, 129, 0.3) 60%,
                    transparent 100%
                );
                transform: scale(1.1);
            }
            100% {
                background: radial-gradient(
                    circle at 50% 30%,
                    rgba(139, 92, 246, 0.6) 0%,
                    rgba(139, 92, 246, 0.3) 30%,
                    rgba(16, 185, 129, 0.2) 60%,
                    transparent 100%
                );
                transform: scale(1.05);
            }
        }
    `;
    document.head.appendChild(style);
    
    finalCanvas.style.animation = 'glowPulse 3s ease-in-out infinite alternate';
    
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
