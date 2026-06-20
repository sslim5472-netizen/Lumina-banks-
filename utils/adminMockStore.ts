export interface AdminUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  accountType: 'Personal' | 'Business';
  role: 'Admin' | 'Compliance' | 'Editor' | 'Developer';
  status: 'Active' | 'Suspended' | 'KYC Pending' | 'Pending';
  createdDate: string;
  balance: number;
}

export interface AdminAccount {
  accountNumber: string;
  email: string;
  name: string;
  type: 'Checking' | 'Savings' | 'Loan';
  balance: number;
  rate: number; // APY / Interest
  overdraftAllowed: boolean;
  status: 'Open' | 'Frozen';
}

export interface AdminTransaction {
  id: string;
  timestamp: string;
  email: string;
  name: string;
  type: 'Deposit' | 'Withdrawal' | 'Transfer' | 'Wire' | 'Swap';
  amount: number;
  status: 'Successfully' | 'Pending' | 'Flagged' | 'Hold' | 'Reject';
  counterparty: string;
  otpCode?: string; // New field
}

export interface CryptoWallet {
  email: string;
  asset: string; // BTC, ETH, USDC
  address: string;
  balance: number;
  fiatValue: number;
  status: 'Enabled' | 'Disabled';
}

export interface KycSubmission {
  id: string;
  email: string;
  name: string;
  submittedDate: string;
  passportUrl: string;
  selfieUrl: string;
  utilityBillUrl: string;
  passportStatus: 'Approved' | 'Pending' | 'Rejected';
  faceStatus: 'Approved' | 'Pending' | 'Rejected';
  utilityStatus: 'Approved' | 'Pending' | 'Rejected';
  notes: string;
  reviewedBy?: string;
}

export interface SupportTicket {
  id: string;
  email: string;
  name: string;
  subject: string;
  message: string;
  category: 'Transaction failure' | 'Login issue' | 'Loan request' | 'Security' | 'Other';
  priority: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'In Progress' | 'Resolved';
  assignedTo: string;
  replies: Array<{
    sender: 'user' | 'agent';
    text: string;
    timestamp: string;
  }>;
}

export interface Announcement {
  id: string;
  title: string;
  category: 'Maintenance' | 'Security Alert' | 'Rate Update' | 'General';
  summary: string;
  content: string;
  published: boolean;
  date: string;
}

export interface AuditLog {
  id: string;
  operator: string;
  role: string;
  action: string;
  target: string;
  details: string;
  timestamp: string;
  ipAddress: string;
}

export interface SecuritySetting {
  activeRateLimitMs: number;
  maxRequestsPerMin: number;
  blocklistedIps: string[];
  recentIntrusionAttempts: Array<{
    ip: string;
    timestamp: string;
    reason: string;
    severity: 'High' | 'Medium' | 'Low';
  }>;
}

export interface FeatureToggles {
  enableCryptoModule: boolean;
  activeRegistrations: boolean;
  enableAiAssistant: boolean;
  enableSBALoans: boolean;
  force2FA: boolean;
}

export interface SystemSettings {
  appName: string;
  maintenanceMode: boolean;
  baseCurrency: "USD" | "EUR" | "GBP";
  baseSavingsYield: number;
  loanApprovalLimit: number;
}

