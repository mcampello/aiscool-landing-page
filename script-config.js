// Script para aplicar configurações dinâmicas na homepage
(function() {
    'use strict';
    
    // Carregar configurações salvas
    function loadConfig() {
        const saved = localStorage.getItem('aiscool-config');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (error) {
                console.error('Erro ao carregar configurações:', error);
                return null;
            }
        }
        return null;
    }
    
    // Aplicar configurações na homepage
    function applyConfig(config) {
        if (!config) return;
        
        // Criar ou atualizar elemento de estilo dinâmico
        let styleElement = document.getElementById('dynamic-styles');
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = 'dynamic-styles';
            document.head.appendChild(styleElement);
        }
        
        // CSS dinâmico baseado nas configurações
        const css = `
            .hero-title {
                font-family: '${config.heroFont}', sans-serif !important;
                font-weight: ${config.heroWeight} !important;
                font-size: ${config.heroSize}rem !important;
                letter-spacing: ${config.letterSpacing}em !important;
                line-height: ${config.lineHeight} !important;
            }
            
            .gradient-text {
                background: linear-gradient(135deg, ${config.primaryColor} 0%, ${config.secondaryColor} 100%) !important;
                -webkit-background-clip: text !important;
                -webkit-text-fill-color: transparent !important;
                background-clip: text !important;
            }
            
            .italic-text {
                font-family: '${config.italicFont}', serif !important;
                font-weight: ${config.italicWeight} !important;
                font-size: ${config.italicSize}em !important;
                color: ${config.italicColor} !important;
                letter-spacing: 0.01em !important;
            }
            
            .hero-description {
                color: ${config.textSecondary} !important;
            }
            
            .hero-badge {
                color: ${config.textSecondary} !important;
            }
            
            .nav-link {
                color: ${config.textSecondary} !important;
            }
            
            .nav-link:hover {
                color: ${config.textPrimary} !important;
            }
            
            .cta-button {
                background: linear-gradient(135deg, ${config.primaryColor} 0%, ${config.secondaryColor} 100%) !important;
            }
            
            .btn-header {
                background: linear-gradient(135deg, ${config.primaryColor} 0%, ${config.secondaryColor} 100%) !important;
            }
        `;
        
        styleElement.textContent = css;
    }
    
    // Aplicar configurações quando a página carregar
    document.addEventListener('DOMContentLoaded', function() {
        const config = loadConfig();
        if (config) {
            applyConfig(config);
        }
    });
    
    // Função para aplicar configurações via console (para testes)
    window.applyAiscoolConfig = function(config) {
        applyConfig(config);
    };
    
    // Função para resetar configurações
    window.resetAiscoolConfig = function() {
        localStorage.removeItem('aiscool-config');
        const styleElement = document.getElementById('dynamic-styles');
        if (styleElement) {
            styleElement.remove();
        }
        location.reload();
    };
    
})();
