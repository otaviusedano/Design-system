# Regras de Componente para IA - Tooltip (Topaz Design System)

## Objetivo
Este documento define regras para agentes de IA implementarem `Tooltip` com fidelidade ao design system Topaz, garantindo clareza contextual e leitura rápida sem ruído visual.

Fonte de referencia:
- Figma `Design System - Topaz`, node `803:1519` e instancia de tooltip `806:7870` (referência de uso `803:7789`).
- Implementacao local: `src/stories/Tooltip.tsx` e `src/stories/tooltip.css`.

## Contrato obrigatorio para IA
- Sempre usar `Tooltip` para complementar contexto de um elemento.
- Sempre exibir mensagem explicativa/útil, nunca texto genérico sem valor.
- Sempre manter dimensão compacta e legível.
- Sempre respeitar contraste entre texto e fundo.
- Nunca usar tooltip como único canal para informação crítica.

## Regra critica de conteúdo (Figma)
- **Nunca informe um texto sem ser explicativo ou para complementar algo.**
- **Sempre adicione mensagens explicativas ou complementares.**
- Exemplos:
  - Ruim: “Apenas um botão”.
  - Bom: “Clique para abrir as opções de filtro da listagem.”

## Estrutura obrigatoria
- Container do tooltip.
- Bloco de texto (mensagem única ou curta).
- `role="tooltip"` no elemento raiz.
- Classe opcional externa para customização (`className`).

## Especificacao visual (Figma + codigo local)

### Container
- Fundo `surface/secondary`.
- Borda 1px `border/primary`.
- Raio `radius/base`.
- Sombra suave (`0 4px 6px rgba(0,0,0,0.08)`).
- Padding interno compacto (`8px 12px`).
- Largura fluida com limite (`max-width: 220px` no padrão local).

### Texto
- Tipografia `12px`, peso regular.
- Linha de 16px para legibilidade.
- Cor `text/primary`.
- Deve suportar quebra de linha para mensagens maiores.

## Variacoes e estados
- `Default`: mensagem curta.
- `TextoLongo`: mensagem maior com quebra de linha.
- Estado visual é estático no componente base; gatilho de exibição fica no elemento pai/contexto.

## Tokens mapeados
- `Color/Surface/secondary = #ffffff`
- `Color/Border/primary = #e0dcdc`
- `Color/Text/primary = #242424`
- `Radius/base = 8`
- `Number/8 = 8`
- `Number/12 = 12`
- `Spacing/base = 8`
- `Spacing/md = 12`

Observacao: o node de guideline traz cores de feedback (`Text/negative`, `Text/positive`) para explicar boas práticas de copy, não para estilização direta do tooltip base.

## Acessibilidade obrigatoria
- Usar `role="tooltip"` no conteúdo.
- Garantir associação com elemento alvo via `aria-describedby` quando aplicado no contexto.
- Tooltip deve ser legível por teclado e tecnologias assistivas no fluxo completo.
- Evitar conteúdo longo demais; manter texto objetivo.

## Regras de comportamento para geracao automatica
- Exibir tooltip apenas quando houver valor contextual real.
- Mensagem deve explicar ação, estado ou consequência.
- Limitar tamanho do texto para leitura rápida.
- Permitir wrap de linha sem overflow horizontal.
- Não substituir labels ou instruções principais por tooltip.

## Checklist de aceite
- [ ] `role="tooltip"` aplicado.
- [ ] Mensagem é explicativa/complementar (não genérica).
- [ ] Padding, borda, raio e sombra conforme padrão.
- [ ] Texto legível com quebra de linha.
- [ ] `max-width` respeitado para evitar blocos excessivos.
- [ ] Uso com `aria-describedby` previsto no contexto de tela.

## API recomendada
```ts
type TooltipProps = {
  message?: string;
  className?: string;
};
```

## Decisao final para geracao por IA
Em qualquer tela gerada automaticamente, o agente deve:
1. Usar tooltip apenas para complementar informação.
2. Escrever mensagens objetivas e acionáveis.
3. Manter o padrão visual compacto do DS Topaz.
4. Validar o checklist antes da entrega.