// Default Seed Data
const initialUsers: AdminUser[] = [
  { id: 'usr-1', firstName: 'Sarah', lastName: 'Jenkins', email: 'sarah.j@gmail.com', accountType: 'Personal', role: 'Compliance', status: 'Active', createdDate: '2026-01-15', balance: 45290.50 },
  { id: 'usr-2', firstName: 'Michael', lastName: 'Chen', email: 'mchen.biz@work.com', accountType: 'Business', role: 'Admin', status: 'Active', createdDate: '2025-11-04', balance: 189400.00 },
  { id: 'usr-3', firstName: 'Emily', lastName: 'Rodriguez', email: 'emily.rod@outlook.com', accountType: 'Personal', role: 'Editor', status: 'Active', createdDate: '2026-03-22', balance: 5200.25 },
  { id: 'usr-4', firstName: 'Alex', lastName: 'Kaufman', email: 'kaufman.alex@gmail.com', accountType: 'Personal', role: 'Developer', status: 'KYC Pending', createdDate: '2026-06-18', balance: 1250.00 },
  { id: 'usr-5', firstName: 'Jordan', lastName: 'Blake', email: 'jordanb@techcorp.io', accountType: 'Business', role: 'Admin', status: 'Suspended', createdDate: '2025-05-12', balance: 87500.00 },
  { id: 'usr-6', firstName: 'Elena', lastName: 'Petrova', email: 'elena.petrova@gmail.com', accountType: 'Personal', role: 'Admin', status: 'Active', createdDate: '2026-02-10', balance: 9340.40 }
];

const initialAccounts: AdminAccount[] = [
  { accountNumber: '100029381', email: 'sarah.j@gmail.com', name: 'Premium checking', type: 'Checking', balance: 25290.50, rate: 0.15, overdraftAllowed: true, status: 'Open' },
  { accountNumber: '100029382', email: 'sarah.j@gmail.com', name: 'High Yield Savings', type: 'Savings', balance: 20000.00, rate: 4.50, overdraftAllowed: false, status: 'Open' },
  { accountNumber: '200049100', email: 'mchen.biz@work.com', name: 'Business Checking', type: 'Checking', balance: 189400.00, rate: 0.25, overdraftAllowed: true, status: 'Open' },
  { accountNumber: '100055102', email: 'emily.rod@outlook.com', name: 'Everyday Checking', type: 'Checking', balance: 5200.25, rate: 0.05, overdraftAllowed: false, status: 'Open' },
  { accountNumber: '100067941', email: 'kaufman.alex@gmail.com', name: 'Everyday Checking', type: 'Checking', balance: 1250.00, rate: 0.05, overdraftAllowed: false, status: 'Open' },
  { accountNumber: '300010410', email: 'jordanb@techcorp.io', name: 'Commercial Term Loan', type: 'Loan', balance: 87500.00, rate: 6.75, overdraftAllowed: false, status: 'Frozen' }
];

const initialTransactions: AdminTransaction[] = [
  { id: 'tx-101', timestamp: '2026-06-19 09:12', email: 'sarah.j@gmail.com', name: 'Sarah Jenkins', type: 'Deposit', amount: 2500.00, status: 'Successfully', counterparty: 'ACH Payroll - Lumina Corp' },
  { id: 'tx-102', timestamp: '2026-06-19 08:30', email: 'mchen.biz@work.com', name: 'Michael Chen', type: 'Wire', amount: 45000.00, status: 'Successfully', counterparty: 'Pacific Steel Supplies LLC' },
  { id: 'tx-103', timestamp: '2026-06-18 17:45', email: 'emily.rod@outlook.com', name: 'Emily Rodriguez', type: 'Withdrawal', amount: 80.00, status: 'Successfully', counterparty: 'ATM Westside Branch' },
  { id: 'tx-104', timestamp: '2026-06-18 15:20', email: 'jordanb@techcorp.io', name: 'Jordan Blake', type: 'Transfer', amount: 15400.00, status: 'Flagged', counterparty: 'Suspicious Crypto Swap Corp' },
  { id: 'tx-105', timestamp: '2026-06-17 11:10', email: 'sarah.j@gmail.com', name: 'Sarah Jenkins', type: 'Swap', amount: 500.00, status: 'Successfully', counterparty: 'Lumina Bitcoin Hotwallet' },
  { id: 'tx-106', timestamp: '2026-06-17 06:05', email: 'kaufman.alex@gmail.com', name: 'Alex Kaufman', type: 'Deposit', amount: 1250.00, status: 'Pending', counterparty: 'Card Deposit - Bank of NY' }
];

