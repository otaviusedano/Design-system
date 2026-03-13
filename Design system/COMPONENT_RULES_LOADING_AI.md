# Regras de Componente para IA - Loading (Topaz Design System)

## Objetivo
Este documento define regras para agentes de IA implementarem `Loading` com fidelidade ao design system, feedback de espera claro e sem bloquear acessibilidade.

Fonte de referencia:
- Figma `Design System - Topaz`, node `506:4969` (contexto) e componente `Loading` em `516:972`.
- Implementacao local: `src/stories/Loading.tsx` e `src/stories/loading.css`.

## Contrato obrigatorio para IA
- Sempre usar `Loading` para indicar processamento/espera de dados.
- Sempre centralizar o spinner na area de carregamento.
- Sempre manter contraste visual suficiente entre overlay e spinner.
- Nunca deixar o estado de loading sem indicacao visual.
- Nunca manter loading ativo apos finalizacao do processo.

## Estrutura obrigatoria
- Container de loading (overlay ou area dedicada).
- Spinner circular animado no centro.
- Mensagem acessivel opcional de carregamento (quando necessario no contexto).

## Especificacao visual base (Figma + DS)

### Overlay / container
- Ocupa toda a area alvo (na story local: fullscreen).
- Fundo translúcido suave observado:
  - `rgba(98, 98, 149, 0.1)`.
- Conteudo centralizado horizontal e verticalmente.

### Spinner
- Tamanho observado: `100px`.
- Formato circular.
- Cor principal em tom highlight.
- Segmento aberto (spinner incompleto) com rotacao continua.
- Duracao de animacao local aproximada: `0.9s linear infinite`.

### Variacoes observadas
- Figma indica propriedade de spinner com variantes:
  - `Padrão`,
  - `Variante 2`,
  - `Variante 3`.
- Regra: manter comportamento principal consistente entre variantes (giro/ciclo/contraste).

## Tokens mapeados
- `Color/Text/highlight = #1e1e68` (cor base do spinner)
- Fundo observado de loading: `rgba(98, 98, 149, 0.1)` (sem token direto retornado)

Regra: priorizar token semantico para cor do spinner (`text-highlight`/`icon-highlight`) quando disponivel no projeto.

## Acessibilidade obrigatoria
- Spinner deve ter nome acessivel (`aria-label="Carregando"` ou equivalente).
- Quando loading bloquear toda a tela, expor status para tecnologia assistiva:
  - `role="status"` e/ou `aria-live="polite"` em container textual auxiliar.
- Evitar anunciar mensagens repetidas em loop.
- Nao usar apenas cor para indicar estado (pode haver texto auxiliar em fluxos criticos).

## Regras de comportamento para geracao automatica
- Ativar loading no inicio da operacao assincrona.
- Desativar loading imediatamente ao concluir/sucesso/erro.
- Para loading de secao, limitar overlay ao container da secao.
- Para loading global, usar fullscreen com bloqueio visual coerente.
- Evitar "flicker": nao exibir loading por intervalos muito curtos sem necessidade.

## Checklist de aceite
- [ ] Spinner centralizado e animado corretamente.
- [ ] Overlay/area de loading aplicado ao escopo correto.
- [ ] Cor e contraste em conformidade com DS.
- [ ] Nome acessivel (`aria-label`) presente.
- [ ] Estado de loading entra e sai no momento correto.
- [ ] Tokens/aliases do projeto aplicados quando disponiveis.

## API recomendada
```ts
type LoadingProps = {
  className?: string;
};
```

## Decisao final para geracao por IA
Em qualquer tela gerada automaticamente, o agente deve:
1. Ler este documento antes de adicionar feedback de espera.
2. Implementar `Loading` com overlay apropriado e spinner central.
3. Garantir acessibilidade minima e controle correto de ciclo.
4. Validar o checklist de aceite antes de concluir.
