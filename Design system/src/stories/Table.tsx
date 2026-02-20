import './Table.css';

type StatusTone = 'success' | 'info';

export interface TableRow {
  id: string;
  selected: boolean;
  status: {
    label: string;
    tone: StatusTone;
  };
  client: {
    name: string;
    document: string;
  };
  number: string;
  product: {
    name: string;
    subtitle: string;
  };
  header1: string;
  header2: string;
  header3: string;
}

export interface TableProps {
  className?: string;
  rows?: TableRow[];
  total?: number;
  showColumn1?: boolean;
  showColumn2?: boolean;
  showColumn3?: boolean;
  showColumn4?: boolean;
  showColumn5?: boolean;
  showColumn6?: boolean;
}

const defaultRows: TableRow[] = [
  {
    id: 'row-1',
    selected: false,
    status: { label: 'Quitado', tone: 'success' },
    client: { name: 'Nome do cliente', document: 'CPF ou CNPJ' },
    number: '10984',
    product: { name: 'Nome do produto', subtitle: 'Nome do plano' },
    header1: 'Text cell',
    header2: 'Text cell',
    header3: 'Text cell',
  },
  {
    id: 'row-2',
    selected: true,
    status: { label: 'Em andamento', tone: 'info' },
    client: { name: 'Nome do cliente', document: 'CPF ou CNPJ' },
    number: '103939041',
    product: { name: 'Nome do produto', subtitle: 'Nome do plano' },
    header1: 'Text cell',
    header2: 'Text cell',
    header3: 'Text cell',
  },
];

const joinClass = (...classes: Array<string | false | undefined>) =>
  classes.filter(Boolean).join(' ');

