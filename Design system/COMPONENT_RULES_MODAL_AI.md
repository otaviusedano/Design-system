# Regras de Componente para IA - Modal (Topaz Design System)

## Objetivo
Este documento define regras para agentes de IA implementarem `Modal` com fidelidade ao design system, semantica correta e acessibilidade.

Fonte de referencia:
- Figma `Design System - Topaz`, node `395:1391` e variacoes de modal (ex.: `419:3600`, `419:4652`, `422:5319`).
- Implementacao local: `src/stories/Modal.tsx` e `src/stories/Modal.css`.

## Contrato obrigatorio para IA
- Sempre usar `Modal` para foco em tarefa/contexto que exige interrupcao temporaria.
- Sempre renderizar `overlay` cobrindo toda a viewport.
- Sempre manter hierarquia: cabecalho -> corpo -> acoes.
- Sempre permitir fechamento por botao de fechar quando `showClose=true`.
- Nunca quebrar semantica de dialogo (`role="dialog"` e `aria-modal="true"`).

## Estrutura obrigatoria
- `overlay` de fundo (escurecimento + blur).
- `panel` principal com borda, raio e sombra.
- Cabecalho com:
  - titulo (obrigatorio),
  - descricao (opcional),
  - botao de fechar (opcional).
- Ilustracao/icone opcional em tamanhos maiores.
- Corpo com conteudo da tarefa.
- Rodape com grupo de acoes (ghost, outlined, primary conforme contexto).

## Especificacao visual base (Figma + DS)

### Overlay
- Posicao fixa em tela inteira (`inset: 0`).
- Fundo translúcido (ex.: `rgba(98, 98, 149, 0.4)`).
- Blur de fundo (ex.: `backdrop-filter: blur(20px)`).

### Painel
- Fundo: `Color/Surface/secondary` (`#ffffff`).
- Borda: `1px` em `Color/Border/primary`.
- Radius: `8px` (referencia local).
- Sombra leve (`0 4px 12px rgba(0,0,0,0.12)`).
- Layout interno em coluna com espacamento consistente.

### Tamanhos (observado + implementacao local)
- `sm`: foco em confirmacao curta (sem ilustracao obrigatoria).
- `md`: fluxo padrao com area de conteudo.
- `lg`: conteudo mais denso.
- `xl`: cenarios amplos (ex.: formularios/confirmacoes com grande area).

Mapeamento local de largura:
- `sm`: `512px`
- `md`: `640px`
- `lg`: `840px`
- `xl`: `1080px`

### Tipografia
- Titulo:
  - peso forte (`700`),
  - tamanho de destaque (aprox. `24px` no codigo local).
- Descricao:
  - tom secundario,
  - leitura de suporte.

### Acoes
- Grupo alinhado a direita.
- Possiveis variacoes:
  - `ghost` (texto neutro),
  - `outlined` (borda highlight),
  - `primary` (fundo highlight com texto invertido).

## Variacoes funcionais observadas
- Modal completo com ilustracao + conteudo + 3 botoes.
- Modal compacto de confirmacao com 2 botoes (`Cancelar`/acao primaria).
- Modal de acao irreversivel com descricao de risco.

Regra: IA deve selecionar variacao conforme criticidade da acao e quantidade de contexto necessario.

## Tokens mapeados
- `Color/Surface/secondary = #ffffff`
- `Color/Surface/primary = #f5f6f9`
- `Color/Surface/highlight = #1e1e68`
- `Color/Border/primary = #e0dcdc`
- `Color/Border/secondary = #9c9d9f`
- `Color/Border/highlight = #1e1e68`
- `Color/Text/primary = #242424`
- `Color/Text/secondary = #707070`
- `Color/Text/highlight = #1e1e68`
- `Color/Text/invert = #ffffff`
- `Color/Icon/secondary = #9c9d9f`
- `Spacing/base = 8`
- `Spacing/md = 12`
- `Spacing/lg = 16`

Regra: usar os aliases semanticos do projeto (`--surface-primary`, `--border-secondary`, `--text-highlight`, etc.) antes de qualquer valor fixo.

## Acessibilidade obrigatoria
- Container do modal com:
  - `role="dialog"`,
  - `aria-modal="true"`,
  - `aria-labelledby` apontando para o titulo.
- Quando houver descricao, usar `aria-describedby`.
- Fechar por teclado com `Escape` quando habilitado.
- Fechar por clique no overlay somente quando configurado (`closeOnOverlay`).
- Botao de fechar com `aria-label` claro (ex.: `Fechar`).
- Garantir foco inicial dentro do modal e navegacao por Tab nos elementos interativos.

## Regras de comportamento para geracao automatica
- Exibir modal somente quando `open=true`.
- Em fluxo destrutivo, usar texto explicito de irreversibilidade.
- Nao usar modal para mensagens simples que cabem em toast.
- Nao remover opcao de cancelamento em cenarios sensiveis.
- Garantir callback de fechamento unico (`onClose`) para ESC, overlay e botao fechar.

## Checklist de aceite
- [ ] Overlay e painel renderizados corretamente.
- [ ] Semantica de dialogo e atributos ARIA aplicados.
- [ ] Titulo e descricao exibidos conforme props.
- [ ] Acoes no rodape renderizadas com variacoes corretas.
- [ ] Fechamento por `Esc`, overlay e botao (quando habilitados).
- [ ] Responsividade por tamanho (`sm`, `md`, `lg`, `xl`) validada.
- [ ] Tokens do DS utilizados.

## API recomendada
```ts
type ModalSize = "sm" | "md" | "lg" | "xl";

type ModalAction = {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
};

type ModalProps = {
  id?: string;
  open?: boolean;
  size?: ModalSize;
  title: string;
  description?: string;
  showIllustration?: boolean;
  showGhostButton?: boolean;
  illustration?: React.ReactNode;
  children?: React.ReactNode;
  ghostAction?: ModalAction;
  outlinedAction?: ModalAction;
  primaryAction?: ModalAction;
  showClose?: boolean;
  closeLabel?: string;
  closeOnOverlay?: boolean;
  closeOnEsc?: boolean;
  onClose?: () => void;
};
```

## Decisao final para geracao por IA
Em qualquer tela gerada automaticamente, o agente deve:
1. Ler este documento antes de criar interacoes bloqueantes.
2. Implementar modal com estrutura, estados e acessibilidade completos.
3. Escolher variacao de tamanho e acoes conforme contexto da tarefa.
4. Validar o checklist de aceite antes de concluir.