const initialCryptoWallets: CryptoWallet[] = [
  { email: 'sarah.j@gmail.com', asset: 'BTC', address: '1KFHE7w8Bao66Sgd9M6KqK1n7YgK7fgh9O', balance: 0.125, fiatValue: 8125.00, status: 'Enabled' },
  { email: 'mchen.biz@work.com', asset: 'USDC', address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F', balance: 15000, fiatValue: 15000.00, status: 'Enabled' },
  { email: 'jordanb@techcorp.io', asset: 'ETH', address: '0x90f8bf235d96ccfb7499c4bd1b6b55ec74f6760d', balance: 4.80, fiatValue: 14400.00, status: 'Disabled' }
];

const initialKycSubmissions: KycSubmission[] = [
  {
    id: 'kyc-201',
    email: 'kaufman.alex@gmail.com',
    name: 'Alex Kaufman',
    submittedDate: '2026-06-18 14:30',
    passportUrl: 'https://placeholder.pics/svg/400x250/f1f5f9/64748b/Passport-Check-Alex-Kaufman',
    selfieUrl: 'https://placeholder.pics/svg/300x300/f1f5f9/64748b/Selfie-Alex-Kaufman',
    utilityBillUrl: 'https://placeholder.pics/svg/400x500/f1f5f9/64748b/Utility-Bill-Alex-Kaufman',
    passportStatus: 'Pending',
    faceStatus: 'Pending',
    utilityStatus: 'Pending',
    notes: 'Uploaded fresh documents on Thursday. Please review for loan eligibility verification.',
  },
  {
    id: 'kyc-202',
    email: 'sarah.j@gmail.com',
    name: 'Sarah Jenkins',
    submittedDate: '2026-01-16 10:00',
    passportUrl: 'https://placeholder.pics/svg/400x250/ecfdf5/065f46/Passport-Verified',
    selfieUrl: 'https://placeholder.pics/svg/300x300/ecfdf5/065f46/Selfie-Verified',
    utilityBillUrl: 'https://placeholder.pics/svg/400x500/ecfdf5/065f46/Utility-Bill-Verified',
    passportStatus: 'Approved',
    faceStatus: 'Approved',
    utilityStatus: 'Approved',
    notes: 'Employee fast-track auto-compliance review OK.',
    reviewedBy: 'mchen.biz@work.com'
  }
];

const initialSupportTickets: SupportTicket[] = [
  {
    id: 'tkt-301',
    email: 'kaufman.alex@gmail.com',
    name: 'Alex Kaufman',
    subject: 'Verification taking too long',
    message: 'Hello, I submitted my KYC documents yesterday but they are still showing pending. I want to access my checking account and transfer money, could you please look into it urgently?',
    category: 'Login issue',
    priority: 'High',
    status: 'Open',
    assignedTo: 'Compliance Team',
    replies: [
      { sender: 'user', text: 'Hello, I submitted my KYC documents yesterday but they are still showing pending.', timestamp: '2026-06-18 15:00' }
    ]
  },
  {
    id: 'tkt-302',
    email: 'sarah.j@gmail.com',
    name: 'Sarah Jenkins',
    subject: 'Interest rate calculation dispute',
    message: 'The High Yield Savings is showing 4.5% yield but for this billing cycle, the accrued payout looks like it was calculated using 4.25%. Kindly verify my account configuration details.',
    category: 'Transaction failure',
    priority: 'Medium',
    status: 'In Progress',
    assignedTo: 'Lead Agent',
    replies: [
      { sender: 'user', text: 'The High Yield Savings is showing 4.5% yield but it was calculated at 4.25%.', timestamp: '2026-06-17 12:00' },
      { sender: 'agent', text: 'Hello Sarah, we have flagged this with our treasury group to investigate. Please hold.', timestamp: '2026-06-17 14:30' }
    ]
  }
];

const initialAnnouncements: Announcement[] = [
  {
    id: 'ann-401',
    title: 'Scheduled System Upgrades on Saturday',
    category: 'Maintenance',
    summary: 'Our online services will undergo routine maintenance on Sunday, June 21, from 02:00 AM to 05:00 AM EST.',
    content: 'We are deploying database security patches to keep your digital banking experience faster and safer. During this window, you may notice transient unavailability with our online transfers, card locking triggers, and the virtual assistant. Our ATMs will remain fully functional.',
    published: true,
    date: '2026-06-18'
  },
  {
    id: 'ann-402',
    title: 'Increased Yield: High Yield Savings Account standard APR raised',
    category: 'Rate Update',
    summary: 'Lumina has standardly elevated Checking Savings Yield rates from 4.25% to 4.50% APY.',
    content: 'Beginning next week, Lumina depositors automatically enjoy an industry-leading interest yield rate adjustment. This aligns with dynamic Federal interest curves without requiring any subscriber intervention.',
    published: true,
    date: '2026-06-15'
  }
];

const initialAuditLogs: AuditLog[] = [
  { id: 'log-501', operator: 'Michael Chen', role: 'Admin', action: 'KYC_APPROVE', target: 'sarah.j@gmail.com', details: 'Manual fast-track approval checklist cleared for Sarah Jenkins.', timestamp: '2026-06-19 08:24', ipAddress: '192.168.1.140' },
  { id: 'log-502', operator: 'Michael Chen', role: 'Admin', action: 'USER_SUSPEND', target: 'jordanb@techcorp.io', details: 'Suspended business entity due to multiple flagged high-risk transfers and wire discrepancies.', timestamp: '2026-06-18 16:10', ipAddress: '192.168.1.140' },
  { id: 'log-503', operator: 'System Daemon', role: 'Developer', action: 'SYS_CONFIG_SET', target: 'baseSavingsYield', details: 'Updated standard yield parameter from 4.25 to 4.50 in compliance with Treasury memo.', timestamp: '2026-06-15 00:00', ipAddress: '127.0.0.1' }
];

const initialSecurity: SecuritySetting = {
  activeRateLimitMs: 250,
  maxRequestsPerMin: 120,
  blocklistedIps: ['198.51.100.42', '203.0.113.88', '185.220.101.4'],
  recentIntrusionAttempts: [
    { ip: '185.220.101.4', timestamp: '2026-06-19 06:45', reason: 'Brute-force SSH guessing detected', severity: 'High' },
    { ip: '82.165.191.12', timestamp: '2026-06-18 23:14', reason: 'SQL-injection probe on /api/login endpoint', severity: 'High' },
    { ip: '192.168.1.201', timestamp: '2026-06-18 12:44', reason: 'Unusual rapid page requests threshold triggered', severity: 'Medium' }
  ]
};

const initialToggles: FeatureToggles = {
  enableCryptoModule: true,
  activeRegistrations: true,
  enableAiAssistant: true,
  enableSBALoans: true,
  force2FA: false
};

const initialSystem: SystemSettings = {
  appName: "Lumina Financial",
  maintenanceMode: false,
  baseCurrency: "USD",
  baseSavingsYield: 4.50,
  loanApprovalLimit: 250000
};

// Role-based Permissions Grid Configuration
export interface RolePermissions {
  manageUsers: boolean;
  manageAccounts: boolean;
  manageTransactions: boolean;
  manageCrypto: boolean;
  approveKyc: boolean;
  replyTickets: boolean;
  manageNews: boolean;
  editSystemSettings: boolean;
  toggleFeatures: boolean;
  viewSecurityDashboard: boolean;
}

export const initialRolePermissions: Record<'Admin' | 'Compliance' | 'Editor' | 'Developer', RolePermissions> = {
  Admin: {
    manageUsers: true,
    manageAccounts: true,
    manageTransactions: true,
    manageCrypto: true,
    approveKyc: true,
    replyTickets: true,
    manageNews: true,
    editSystemSettings: true,
    toggleFeatures: true,
    viewSecurityDashboard: true
  },
  Compliance: {
    manageUsers: true,
    manageAccounts: false,
    manageTransactions: true,
    manageCrypto: true,
    approveKyc: true,
    replyTickets: true,
    manageNews: false,
    editSystemSettings: false,
    toggleFeatures: false,
    viewSecurityDashboard: true
  },
  Editor: {
    manageUsers: false,
    manageAccounts: false,
    manageTransactions: false,
    manageCrypto: false,
    approveKyc: false,
    replyTickets: true,
    manageNews: true,
    editSystemSettings: false,
    toggleFeatures: false,
    viewSecurityDashboard: false
  },
  Developer: {
    manageUsers: true,
    manageAccounts: true,
    manageTransactions: true,
    manageCrypto: true,
    approveKyc: false,
    replyTickets: false,
    manageNews: true,
    editSystemSettings: true,
    toggleFeatures: true,
    viewSecurityDashboard: true
  }
};

// Store Helper functions utilizing LocalStorage
export const getAdminStore = <T>(key: string, defaultValue: T): T => {
  const data = localStorage.getItem(`lumina_admin_${key}`);
  if (!data) {
    localStorage.setItem(`lumina_admin_${key}`, JSON.stringify(defaultValue));
    return defaultValue;
  }
  return JSON.parse(data);
};

export const saveAdminStore = <T>(key: string, value: T): void => {
  localStorage.setItem(`lumina_admin_${key}`, JSON.stringify(value));
};

export const initializeMockDatabase = () => {
  getAdminStore('users', initialUsers);
  getAdminStore('accounts', initialAccounts);
  getAdminStore('transactions', initialTransactions);
  getAdminStore('crypto', initialCryptoWallets);
  getAdminStore('kyc', initialKycSubmissions);
  getAdminStore('tickets', initialSupportTickets);
  getAdminStore('announcements', initialAnnouncements);
  getAdminStore('auditLogs', initialAuditLogs);
  getAdminStore('security', initialSecurity);
  getAdminStore('toggles', initialToggles);
  getAdminStore('system', initialSystem);
  getAdminStore('permissions', initialRolePermissions);
};

// Read Helpers
export const getMockUsers = (): AdminUser[] => getAdminStore('users', initialUsers);
export const getMockAccounts = (): AdminAccount[] => getAdminStore('accounts', initialAccounts);
export const getMockTransactions = (): AdminTransaction[] => getAdminStore('transactions', initialTransactions);
export const getMockCrypto = (): CryptoWallet[] => getAdminStore('crypto', initialCryptoWallets);
export const getMockKyc = (): KycSubmission[] => getAdminStore('kyc', initialKycSubmissions);
export const getMockTickets = (): SupportTicket[] => getAdminStore('tickets', initialSupportTickets);
export const getMockAnnouncements = (): Announcement[] => getAdminStore('announcements', initialAnnouncements);
export const getMockAuditLogs = (): AuditLog[] => getAdminStore('auditLogs', initialAuditLogs);
export const getMockSecurity = (): SecuritySetting => getAdminStore('security', initialSecurity);
export const getMockToggles = (): FeatureToggles => getAdminStore('toggles', initialToggles);
export const getMockSystem = (): SystemSettings => getAdminStore('system', initialSystem);
export const getMockPermissions = (): Record<'Admin' | 'Compliance' | 'Editor' | 'Developer', RolePermissions> => getAdminStore('permissions', initialRolePermissions);

export const addAuditLog = (operator: string, role: string, action: string, target: string, details: string) => {
  const logs = getMockAuditLogs();
  const nextLog: AuditLog = {
    id: `log-${Date.now()}`,
    operator,
    role,
    action,
    target,
    details,
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
    ipAddress: '192.168.1.150'
  };
  saveAdminStore('auditLogs', [nextLog, ...logs]);
};