export const Table = ({
  className,
  rows = defaultRows,
  total = 50,
  showColumn1 = true,
  showColumn2 = true,
  showColumn3 = true,
  showColumn4 = true,
  showColumn5 = true,
  showColumn6 = true,
}: TableProps) => {
  const visibleColumns = [
    showColumn1,
    showColumn2,
    showColumn3,
    showColumn4,
    showColumn5,
    showColumn6,
  ].filter(Boolean).length;

  return (
    <div className={joinClass('storybook-table-v2', className)} data-node-id="456:33065">
      <div className="storybook-table-v2__content" data-node-id="453:32894">
        <div className="storybook-table-v2__column storybook-table-v2__column--select">
          <div className="storybook-table-v2__header" aria-hidden />
          {rows.map((row, rowIndex) => (
            <div
              key={`${row.id}-select`}
              className={joinClass(
                'storybook-table-v2__cell',
                rowIndex % 2 === 1 && 'storybook-table-v2__cell--alt',
                'storybook-table-v2__cell--center',
              )}
            >
              <input
                type="checkbox"
                checked={row.selected}
                readOnly
                aria-label={`Selecionar linha ${rowIndex + 1}`}
                className="storybook-table-v2__checkbox"
              />
            </div>
          ))}
        </div>

        <div className="storybook-table-v2__column">
          <div className="storybook-table-v2__header">Status</div>
          {rows.map((row, rowIndex) => (
            <div
              key={`${row.id}-status`}
              className={joinClass(
                'storybook-table-v2__cell',
                rowIndex % 2 === 1 && 'storybook-table-v2__cell--alt',
              )}
            >
              <span
                className={joinClass(
                  'storybook-table-v2__tag',
                  row.status.tone === 'success'
                    ? 'storybook-table-v2__tag--success'
                    : 'storybook-table-v2__tag--info',
                )}
              >
                {row.status.label}
              </span>
            </div>
          ))}
        </div>

        <div className="storybook-table-v2__column">
          <div className="storybook-table-v2__header">Client</div>
          {rows.map((row, rowIndex) => (
            <div
              key={`${row.id}-client`}
              className={joinClass(
                'storybook-table-v2__cell',
                rowIndex % 2 === 1 && 'storybook-table-v2__cell--alt',
                'storybook-table-v2__cell--with-icon',
              )}
            >
              <i className="fa-solid fa-user storybook-table-v2__leading-icon" aria-hidden />
              <div className="storybook-table-v2__stack">
                <p className="storybook-table-v2__title">{row.client.name}</p>
                <p className="storybook-table-v2__subtitle">{row.client.document}</p>
              </div>
            </div>
          ))}
        </div>

        {showColumn1 && (
          <div className="storybook-table-v2__column">
            <div className="storybook-table-v2__header storybook-table-v2__header--right">
              Number
            </div>
            {rows.map((row, rowIndex) => (
              <div
                key={`${row.id}-number`}
                className={joinClass(
                  'storybook-table-v2__cell',
                  rowIndex % 2 === 1 && 'storybook-table-v2__cell--alt',
                  'storybook-table-v2__cell--right',
                )}
              >
                <span className="storybook-table-v2__text">{row.number}</span>
              </div>
            ))}
          </div>
        )}

        {showColumn2 && (
          <div className="storybook-table-v2__column">
            <div className="storybook-table-v2__header">Product</div>
            {rows.map((row, rowIndex) => (
              <div
                key={`${row.id}-product`}
                className={joinClass(
                  'storybook-table-v2__cell',
                  rowIndex % 2 === 1 && 'storybook-table-v2__cell--alt',
                  'storybook-table-v2__cell--with-icon',
                )}
              >
                <i className="fa-solid fa-car storybook-table-v2__leading-icon" aria-hidden />
                <div className="storybook-table-v2__stack">
                  <p className="storybook-table-v2__title">{row.product.name}</p>
                  <p className="storybook-table-v2__subtitle">{row.product.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {showColumn3 && (
          <div className="storybook-table-v2__column">
            <div className="storybook-table-v2__header">Header</div>
            {rows.map((row, rowIndex) => (
              <div
                key={`${row.id}-header1`}
                className={joinClass(
                  'storybook-table-v2__cell',
                  rowIndex % 2 === 1 && 'storybook-table-v2__cell--alt',
                )}
              >
                <span className="storybook-table-v2__text">{row.header1}</span>
              </div>
            ))}
          </div>
        )}

        {showColumn4 && (
          <div className="storybook-table-v2__column">
            <div className="storybook-table-v2__header">Header</div>
            {rows.map((row, rowIndex) => (
              <div
                key={`${row.id}-header2`}
                className={joinClass(
                  'storybook-table-v2__cell',
                  rowIndex % 2 === 1 && 'storybook-table-v2__cell--alt',
                )}
              >
                <span className="storybook-table-v2__text">{row.header2}</span>
              </div>
            ))}
          </div>
        )}

        {showColumn5 && (
          <div className="storybook-table-v2__column">
            <div className="storybook-table-v2__header">Header</div>
            {rows.map((row, rowIndex) => (
              <div
                key={`${row.id}-header3`}
                className={joinClass(
                  'storybook-table-v2__cell',
                  rowIndex % 2 === 1 && 'storybook-table-v2__cell--alt',
                )}
              >
                <span className="storybook-table-v2__text">{row.header3}</span>
              </div>
            ))}
          </div>
        )}

        {showColumn6 && (
          <div className="storybook-table-v2__column storybook-table-v2__column--options">
            <div className="storybook-table-v2__header" aria-hidden />
            {rows.map((row, rowIndex) => (
              <div
                key={`${row.id}-options`}
                className={joinClass(
                  'storybook-table-v2__cell',
                  rowIndex % 2 === 1 && 'storybook-table-v2__cell--alt',
                  'storybook-table-v2__cell--center',
                )}
              >
                <button type="button" className="storybook-table-v2__icon-button" aria-label="Opcoes">
                  <i className="fa-solid fa-ellipsis" aria-hidden />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="storybook-table-v2__footer">
        <p className="storybook-table-v2__footer-text" style={{ minWidth: `${Math.max(1, visibleColumns)}ch` }}>
          <span>Total: </span>
          <strong>{total}</strong>
        </p>
      </footer>
    </div>
  );
};
