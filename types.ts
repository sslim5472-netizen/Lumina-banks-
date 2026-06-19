export enum AccountType {
  PERSONAL = 'Personal',
  BUSINESS = 'Business'
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  accountType: AccountType;
}

export interface LoanCalculation {
  principal: number;
  rate: number;
  years: number;
  monthlyPayment: number;
}

export interface NavItem {
  label: string;
  path: string;
}

export interface CreditCardProduct {
  name: string;
  apr: string;
  annualFee: string;
  rewards: string[];
  imageColor: string;
  category: 'cash' | 'travel' | 'business';
}