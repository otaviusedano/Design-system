# Regras de Componente para IA - Text Input (Topaz Design System)

## Objetivo
Este documento define regras objetivas para agentes de IA criarem `Text input` com fidelidade ao Figma, consistencia visual e comportamento previsivel.

Fonte de referencia: Figma `Design System - Topaz`, node `192:450` e subnodes de input (`192:536`, `192:660`, `192:1980`, `192:2197`).

## Contrato obrigatorio para IA
- Sempre renderizar o campo em tela quando houver entrada de dados no layout.
- Nunca substituir `Text input` por texto estatico.
- Nunca usar valor hardcoded se houver token equivalente no projeto.
- Nunca alterar altura interna, paddings, borda e raio sem necessidade real de responsividade.
- Reutilizar componente base (nao criar um input novo por tela).

## Especificacao oficial - Text Input base

### Estrutura obrigatoria
- `Container` do componente (stack vertical).
- `Label` (quando aplicavel).
- `InputField` (area clicavel/editavel).
- `Wrapper` de conteudo interno.
- `Helper/Error text` opcional abaixo do campo.

### Medidas e layout (extraido do Figma)
- Altura visual do `InputField`: `23px`
- Border: `1px solid #141414`
- Background: `#FFFFFF`
- Border radius: `2px`
- Padding horizontal: `7px`
- Padding vertical: `5px`
- Gap interno (conteudo do campo): `5px`
- Alinhamento vertical: centralizado
- Overflow: recortar conteudo excedente (clip)

### Tipografia
- Valor digitado/placeholder:
  - Familia: `Montserrat`
  - Peso: `400` (Regular)
  - Tamanho: `9px`
  - Line-height: `1.5`
- Mensagem de erro:
  - Familia: `Montserrat`
  - Peso: `600` (SemiBold)
  - Tamanho: `12px`
  - Line-height: `1`

## Estados de interface para IA

### `default`
- Fundo branco.
- Borda padrao.
- Sem mensagem de erro visivel.

### `error` (confirmado no Figma)
- Mensagem abaixo do campo em vermelho.
- Texto de erro observado:
  - `Ocorreu um erro. Tente novamente.`
  - `Campo vazio, preencha e tente novamente.`
- Cor de erro: `Color/Text/negative`.

### `focus`, `filled`, `disabled`, `success`
- Manter como estados suportados no componente.
- Se o Figma da tela nao explicitar o estado, nao inventar mudancas agressivas.
- Em `success`, usar token positivo apenas para feedback textual/semantico.
- Em `disabled`, preservar semantica desabilitada (nao apenas estilo).

## Tokens mapeados (usar por nome primeiro)
- `Color/Text/negative = #f01010`
- `Color/Border/secondary = #9c9d9f`
- `Color/Text/positive = #0dd829`
- `Color/Surface/primary = #f5f6f9`

Regra: se existir alias local no projeto, usar alias local. Hexadecimal e fallback.

## Variacoes funcionais (quando o projeto usar)
Padrao observado no design system/codigo do projeto:
- `Default`
- `Price`
- `Percent`
- `Range`
- `Text area`

Regra para IA: variacao e intencao de negocio, nao estilo arbitrario. Nao trocar variacao por suposicao.

## Acessibilidade obrigatoria
- Usar controle semantico de formulario (`input`/`textarea`) com `label` associado.
- Expor `aria-invalid=true` em estado de erro.
- Vincular helper/error com `aria-describedby`.
- Nao remover indicador de foco sem alternativa visual equivalente.
- Respeitar contraste minimo AA em texto e estados.
- Em estado desabilitado, usar atributo `disabled`.

## Regras de comportamento para geracao automatica
- Nao apagar label/helper para "limpar layout".
- Nao converter mensagem de erro em tooltip.
- Nao mover erro para fora do bloco do campo.
- Em formularios, manter alinhamento vertical entre campos equivalentes.
- Se houver icone interno, ele e opcional e deve respeitar o espacamento do campo.

## Checklist de aceite (IA + revisao humana)
- [ ] Campo existe em tela e e editavel quando nao desabilitado.
- [ ] Estrutura do componente foi respeitada.
- [ ] Medidas de borda, raio e paddings estao fiéis.
- [ ] Tipografia do valor e helper bate com especificacao.
- [ ] Estado de erro usa token negativo e mensagem legivel.
- [ ] Tokens foram usados no lugar de valores soltos.
- [ ] Acessibilidade basica foi implementada.

## Formato recomendado de API do componente
```ts
type TextInputState = 'default' | 'focus' | 'filled' | 'disabled' | 'error' | 'success';
type TextInputVariation = 'default' | 'price' | 'percent' | 'range' | 'text-area';

type TextInputProps = {
  label?: string;
  value?: string;
  placeholder?: string;
  state?: TextInputState;
  variation?: TextInputVariation;
  helperText?: string;
  errorText?: string;
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  onChange?: (value: string) => void;
};
```

## Decisao final para geracao por IA
Para qualquer tela gerada automaticamente, o agente deve:
1. Ler este documento antes de construir campos de entrada.
2. Selecionar estado e variacao pelo contexto de uso.
3. Renderizar o `Text input` com tokens oficiais e semantica correta.
4. Validar o checklist antes de finalizar a tela.
