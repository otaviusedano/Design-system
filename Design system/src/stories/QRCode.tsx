import './qr-code.css';

export interface QRCodeProps {
  className?: string;
  alt?: string;
}

const qrCodeAsset =
  'https://www.figma.com/api/mcp/asset/9029daeb-f822-4b58-956c-64b734d921c0';

export const QRCode = ({ className, alt = 'QR Code' }: QRCodeProps) => {
  return (
    <div className={['storybook-qrcode', className].filter(Boolean).join(' ')}>
      <img className="storybook-qrcode__image" src={qrCodeAsset} alt={alt} />
    </div>
  );
};
