import { motion } from 'framer-motion';
import { Shield, Lock } from 'lucide-react';

// Payment method icons as SVG components
const VisaIcon = () => (
  <svg viewBox="0 0 48 32" className="h-6 w-auto" fill="none">
    <rect width="48" height="32" rx="4" fill="#1A1F71"/>
    <path d="M19.5 21.5H16.5L18.5 10.5H21.5L19.5 21.5Z" fill="white"/>
    <path d="M28.5 10.7C27.9 10.5 27 10.2 25.9 10.2C22.9 10.2 20.8 11.8 20.8 14C20.8 15.6 22.2 16.5 23.3 17C24.4 17.6 24.8 17.9 24.8 18.4C24.8 19.1 23.9 19.4 23.1 19.4C21.9 19.4 21.3 19.2 20.3 18.8L19.9 18.6L19.5 21.2C20.2 21.5 21.5 21.8 22.9 21.8C26.1 21.8 28.1 20.2 28.1 17.9C28.1 16.6 27.3 15.6 25.6 14.8C24.6 14.3 24 14 24 13.4C24 12.9 24.6 12.4 25.8 12.4C26.8 12.4 27.5 12.6 28.1 12.8L28.4 13L28.5 10.7Z" fill="white"/>
    <path d="M33.5 10.5C32.9 10.5 32.4 10.7 32.1 11.3L27.5 21.5H30.7L31.3 19.8H35.2L35.6 21.5H38.5L36 10.5H33.5ZM32.2 17.5C32.4 17 33.5 14 33.5 14C33.5 14 33.8 13.2 34 12.7L34.2 13.9C34.2 13.9 34.9 17 35 17.5H32.2Z" fill="white"/>
    <path d="M14.5 10.5L11.5 17.8L11.2 16.4C10.6 14.7 9 12.8 7.2 11.9L9.9 21.5H13.1L17.7 10.5H14.5Z" fill="white"/>
    <path d="M9.5 10.5H4.5L4.5 10.7C8.2 11.6 10.7 13.9 11.2 16.4L10.3 11.3C10.2 10.7 9.6 10.5 9.5 10.5Z" fill="#F9A533"/>
  </svg>
);

const MastercardIcon = () => (
  <svg viewBox="0 0 48 32" className="h-6 w-auto" fill="none">
    <rect width="48" height="32" rx="4" fill="#F5F5F5"/>
    <circle cx="19" cy="16" r="8" fill="#EB001B"/>
    <circle cx="29" cy="16" r="8" fill="#F79E1B"/>
    <path d="M24 10.5C25.8 11.9 27 14.1 27 16.5C27 18.9 25.8 21.1 24 22.5C22.2 21.1 21 18.9 21 16.5C21 14.1 22.2 11.9 24 10.5Z" fill="#FF5F00"/>
  </svg>
);

const AmexIcon = () => (
  <svg viewBox="0 0 48 32" className="h-6 w-auto" fill="none">
    <rect width="48" height="32" rx="4" fill="#006FCF"/>
    <text x="24" y="18" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="Arial">AMEX</text>
  </svg>
);

const PaypalIcon = () => (
  <svg viewBox="0 0 48 32" className="h-6 w-auto" fill="none">
    <rect width="48" height="32" rx="4" fill="#F5F5F5"/>
    <text x="24" y="20" fill="#003087" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="Arial">PayPal</text>
  </svg>
);

const ApplePayIcon = () => (
  <svg viewBox="0 0 48 32" className="h-6 w-auto" fill="none">
    <rect width="48" height="32" rx="4" fill="#000"/>
    <text x="24" y="18" fill="white" fontSize="6" fontWeight="bold" textAnchor="middle" fontFamily="Arial">Apple Pay</text>
  </svg>
);

const GooglePayIcon = () => (
  <svg viewBox="0 0 48 32" className="h-6 w-auto" fill="none">
    <rect width="48" height="32" rx="4" fill="#F5F5F5"/>
    <text x="24" y="20" fill="#5F6368" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="Arial">G Pay</text>
  </svg>
);

const paymentMethods = [
  { name: 'Visa', icon: VisaIcon },
  { name: 'Mastercard', icon: MastercardIcon },
  { name: 'Amex', icon: AmexIcon },
  { name: 'PayPal', icon: PaypalIcon },
  { name: 'Apple Pay', icon: ApplePayIcon },
  { name: 'Google Pay', icon: GooglePayIcon },
];

export function PaymentBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {paymentMethods.map((method) => (
        <motion.div
          key={method.name}
          whileHover={{ scale: 1.05 }}
          className="bg-background rounded-md p-1.5 shadow-sm border border-border/50"
          title={method.name}
        >
          <method.icon />
        </motion.div>
      ))}
    </div>
  );
}

export function SecurityBadges() {
  return (
    <div className="flex items-center justify-center gap-6 text-muted-foreground">
      <div className="flex items-center gap-2">
        <Lock className="h-4 w-4" />
        <span className="text-xs font-medium">SSL Secured</span>
      </div>
      <div className="flex items-center gap-2">
        <Shield className="h-4 w-4" />
        <span className="text-xs font-medium">256-bit Encryption</span>
      </div>
    </div>
  );
}
