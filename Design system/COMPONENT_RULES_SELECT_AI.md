# Regras de Componente para IA - Select (Topaz Design System)

## Objetivo
Este documento define regras claras para que agentes de IA implementem o componente `Select` com alta fidelidade ao Figma e consistencia de comportamento em telas geradas automaticamente.

Fonte de referencia: Figma `Design System - Topaz`, node `206:1996` e subnodes de select/input (`206:2018`, `206:2142` e estruturas `InputField` com `keyboard_arrow_down`).

## Contrato obrigatorio para IA
- Sempre renderizar o `Select` quando a tela exigir escolha entre opcoes.
- Nunca trocar `Select` por `Text input` sem instrucao explicita.
- Nunca remover o indicador visual de dropdown (seta para baixo) sem justificativa de UX.
- Nunca usar estilos hardcoded quando houver token equivalente.
- Reutilizar o componente base ao inves de criar variantes soltas por tela.

## Especificacao oficial - Select base

### Estrutura obrigatoria
- `Container` vertical do componente.
- `Label` opcional acima do campo.
- `InputField` (trigger do select).
- `Wrapper` com texto (placeholder/valor selecionado).
- `IconRight` (`keyboard_arrow_down`) para indicar expansao.
- `Helper/Error text` opcional abaixo.
- `Dropdown/Listbox` quando aberto.

### Medidas e layout (extraido do Figma)
- Altura visual do campo: `23px`
- Borda: `1px solid #141414` (estado base)
- Fundo: `#FFFFFF`
- Border radius: `2px`
- Padding horizontal: `7px`
- Padding vertical: `5px`
- Gap interno: `5px`
- Alinhamento: texto + icone alinhados ao centro no eixo vertical
- Comportamento de overflow: `clip` no conteudo interno

### Tipografia
- Label e valor seguem familia `Montserrat`.
- Valor/placeholder no campo:
  - Peso: `400` (Regular)
  - Tamanho aproximado: `9px` (escala exportada do Figma)
  - Line-height: `1.5`
- Mensagem de erro:
  - Peso: `600` (SemiBold)
  - Tamanho: `12px`
  - Line-height: `1`

## Estados de interface para IA

### `default`
- Campo fechado.
- Placeholder ou valor atual exibido.
- Seta de dropdown visivel.

### `focus/open`
- Campo em foco e lista de opcoes visivel.
- Preservar continuidade visual entre trigger e dropdown.
- Nao reposicionar dropdown para fora do contexto do campo sem necessidade.

### `filled`
- Mostrar opcao selecionada no trigger.
- Nao manter placeholder quando houver valor selecionado.

### `disabled`
- Select inativo visualmente e semanticamente.
- Nao abrir dropdown em clique/teclado.

### `error` (confirmado no Figma)
- Mensagem de erro abaixo do campo em `Color/Text/negative`.
- Textos observados:
  - `Ocorreu um erro. Tente novamente.`
  - `Campo vazio, preencha e tente novamente.`

## Tokens mapeados (usar por nome primeiro)
- `Color/Text/negative = #f01010`
- `Color/Border/secondary = #9c9d9f`
- `Color/Text/positive = #0dd829`
- `Color/Surface/primary = #f5f6f9`

Regra: preferir aliases do projeto; valores hex sao fallback.

## Regras de comportamento para geracao automatica
- Nao inventar opcoes no dropdown: usar opcoes do contexto/briefing.
- Nao converter select em radio/checkbox por conveniencia.
- Nao esconder label para "economizar espaco" quando o fluxo precisa de contexto.
- Nao usar placeholder como valor final selecionado.
- Se houver valor selecionado, garantir refletir esse estado no campo e no dropdown.

## Acessibilidade obrigatoria
- Semantica recomendada:
  - Trigger com `role="combobox"` ou botao equivalente acessivel.
  - Lista com `role="listbox"`.
  - Opcoes com `role="option"`.
- Expor estados ARIA (`aria-expanded`, `aria-selected`, `aria-invalid`) conforme contexto.
- Associar label e helper/error ao controle (`aria-labelledby` / `aria-describedby`).
- Navegacao por teclado obrigatoria:
  - abrir/fechar (`Enter`, `Space`, `Esc`);
  - navegar opcoes (setas);
  - selecionar opcao (`Enter`).
- Em estado desabilitado, usar semantica `disabled`/`aria-disabled`.

## Checklist de aceite (IA + revisao humana)
- [ ] Select esta presente e funcional na tela.
- [ ] Estrutura base (label, trigger, icone, lista, erro) foi respeitada.
- [ ] Medidas, borda, raio e paddings estao consistentes com o Figma.
- [ ] Placeholder/valor selecionado seguem regras corretas.
- [ ] Estado de erro exibe mensagem em token negativo.
- [ ] Estado desabilitado nao permite interacao.
- [ ] Semantica e navegacao por teclado estao corretas.

## Formato recomendado de API do componente
```ts
type SelectState = 'default' | 'focus' | 'filled' | 'disabled' | 'error';

type SelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

type SelectProps = {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  state?: SelectState;
  errorText?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  onOpenChange?: (open: boolean) => void;
};
```

## Decisao final para geracao por IA
Em qualquer tela gerada automaticamente, o agente deve:
1. Ler esta regra antes de criar seletores.
2. Aplicar estado correto (`default`, `open`, `filled`, `disabled`, `error`) conforme contexto.
3. Renderizar trigger + dropdown com tokens oficiais e semantica acessivel.
4. Validar o checklist de aceite antes de concluir.
