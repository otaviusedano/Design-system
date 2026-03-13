# Regras de Componente para IA - Divider (Topaz Design System)

## Objetivo
Este documento define regras para agentes de IA implementarem `Divider` com fidelidade ao design system, semantica correta e consistencia visual.

Fonte de referencia:
- Figma `Design System - Topaz`, node `442:1372` (guideline de largura) e instancias de `Divider` (ex.: `446:3641`).
- Implementacao local: `src/stories/Divider.tsx` e `src/stories/Divider.css`.

## Contrato obrigatorio para IA
- Sempre usar `Divider` para separar blocos de conteudo relacionados.
- Nunca limitar largura horizontal sem necessidade funcional.
- Sempre manter `Divider` ocupando o maximo do container disponivel.
- Sempre usar semantica de separador (`role="separator"`).
- Nunca usar `Divider` como elemento apenas decorativo sem contexto visual claro.

## Estrutura obrigatoria
- Para `horizontal`:
  - container do separador,
  - linha principal (`divider-line`),
  - label opcional entre duas linhas.
- Para `vertical`:
  - container em coluna,
  - linha vertical continua (sem label).

## Especificacao visual base (Figma + DS)

### Regra principal de largura (Figma)
- Diretriz explicita: nao deixar o divider com largura limitada.
- Divider horizontal deve ocupar a largura maxima do container pai (`width: 100%`).

### Linha
- Espessura base no Figma: linha fina (aprox. `1px`).
- Cor principal: borda primaria.

### Variacoes locais implementadas
- Orientacao:
  - `horizontal`,
  - `vertical`.
- Espessura:
  - `sm` (`1px`),
  - `md` (`2px`),
  - `lg` (`3px`).
- Estilo:
  - `solid`,
  - `dashed`.
- Tom:
  - `default`,
  - `muted`,
  - `strong`.
- Alinhamento de label:
  - `start`,
  - `center`,
  - `end`.

## Estados e comportamento
- `Divider` nao tem estado interativo (nao recebe hover/focus ativo).
- Com `label`, renderizar duas linhas com texto entre elas.
- Em orientacao vertical, ignorar label e manter linha continua.

## Tokens mapeados
- `Color/Border/primary = #e0dcdc`
- `Color/Border/secondary = #9c9d9f`
- `Color/Surface/primary = #f5f6f9` (contexto de superficie)
- `Spacing/Spacing-8 = 8`
- `Spacing/Spacing-16 = 16`

Regra: priorizar aliases semanticos locais (`--border-primary`, `--border-secondary`, `--text-secondary`) e usar hex apenas como fallback.

## Acessibilidade obrigatoria
- Usar `role="separator"` no elemento raiz.
- Definir `aria-orientation` conforme orientacao (`horizontal`/`vertical`).
- Label textual deve ser curto e contextual quando presente.
- Nao usar `Divider` para substituir headings ou landmarks semanticos.

## Regras de comportamento para geracao automatica
- Em layouts de formulario/lista, usar `Divider` para separar secoes logicas.
- Evitar excesso de divisores em sequencia sem valor de escaneabilidade.
- Em componentes com limite de largura variavel, deixar o divider acompanhar 100% da area util.
- Para divisao compacta entre elementos pequenos, preferir `sm`; para destaque estrutural, `md` ou `lg`.

## Checklist de aceite
- [ ] `Divider` horizontal ocupa largura maxima do container.
- [ ] Semantica `role="separator"` aplicada.
- [ ] `aria-orientation` coerente com orientacao.
- [ ] Variacoes (`size`, `variant`, `tone`) funcionam.
- [ ] Label aparece apenas no horizontal.
- [ ] Tokens do DS utilizados.

## API recomendada
```ts
type DividerOrientation = "horizontal" | "vertical";
type DividerSize = "sm" | "md" | "lg";
type DividerVariant = "solid" | "dashed";
type DividerTone = "default" | "muted" | "strong";
type DividerAlign = "start" | "center" | "end";

type DividerProps = {
  id?: string;
  orientation?: DividerOrientation;
  size?: DividerSize;
  variant?: DividerVariant;
  tone?: DividerTone;
  label?: string;
  align?: DividerAlign;
};
```

## Decisao final para geracao por IA
Em qualquer tela gerada automaticamente, o agente deve:
1. Ler este documento antes de inserir separadores visuais.
2. Garantir `Divider` com largura fluida no container.
3. Aplicar variacoes e tokens oficiais conforme contexto.
4. Validar o checklist de aceite antes de concluir.
