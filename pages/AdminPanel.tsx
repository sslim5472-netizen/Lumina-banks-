import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Wallet, 
  Activity, 
  ShieldAlert, 
  FileCheck, 
  MessageSquare, 
  Newspaper, 
  Settings, 
  ToggleLeft, 
  Lock, 
  Database,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Plus,
  Send,
  Eye,
  Trash2,
  RefreshCw,
  TrendingUp,
  DollarSign,
  ShieldAlert as ShieldIcon,
  Server,
  Zap,
  Globe2,
  LockKeyhole,
  Check,
  Edit2,
  LogOut,
  Download,
  CheckSquare,
  Bell,
  FileText,
  Terminal,
  Clock
} from 'lucide-react';
import { 
  getMockUsers, 
  getMockAccounts, 
  getMockTransactions, 
  getMockCrypto, 
  getMockKyc, 
  getMockTickets, 
  getMockAnnouncements, 
  getMockAuditLogs, 
  getMockToggles, 
  getMockSystem, 
  getMockPermissions,
  saveAdminStore,
  initializeMockDatabase,
  addAuditLog,
  AdminUser,
  AdminAccount,
  AdminTransaction,
  CryptoWallet,
  KycSubmission,
  SupportTicket,
  Announcement,
  AuditLog,
  FeatureToggles,
  SystemSettings,
  RolePermissions
} from '../utils/adminMockStore';
import { Button, Input, Select, Card } from '../components/UI';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  Legend,
  LineChart,
  Line
} from 'recharts';

type ActiveTab = 
  | 'overview' 
  | 'users' 
  | 'accounts' 
  | 'transactions' 
  | 'crypto' 
  | 'kyc' 
  | 'support' 
  | 'news' 
  | 'audit' 
  | 'notifications'
  | 'settings';

export const AdminPanel: React.FC = () => {
  const navigate = useNavigate();

  // Supervisor Simulator Active Role
  const [activeSupervisor, setActiveSupervisor] = useState<AdminUser>({
    id: 'usr-admin-sim',
    firstName: 'Supervisor',
    lastName: 'Agent',
    email: 'supervisor@lumina.com',
    accountType: 'Personal',
    role: 'Admin',
    status: 'Active',
    createdDate: '2026-06-19',
    balance: 0
  });

  // Init DB and check local session
  useEffect(() => {
    initializeMockDatabase();
    try {
      const rawSession = localStorage.getItem('lumina_session');
      if (rawSession) {
        const parsed = JSON.parse(rawSession);
        setActiveSupervisor({
          id: 'usr-admin-session',
          firstName: parsed.name ? parsed.name.split(' ')[0] : 'System',
          lastName: parsed.name ? parsed.name.split(' ').slice(1).join(' ') : 'Administrator',
          email: parsed.email || 'admin@bank.com',
          accountType: 'Personal',
          role: 'Admin',
          status: 'Active',
          createdDate: new Date().toISOString().split('T')[0],
          balance: 0
        });
      }
    } catch (e) {
      console.warn("Could not read admin session details:", e);
    }
  }, []);

  // Load States from Local Storage / Seeder
  const [users, setUsers] = useState<AdminUser[]>(getMockUsers());
  const [accounts, setAccounts] = useState<AdminAccount[]>(getMockAccounts());
  const [transactions, setTransactions] = useState<AdminTransaction[]>(getMockTransactions());
  const [cryptoWallets, setCryptoWallets] = useState<CryptoWallet[]>(getMockCrypto());
  const [kycSubmissions, setKycSubmissions] = useState<KycSubmission[]>(getMockKyc());
  const [tickets, setTickets] = useState<SupportTicket[]>(getMockTickets());
  const [announcements, setAnnouncements] = useState<Announcement[]>(getMockAnnouncements());
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(getMockAuditLogs());
  const [toggles, setToggles] = useState<FeatureToggles>(getMockToggles());
  const [system, setSystem] = useState<SystemSettings>(getMockSystem());
  const [rolePermissions, setRolePermissions] = useState<Record<string, RolePermissions>>(getMockPermissions());

  // UI Navigation / Search states
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal / Detail views state
  const [selectedKyc, setSelectedKyc] = useState<KycSubmission | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [ticketReplyText, setTicketReplyText] = useState('');
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  
  // System Audit trails filter states
  const [auditLogSearch, setAuditLogSearch] = useState('');
  const [auditLogCategory, setAuditLogCategory] = useState('ALL');
  
  // CMS Creator Modal/Form states
  const [newAnnTitle, setNewAnnTitle] = useState('');
  const [newAnnSummary, setNewAnnSummary] = useState('');
  const [newAnnContent, setNewAnnContent] = useState('');
  const [newAnnCategory, setNewAnnCategory] = useState<'Maintenance' | 'Security Alert' | 'Rate Update' | 'General'>('General');
  
  // Custom transaction creator states
  const [txEmail, setTxEmail] = useState('');
  const [txType, setTxType] = useState<'Deposit' | 'Withdrawal' | 'Transfer' | 'Wire' | 'Swap'>('Deposit');
  const [txAmount, setTxAmount] = useState('');
  const [txCounterparty, setTxCounterparty] = useState('');
  const [showCreateTxForm, setShowCreateTxForm] = useState(false);
  const [selectedTxIds, setSelectedTxIds] = useState<string[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [activeToast, setActiveToast] = useState<{title: string, body: string} | null>(null);
  const [suspiciousThreshold, setSuspiciousThreshold] = useState<number>(() => {
    const raw = localStorage.getItem('lumina_admin_suspicious_threshold');
    return raw ? parseFloat(raw) : 10000;
  });

  // Custom KYC creator states
  const [showCreateKycForm, setShowCreateKycForm] = useState(false);
  const [selectedKycIds, setSelectedKycIds] = useState<string[]>([]);
  const [kycFormName, setKycFormName] = useState('');
  const [kycFormEmail, setKycFormEmail] = useState('');
  const [kycFormNotes, setKycFormNotes] = useState('');
  const [kycFormPassportStatus, setKycFormPassportStatus] = useState<'Approved' | 'Pending' | 'Rejected'>('Pending');
  const [kycFormFaceStatus, setKycFormFaceStatus] = useState<'Approved' | 'Pending' | 'Rejected'>('Pending');
  const [kycFormUtilityStatus, setKycFormUtilityStatus] = useState<'Approved' | 'Pending' | 'Rejected'>('Pending');

  // Balance Modifier states
  const [modifyingAccKey, setModifyingAccKey] = useState<string | null>(null);
  const [accModValue, setAccModValue] = useState('');
  const [accModName, setAccModName] = useState('');
  const [accModEmail, setAccModEmail] = useState('');
  const [accModType, setAccModType] = useState<'Checking' | 'Savings' | 'Loan'>('Checking');
  const [accModRate, setAccModRate] = useState('');

  // Transaction Modifier states
  const [modifyingTxId, setModifyingTxId] = useState<string | null>(null);
  const [txModCounterparty, setTxModCounterparty] = useState('');
  const [txModAmount, setTxModAmount] = useState('');
  const [txModStatus, setTxModStatus] = useState<'Successfully' | 'Pending' | 'Flagged' | 'Hold' | 'Reject'>('Successfully');
  const [txModOTP, setTxModOTP] = useState('');

  // Crypto Wallet modification and creation states
  const [modifyingCryptoAddress, setModifyingCryptoAddress] = useState<string | null>(null);
  const [cryptoModEmail, setCryptoModEmail] = useState('');
  const [cryptoModAsset, setCryptoModAsset] = useState('');
  const [cryptoModBalance, setCryptoModBalance] = useState('');
  const [cryptoModFiat, setCryptoModFiat] = useState('');
  
  const [showCreateCryptoForm, setShowCreateCryptoForm] = useState(false);
  const [newCryptoEmail, setNewCryptoEmail] = useState('');
  const [newCryptoAsset, setNewCryptoAsset] = useState('BTC');
  const [newCryptoAddress, setNewCryptoAddress] = useState('');
  const [newCryptoBalance, setNewCryptoBalance] = useState('');
  const [newCryptoFiat, setNewCryptoFiat] = useState('');

  // User Modifier states
  const [modifyingUserId, setModifyingUserId] = useState<string | null>(null);
  const [userModFirstName, setUserModFirstName] = useState('');
  const [userModLastName, setUserModLastName] = useState('');
  const [userModEmail, setUserModEmail] = useState('');
  const [userModRole, setUserModRole] = useState<'Admin' | 'Compliance' | 'Editor' | 'Developer'>('Compliance');
  const [userModAccountType, setUserModAccountType] = useState<'Personal' | 'Business'>('Personal');
  const [userModBalance, setUserModBalance] = useState('');
  const [userModStatus, setUserModStatus] = useState<'Active' | 'Suspended' | 'KYC Pending' | 'Pending'>('Active');

  // New Customer registration state
  const [newCustFirstName, setNewCustFirstName] = useState('');
  const [newCustLastName, setNewCustLastName] = useState('');
  const [newCustEmail, setNewCustEmail] = useState('');
  const [newCustAccountType, setNewCustAccountType] = useState<'Personal' | 'Business'>('Personal');
  const [newCustRole, setNewCustRole] = useState<'Admin' | 'Compliance' | 'Editor' | 'Developer'>('Compliance');
  const [newCustStatus, setNewCustStatus] = useState<'Active' | 'Suspended' | 'KYC Pending' | 'Pending'>('Active');
  const [newCustBalance, setNewCustBalance] = useState('');

  // Notification Broadcaster structs & states
  interface AdminNotification {
    id: string;
    title: string;
    body: string;
    type: 'Info' | 'Warning' | 'Critical Alert' | 'System Update';
    targetSegment: 'All' | 'Personal' | 'Business' | 'Admin Staff';
    dispatchedAt: string;
    status: 'Active' | 'Archived';
    clicksCount: number;
  }

  const [notifications, setNotifications] = useState<AdminNotification[]>(() => {
    const raw = localStorage.getItem('lumina_admin_notifications_state');
    if (!raw) {
      return [
        {
          id: 'notif-1',
          title: 'Scheduled Core Security Ledger Patch',
          body: 'Lumina Digital Banking Core Ledger will undergo a rolling software update tonight at 23:00 UTC. ATM withdrawals may experience brief card confirmation delays up to 45 seconds.',
          type: 'System Update',
          targetSegment: 'All',
          dispatchedAt: new Date(Date.now() - 3600000 * 2).toISOString().replace('T', ' ').substring(0, 19),
          status: 'Active',
          clicksCount: 1420
        },
        {
          id: 'notif-2',
          title: 'Suspicious Offshore VPN Login Blocked',
          body: 'WAF system has triggered an IP blacklist block for clients routing through high-risk geo-proxies. Secure authentication challenges are active.',
          type: 'Critical Alert',
          targetSegment: 'Admin Staff',
          dispatchedAt: new Date(Date.now() - 3600000 * 8).toISOString().replace('T', ' ').substring(0, 19),
          status: 'Active',
          clicksCount: 88
        },
        {
          id: 'notif-3',
          title: 'Corporate Wire Standard Verification Rules',
          body: 'Please remind high-net-worth commercial business accounts that outbound wires exceeding $150,000 necessitate second-officer signature matching.',
          type: 'Info',
          targetSegment: 'Business',
          dispatchedAt: new Date(Date.now() - 3600000 * 24).toISOString().replace('T', ' ').substring(0, 19),
          status: 'Active',
          clicksCount: 345
        },
        {
          id: 'notif-4',
          title: 'Seasonal Higher Yield Savings Campaign Notice',
          body: 'Promotional CD yield rates are live. Digital customer portals will display seasonal billboard banners with APY projections.',
          type: 'Warning',
          targetSegment: 'Personal',
          dispatchedAt: new Date(Date.now() - 3600000 * 48).toISOString().replace('T', ' ').substring(0, 19),
          status: 'Archived',
          clicksCount: 1205
        }
      ];
    }
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  });

  const [notifFormTitle, setNotifFormTitle] = useState('');
  const [notifFormBody, setNotifFormBody] = useState('');
  const [notifFormType, setNotifFormType] = useState<'Info' | 'Warning' | 'Critical Alert' | 'System Update'>('Info');
  const [notifFormSegment, setNotifFormSegment] = useState<'All' | 'Personal' | 'Business' | 'Admin Staff'>('All');

  // Handle adding new notification
  const handleBroadcastNotification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifFormTitle.trim() || !notifFormBody.trim()) {
      alert("Please enter a title and message body for the notification alert.");
      return;
    }

    const newNotif: AdminNotification = {
      id: `notif-${Math.floor(100 + Math.random() * 900)}`,
      title: notifFormTitle.trim(),
      body: notifFormBody.trim(),
      type: notifFormType,
      targetSegment: notifFormSegment,
      dispatchedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      status: 'Active',
      clicksCount: 0
    };

    const updated = [newNotif, ...notifications];
    setNotifications(updated);

    // Reset fields
    setNotifFormTitle('');
    setNotifFormBody('');
    setNotifFormType('Info');
    setNotifFormSegment('All');

    // Add Audit log
    syncWithStorage(
      'notifications_state',
      updated,
      'BROADCAST_NOTIFICATION',
      newNotif.targetSegment,
      `Broadcasted notification alert: "${newNotif.title}" to target audience segment: ${newNotif.targetSegment}`
    );
  };

  // Toggle notification status
  const handleToggleNotifStatus = (notifId: string) => {
    const updated = notifications.map(notif => {
      if (notif.id === notifId) {
        const nextStatus = notif.status === 'Active' ? 'Archived' : 'Active';
        return { ...notif, status: nextStatus };
      }
      return notif;
    });
    setNotifications(updated as any);
    
    const target = notifications.find(notif => notif.id === notifId);
    if (target) {
      syncWithStorage(
        'notifications_state',
        updated,
        'NOTIFICATION_STATUS_UPDATE',
        target.id,
        `Toggled dispatch status of alert: "${target.title}" to state: ${target.status === 'Active' ? 'Archived' : 'Active'}`
      );
    }
  };

  const handleDeleteNotification = (notifId: string) => {
    const target = notifications.find(n => n.id === notifId);
    if (!target) return;
    const updated = notifications.filter(n => n.id !== notifId);
    setNotifications(updated);

    syncWithStorage(
      'notifications_state',
      updated,
      'NOTIFICATION_DELETE',
      target.id,
      `Deleted system record of broadcasted notification: "${target.title}"`
    );
  };

  // Force state save and logging
  const syncWithStorage = (key: string, data: any, logAction?: string, logTarget?: string, logDetails?: string) => {
    saveAdminStore(key, data);
    if (logAction && logTarget && logDetails) {
      addAuditLog(
        `${activeSupervisor.firstName} ${activeSupervisor.lastName}`,
        activeSupervisor.role,
        logAction,
        logTarget,
        logDetails
      );
      setAuditLogs(getMockAuditLogs());
    }
  };

  // Keep states fed from LocalStorage triggers
  useEffect(() => {
    setUsers(getMockUsers());
    setAccounts(getMockAccounts());
    setTransactions(getMockTransactions());
    setCryptoWallets(getMockCrypto());
    setKycSubmissions(getMockKyc());
    setTickets(getMockTickets());
    setAnnouncements(getMockAnnouncements());
    setAuditLogs(getMockAuditLogs());
    setToggles(getMockToggles());
    setSystem(getMockSystem());
    const rawNotifs = localStorage.getItem('lumina_admin_notifications_state');
    if (rawNotifs) {
      try {
        setNotifications(JSON.parse(rawNotifs));
      } catch (e) {
        console.warn("Could not parse notifications state:", e);
      }
    }
  }, [activeTab]);

  // --- HELPER FOR PERMISSIONS CHECK ---
  const checkPermission = (action: keyof RolePermissions): boolean => {
    // The account is the only superadmin that controls everything.
    return true;
  };

  // --- ACTIONS ---

  const handleBulkUpdateUserStatus = (newStatus: 'Active' | 'Suspended' | 'KYC Pending' | 'Pending') => {
    if (!checkPermission('manageUsers')) {
      alert("Permission Denied.");
      return;
    }
    const updatedUsers = users.map(u => selectedUserIds.includes(u.id) ? { ...u, status: newStatus } : u);
    setUsers(updatedUsers);
    setSelectedUserIds([]);
    syncWithStorage('users', updatedUsers, 'USER_BULK_STATUS_CHANGE', 'BULK', `Updated ${selectedUserIds.length} users to ${newStatus}`);
  };

  // User Administration
  const handleToggleUserStatus = (userId: string) => {
    if (!checkPermission('manageUsers')) {
      alert("Permission Denied: Your assigned supervisor role restricts user status mutations.");
      return;
    }
    const updated = users.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === 'Suspended' ? 'Active' : 'Suspended';
        syncWithStorage(
          'users', 
          users.map(item => item.id === userId ? { ...item, status: nextStatus } : item),
          'USER_STATUS_CHANGE',
          u.email,
          `Modified registration status to ${nextStatus}`
        );
        return { ...u, status: nextStatus };
      }
      return u;
    });
    setUsers(updated);
  };

  const handleUpdateUserRole = (userId: string, newRole: 'Admin' | 'Compliance' | 'Editor' | 'Developer') => {
    if (!checkPermission('manageUsers')) {
      alert("Permission Denied: Cannot modify supervisor privileges.");
      return;
    }
    const targetUser = users.find(u => u.id === userId);
    if (!targetUser) return;
    const updatedUsers = users.map(u => u.id === userId ? { ...u, role: newRole } : u);
    setUsers(updatedUsers);
    syncWithStorage('users', updatedUsers, 'USER_ROLE_ASSIGN', targetUser.email, `Assigned new role: ${newRole}`);
  };

  const handleDeleteUser = (userId: string) => {
    if (!checkPermission('manageUsers')) {
      alert("Permission Denied: Your assigned supervisor role restricts user deletions.");
      return;
    }
    const targetUser = users.find(u => u.id === userId);
    if (!targetUser) return;
    
    if (confirm(`Are you sure you want to permanently delete user ${targetUser.firstName} ${targetUser.lastName} (${targetUser.email})? This and their general operations role will be restricted.`)) {
      const updatedUsers = users.filter(u => u.id !== userId);
      setUsers(updatedUsers);
      syncWithStorage(
        'users',
        updatedUsers,
        'USER_DELETE',
        targetUser.email,
        `Permanently removed user registry record for ${targetUser.firstName} ${targetUser.lastName}.`
      );
    }
  };

  const handleRegisterCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkPermission('manageUsers')) {
      alert("Permission Denied: Supervisor role does not support registering new core directory entries.");
      return;
    }
    if (!newCustFirstName || !newCustLastName || !newCustEmail) {
      alert("First Name, Last Name, and Email are required.");
      return;
    }

    const balance = parseFloat(newCustBalance) || 0;
    const newId = `usr-${Date.now()}`;
    const newCust: AdminUser = {
      id: newId,
      firstName: newCustFirstName,
      lastName: newCustLastName,
      email: newCustEmail,
      accountType: newCustAccountType,
      role: newCustRole,
      status: newCustStatus,
      createdDate: new Date().toISOString().split('T')[0],
      balance: balance
    };

    const updatedUsers = [newCust, ...users];
    setUsers(updatedUsers);

    // Automatically create a corresponding bank account for the newly registered customer
    const newAccNumber = Math.floor(100000000 + Math.random() * 900000000).toString();
    const nextAcc: AdminAccount = {
      accountNumber: newAccNumber,
      email: newCustEmail,
      name: `${newCustFirstName} ${newCustLastName} Premium checking`,
      type: 'Checking',
      balance: balance,
      rate: 0.15,
      overdraftAllowed: newCustAccountType === 'Business',
      status: newCustStatus === 'Suspended' ? 'Frozen' : 'Open'
    };

    const updatedAccounts = [nextAcc, ...accounts];
    setAccounts(updatedAccounts);
    saveAdminStore('accounts', updatedAccounts);

    // Create a transaction record to log the welcome credit / initial deposit
    if (balance > 0) {
      const newTxId = `tx-${Date.now()}`;
      const newTx: AdminTransaction = {
        id: newTxId,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
        email: newCustEmail,
        name: `${newCustFirstName} ${newCustLastName}`,
        type: 'Deposit',
        amount: balance,
        status: 'Cleared',
        counterparty: 'Initial Core Registry Fund Inflow'
      };
      const updatedTxs = [newTx, ...transactions];
      setTransactions(updatedTxs);
      saveAdminStore('transactions', updatedTxs);
    }

    // Reset customer registration fields
    setNewCustFirstName('');
    setNewCustLastName('');
    setNewCustEmail('');
    setNewCustBalance('');
    setNewCustAccountType('Personal');
    setNewCustRole('Compliance');
    setNewCustStatus('Active');

    syncWithStorage(
      'users',
      updatedUsers,
      'USER_REGISTRY_ADD',
      newCustEmail,
      `Registered new customer ${newCustFirstName} ${newCustLastName} with role ${newCustRole} and status ${newCustStatus}. Allocated checking account #${newAccNumber}.`
    );
  };

  // Account Asset Mutator
  const handleUpdateAccountBalance = (accountNumber: string) => {
    if (!checkPermission('manageAccounts')) {
      alert("Permission Denied: Financial balance mutation block in place.");
      return;
    }
    const amount = parseFloat(accModValue);
    if (isNaN(amount)) {
      alert("Please provide a valid cash numeric figure.");
      return;
    }

    const account = accounts.find(a => a.accountNumber === accountNumber);
    if (!account) return;

    const oldBalance = account.balance;
    const nextBalance = amount;
    const updatedAccounts = accounts.map(a => a.accountNumber === accountNumber ? { ...a, balance: nextBalance } : a);
    
    setAccounts(updatedAccounts);
    setModifyingAccKey(null);
    setAccModValue('');

    syncWithStorage(
      'accounts',
      updatedAccounts,
      'ACCOUNT_MUTATE_BALANCE',
      account.email,
      `Balance manually mutated from $${oldBalance.toFixed(2)} to $${nextBalance.toFixed(2)} (Acc: ${accountNumber})`
    );
  };

  const handleUpdateAccount = (accountNumber: string) => {
    if (!checkPermission('manageAccounts')) {
      alert("Permission Denied.");
      return;
    }
    const bal = parseFloat(accModValue);
    const rate = parseFloat(accModRate);
    if (isNaN(bal) || isNaN(rate)) {
      alert("Invalid balance or rate.");
      return;
    }

    const updated = accounts.map(a => a.accountNumber === accountNumber ? {
      ...a,
      name: accModName,
      email: accModEmail,
      type: accModType,
      balance: bal,
      rate: rate
    } : a);

    setAccounts(updated);
    setModifyingAccKey(null);
    syncWithStorage('accounts', updated, 'ACCOUNT_UPDATE', accModEmail, `Updated account ${accountNumber}`);
  };

  const handleUpdateUser = (id: string) => {
    if (!checkPermission('manageUsers')) {
      alert("Permission Denied.");
      return;
    }
    const bal = parseFloat(userModBalance);
    if (isNaN(bal)) {
      alert("Invalid balance.");
      return;
    }

    const oldUser = users.find(u => u.id === id);
    if (!oldUser) return;

    const diff = Math.abs(bal - oldUser.balance);
    if (diff > suspiciousThreshold) {
      const newNotif: AdminNotification = {
        id: `notif-${Date.now()}`,
        title: 'Suspicious Balance Edit',
        body: `User ${oldUser.email} balance modified from $${oldUser.balance.toFixed(2)} to $${bal.toFixed(2)}. Exceeds threshold of $${suspiciousThreshold.toLocaleString()}.`,
        type: 'Critical Alert',
        targetSegment: 'Admin Staff',
        dispatchedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
        status: 'Active',
        clicksCount: 0
      };
      const updatedNotifs = [newNotif, ...notifications];
      setNotifications(updatedNotifs);
      setActiveToast({ title: newNotif.title, body: newNotif.body });
      syncWithStorage(
        'notifications_state',
        updatedNotifs,
        'SUSPICIOUS_BALANCE_EDIT',
        oldUser.email,
        `Flagged manual balance change of $${diff.toFixed(2)} beyond threshold of $${suspiciousThreshold}`
      );
    }

    const updated = users.map(u => u.id === id ? { 
      ...u, 
      firstName: userModFirstName, 
      lastName: userModLastName, 
      email: userModEmail, 
      role: userModRole, 
      accountType: userModAccountType,
      balance: bal,
      status: userModStatus
    } : u);
    setUsers(updated);
    setModifyingUserId(null);
    syncWithStorage('users', updated, 'USER_UPDATE', userModEmail, `Modified user details for ${userModEmail}`);
  };

  const handleUpdateTransaction = (id: string) => {
    if (!checkPermission('manageTransactions')) {
      alert("Permission Denied.");
      return;
    }
    const amt = parseFloat(txModAmount);
    if (isNaN(amt)) {
      alert("Invalid amount.");
      return;
    }
    const updated = transactions.map(t => t.id === id ? { 
      ...t, 
      counterparty: txModCounterparty, 
      amount: amt, 
      status: txModStatus,
      otpCode: txModOTP
    } : t);
    setTransactions(updated);
    setModifyingTxId(null);
    syncWithStorage('transactions', updated, 'TRANSACTION_UPDATE', String(id), `Modified transaction details for ID: ${id}`);
  };

  const handleToggleAccountFreeze = (accountNumber: string) => {
    if (!checkPermission('manageAccounts')) {
      alert("Permission Denied.");
      return;
    }
    const account = accounts.find(a => a.accountNumber === accountNumber);
    if (!account) return;
    const nextState = account.status === 'Open' ? 'Frozen' : 'Open';

    const updatedAccounts = accounts.map(a => a.accountNumber === accountNumber ? { ...a, status: nextState } : a);
    setAccounts(updatedAccounts);

    syncWithStorage(
      'accounts',
      updatedAccounts,
      'ACCOUNT_FREEZE_TOGGLE',
      account.email,
      `Toggled status verification state to: ${nextState} (Acc: ${accountNumber})`
    );
  };

  const handleCreateTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkPermission('manageTransactions')) {
      alert("Permission Denied: Supervisor cannot seed manual transaction records.");
      return;
    }
    const amount = parseFloat(txAmount);
    if (!txEmail || isNaN(amount) || !txCounterparty) {
      alert("Please complete every field correctly.");
      return;
    }

    const nextTx: AdminTransaction = {
      id: `tx-gen-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      email: txEmail,
      name: txEmail.split('@')[0],
      type: txType,
      amount,
      status: 'Cleared',
      counterparty: txCounterparty
    };

    const updatedTxs = [nextTx, ...transactions];
    setTransactions(updatedTxs);
    
    // Also update account balance if we find a matching user account
    const matchingAccounts = accounts.filter(a => a.email === txEmail);
    if (matchingAccounts.length > 0) {
      const primaryAcc = matchingAccounts[0];
      const balChange = txType === 'Deposit' ? amount : -amount;
      const updatedAccounts = accounts.map(a => 
        a.accountNumber === primaryAcc.accountNumber ? { ...a, balance: Math.max(0, a.balance + balChange) } : a
      );
      setAccounts(updatedAccounts);
      saveAdminStore('accounts', updatedAccounts);
    }

    txAmount && setTxAmount('');
    setTxEmail('');
    setTxCounterparty('');

    syncWithStorage(
      'transactions',
      updatedTxs,
      'TRANSACTION_SECURE_INJECT',
      txEmail,
      `Manual operational ${txType} entry of $${amount.toFixed(2)} with counterparty: ${txCounterparty}`
    );
  };

  // Transaction Actions (Flag / Clear)
  const handleToggleFlagTransaction = (txId: string) => {
    if (!checkPermission('manageTransactions')) {
      alert("Permission Denied.");
      return;
    }
    const targetTx = transactions.find(t => t.id === txId);
    if (!targetTx || targetTx.status === 'Successfully') return;

    const nextStatus = targetTx.status === 'Flagged' ? 'Successfully' : 'Flagged';
    const updated = transactions.map(t => t.id === txId ? { ...t, status: nextStatus } : t);
    setTransactions(updated);

    syncWithStorage(
      'transactions',
      updated,
      'TRANSACTION_SECURITY_FLAG',
      targetTx.email,
      `Toggled safety surveillance flag status on transaction #${txId} to ${nextStatus}`
    );
  };

  // Bulk actions & Export feature
  const handleBulkMarkReviewed = () => {
    if (!checkPermission('manageTransactions')) {
      alert("Permission Denied.");
      return;
    }
    if (selectedTxIds.length === 0) return;
    
    const updatedTxs = transactions.map(tx => {
      if (selectedTxIds.includes(tx.id)) {
        return { ...tx, status: 'Successfully' as const };
      }
      return tx;
    });
    
    setTransactions(updatedTxs);
    syncWithStorage(
      'transactions',
      updatedTxs,
      'BULK_TRANSACTION_REVIEW',
      'multiple@lumina.com',
      `Bulk approved and marked ${selectedTxIds.length} transactions as Cleared/Reviewed`
    );
    setSelectedTxIds([]);
  };

  const handleExportCSV = () => {
    // Current surveillance log represented by filteredTxs
    const headers = ['Transaction ID', 'Timestamp', 'Origin Name', 'Email', 'Type', 'Narrative / Destination', 'Amount ($)', 'Transfer Status'];
    
    const rows = filteredTxs.map(tx => [
      tx.id,
      tx.timestamp,
      tx.name,
      tx.email,
      tx.type,
      tx.counterparty,
      tx.amount.toFixed(2),
      tx.status
    ]);
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))].join('\n');
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    const timestampStr = new Date().toISOString().replace(/[:.]/g, '-');
    link.setAttribute("download", `Lumina_Surveillance_Log_${timestampStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    syncWithStorage(
      'transactions',
      transactions,
      'EXPORT_SURVEILLANCE_LOG',
      'System Admin',
      `Exported ${filteredTxs.length} records matching search/filter constraints to CSV format.`
    );
  };

  // Crypto Management
  const handleUpdateCrypto = (address: string) => {
    if (!checkPermission('manageCrypto')) {
      alert("Permission Denied.");
      return;
    }
    const bal = parseFloat(cryptoModBalance);
    const fiat = parseFloat(cryptoModFiat);
    if (isNaN(bal) || isNaN(fiat)) {
      alert("Invalid balance or fiat values.");
      return;
    }

    const updated = cryptoWallets.map(w => w.address === address ? {
      ...w,
      email: cryptoModEmail,
      asset: cryptoModAsset,
      balance: bal,
      fiatValue: fiat
    } : w);

    setCryptoWallets(updated);
    setModifyingCryptoAddress(null);
    syncWithStorage('crypto', updated, 'CRYPTO_WALLET_UPDATE', cryptoModEmail, `Modified properties of hotwallet ${address}`);
  };

  const handleCreateCrypto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkPermission('manageCrypto')) {
      alert("Permission Denied.");
      return;
    }
    if (!newCryptoEmail || !newCryptoAddress) {
      alert("Please fill out required fields.");
      return;
    }
    
    const bal = parseFloat(newCryptoBalance || '0');
    const fiat = parseFloat(newCryptoFiat || '0');
    
    const nextWallet: CryptoWallet = {
      email: newCryptoEmail,
      asset: newCryptoAsset,
      address: newCryptoAddress,
      balance: bal,
      fiatValue: fiat,
      status: 'Enabled'
    };
    
    const updated = [nextWallet, ...cryptoWallets];
    setCryptoWallets(updated);
    setShowCreateCryptoForm(false);
    
    // reset form
    setNewCryptoEmail('');
    setNewCryptoAsset('BTC');
    setNewCryptoAddress('');
    setNewCryptoBalance('');
    setNewCryptoFiat('');
    
    syncWithStorage('crypto', updated, 'CRYPTO_WALLET_CREATE', newCryptoEmail, `Provisioned new hotwallet address ${newCryptoAddress} for ${newCryptoAsset}`);
  };

  const handleToggleSwapWalletStatus = (address: string) => {
    if (!checkPermission('manageCrypto')) {
      alert("Permission Denied.");
      return;
    }
    const wallet = cryptoWallets.find(w => w.address === address);
    if (!wallet) return;

    const nextState = wallet.status === 'Enabled' ? 'Disabled' : 'Enabled';
    const updated = cryptoWallets.map(w => w.address === address ? { ...w, status: nextState } : w);
    setCryptoWallets(updated);

    syncWithStorage(
      'crypto',
      updated,
      'CRYPTO_WALLET_ACCESS_MOD',
      wallet.email,
      `Toggled network access of hotwallet ${wallet.asset} address ${address} to ${nextState}`
    );
  };

  // Compliance & KYC approvals
  const handleVerifyKyc = (kycId: string, docType: 'passport' | 'face' | 'utility', decision: 'Approved' | 'Rejected' | 'Pending') => {
    if (!checkPermission('approveKyc')) {
      alert("Permission Denied: Supervisor compliance license restricted.");
      return;
    }
    const target = kycSubmissions.find(k => k.id === kycId);
    if (!target) return;

    const updated = kycSubmissions.map(k => {
      if (k.id === kycId) {
        let updateObj = {};
        if (docType === 'passport') updateObj = { passportStatus: decision };
        if (docType === 'face') updateObj = { faceStatus: decision };
        if (docType === 'utility') updateObj = { utilityStatus: decision };

        const nextK = { ...k, ...updateObj };
        
        // If all approved, let's fasttrack user verification status
        if (decision === 'Approved' && nextK.passportStatus === 'Approved' && nextK.faceStatus === 'Approved' && nextK.utilityStatus === 'Approved') {
          const updatedUsers = users.map(u => u.email === k.email ? { ...u, status: 'Active' as const } : u);
          setUsers(updatedUsers);
          saveAdminStore('users', updatedUsers);
        }

        return nextK;
      }
      return k;
    });

    setKycSubmissions(updated);
    const updatedK = updated.find(k => k.id === kycId);
    if (updatedK) setSelectedKyc(updatedK);

    syncWithStorage(
      'kyc',
      updated,
      'KYC_EVI_DECISION',
      target.email,
      `Evaluated compliance document (${docType}) status to: ${decision}`
    );
  };

  // Bulk compliance KYC approval or rejection
  const handleBulkKycVerify = (decision: 'Approved' | 'Rejected' | 'Pending') => {
    if (!checkPermission('approveKyc')) {
      alert("Permission Denied: Supervisor compliance license restricted.");
      return;
    }
    if (selectedKycIds.length === 0) {
      alert("Please select at least one compliance record from the list.");
      return;
    }

    let updatedUsers = [...users];
    const updatedSubmissions = kycSubmissions.map(k => {
      if (selectedKycIds.includes(k.id)) {
        const nextK = {
          ...k,
          passportStatus: decision,
          faceStatus: decision,
          utilityStatus: decision
        };
        
        if (decision === 'Approved') {
          updatedUsers = updatedUsers.map(u => u.email === k.email ? { ...u, status: 'Active' as const } : u);
        }
        return nextK;
      }
      return k;
    });

    setKycSubmissions(updatedSubmissions);
    setUsers(updatedUsers);
    saveAdminStore('users', updatedUsers);
    
    // Update currently active detail view if it was part of selected elements
    if (selectedKyc && selectedKycIds.includes(selectedKyc.id)) {
      setSelectedKyc({
        ...selectedKyc,
        passportStatus: decision,
        faceStatus: decision,
        utilityStatus: decision
      });
    }

    const processedCount = selectedKycIds.length;
    setSelectedKycIds([]);

    syncWithStorage(
      'kyc',
      updatedSubmissions,
      'KYC_BULK_DECISION',
      'System compliance roster',
      `Bulk processed ${processedCount} KYC submissions to: ${decision} status`
    );
  };

  // Delete compliance KYC submission
  const handleDeleteKyc = (kycId: string) => {
    if (!checkPermission('approveKyc')) {
      alert("Permission Denied: Supervisor compliance license restricted.");
      return;
    }
    const target = kycSubmissions.find(k => k.id === kycId);
    if (!target) return;

    const updated = kycSubmissions.filter(k => k.id !== kycId);
    setKycSubmissions(updated);
    
    if (selectedKyc?.id === kycId) {
      setSelectedKyc(updated.length > 0 ? updated[0] : null);
    }

    syncWithStorage(
      'kyc',
      updated,
      'KYC_SUBMISSION_DELETE',
      target.email,
      `Deleted compiled KYC submission for applicant: ${target.name} (${kycId})`
    );
  };

  // Create compliance KYC submission
  const handleCreateKyc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkPermission('approveKyc')) {
      alert("Permission Denied: Supervisor compliance license restricted.");
      return;
    }

    if (!kycFormName.trim() || !kycFormEmail.trim()) {
      alert("Please provide at least a Name and Email address.");
      return;
    }

    const nextId = `kyc-${100 + kycSubmissions.length + Math.floor(Math.random() * 100)}`;
    const newRecord: KycSubmission = {
      id: nextId,
      name: kycFormName.trim(),
      email: kycFormEmail.trim(),
      submittedDate: new Date().toISOString().split('T')[0],
      passportUrl: `https://lumina-vault.s3.amazonaws.com/kyc/passports/img_${nextId}.png`,
      selfieUrl: `https://lumina-vault.s3.amazonaws.com/kyc/selfies/face_${nextId}.png`,
      utilityBillUrl: `https://lumina-vault.s3.amazonaws.com/kyc/utility/residence_${nextId}.png`,
      passportStatus: kycFormPassportStatus,
      faceStatus: kycFormFaceStatus,
      utilityStatus: kycFormUtilityStatus,
      notes: kycFormNotes.trim() || 'No supervisor logs accompanied submission.',
    };

    const updated = [newRecord, ...kycSubmissions];
    setKycSubmissions(updated);
    setSelectedKyc(newRecord);
    setShowCreateKycForm(false);

    // Reset fields
    setKycFormName('');
    setKycFormEmail('');
    setKycFormNotes('');
    setKycFormPassportStatus('Pending');
    setKycFormFaceStatus('Pending');
    setKycFormUtilityStatus('Pending');

    syncWithStorage(
      'kyc',
      updated,
      'KYC_SUBMISSION_CREATE',
      newRecord.email,
      `Manually created KYC application reference for: ${newRecord.name} (${newRecord.id})`
    );
  };

  // Support Inbox Reply
  const handleSendTicketReply = (ticketId: string) => {
    if (!checkPermission('replyTickets')) {
      alert("Permission Denied.");
      return;
    }
    if (!ticketReplyText.trim()) return;

    const updated = tickets.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          status: 'In Progress' as const,
          replies: [
            ...t.replies,
            {
              sender: 'agent' as const,
              text: ticketReplyText,
              timestamp: new Date().toISOString().replace('T', ' ').substring(0, 5) + ' (Agent)'
            }
          ]
        };
      }
      return t;
    });

    setTickets(updated);
    setTicketReplyText('');
    const cur = updated.find(t => t.id === ticketId);
    if (cur) setSelectedTicket(cur);

    const matchTkt = tickets.find(t => t.id === ticketId);
    if (matchTkt) {
      syncWithStorage(
        'tickets',
        updated,
        'SUPPORT_REPLY_SENT',
        matchTkt.email,
        `Dispatched administrative ticketing supervisor advice responding to ticket: ${ticketId}`
      );
    }
  };

  const handleResolveTicket = (ticketId: string) => {
    if (!checkPermission('replyTickets')) {
      alert("Permission Denied.");
      return;
    }
    const updated = tickets.map(t => t.id === ticketId ? { ...t, status: 'Resolved' as const } : t);
    setTickets(updated);
    const cur = updated.find(t => t.id === ticketId);
    if (cur) setSelectedTicket(cur);

    const matchTkt = tickets.find(t => t.id === ticketId);
    if (matchTkt) {
      syncWithStorage(
        'tickets',
        updated,
        'SUPPORT_TICKET_CLOSE',
        matchTkt.email,
        `Toggled compliance support ticket ${ticketId} status to Resolved.`
      );
    }
  };

  const handleGenerateOTP = async (email: string, transactionId: string) => {
    if (!email) {
      setActiveToast({
        title: "Missing Email",
        body: "Cannot generate OTP for a transaction without an associated email address."
      });
      return;
    }
    try {
      const response = await fetch('/api/otp/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, transactionId }),
      });
      if (response.ok) {
        const data = await response.json();
        const generatedOtp = data.otp;
        
        setActiveToast({
          title: "OTP Generated Successfully",
          body: `Verification Code: ${generatedOtp}. Notification has been dispatched to ${email}.`
        });
        
        // Update local transaction state
        const updatedTxs = transactions.map(tx => 
          tx.id === transactionId ? { ...tx, otpCode: generatedOtp } : tx
        );
        setTransactions(updatedTxs);
        saveAdminStore('transactions', updatedTxs);
        
        syncWithStorage('transactions', updatedTxs, 'OTP_GENERATE', email, `Generated OTP ${generatedOtp} for transaction ${transactionId}`);
      } else {
        const errorData = await response.json().catch(() => ({}));
        setActiveToast({
          title: "Transmission Error",
          body: errorData.error || "Failed to communicate with the secure OTP generation gateway."
        });
      }
    } catch (e) {
      console.error(e);
      setActiveToast({
        title: "System Exception",
        body: "An unexpected error occurred while processing the security token request."
      });
    }
  };

  // CMS Updates
  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkPermission('manageNews')) {
      alert("Permission Denied: Supervisor role does not support notice publication permissions.");
      return;
    }
    if (!newAnnTitle || !newAnnContent) {
      alert("Must provide headline title and narrative content.");
      return;
    }

    const nextAnn: Announcement = {
      id: `ann-${Date.now()}`,
      title: newAnnTitle,
      category: newAnnCategory,
      summary: newAnnSummary || newAnnContent.substring(0, 100) + '...',
      content: newAnnContent,
      published: true,
      date: new Date().toISOString().split('T')[0]
    };

    const updated = [nextAnn, ...announcements];
    setAnnouncements(updated);
    setNewAnnTitle('');
    setNewAnnSummary('');
    setNewAnnContent('');

    syncWithStorage(
      'announcements',
      updated,
      'CMS_NOTICE_PUBLISH',
      'System-Wide',
      `Published global notice bulletin: "${nextAnn.title}" under section ${nextAnn.category}`
    );
  };

  const handleDeleteAnnouncement = (id: string) => {
    if (!checkPermission('manageNews')) {
      alert("Permission Denied.");
      return;
    }
    const match = announcements.find(a => a.id === id);
    const updated = announcements.filter(a => a.id !== id);
    setAnnouncements(updated);

    if (match) {
      syncWithStorage(
        'announcements',
        updated,
        'CMS_NOTICE_DELETE',
        'System-Wide',
        `Deleted global notice board document id: ${id} ("${match.title}")`
      );
    }
  };

  // Role Permissions modification live matrix
  const handleTogglePermissionBit = (roleName: string, permissionCode: keyof RolePermissions) => {
    if (activeSupervisor.role !== 'Admin') {
      alert("Critical Error: Restricting permission matrix modifications strictly to Level-1 Administrator credentials.");
      return;
    }
    const updated = {
      ...rolePermissions,
      [roleName]: {
        ...rolePermissions[roleName],
        [permissionCode]: !rolePermissions[roleName][permissionCode]
      }
    };
    setRolePermissions(updated);
    syncWithStorage(
      'permissions',
      updated,
      'ROLES_MATRIX_MUTATE',
      roleName,
      `Altered permission state: bitwise ${permissionCode} toggled`
    );
  };

  // System Configurations Toggles
  const handleToggleFeatureFlag = (key: keyof FeatureToggles) => {
    if (!checkPermission('toggleFeatures')) {
      alert("Permission Denied: High level setting modification blocked.");
      return;
    }
    const nextVal = !toggles[key];
    const updated = { ...toggles, [key]: nextVal };
    setToggles(updated);

    syncWithStorage(
      'toggles',
      updated,
      'FEATURE_TOGGLE_MUTATE',
      'Feature-Gate',
      `Toggled option: ${key} set to ${nextVal}`
    );
  };

  const handleUpdateSystemSetting = (key: keyof SystemSettings, val: any) => {
    if (!checkPermission('editSystemSettings')) {
      alert("Permission Denied.");
      return;
    }
    const oldVal = system[key];
    const updated = { ...system, [key]: val };
    setSystem(updated);

    syncWithStorage(
      'system',
      updated,
      'SYS_PARAMETER_CHANGE',
      'Site-Wide',
      `Updated default ${key} parameter from ${oldVal} to ${val}`
    );
  };

  const handleToggleMaintenanceMode = () => {
    const nextState = !system.maintenanceMode;
    handleUpdateSystemSetting('maintenanceMode', nextState);
  };

  // Seeder trigger helpers
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = categoryFilter === 'All' || 
      (categoryFilter === 'Admin' && user.role === 'Admin') ||
      (categoryFilter === 'Compliance' && user.role !== 'Admin');
    const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
    return matchesSearch && matchesFilter && matchesStatus;
  });

  const filteredTxs = transactions.filter(tx => {
    const matchesSearch = 
      tx.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.counterparty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = categoryFilter === 'All' || tx.type === categoryFilter;
    const matchesStatus = statusFilter === 'All' || tx.status === statusFilter;
    return matchesSearch && matchesFilter && matchesStatus;
  });

  // Calculate high level summaries for overview
  const totalAssetsSum = accounts
    .filter(a => a.type !== 'Loan')
    .reduce((sum, current) => sum + current.balance, 0);
  const activeLoansSum = accounts
    .filter(a => a.type === 'Loan')
    .reduce((sum, current) => sum + current.balance, 0);
  const totalCryptoFiat = cryptoWallets.reduce((sum, c) => sum + c.fiatValue, 0);
  const totalFlaggedCount = transactions.filter(t => t.status === 'Flagged').length;
  const unresolvedTickets = tickets.filter(t => t.status !== 'Resolved').length;
  const kycPendingCount = kycSubmissions.filter(k => 
    k.passportStatus === 'Pending' || k.faceStatus === 'Pending' || k.utilityStatus === 'Pending'
  ).length;

  // Recharts Seed Charts Data Formatter
  const dailyTxVolumeData = [
    { day: 'Mon', Standard: 18000, WireTransfer: 42000, Swaps: 800 },
    { day: 'Tue', Standard: 24000, WireTransfer: 15000, Swaps: 1200 },
    { day: 'Wed', Standard: 16000, WireTransfer: 88000, Swaps: 2300 },
    { day: 'Thu', Standard: 31000, WireTransfer: 34000, Swaps: 1900 },
    { day: 'Fri', Standard: 45000, WireTransfer: 125000, Swaps: 5120 },
    { day: 'Sat', Standard: 12000, WireTransfer: 11000, Swaps: 6500 },
    { day: 'Sun', Standard: 8500, WireTransfer: 5000, Swaps: 4100 }
  ];

  const estimatedCorporateRevenue = [
    { source: 'Swap spreads', amount: 12300, color: '#10b981' },
    { source: 'Sovereign interest premium', amount: 31450, color: '#3b82f6' },
    { source: 'Wire transaction processing', amount: 4800, color: '#8b5cf6' },
    { source: 'Commercial checking licenses', amount: 18400, color: '#f59e0b' }
  ];

  // Helper to calculate the frequency of flagged transactions over the last 30 days
  const getFlaggedTxsChartData = () => {
    const counts: Record<string, number> = {};
    const endDate = new Date(2026, 5, 19); // June 19, 2026 based on mock system date
    for (let i = 29; i >= 0; i--) {
      const d = new Date(endDate);
      d.setDate(endDate.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      counts[dateStr] = 0;
    }

    transactions.forEach((tx) => {
      if (tx.status === 'Flagged' && tx.timestamp) {
        const datePart = tx.timestamp.substring(0, 10);
        if (counts[datePart] !== undefined) {
          counts[datePart]++;
        }
      }
    });

    return Object.entries(counts).map(([date, count]) => {
      const parts = date.split('-');
      const month = parts[1];
      const day = parts[2];
      const mNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const formattedDate = `${mNames[parseInt(month, 10) - 1]} ${parseInt(day, 10)}`;
      return {
        date: formattedDate,
        'Flagged': count,
      };
    });
  };

  const flaggedChartData = getFlaggedTxsChartData();

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 antialiased -mt-0">
      {/* REAL-TIME SYSTEM ALERTS TOASTER */}
      {activeToast && (
        <div className={`fixed top-6 right-6 z-[9999] max-w-sm w-80 shadow-2xl rounded-lg p-4 animate-in fade-in slide-in-from-top-4 duration-300 flex gap-3 ${
          activeToast.title.includes('Successfully') || activeToast.title.includes('OTP') ? 'bg-emerald-50 border-l-4 border-emerald-500' : 'bg-rose-50 border-l-4 border-rose-500'
        }`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
            activeToast.title.includes('Successfully') || activeToast.title.includes('OTP') ? 'bg-emerald-100' : 'bg-rose-100'
          }`}>
            <AlertTriangle className={`w-4 h-4 ${
              activeToast.title.includes('Successfully') || activeToast.title.includes('OTP') ? 'text-emerald-600' : 'text-rose-600'
            }`} />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <span className={`text-[10px] font-bold uppercase tracking-wider font-mono ${
                activeToast.title.includes('Successfully') || activeToast.title.includes('OTP') ? 'text-emerald-800' : 'text-rose-800'
              }`}>
                {activeToast.title.includes('Successfully') || activeToast.title.includes('OTP') ? 'System Confirmation' : 'Security Alert'}
              </span>
              <button onClick={() => setActiveToast(null)} className="text-slate-400 hover:text-slate-600 text-xs">✕</button>
            </div>
            <h4 className="text-xs font-extrabold text-slate-900 mt-1">{activeToast.title}</h4>
            <p className="text-[11px] text-slate-700 mt-1 leading-relaxed">{activeToast.body}</p>
            <div className="mt-2.5 flex justify-end gap-1">
              <button 
                onClick={() => { setActiveTab('audit'); setActiveToast(null); }} 
                className={`${
                  activeToast.title.includes('Successfully') || activeToast.title.includes('OTP') ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'
                } text-white text-[10px] font-bold px-2 py-1 rounded`}
              >
                Inspect Logs
              </button>
              <button 
                onClick={() => setActiveToast(null)} 
                className="bg-slate-200 text-slate-700 hover:bg-slate-300 text-[10px] font-bold px-2 py-1 rounded"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col md:flex-row">
        {/* SIDE BAR NAVIGATION */}
        <aside className="w-full md:w-64 bg-slate-50 p-6 flex flex-col gap-6 border-r border-slate-200 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-emerald-600 text-white px-2.5 py-1 rounded font-bold text-sm tracking-widest">CONSOLE</span>
              <span className="text-slate-500 text-xs font-semibold tracking-widest">ADMIN V2</span>
            </div>
            <p className="text-slate-500 text-xs">Lumina Strategic Operations Portal</p>
          </div>

          <div className="p-3.5 bg-white/60 rounded-lg border border-slate-200/80">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="p-1 rounded bg-emerald-500/10 text-emerald-600">
                <Server className="w-3.5 h-3.5" />
              </span>
              <span className="text-xs font-semibold uppercase text-slate-700">Active Supervisor</span>
            </div>
            <div className="text-sm font-bold text-slate-900 truncate">{activeSupervisor.firstName}</div>
            <div className="text-xs text-slate-500 flex items-center justify-between mt-1">
              <span>Permission profile:</span>
              <span className="text-emerald-600 font-bold font-mono">{activeSupervisor.role}</span>
            </div>
          </div>

          <nav className="flex flex-col gap-1.5 flex-1">
            <button 
              onClick={() => { setActiveTab('overview'); setSearchQuery(''); }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center gap-3 transition-colors ${activeTab === 'overview' ? 'bg-emerald-600 text-white' : 'text-slate-700 hover:bg-white'}`}
            >
              <Database className="w-4 h-4" />
              <span>View Analytics Dashboard</span>
            </button>

            <button 
              onClick={() => { setActiveTab('users'); setSearchQuery(''); }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center gap-3 transition-colors ${activeTab === 'users' ? 'bg-emerald-600 text-white' : 'text-slate-700 hover:bg-white'}`}
            >
              <Users className="w-4 h-4" />
              <span>Manage Users</span>
            </button>

            <button 
              onClick={() => { setActiveTab('accounts'); setSearchQuery(''); }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center gap-3 transition-colors ${activeTab === 'accounts' ? 'bg-emerald-600 text-white' : 'text-slate-700 hover:bg-white'}`}
            >
              <Wallet className="w-4 h-4" />
              <span>Adjust Account Balances</span>
            </button>

            <button 
              onClick={() => { setActiveTab('transactions'); setSearchQuery(''); }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center gap-3 transition-colors ${activeTab === 'transactions' ? 'bg-emerald-600 text-white' : 'text-slate-700 hover:bg-white'}`}
            >
              <Activity className="w-4 h-4" />
              <span>Transactions</span>
              {totalFlaggedCount > 0 && <span className="ml-auto bg-amber-500 text-slate-950 font-bold text-xs h-5 px-1.5 flex items-center justify-center rounded">{totalFlaggedCount}</span>}
            </button>

            <button 
              onClick={() => { setActiveTab('crypto'); setSearchQuery(''); }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center gap-3 transition-colors ${activeTab === 'crypto' ? 'bg-emerald-600 text-white' : 'text-slate-700 hover:bg-white'}`}
            >
              <Zap className="w-4 h-4" />
              <span>Manage Cryptocurrency</span>
            </button>

            <button 
              onClick={() => { setActiveTab('kyc'); setSearchQuery(''); }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center gap-3 transition-colors ${activeTab === 'kyc' ? 'bg-emerald-600 text-white' : 'text-slate-700 hover:bg-white'}`}
            >
              <FileCheck className="w-4 h-4" />
              <span>KYC Submissions</span>
              {kycPendingCount > 0 && <span className="ml-auto bg-blue-500 text-slate-900 font-bold text-xs h-5 px-1.5 flex items-center justify-center rounded">{kycPendingCount}</span>}
            </button>

            <button 
              onClick={() => { setActiveTab('support'); setSearchQuery(''); }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center gap-3 transition-colors ${activeTab === 'support' ? 'bg-emerald-600 text-white' : 'text-slate-700 hover:bg-white'}`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Support Tickets</span>
              {unresolvedTickets > 0 && <span className="ml-auto bg-rose-500 text-slate-900 font-bold text-xs h-5 px-1.5 flex items-center justify-center rounded">{unresolvedTickets}</span>}
            </button>

            <button 
              onClick={() => { setActiveTab('news'); setSearchQuery(''); }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center gap-3 transition-colors ${activeTab === 'news' ? 'bg-emerald-600 text-white' : 'text-slate-700 hover:bg-white'}`}
            >
              <Newspaper className="w-4 h-4" />
              <span>Announcements & notifications</span>
            </button>

            <button 
              onClick={() => { setActiveTab('audit'); setSearchQuery(''); }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center gap-3 transition-colors ${activeTab === 'audit' ? 'bg-emerald-600 text-white' : 'text-slate-700 hover:bg-white'}`}
            >
              <FileText className="w-4 h-4" />
              <span>View Audit Logs</span>
            </button>

            <button 
              onClick={() => { setActiveTab('settings'); setSearchQuery(''); }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center gap-3 transition-colors ${activeTab === 'settings' ? 'bg-emerald-600 text-white' : 'text-slate-700 hover:bg-white'}`}
            >
              <Settings className="w-4 h-4" />
              <span>Platform Settings</span>
            </button>
          </nav>

          <div className="pt-4 border-t border-slate-200 text-center">
            <span className="text-[10px] text-slate-500 font-mono">System Up-time: 99.98%</span>
          </div>
        </aside>

        {/* MAIN BODY WORKSPACE */}
        <main className="flex-grow p-6 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          {/* HEADER SUMMARY SECTION */}
          <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-6">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
                <span>Lumina Admin Operations</span>
                <span className="text-xs bg-slate-200 text-slate-500 border border-slate-300 px-2 py-0.5 rounded uppercase font-mono font-normal">v2.1.2</span>
              </h1>
              <p className="text-sm text-slate-500 mt-1">Manage global user credentials, asset distributions, compliance files, and real-time ledger audits.</p>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800"
                onClick={() => {
                  initializeMockDatabase();
                  // Force refresh state variables from local storage
                  setUsers(getMockUsers());
                  setAccounts(getMockAccounts());
                  setTransactions(getMockTransactions());
                  setCryptoWallets(getMockCrypto());
                  setKycSubmissions(getMockKyc());
                  setTickets(getMockTickets());
                  setAnnouncements(getMockAnnouncements());
                  setAuditLogs(getMockAuditLogs());
                  setToggles(getMockToggles());
                  setSystem(getMockSystem());
                }}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reload Database State
              </Button>
              <Button 
                variant="outline" 
                className="bg-rose-100/40 hover:bg-rose-200/40 border-rose-850 text-rose-350 hover:text-rose-200 font-bold"
                onClick={() => {
                  try {
                    localStorage.removeItem('lumina_session');
                    addAuditLog(
                      `${activeSupervisor.firstName} ${activeSupervisor.lastName}`,
                      activeSupervisor.role,
                      'USER_LOGOUT',
                      activeSupervisor.email,
                      'Administrator logged out from operations panel. Session ended.'
                    );
                  } catch (e) {
                    console.warn("Logout error:", e);
                  }
                  navigate('/login');
                }}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Admin Logout
              </Button>
            </div>
          </header>

          {/* TAB CONTENT: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="flex flex-col gap-6">
              {/* METRICS BENTO GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-6 bg-slate-50 border-slate-200 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">AUM Standard Assets</span>
                    <span className="p-2 bg-emerald-500/10 text-emerald-600 rounded">
                      <DollarSign className="w-5 h-5" />
                    </span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-2xl font-bold text-slate-900">${totalAssetsSum.toLocaleString()}</h3>
                    <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>+4.25% yield compounding weekly</span>
                    </p>
                  </div>
                </Card>

                <Card className="p-6 bg-slate-50 border-slate-200 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Total Loans</span>
                    <span className="p-2 bg-yellow-500/10 text-yellow-400 rounded">
                      <TrendingUp className="w-5 h-5" />
                    </span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-2xl font-bold text-slate-900">${activeLoansSum.toLocaleString()}</h3>
                    <p className="text-xs text-slate-500 mt-1">Average SBALoans Interest rate: 6.75%</p>
                  </div>
                </Card>

                <Card className="p-6 bg-slate-50 border-slate-200 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Managed Crypto Reserve</span>
                    <span className="p-2 bg-blue-500/10 text-blue-600 rounded">
                      <Zap className="w-5 h-5" />
                    </span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-2xl font-bold text-slate-900">${totalCryptoFiat.toLocaleString()} <span className="text-xs text-slate-500">fiat eq</span></h3>
                    <p className="text-xs text-slate-500 mt-1">Hotwallet status: Secured (Multi-sig)</p>
                  </div>
                </Card>

                <Card className="p-6 bg-slate-50 border-slate-200 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Compliance Queue</span>
                    <span className="p-2 bg-rose-500/10 text-rose-600 rounded">
                      <ShieldIcon className="w-5 h-5" />
                    </span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-2xl font-bold text-slate-900">
                      {kycPendingCount} <span className="text-sm font-normal text-slate-500">KYC</span> / {unresolvedTickets} <span className="text-sm font-normal text-slate-500">Tickets</span>
                    </h3>
                    <p className="text-xs text-rose-600 mt-1 font-semibold flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 animate-pulse" />
                      <span>Immediate operational checklist inspection required</span>
                    </p>
                  </div>
                </Card>
              </div>

              {/* INTEGRATED CHARTS ROW */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* TRANSACTION VOLUME */}
                <Card className="p-6 bg-slate-50 border-slate-200 md:col-span-2">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">Ledger Flow Vol</h2>
                      <p className="text-slate-500 text-xs">Standard checking vs. corporate wires vs. instant crypto swaps</p>
                    </div>
                    <span className="text-xs font-medium text-emerald-600 font-mono">+12.4% avg daily increase</span>
                  </div>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={dailyTxVolumeData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorWire" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorStd" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="day" stroke="#64748b" />
                        <YAxis stroke="#64748b" />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }} />
                        <Area type="monotone" dataKey="WireTransfer" stroke="#3b82f6" fillOpacity={1} fill="url(#colorWire)" name="Wire Transfers ($)" />
                        <Area type="monotone" dataKey="Standard" stroke="#10b981" fillOpacity={1} fill="url(#colorStd)" name="Deposits & Checking ($)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                {/* REVENUE BREAKDOWN */}
                <Card className="p-6 bg-slate-50 border-slate-200">
                  <div className="mb-6">
                    <h2 className="text-lg font-bold text-slate-900">Revenue Breakdowns</h2>
                    <p className="text-slate-500 text-xs">Weekly projections from dynamic spreads & processing</p>
                  </div>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={estimatedCorporateRevenue} layout="vertical" margin={{ top: 10, right: 10, left: 30, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                        <XAxis type="number" stroke="#64748b" />
                        <YAxis type="category" dataKey="source" stroke="#64748b" width={80} style={{ fontSize: '10px' }} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }} />
                        <Bar dataKey="amount" fill="#3b82f6" radius={[0, 4, 4, 0]} name="Income ($)">
                          {estimatedCorporateRevenue.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </div>

              {/* LIVE MARKET EXCHANGE & STOCK PERFORMANCE CHART */}
              <LiveMarketTicker />

              {/* REAL-TIME SYSTEM LOG AUDIT TICKER */}
              <Card className="p-6 bg-slate-50 border-slate-200 text-xs font-mono">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-200">
                  <span className="text-xs uppercase font-bold text-slate-700 flex items-center gap-1.5">
                    <Database className="w-4 h-4 text-emerald-600" />
                    <span>Secure Audit Logs Ticker (Recent Operations)</span>
                  </span>
                  <span className="text-[10px] text-slate-500">Auto-Refreshes live</span>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                  {auditLogs.slice(0, 6).map((log) => (
                    <div key={log.id} className="flex justify-between items-start gap-4 p-2 rounded hover:bg-white border-l-2 border-slate-300 hover:border-emerald-500 transition-colors">
                      <div>
                        <span className="text-emerald-500">[{log.timestamp}]</span>{' '}
                        <span className="text-blue-600 font-semibold">{log.operator} ({log.role})</span>{' '}
                        <span className="text-amber-600 font-bold">{log.action}</span>{' '}
                        <span className="text-slate-800">{log.details}</span>
                      </div>
                      <span className="text-slate-500 whitespace-nowrap">IP: {log.ipAddress}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* TAB CONTENT: USERS */}
          {activeTab === 'users' && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Directory List Column */}
              <div className="xl:col-span-2">
                <Card className="p-6 bg-slate-50 border-slate-200">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">User Registrations Directory</h2>
                      <p className="text-slate-500 text-xs text-left">Maintain registry access parameters and designate supervisor titles.</p>
                    </div>
                    
                    {/* Search / Filters block */}
                    <div className="flex flex-wrap gap-2 w-full md:w-auto">
                      {selectedUserIds.length > 0 && (
                        <div className="bg-emerald-50 text-emerald-800 p-2 rounded flex items-center gap-4">
                          <span className="text-xs font-bold">{selectedUserIds.length} selected</span>
                          <select className="bg-white text-xs border border-emerald-200 rounded px-2 py-1" onChange={(e) => e.target.value && handleBulkUpdateUserStatus(e.target.value as any)}>
                            <option value="">Status...</option>
                            <option value="Active">Active</option>
                            <option value="Pending">Pending</option>
                            <option value="Suspended">Suspended</option>
                            <option value="KYC Pending">KYC Pending</option>
                          </select>
                        </div>
                      )}
                      
                      <div className="relative flex-grow md:flex-grow-0">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input 
                          type="text" 
                          placeholder="Search accounts / names..." 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-white text-slate-900 rounded border border-slate-200 pl-9 pr-4 py-1.5 text-xs focus:ring focus:ring-emerald-500/50 outline-none"
                        />
                      </div>
                      <select 
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="bg-white text-slate-900 rounded border border-slate-200 px-3 py-1.5 text-xs outline-none"
                      >
                        <option value="All">All Roles</option>
                        <option value="Admin">Admin</option>
                        <option value="Compliance">Customer</option>
                      </select>
                      <select 
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-white text-slate-900 rounded border border-slate-200 px-3 py-1.5 text-xs outline-none"
                      >
                        <option value="All">All States</option>
                        <option value="Active">Active</option>
                        <option value="Pending">Pending</option>
                        <option value="Suspended">Suspended</option>
                        <option value="KYC Pending">KYC Pending</option>
                      </select>

                      <div className="flex items-center gap-1 bg-white rounded border border-slate-200 px-2 py-1.5 text-xs">
                        <span className="text-slate-500 font-medium whitespace-nowrap">Alert Limit:</span>
                        <span className="text-slate-400">$</span>
                        <input 
                          type="number" 
                          className="w-16 bg-transparent text-slate-800 focus:outline-none font-bold text-xs" 
                          value={suspiciousThreshold} 
                          onChange={(e) => {
                            const val = parseFloat(e.target.value) || 0;
                            setSuspiciousThreshold(val);
                            localStorage.setItem('lumina_admin_suspicious_threshold', val.toString());
                          }} 
                          placeholder="10000"
                        />
                      </div>
                    </div>
                  </div>

                  {/* DATA TABLE */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-500 uppercase font-bold bg-white/30">
                          <th className="py-3 px-4 w-10">
                            <input 
                              type="checkbox" 
                              checked={selectedUserIds.length === filteredUsers.length && filteredUsers.length > 0}
                              onChange={(e) => setSelectedUserIds(e.target.checked ? filteredUsers.map(u => u.id) : [])}
                            />
                          </th>
                          <th className="py-3 px-4">User Details</th>
                          <th className="py-3 px-4">Registry Email</th>
                          <th className="py-3 px-4">Signup Balance</th>
                          <th className="py-3 px-4">Security Level</th>
                          <th className="py-3 px-4">Verif Status</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {filteredUsers.map((user) => modifyingUserId === user.id ? (
                          <tr key={user.id} className="hover:bg-white/50 transition-colors bg-slate-50/50">
                            <td className="py-3.5 px-4"><input type="checkbox" disabled /></td>
                            <td className="py-3.5 px-4 font-semibold text-slate-900">
                              <div className="flex gap-2">
                                <input className="w-20 bg-white border border-slate-200 rounded px-2 py-1 text-xs" value={userModFirstName || ''} onChange={e => setUserModFirstName(e.target.value)} placeholder="First" />
                                <input className="w-20 bg-white border border-slate-200 rounded px-2 py-1 text-xs" value={userModLastName || ''} onChange={e => setUserModLastName(e.target.value)} placeholder="Last" />
                              </div>
                            </td>
                            <td className="py-3.5 px-4 text-slate-700 font-mono">
                              <input className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-xs" value={userModEmail || ''} onChange={e => setUserModEmail(e.target.value)} />
                            </td>
                            <td className="py-3.5 px-4 text-slate-700">
                              <input type="number" className="w-24 bg-white border border-slate-200 rounded px-2 py-1 text-xs" value={userModBalance || ''} onChange={e => setUserModBalance(e.target.value)} />
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="flex gap-1 flex-col xl:flex-row">
                                <select className="bg-white border border-slate-200 rounded px-2 py-1 text-xs" value={userModRole || 'Admin'} onChange={e => setUserModRole(e.target.value as any)}>
                                  <option value="Admin">Admin</option>
                                  <option value="Compliance">Customer</option>
                                </select>
                                <select className="bg-white border border-slate-200 rounded px-2 py-1 text-xs" value={userModAccountType || 'Personal'} onChange={e => setUserModAccountType(e.target.value as any)}>
                                  <option value="Personal">Personal</option>
                                  <option value="Business">Business</option>
                                </select>
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              <select className="bg-white border border-slate-200 rounded px-2 py-1 text-xs" value={userModStatus || 'Active'} onChange={e => setUserModStatus(e.target.value as any)}>
                                <option value="Active">Active</option>
                                <option value="Pending">Pending</option>
                                <option value="Suspended">Suspended</option>
                                <option value="KYC Pending">KYC Pending</option>
                              </select>
                            </td>
                            <td className="py-3.5 px-4 text-right flex items-center justify-end gap-1.5">
                              <button onClick={() => handleUpdateUser(user.id)} className="text-emerald-500 hover:text-emerald-600" title="Save"><Check className="w-4 h-4" /></button>
                              <button onClick={() => setModifyingUserId(null)} className="text-rose-500 hover:text-rose-600" title="Cancel"><XCircle className="w-4 h-4" /></button>
                            </td>
                          </tr>
                        ) : (
                          <tr key={user.id} className="hover:bg-white/50 transition-colors">
                            <td className="py-3.5 px-4">
                              <input 
                                type="checkbox" 
                                checked={selectedUserIds.includes(user.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedUserIds([...selectedUserIds, user.id]);
                                  } else {
                                    setSelectedUserIds(selectedUserIds.filter(id => id !== user.id));
                                  }
                                }}
                              />
                            </td>
                            <td className="py-3.5 px-4 font-semibold text-slate-900">
                              <div>
                                {user.firstName} {user.lastName} 
                                <span className="ml-2 text-[10px] text-slate-500 font-normal">({user.accountType})</span>
                              </div>
                            </td>
                            <td className="py-3.5 px-4 text-slate-700 font-mono">{user.email}</td>
                            <td className="py-3.5 px-4 text-slate-700">${user.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                            <td className="py-3.5 px-4">
                              <select 
                                value={user.role === 'Admin' ? 'Admin' : 'Compliance'}
                                onChange={(e) => handleUpdateUserRole(user.id, e.target.value as any)}
                                className="bg-white border border-slate-200 px-2 py-1 rounded text-slate-700 font-semibold text-[11px] focus:outline-none"
                              >
                                <option value="Admin">Admin</option>
                                <option value="Compliance">Customer</option>
                              </select>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-bold text-[10px] ${
                                user.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600' :
                                user.status === 'Suspended' ? 'bg-rose-500/10 text-rose-600' :
                                user.status === 'Pending' ? 'bg-amber-500/10 text-amber-600' : 'bg-blue-500/10 text-blue-600'
                              }`}>
                                <span className={`h-1.5 w-1.5 rounded-full ${
                                  user.status === 'Active' ? 'bg-emerald-400' :
                                  user.status === 'Suspended' ? 'bg-rose-400' :
                                  user.status === 'Pending' ? 'bg-amber-400' : 'bg-blue-400'
                                }`} />
                                {user.status}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right flex items-center justify-end gap-1.5">
                              <button 
                                onClick={() => {
                                  setModifyingUserId(user.id);
                                  setUserModFirstName(user.firstName);
                                  setUserModLastName(user.lastName);
                                  setUserModEmail(user.email);
                                  setUserModRole(user.role);
                                  setUserModAccountType(user.accountType);
                                  setUserModBalance(user.balance.toString());
                                  setUserModStatus(user.status);
                                }}
                                className="px-2 py-1 rounded text-[10px] font-bold border border-slate-300 bg-white text-slate-700 hover:bg-slate-200 transition-colors"
                              >
                                Edit
                              </button>
                              <button 
                                onClick={() => handleToggleUserStatus(user.id)}
                                className={`px-3 py-1 text-[10px] font-bold rounded ring-1 transition-all ${
                                  user.status === 'Suspended' 
                                    ? 'bg-emerald-100 text-emerald-300 ring-emerald-800 hover:bg-emerald-910' 
                                    : 'bg-rose-100 text-rose-300 ring-rose-800 hover:bg-rose-910'
                                }`}
                              >
                                {user.status === 'Suspended' ? 'Reinstate' : 'Suspend'}
                              </button>
                              <button 
                                onClick={() => handleDeleteUser(user.id)}
                                className="px-2 py-1 text-[10px] font-bold rounded ring-1 bg-red-950/40 text-rose-600 ring-red-900/60 hover:bg-red-900/50 transition-all flex items-center gap-1"
                                title="Delete User Permanently"
                              >
                                <Trash2 className="w-3 h-3 text-rose-600" />
                                <span>Delete</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>

              {/* Add/Register Customer Column */}
              <div>
                <Card className="p-6 bg-slate-50 border-slate-200 h-fit">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="p-1 px-1.5 bg-emerald-500/10 rounded border border-emerald-500/20">
                        <Plus className="w-4 h-4 text-emerald-600" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900">Add Customer Entry</h3>
                    </div>
                    <p className="text-slate-500 text-xs">Insert a verified customer record, assign credentials, security roles, and optionally set up initial dynamic bank deposit ledger balances.</p>
                  </div>

                  <form onSubmit={handleRegisterCustomer} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        label="First Name"
                        placeholder="John"
                        value={newCustFirstName || ''}
                        onChange={(e) => setNewCustFirstName(e.target.value)}
                        required
                        className="bg-white border-slate-200 text-slate-900 sm:text-xs"
                      />
                      <Input
                        label="Last Name"
                        placeholder="Doe"
                        value={newCustLastName || ''}
                        onChange={(e) => setNewCustLastName(e.target.value)}
                        required
                        className="bg-white border-slate-200 text-slate-900 sm:text-xs"
                      />
                    </div>

                    <Input
                      label="Registry Email Address"
                      type="email"
                      placeholder="john.doe@example.com"
                      value={newCustEmail || ''}
                      onChange={(e) => setNewCustEmail(e.target.value)}
                      required
                      className="bg-white border-slate-200 text-slate-900 sm:text-xs"
                    />

                    <div className="grid grid-cols-2 gap-3">
                      <Select
                        label="Account Class"
                        options={[
                          { value: 'Personal', label: 'Personal' },
                          { value: 'Business', label: 'Business' }
                        ]}
                        value={newCustAccountType || ''}
                        onChange={(e) => setNewCustAccountType(e.target.value as any)}
                        className="bg-white border-slate-200 text-slate-900 select-sm text-xs"
                      />

                      <Select
                        label="Security Level (Role)"
                        options={[
                          { value: 'Compliance', label: 'Customer' },
                          { value: 'Admin', label: 'Admin' }
                        ]}
                        value={newCustRole === 'Admin' ? 'Admin' : 'Compliance'}
                        onChange={(e) => setNewCustRole(e.target.value as any)}
                        className="bg-white border-slate-200 text-slate-900 select-sm text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Select
                        label="Startup Status"
                        options={[
                          { value: 'Active', label: 'Active User' },
                          { value: 'Pending', label: 'Pending' },
                          { value: 'Suspended', label: 'Suspended' },
                          { value: 'KYC Pending', label: 'KYC Pending' }
                        ]}
                        value={newCustStatus || ''}
                        onChange={(e) => setNewCustStatus(e.target.value as any)}
                        className="bg-white border-slate-200 text-slate-900 select-sm text-xs"
                      />

                      <Input
                        label="Initial Balance ($)"
                        placeholder="12500"
                        type="number"
                        value={newCustBalance || ''}
                        onChange={(e) => setNewCustBalance(e.target.value)}
                        className="bg-white border-slate-200 text-slate-900 sm:text-xs"
                      />
                    </div>

                    <Button type="submit" variant="secondary" className="w-full h-10 py-2 text-xs font-extrabold text-slate-950 bg-amber-400 hover:bg-amber-300 border-none mt-2">
                      Secure Register Customer
                    </Button>
                  </form>
                </Card>
              </div>
            </div>
          )}

          {/* TAB CONTENT: ACCOUNTS */}
          {activeTab === 'accounts' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* ACCOUNTS DIRECTORY */}
              <div className="lg:col-span-2">
                <Card className="p-6 bg-slate-50 border-slate-200">
                  <div className="mb-6">
                    <h2 className="text-lg font-bold text-slate-900">Asset Accounts Portfolio</h2>
                    <p className="text-slate-500 text-xs">Configure savings yields, checking balances, and manage loans.</p>
                  </div>

                  <div className="space-y-4">
                    {accounts.map((acc) => (
                      <div key={acc.accountNumber} className="p-4 bg-white border border-slate-200 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-slate-300 transition-colors">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono font-bold text-slate-700">#{acc.accountNumber}</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              acc.type === 'Checking' ? 'bg-emerald-200/30 text-emerald-600 border border-emerald-800/40' :
                              acc.type === 'Savings' ? 'bg-blue-900/30 text-blue-600 border border-blue-800/40' : 'bg-amber-900/30 text-amber-600 border border-amber-300/40'
                            }`}>{acc.type}</span>
                            
                            {acc.status === 'Frozen' && (
                              <span className="bg-rose-100 text-rose-600 border border-rose-800/40 text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                                <Lock className="w-3 h-3" /> FROZEN
                              </span>
                            )}
                          </div>
                          
                          <div className="text-sm font-bold text-slate-900 mb-0.5">{acc.name}</div>
                          <div className="text-xs text-slate-500 truncate max-w-xs md:max-w-md">Email: {acc.email}</div>
                        </div>

                        <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                          <div className="text-right">
                            <div className="text-base font-extrabold text-slate-900">
                              {modifyingAccKey === acc.accountNumber ? (
                                <div className="flex flex-col gap-1.5 items-end">
                                  <input className="bg-slate-50 text-slate-900 rounded border border-slate-200 px-2 py-1 text-xs w-full" value={accModName || ''} onChange={e => setAccModName(e.target.value)} placeholder="Name" />
                                  <input className="bg-slate-50 text-slate-900 rounded border border-slate-200 px-2 py-1 text-xs w-full" value={accModEmail || ''} onChange={e => setAccModEmail(e.target.value)} placeholder="Email" />
                                  <div className="flex gap-1">
                                    <select className="bg-slate-50 text-slate-900 rounded border border-slate-200 px-2 py-1 text-xs" value={accModType || 'Checking'} onChange={e => setAccModType(e.target.value as any)}>
                                      <option value="Checking">Checking</option>
                                      <option value="Savings">Savings</option>
                                      <option value="Loan">Loan</option>
                                    </select>
                                    <input type="number" className="bg-slate-50 text-slate-900 rounded border border-slate-200 px-2 py-1 text-xs w-16" value={accModRate || ''} onChange={e => setAccModRate(e.target.value)} placeholder="Rate" />
                                  </div>
                                  <input type="number" className="bg-slate-50 text-slate-900 rounded border border-slate-200 px-2 py-1 text-xs w-24 text-right" value={accModValue || ''} onChange={e => setAccModValue(e.target.value)} placeholder="Balance" />
                                  <div className="flex gap-1">
                                    <button onClick={() => handleUpdateAccount(acc.accountNumber)} className="text-emerald-500 hover:text-emerald-600"><Check className="w-4 h-4" /></button>
                                    <button onClick={() => setModifyingAccKey(null)} className="text-rose-500 hover:text-rose-600"><XCircle className="w-4 h-4" /></button>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2 group">
                                  <span>${acc.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                  <button onClick={() => { 
                                    setModifyingAccKey(acc.accountNumber); 
                                    setAccModValue(acc.balance.toString()); 
                                    setAccModName(acc.name);
                                    setAccModEmail(acc.email);
                                    setAccModType(acc.type);
                                    setAccModRate(acc.rate.toString()); 
                                  }} className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-slate-900 transition-opacity">
                                    <Edit2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              )}
                            </div>
                            <div className="text-[10px] text-slate-500 font-semibold">
                              Yield: {acc.rate}% APY
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button 
                              variant={acc.status === 'Open' ? 'outline' : 'secondary'}
                              className={`px-2.5 py-1 text-[11px] h-8 ${acc.status === 'Open' ? 'border-rose-200 bg-rose-50 text-rose-350 hover:bg-rose-100' : ''}`}
                              onClick={() => handleToggleAccountFreeze(acc.accountNumber)}
                            >
                              {acc.status === 'Open' ? 'Freeze' : 'Unfreeze'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* MANUAL SIMULATED WIRE ENTRY */}
              <Card className="p-6 bg-slate-50 border-slate-200 h-fit">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-900">Manual Ledger Entry</h3>
                  <p className="text-slate-500 text-xs">Direct banking operations, wires, deposits, or custom credit adjustment logs.</p>
                </div>
                
                <form onSubmit={handleCreateTransaction} className="space-y-4">
                  <Input 
                    label="User Email Identity" 
                    placeholder="sarah.j@gmail.com" 
                    value={txEmail || ''}
                    onChange={(e) => setTxEmail(e.target.value)}
                    required
                    className="bg-white border-slate-200 text-slate-900 sm:text-xs"
                  />
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Select 
                      label="Transaction Code" 
                      options={[
                        { value: 'Deposit', label: 'Deposit' },
                        { value: 'Withdrawal', label: 'Withdrawal' },
                        { value: 'Transfer', label: 'Transfer' },
                        { value: 'Wire', label: 'Wire Transfer' },
                        { value: 'Swap', label: 'Swap' }
                      ]}
                      value={txType}
                      onChange={(e) => setTxType(e.target.value as any)}
                      className="bg-white border-slate-200 text-slate-900 select-sm text-xs"
                    />

                    <Input 
                      label="Cash Sum ($)" 
                      type="number"
                      placeholder="1500" 
                      value={txAmount}
                      onChange={(e) => setTxAmount(e.target.value)}
                      required
                      className="bg-white border-slate-805 text-slate-900 sm:text-xs"
                    />
                  </div>

                  <Input 
                    label="Counterparty Narrative" 
                    placeholder="ACH Payroll / ATM branch #42" 
                    value={txCounterparty}
                    onChange={(e) => setTxCounterparty(e.target.value)}
                    required
                    className="bg-white border-slate-200 text-slate-900 sm:text-xs"
                  />

                  <Button type="submit" variant="secondary" className="w-full h-10 py-2 text-xs font-bold text-slate-900 bg-emerald-400 hover:bg-emerald-500">
                    Inject Ledger Record
                  </Button>
                </form>
              </Card>
            </div>
          )}

          {/* TAB CONTENT: TRANSACTIONS & SECURE AUDITS */}
          {activeTab === 'transactions' && (
            <div className="space-y-6">
              {/* Flagged Transactions surveillance line chart */}
              <Card className="p-5 bg-slate-50 border-slate-200">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Activity className="w-4 h-4 text-amber-500" />
                      Transfer Status Trend: Flagged Transaction Frequency (Last 30 Days)
                    </h3>
                    <p className="text-[11px] text-slate-500">Live surveillance line chart mapping real-time frequency of flagged transfer logs across policy nodes.</p>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded text-[10px] font-bold text-amber-600">
                    Active Flags: {transactions.filter(t => t.status === 'Flagged').length}
                  </div>
                </div>
                <div className="h-48 mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={flaggedChartData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis 
                        dataKey="date" 
                        stroke="#64748b" 
                        fontSize={10}
                        tickLine={false}
                      />
                      <YAxis 
                        stroke="#64748b" 
                        fontSize={10}
                        tickLine={false}
                        allowDecimals={false}
                        domain={[0, 'auto']}
                      />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', color: '#f1f5f9' }}
                        itemStyle={{ color: '#f59e0b', fontSize: '11px' }}
                        labelStyle={{ color: '#94a3b8', fontSize: '10px', fontWeight: 'bold' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="Flagged" 
                        stroke="#f59e0b" 
                        strokeWidth={2} 
                        dot={{ r: 3, stroke: '#ef4444', strokeWidth: 1, fill: '#0f172a' }}
                        activeDot={{ r: 5, stroke: '#f59e0b', strokeWidth: 1.5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {showCreateTxForm && (
                <Card className="p-6 bg-slate-50 border-slate-200 border-l-4 border-l-emerald-500">
                  <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <Plus className="w-4 h-4 text-emerald-600" />
                        Incept Live Wire & Transaction Record
                      </h4>
                      <p className="text-[11px] text-slate-500">Create directly into the surveillance ledger. System matching will perform live balance adjustments.</p>
                    </div>
                  </div>
                  
                  <form onSubmit={(e) => {
                    handleCreateTransaction(e);
                    setShowCreateTxForm(false);
                  }} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1.5">User Email Identity</label>
                      <input 
                        type="email" 
                        placeholder="sarah.j@gmail.com" 
                        value={txEmail || ''}
                        onChange={(e) => setTxEmail(e.target.value)}
                        required
                        className="w-full bg-white border border-slate-200 text-slate-900 rounded px-3 py-2 text-xs focus:ring focus:ring-emerald-500/50 outline-none animate-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1.5">Transaction Code</label>
                      <select 
                        value={txType || ''}
                        onChange={(e) => setTxType(e.target.value as any)}
                        className="w-full bg-white border border-slate-200 text-slate-900 rounded px-3 py-2 text-xs focus:ring focus:ring-emerald-500/50 outline-none animate-none"
                      >
                        <option value="Deposit">Deposit</option>
                        <option value="Withdrawal">Withdrawal</option>
                        <option value="Transfer">Transfer</option>
                        <option value="Wire">Wire Transfer</option>
                        <option value="Swap">Swap</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1.5">Cash Sum ($)</label>
                      <input 
                        type="number"
                        placeholder="1500" 
                        value={txAmount || ''}
                        onChange={(e) => setTxAmount(e.target.value)}
                        required
                        className="w-full bg-white border border-slate-200 text-slate-900 rounded px-3 py-2 text-xs focus:ring focus:ring-emerald-500/50 outline-none animate-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1.5">Counterparty Narrative</label>
                      <input 
                        type="text" 
                        placeholder="ACH Payroll / Direct Wire" 
                        value={txCounterparty || ''}
                        onChange={(e) => setTxCounterparty(e.target.value)}
                        required
                        className="w-full bg-white border border-slate-200 text-slate-900 rounded px-3 py-2 text-xs focus:ring focus:ring-emerald-500/50 outline-none animate-none"
                      />
                    </div>
                    <div className="md:col-span-4 flex justify-end gap-2 pt-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="text-xs h-8 px-3 py-1 bg-white text-slate-500 hover:text-slate-900 border-slate-200"
                        onClick={() => setShowCreateTxForm(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit" 
                        variant="secondary" 
                        className="text-xs h-8 px-4 py-1 text-slate-950 font-bold bg-emerald-400 hover:bg-emerald-500"
                      >
                        Inject Wire Record
                      </Button>
                    </div>
                  </form>
                </Card>
              )}

              <Card className="p-6 bg-slate-50 border-slate-200">
                <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-6">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Live Wire & Transaction surveillance</h2>
                    <p className="text-slate-500 text-xs text-left">Intercept transfer alarms, reverse transactions, and analyze suspicious account withdrawals.</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 w-full xl:w-auto">
                    <Button 
                      variant="outline" 
                      className="bg-emerald-100/40 hover:bg-emerald-200/40 border-emerald-850 text-emerald-350 hover:text-emerald-250 text-xs px-3 py-1.5 h-8 font-bold flex items-center gap-1.5"
                      onClick={() => setShowCreateTxForm(!showCreateTxForm)}
                    >
                      <Plus className="w-3.5 h-3.5" />
                      {showCreateTxForm ? 'Hide Form' : 'Create Record'}
                    </Button>

                    <Button 
                      variant="outline" 
                      className="bg-white hover:bg-slate-200 border-slate-200 text-slate-700 hover:text-slate-900 text-xs px-3 py-1.5 h-8 font-bold flex items-center gap-1.5"
                      onClick={handleExportCSV}
                    >
                      <Download className="w-3.5 h-3.5" />
                      Export Report
                    </Button>

                    <div className="relative flex-1 sm:flex-none">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-700" />
                      <input 
                        type="text" 
                        placeholder="Recipient, amount, txid..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full sm:w-48 bg-white text-slate-900 rounded border border-slate-200 pl-9 pr-4 py-1.5 text-xs focus:ring focus:ring-emerald-500/50 outline-none"
                      />
                    </div>
                    
                    <select 
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="bg-white text-slate-900 rounded border border-slate-200 px-3 py-1.5 text-xs outline-none"
                    >
                      <option value="All">All Types</option>
                      <option value="Deposit">Deposit</option>
                      <option value="Withdrawal">Withdrawal</option>
                      <option value="Transfer">Transfer</option>
                      <option value="Wire">Wire</option>
                      <option value="Swap">Swap</option>
                    </select>

                    <select 
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="bg-white text-slate-900 rounded border border-slate-200 px-3 py-1.5 text-xs outline-none"
                    >
                      <option value="All">All States</option>
                      <option value="Cleared">Cleared</option>
                      <option value="Pending">Pending</option>
                      <option value="Flagged">Flagged</option>
                    </select>
                  </div>
                </div>

                {/* Bulk Actions Banner */}
                {selectedTxIds.length > 0 && (
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-emerald-100/25 border border-emerald-800/40 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-2">
                      <CheckSquare className="w-4 h-4 text-emerald-600" />
                      <span className="text-slate-800 text-xs font-semibold">
                        {selectedTxIds.length} transaction{selectedTxIds.length > 1 ? 's' : ''} selected
                      </span>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <button 
                        onClick={handleBulkMarkReviewed}
                        className="w-full sm:w-auto px-3 py-1 bg-emerald-400 hover:bg-emerald-500 text-slate-950 font-bold rounded text-xs transition-colors flex items-center justify-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Mark as Reviewed (Clear Flags)
                      </button>
                      <button 
                        onClick={() => setSelectedTxIds([])}
                        className="w-full sm:w-auto px-3 py-1 bg-white hover:bg-slate-200 text-slate-500 border border-slate-200 hover:text-slate-900 rounded text-xs transition-colors"
                      >
                        Clear Selection
                      </button>
                    </div>
                  </div>
                )}

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase bg-white/30">
                        <th className="py-3 px-4 w-10 text-center">
                          <input 
                            type="checkbox"
                            checked={filteredTxs.length > 0 && filteredTxs.every(t => selectedTxIds.includes(t.id))}
                            onChange={(e) => {
                              if (e.target.checked) {
                                const toAdd = filteredTxs.map(t => t.id);
                                setSelectedTxIds(prev => Array.from(new Set([...prev, ...toAdd])));
                              } else {
                                const toRemove = filteredTxs.map(t => t.id);
                                setSelectedTxIds(prev => prev.filter(id => !toRemove.includes(id)));
                              }
                            }}
                            className="rounded bg-white border-slate-200 text-emerald-500 focus:ring-emerald-500 cursor-pointer h-3.5 w-3.5"
                          />
                        </th>
                        <th className="py-3 px-4">Transaction ID</th>
                        <th className="py-3 px-4">Timestamp</th>
                        <th className="py-3 px-4">Account Origin</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4 text-rose-350">Narrative / Destination</th>
                        <th className="py-3 px-4">Funds ($)</th>
                        <th className="py-3 px-4">Transfer Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-[11px] font-mono">
                      {filteredTxs.map((tx) => (
                        <tr key={tx.id} className={`hover:bg-white transition-colors ${tx.status === 'Flagged' ? 'bg-amber-100/20' : ''}`}>
                          <td className="py-3 px-4 w-10 text-center">
                            <input 
                              type="checkbox"
                              checked={selectedTxIds.includes(tx.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedTxIds(prev => [...prev, tx.id]);
                                } else {
                                  setSelectedTxIds(prev => prev.filter(id => id !== tx.id));
                                }
                              }}
                              className="rounded bg-white border-slate-200 text-emerald-500 focus:ring-emerald-500 cursor-pointer h-3.5 w-3.5"
                            />
                          </td>
                          <td className="py-3 px-4 font-bold text-slate-800">{tx.id}</td>
                          <td className="py-3 px-4 text-slate-500">{tx.timestamp}</td>
                          <td className="py-3 px-4 text-slate-900 font-sans">
                            <div className="font-semibold">{tx.name}</div>
                            <div className="text-[10px] text-slate-500">{tx.email}</div>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                              tx.type === 'Wire' ? 'text-blue-600 border border-blue-900/40 bg-blue-900/10' :
                              tx.type === 'Swap' ? 'text-purple-400 border border-purple-900/40 bg-purple-900/10' :
                              'text-slate-700 border border-slate-200 bg-white/50'
                            }`}>{tx.type}</span>
                          </td>
                          {modifyingTxId === tx.id ? (
                            <>
                              <td className="py-3 px-4">
                                <input className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded px-2 py-1 text-xs mb-1" value={txModCounterparty || ''} onChange={e => setTxModCounterparty(e.target.value)} />
                                <div className="flex flex-col gap-1.5 mt-1">
                                  <input className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded px-2 py-1.5 text-xs font-mono" value={txModOTP || ''} onChange={e => setTxModOTP(e.target.value)} placeholder="Verification OTP" />
                                  <div className="flex gap-2">
                                    <button 
                                      onClick={() => handleUpdateTransaction(tx.id)} 
                                      className="flex-1 bg-emerald-600 text-white rounded py-2 text-[10px] font-black uppercase tracking-tight hover:bg-emerald-700 transition-all shadow-md flex items-center justify-center gap-1.5"
                                    >
                                      <Check className="w-3.5 h-3.5" /> Confirm
                                    </button>
                                    <button 
                                      onClick={() => setModifyingTxId(null)} 
                                      className="flex-1 bg-slate-200 text-slate-700 rounded py-2 text-[10px] font-black uppercase tracking-tight hover:bg-rose-600 hover:text-white transition-all shadow-sm flex items-center justify-center gap-1.5 border border-slate-300"
                                    >
                                      <XCircle className="w-3.5 h-3.5" /> Reject
                                    </button>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <input type="number" className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded px-2 py-1 text-xs" value={txModAmount || ''} onChange={e => setTxModAmount(e.target.value)} />
                              </td>
                              <td className="py-3 px-4">
                                <select className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded px-2 py-1 text-xs" value={txModStatus} onChange={e => setTxModStatus(e.target.value as any)}>
                                  <option value="Successfully">Successfully</option>
                                  <option value="Pending">Pending</option>
                                  <option value="Hold">Hold</option>
                                  <option value="Reject">Reject</option>
                                  <option value="Flagged">Flagged</option>
                                </select>
                              </td>
                            </>
                          ) : (
                            <>
                              <td className="py-3 px-4 text-slate-700 font-sans">{tx.counterparty}</td>
                              <td className="py-3 px-4 text-slate-900 font-bold">${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                              <td className="py-3 px-4">
                                <span className={`inline-flex items-center gap-1 font-bold ${
                                  tx.status === 'Flagged' ? 'text-amber-600' :
                                  tx.status === 'Pending' ? 'text-blue-600' : 
                                  tx.status === 'Hold' ? 'text-orange-600' :
                                  tx.status === 'Reject' ? 'text-rose-600' : 'text-emerald-600'
                                }`}>
                                  {tx.status === 'Flagged' && <AlertTriangle className="w-3.5 h-3.5" />}
                                  {tx.status}
                                </span>
                              </td>
                            </>
                          )}
                          <td className="py-3 px-4 text-right font-sans">
                            <div className="flex gap-1 justify-end items-center">
                              {modifyingTxId === tx.id ? (
                                <div className="w-full text-right pr-2">
                                  <span className="text-[9px] font-bold text-slate-400 italic">Editing active session...</span>
                                </div>
                              ) : (
                                <>
                                  <button 
                                    onClick={() => {
                                      setModifyingTxId(tx.id);
                                      setTxModCounterparty(tx.counterparty);
                                      setTxModAmount(tx.amount.toString());
                                      setTxModStatus(tx.status);
                                      setTxModOTP(tx.otpCode || '');
                                    }}
                                    className="px-2 py-1 rounded text-[10px] font-bold border border-slate-300 bg-white text-slate-700 hover:bg-slate-200 transition-colors"
                                  >
                                    Edit
                                  </button>
                                  <button 
                                    onClick={() => handleGenerateOTP(tx.email, tx.id)}
                                    className="px-2 py-1 rounded text-[10px] bg-indigo-100 border border-indigo-800 text-indigo-700 font-bold hover:bg-indigo-200 transition-colors"
                                  >
                                    Gen OTP
                                  </button>
                                  {tx.status === 'Successfully' ? (
                                    <button 
                                      disabled
                                      className="px-2 py-1 rounded text-[10px] font-bold border border-emerald-200/30 bg-emerald-100/10 text-emerald-600 cursor-not-allowed opacity-80"
                                    >
                                      Transfer Successfully
                                    </button>
                                  ) : (
                                    <button 
                                      onClick={() => handleToggleFlagTransaction(tx.id)}
                                      className={`px-2 py-1 rounded text-[10px] font-bold border transition-colors ${
                                        tx.status === 'Flagged' 
                                          ? 'bg-white border-slate-300 hover:bg-slate-200 text-slate-700' 
                                          : 'bg-amber-100 border-amber-300 text-amber-700 hover:bg-amber-900'
                                      }`}
                                    >
                                      {tx.status === 'Flagged' ? 'Clear Suspicion' : 'Status Hold'}
                                    </button>
                                  )}

                                  <button 
                                    onClick={() => {
                                      if (confirm(`Proceed to reverse wire audit log ${tx.id}? This will safely deduct balances.`)) {
                                        // Reverse the transaction by creating opposite entry
                                        const reversedTxs = transactions.filter(t => t.id !== tx.id);
                                        setTransactions(reversedTxs);
                                        syncWithStorage('transactions', reversedTxs, 'TRANSACTION_REVERSAL_CLEAR', tx.email, `Reclaimed ${tx.amount} checking balances. Nullified audit ledger.`);
                                      }
                                    }}
                                    className="px-2 py-1 rounded text-[10px] bg-rose-100 border border-rose-800 text-rose-350 font-bold hover:bg-rose-200 transition-colors"
                                  >
                                    Reverse
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {/* TAB CONTENT: CRYPTO HANDLERS */}
          {activeTab === 'crypto' && (
            <div className="flex flex-col gap-6">
              <Card className="p-6 bg-slate-50 border-slate-200">
                <div className="mb-6 flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Custodian Crypto Hotwallet Management</h2>
                    <p className="text-slate-500 text-xs">Verify multi-sig address mappings, alter transaction limits, and pause ledger conversions instantly.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setShowCreateCryptoForm(!showCreateCryptoForm)} className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded text-xs font-bold transition-colors">
                      {showCreateCryptoForm ? 'Cancel' : '+ New Wallet'}
                    </button>
                    <span className="text-xs bg-cyan-900/30 text-cyan-400 border border-cyan-800/40 px-2.5 py-1 rounded font-bold font-mono">GAS INDEX: 24 Gwei</span>
                  </div>
                </div>

                {showCreateCryptoForm && (
                  <form onSubmit={handleCreateCrypto} className="mb-6 bg-white p-5 rounded-xl border border-emerald-200/50 relative">
                    <h3 className="text-sm font-bold text-slate-900 mb-4">Provision Custodian Wallet</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1.5">Asset</label>
                        <select className="w-full bg-slate-50 border border-slate-200 text-xs px-2 py-1.5 rounded" value={newCryptoAsset} onChange={e => setNewCryptoAsset(e.target.value)}>
                          <option value="BTC">BTC</option>
                          <option value="ETH">ETH</option>
                          <option value="USDC">USDC</option>
                          <option value="USDT">USDT</option>
                        </select>
                      </div>
                      <div className="lg:col-span-2">
                        <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1.5">Owner Email</label>
                        <input className="w-full bg-slate-50 border border-slate-200 text-xs px-2 py-1.5 rounded" required placeholder="client@example.com" value={newCryptoEmail} onChange={e => setNewCryptoEmail(e.target.value)} />
                      </div>
                      <div className="lg:col-span-2">
                        <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1.5">Address</label>
                        <input className="w-full bg-slate-50 border border-slate-200 text-xs px-2 py-1.5 rounded font-mono" required placeholder="0x..." value={newCryptoAddress} onChange={e => setNewCryptoAddress(e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1.5">Initial Balance</label>
                        <input type="number" step="any" className="w-full bg-slate-50 border border-slate-200 text-xs px-2 py-1.5 rounded font-mono" value={newCryptoBalance || ''} onChange={e => setNewCryptoBalance(e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1.5">Fiat Eq ($)</label>
                        <input type="number" step="any" className="w-full bg-slate-50 border border-slate-200 text-xs px-2 py-1.5 rounded font-mono" value={newCryptoFiat || ''} onChange={e => setNewCryptoFiat(e.target.value)} />
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded text-xs font-bold transition-colors">
                        Provision Wallet
                      </button>
                    </div>
                  </form>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {cryptoWallets.map((wallet) => modifyingCryptoAddress === wallet.address ? (
                    <div key={wallet.address} className="p-5 bg-white border border-slate-200 rounded-xl flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-3">
                          <select className="bg-slate-50 border border-slate-200 text-xs px-2 py-1 rounded" value={cryptoModAsset} onChange={e => setCryptoModAsset(e.target.value)}>
                            <option value="BTC">BTC</option>
                            <option value="ETH">ETH</option>
                            <option value="USDC">USDC</option>
                            <option value="USDT">USDT</option>
                          </select>
                          <div className="flex gap-1">
                            <button onClick={() => handleUpdateCrypto(wallet.address)} className="text-emerald-500 hover:text-emerald-600"><Check className="w-4 h-4" /></button>
                            <button onClick={() => setModifyingCryptoAddress(null)} className="text-rose-500 hover:text-rose-600"><XCircle className="w-4 h-4" /></button>
                          </div>
                        </div>
                        <div className="text-xs text-slate-500 mt-2">Signatory client email:</div>
                        <input className="w-full bg-slate-50 border border-slate-200 text-xs font-mono px-2 py-1 rounded" value={cryptoModEmail} onChange={e => setCryptoModEmail(e.target.value)} />
                      </div>
                      <div className="mt-5 pt-3 border-t border-slate-200 flex justify-between items-end gap-2">
                        <div className="flex-1">
                          <div className="text-slate-500 text-[10px]">Wallet Balance ({cryptoModAsset})</div>
                          <input type="number" className="w-full bg-slate-50 border border-slate-200 text-lg font-bold font-mono px-2 py-1 rounded" value={cryptoModBalance} onChange={e => setCryptoModBalance(e.target.value)} />
                        </div>
                        <div className="flex-1 text-right">
                          <div className="text-slate-405 text-[10px]">USD Value eq</div>
                          <input type="number" className="w-full bg-slate-50 border border-slate-200 text-sm font-bold font-mono px-2 py-1 rounded text-right" value={cryptoModFiat} onChange={e => setCryptoModFiat(e.target.value)} />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div key={wallet.address} className="p-5 bg-white border border-slate-200 rounded-xl flex flex-col justify-between group relative">
                      <button 
                        onClick={() => {
                          setModifyingCryptoAddress(wallet.address);
                          setCryptoModEmail(wallet.email);
                          setCryptoModAsset(wallet.asset);
                          setCryptoModBalance(wallet.balance.toString());
                          setCryptoModFiat(wallet.fiatValue.toString());
                        }}
                        className="absolute top-2 right-2 p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Edit Wallet"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <div>
                        <div className="flex justify-between items-start mb-3 mr-8">
                          <span className={`px-2 py-0.5 rounded text-xs font-extrabold ${
                            wallet.asset === 'BTC' ? 'bg-amber-600/20 text-amber-600' :
                            wallet.asset === 'ETH' ? 'bg-indigo-600/20 text-indigo-600' : 'bg-green-600/20 text-green-400'
                          }`}>{wallet.asset} Ledger</span>
                          
                          <button 
                            onClick={() => handleToggleSwapWalletStatus(wallet.address)}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              wallet.status === 'Enabled' 
                                ? 'bg-emerald-100 text-emerald-600 border border-emerald-800/30' 
                                : 'bg-rose-100 text-rose-600 border border-rose-800/30'
                            }`}
                          >
                            {wallet.status}
                          </button>
                        </div>
                        
                        <div className="text-xs text-slate-500 font-mono select-all break-all bg-slate-50 p-2.5 rounded border border-slate-200 mt-1 mb-3">
                          {wallet.address}
                        </div>
                        
                        <div className="text-xs text-slate-500 mt-2">Signatory client email:</div>
                        <div className="text-xs font-semibold text-slate-900 font-mono">{wallet.email}</div>
                      </div>

                      <div className="mt-5 pt-3 border-t border-slate-200 flex justify-between items-end">
                        <div>
                          <div className="text-slate-500 text-[10px]">Wallet Balance</div>
                          <div className="text-lg font-bold text-slate-900 font-mono">{wallet.balance} {wallet.asset}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-slate-405 text-[10px]">USD Value eq</div>
                          <div className="text-sm font-bold text-emerald-600 font-mono">${wallet.fiatValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* RE-ESTABLISH CO-SIGNING CONSTS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 bg-slate-50 border-slate-200">
                  <h3 className="text-base font-bold text-slate-900 mb-3">Crypto Hot-Swapping Commission Config</h3>
                  <p className="text-xs text-slate-500 mb-4">Set baseline network spread percentages. Feeds directly into client-side asset conversion routes.</p>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center bg-white p-3 rounded">
                      <span className="text-xs text-slate-350">Lumina Swapping Fee margin</span>
                      <div className="flex items-center gap-2">
                        <input type="number" defaultValue={0.45} className="bg-slate-50 rounded px-2.5 py-1 text-xs text-slate-900 border border-slate-200 w-16 text-right font-mono" />
                        <span className="text-xs text-slate-500">% per trade</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center bg-white p-3 rounded">
                      <span className="text-xs text-slate-350">Slippage Tolerance Ceiling</span>
                      <div className="flex items-center gap-2">
                        <input type="number" defaultValue={1.05} className="bg-slate-50 rounded px-2.5 py-1 text-xs text-slate-900 border border-slate-200 w-16 text-right font-mono" />
                        <span className="text-xs text-slate-500">% slippage</span>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full text-xs h-9" onClick={() => alert("Successfully synchronized custodial swapping parameter indices.")}>
                      Update Custodian Parameters
                    </Button>
                  </div>
                </Card>

                <Card className="p-6 bg-slate-50 border-slate-200 select-none">
                  <h3 className="text-base font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
                    <Server className="w-5 h-5 text-emerald-600" />
                    <span>Lumina Node Blockchain State</span>
                  </h3>
                  <p className="text-xs text-slate-500 mb-4">Internal infrastructure tracking node peers and synchronization statuses.</p>
                  
                  <ul className="space-y-2.5 text-xs">
                    <li className="flex justify-between items-center">
                      <span className="text-slate-450">Active Peer Connections</span>
                      <span className="font-bold text-emerald-600 font-mono">31 Peers</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-slate-450">BTC Node Sync Block</span>
                      <span className="font-bold text-indigo-300 font-mono">#842,912</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-slate-450">Cosmic Ledger RPC Feed</span>
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> ONLINE
                      </span>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
          )}

          {/* TAB CONTENT: COMPLIANCE & KYC SIMULATOR */}
          {activeTab === 'kyc' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="p-6 bg-slate-50 border-slate-200">
                  {showCreateKycForm ? (
                    <form onSubmit={handleCreateKyc} className="space-y-4 text-left">
                      <div>
                        <h3 className="text-base font-bold text-slate-900 mb-1">Create KYC Submission</h3>
                        <p className="text-slate-500 text-xs">Register new manual compliance record entry into federal systems.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Applicant Name</label>
                          <input 
                            type="text" 
                            required
                            value={kycFormName || ''}
                            onChange={(e) => setKycFormName(e.target.value)}
                            placeholder="John Doe"
                            className="w-full bg-white border border-slate-200 rounded px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring focus:ring-indigo-500/50"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Applicant Email</label>
                          <input 
                            type="email" 
                            required
                            value={kycFormEmail || ''}
                            onChange={(e) => setKycFormEmail(e.target.value)}
                            placeholder="johndoe@example.com"
                            className="w-full bg-white border border-slate-200 rounded px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring focus:ring-indigo-500/50"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Internal Notes</label>
                        <textarea 
                          rows={3}
                          value={kycFormNotes || ''}
                          onChange={(e) => setKycFormNotes(e.target.value)}
                          placeholder="Federal watchlist cross-referencing completed, etc."
                          className="w-full bg-white border border-slate-200 rounded px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring focus:ring-indigo-500/50"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Passport Status</label>
                          <select 
                            value={kycFormPassportStatus || ''}
                            onChange={(e: any) => setKycFormPassportStatus(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Facial ID Match</label>
                          <select 
                            value={kycFormFaceStatus || ''}
                            onChange={(e: any) => setKycFormFaceStatus(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Utility Bill Check</label>
                          <select 
                            value={kycFormUtilityStatus || ''}
                            onChange={(e: any) => setKycFormUtilityStatus(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex gap-2 justify-end pt-2">
                        <button 
                          type="button"
                          onClick={() => setShowCreateKycForm(false)}
                          className="px-4 py-2 rounded text-xs font-semibold bg-white hover:bg-slate-200 text-slate-500 border border-slate-200 transition-colors"
                        >
                          Cancel
                        </button>
                        <button 
                          type="submit"
                          className="px-4 py-2 rounded text-xs font-semibold bg-indigo-650 hover:bg-indigo-600 text-slate-900 transition-colors flex items-center gap-1.5"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Create Record
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-left">
                        <div>
                          <h2 className="text-lg font-bold text-slate-900">Federal KYC & Document Registry</h2>
                          <p className="text-slate-500 text-xs">Verify customer passport scans, realtime selfie matches, and proof of residency compliance files.</p>
                        </div>
                        <button 
                          type="button"
                          onClick={() => setShowCreateKycForm(true)}
                          className="px-3.5 py-1.5 bg-indigo-650 hover:bg-indigo-650 text-slate-900 rounded text-xs font-bold transition-all flex items-center gap-1 shrink-0 self-start"
                        >
                          <Plus className="w-3.5 h-3.5" /> Create KYC Record
                        </button>
                      </div>

                      <div className="space-y-4 text-left">
                        {/* Master bulk actions bar */}
                        {kycSubmissions.length > 0 && (
                          <div className="mb-4 p-3 bg-white border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                            <div className="flex items-center gap-3">
                              <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700 font-semibold">
                                <input
                                  type="checkbox"
                                  checked={kycSubmissions.length > 0 && selectedKycIds.length === kycSubmissions.length}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedKycIds(kycSubmissions.map(k => k.id));
                                    } else {
                                      setSelectedKycIds([]);
                                    }
                                  }}
                                  className="w-4 h-4 rounded border-slate-200 bg-slate-50 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-950 cursor-pointer"
                                />
                                <span>Select All ({kycSubmissions.length})</span>
                              </label>
                              {selectedKycIds.length > 0 && (
                                <span className="bg-indigo-100/80 text-indigo-600 font-mono font-bold px-2 py-0.5 rounded border border-indigo-200/30">
                                  {selectedKycIds.length} Selected
                                </span>
                              )}
                            </div>
                            
                            {selectedKycIds.length > 0 ? (
                              <div className="flex flex-wrap items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleBulkKycVerify('Approved')}
                                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 rounded text-[11px] font-bold transition-all flex items-center gap-1 shadow-md shadow-emerald-600/10"
                                >
                                  <Check className="w-3.5 h-3.5" /> Bulk Approve
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleBulkKycVerify('Rejected')}
                                  className="px-3 py-1.5 bg-rose-650 hover:bg-rose-600 text-slate-900 rounded text-[11px] font-bold border border-rose-200/40 transition-all flex items-center gap-1 shadow-md"
                                >
                                  <XCircle className="w-3.5 h-3.5" /> Bulk Reject
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleBulkKycVerify('Pending')}
                                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded text-[11px] font-bold transition-all flex items-center gap-1 shadow-md"
                                >
                                  <Clock className="w-3.5 h-3.5" /> Bulk Pending
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setSelectedKycIds([])}
                                  className="px-2.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-[11px] font-medium transition-all"
                                >
                                  Clear Selection
                                </button>
                              </div>
                            ) : (
                              <span className="text-slate-500 text-[11px] italic">Select items to enable bulk compliance actions</span>
                            )}
                          </div>
                        )}

                        {kycSubmissions.length === 0 ? (
                          <div className="py-12 text-center text-slate-600 text-xs">
                            No active KYC records found. Add a record above to begin compliance audits.
                          </div>
                        ) : (
                          kycSubmissions.map((kyc) => (
                            <div 
                              key={kyc.id} 
                              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                                selectedKyc?.id === kyc.id 
                                  ? 'bg-white border-indigo-650 shadow-lg ring-1 ring-indigo-500' 
                                  : 'bg-white/60 border-slate-200 hover:border-slate-300'
                              }`}
                              onClick={() => setSelectedKyc(kyc)}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex items-start gap-3">
                                  <div className="pt-1" onClick={(e) => e.stopPropagation()}>
                                    <input 
                                      type="checkbox"
                                      checked={selectedKycIds.includes(kyc.id)}
                                      onChange={(e) => {
                                        if (e.target.checked) {
                                          setSelectedKycIds(prev => [...prev, kyc.id]);
                                        } else {
                                          setSelectedKycIds(prev => prev.filter(id => id !== kyc.id));
                                        }
                                      }}
                                      className="w-4 h-4 rounded border-slate-200 bg-slate-50 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-950 cursor-pointer"
                                    />
                                  </div>
                                  <div>
                                    <span className="text-[10px] font-mono text-slate-500">ID: {kyc.id}</span>
                                    <h4 className="text-sm font-bold text-slate-900 mt-0.5">{kyc.name}</h4>
                                    <span className="text-xs text-slate-500">{kyc.email}</span>
                                  </div>
                                </div>
                                
                                <span className="text-[10px] text-slate-500 font-mono">{kyc.submittedDate}</span>
                              </div>

                              <div className="grid grid-cols-3 gap-1.5 text-center mt-3 text-[10px]">
                                <div className={`p-1.5 rounded font-semibold ${
                                  kyc.passportStatus === 'Approved' ? 'bg-emerald-100 text-emerald-600' : 
                                  kyc.passportStatus === 'Rejected' ? 'bg-rose-100 text-rose-600' : 
                                  kyc.passportStatus === 'Pending' ? 'bg-amber-100 text-amber-600' : 'bg-slate-50 text-slate-500'
                                }`}>Passport: {kyc.passportStatus}</div>
                                
                                <div className={`p-1.5 rounded font-semibold ${
                                  kyc.faceStatus === 'Approved' ? 'bg-emerald-100 text-emerald-600' : 
                                  kyc.faceStatus === 'Rejected' ? 'bg-rose-100 text-rose-600' : 
                                  kyc.faceStatus === 'Pending' ? 'bg-amber-100 text-amber-600' : 'bg-slate-50 text-slate-500'
                                }`}>Facial ID: {kyc.faceStatus}</div>

                                <div className={`p-1.5 rounded font-semibold ${
                                  kyc.utilityStatus === 'Approved' ? 'bg-emerald-100 text-emerald-600' : 
                                  kyc.utilityStatus === 'Rejected' ? 'bg-rose-100 text-rose-600' : 
                                  kyc.utilityStatus === 'Pending' ? 'bg-amber-100 text-amber-600' : 'bg-slate-50 text-slate-500'
                                }`}>Proof Res: {kyc.utilityStatus}</div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </>
                  )}
                </Card>
              </div>

              {/* KYC DETAILS PANEL */}
              <div>
                <Card className="p-6 bg-slate-50 border-slate-200 min-h-[480px]">
                  {selectedKyc ? (
                    <div className="flex flex-col gap-6 h-full justify-between text-left">
                      <div className="space-y-4">
                        <div>
                          <div className="text-slate-500 text-[10px] font-mono">KYC Audit Identification</div>
                          <h3 className="text-base font-bold text-slate-900 mt-1">{selectedKyc.name}</h3>
                          <p className="text-xs text-indigo-600 break-all font-mono">{selectedKyc.email}</p>
                          <p className="text-[10px] text-slate-500 font-mono mt-1">Submitted: {selectedKyc.submittedDate}</p>
                        </div>

                        <div className="p-3 bg-white border border-slate-200 rounded text-xs text-slate-350 italic">
                          "{selectedKyc.notes}"
                        </div>

                        {/* Document verification details - Clean Compliance Badges with actions */}
                        <div className="space-y-3">
                          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Compliance Documents</h4>
                          
                          {/* Passport Document Scan */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded bg-white/40 border border-slate-100 gap-3">
                            <div>
                              <span className="text-xs text-slate-500 block font-semibold">Passport Document Scan</span>
                              <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                                selectedKyc.passportStatus === 'Approved' ? 'bg-emerald-100 text-emerald-600 border border-emerald-200/30' :
                                selectedKyc.passportStatus === 'Rejected' ? 'bg-rose-100 text-rose-600 border border-rose-200/30' :
                                selectedKyc.passportStatus === 'Pending' ? 'bg-amber-100 text-amber-600 border border-amber-200/30' :
                                'bg-white text-slate-500 border border-slate-200'
                              }`}>{selectedKyc.passportStatus}</span>
                            </div>

                        <div className="flex items-center gap-1.5 self-end sm:self-auto">
                              {selectedKyc.passportStatus !== 'Approved' && (
                                <button
                                  type="button"
                                  onClick={() => handleVerifyKyc(selectedKyc.id, 'passport', 'Approved')}
                                  className="px-2.5 py-1 bg-emerald-100/80 hover:bg-emerald-200 text-emerald-600 rounded text-[10px] font-bold border border-emerald-200/30 transition-all flex items-center gap-1"
                                >
                                  <Check className="w-3 h-3" /> Approve
                                </button>
                              )}
                              {selectedKyc.passportStatus !== 'Rejected' && (
                                <button
                                  type="button"
                                  onClick={() => handleVerifyKyc(selectedKyc.id, 'passport', 'Rejected')}
                                  className="px-2.5 py-1 bg-rose-50/80 hover:bg-rose-200 text-rose-600 rounded text-[10px] font-bold border border-rose-200/30 transition-all flex items-center gap-1"
                                >
                                  <XCircle className="w-3 h-3" /> Reject
                                </button>
                              )}
                              {selectedKyc.passportStatus !== 'Pending' && (
                                <button
                                  type="button"
                                  onClick={() => handleVerifyKyc(selectedKyc.id, 'passport', 'Pending')}
                                  className="px-2.5 py-1 bg-amber-50/80 hover:bg-amber-200 text-amber-600 rounded text-[10px] font-bold border border-amber-200/30 transition-all flex items-center gap-1"
                                >
                                  <Clock className="w-3 h-3" /> Pending
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Real-time Facial Selfie */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded bg-white/40 border border-slate-100 gap-3">
                            <div>
                              <span className="text-xs text-slate-500 block font-semibold">Realtime Facial Recognition Selfie</span>
                              <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                                selectedKyc.faceStatus === 'Approved' ? 'bg-emerald-100 text-emerald-600 border border-emerald-200/30' :
                                selectedKyc.faceStatus === 'Rejected' ? 'bg-rose-50 text-rose-600 border border-rose-200/30' :
                                selectedKyc.faceStatus === 'Pending' ? 'bg-amber-50 text-amber-600 border border-amber-200/30' :
                                'bg-white text-slate-500 border border-slate-200'
                              }`}>{selectedKyc.faceStatus}</span>
                            </div>
                            <div className="flex items-center gap-1.5 self-end sm:self-auto">
                              {selectedKyc.faceStatus !== 'Approved' && (
                                <button
                                  type="button"
                                  onClick={() => handleVerifyKyc(selectedKyc.id, 'face', 'Approved')}
                                  className="px-2.5 py-1 bg-emerald-100/80 hover:bg-emerald-200 text-emerald-600 rounded text-[10px] font-bold border border-emerald-200/30 transition-all flex items-center gap-1"
                                >
                                  <Check className="w-3 h-3" /> Approve
                                </button>
                              )}
                              {selectedKyc.faceStatus !== 'Rejected' && (
                                <button
                                  type="button"
                                  onClick={() => handleVerifyKyc(selectedKyc.id, 'face', 'Rejected')}
                                  className="px-2.5 py-1 bg-rose-50/80 hover:bg-rose-200 text-rose-600 rounded text-[10px] font-bold border border-rose-200/30 transition-all flex items-center gap-1"
                                >
                                  <XCircle className="w-3 h-3" /> Reject
                                </button>
                              )}
                              {selectedKyc.faceStatus !== 'Pending' && (
                                <button
                                  type="button"
                                  onClick={() => handleVerifyKyc(selectedKyc.id, 'face', 'Pending')}
                                  className="px-2.5 py-1 bg-amber-50/80 hover:bg-amber-200 text-amber-600 rounded text-[10px] font-bold border border-amber-200/30 transition-all flex items-center gap-1"
                                >
                                  <Clock className="w-3 h-3" /> Pending
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Utility Proof of Address */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded bg-white/40 border border-slate-100 gap-3">
                            <div>
                              <span className="text-xs text-slate-500 block font-semibold">Utility Proof of Address Check</span>
                              <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                                selectedKyc.utilityStatus === 'Approved' ? 'bg-emerald-100 text-emerald-600 border border-emerald-200/30' :
                                selectedKyc.utilityStatus === 'Rejected' ? 'bg-rose-50 text-rose-600 border border-rose-200/30' :
                                selectedKyc.utilityStatus === 'Pending' ? 'bg-amber-50 text-amber-600 border border-amber-200/30' :
                                'bg-white text-slate-500 border border-slate-200'
                              }`}>{selectedKyc.utilityStatus}</span>
                            </div>
                            <div className="flex items-center gap-1.5 self-end sm:self-auto">
                              {selectedKyc.utilityStatus !== 'Approved' && (
                                <button
                                  type="button"
                                  onClick={() => handleVerifyKyc(selectedKyc.id, 'utility', 'Approved')}
                                  className="px-2.5 py-1 bg-emerald-100/80 hover:bg-emerald-200 text-emerald-600 rounded text-[10px] font-bold border border-emerald-200/30 transition-all flex items-center gap-1"
                                >
                                  <Check className="w-3 h-3" /> Approve
                                </button>
                              )}
                              {selectedKyc.utilityStatus !== 'Rejected' && (
                                <button
                                  type="button"
                                  onClick={() => handleVerifyKyc(selectedKyc.id, 'utility', 'Rejected')}
                                  className="px-2.5 py-1 bg-rose-50/80 hover:bg-rose-200 text-rose-600 rounded text-[10px] font-bold border border-rose-200/30 transition-all flex items-center gap-1"
                                >
                                  <XCircle className="w-3 h-3" /> Reject
                                </button>
                              )}
                              {selectedKyc.utilityStatus !== 'Pending' && (
                                <button
                                  type="button"
                                  onClick={() => handleVerifyKyc(selectedKyc.id, 'utility', 'Pending')}
                                  className="px-2.5 py-1 bg-amber-50/80 hover:bg-amber-200 text-amber-600 rounded text-[10px] font-bold border border-amber-200/30 transition-all flex items-center gap-1"
                                >
                                  <Clock className="w-3 h-3" /> Pending
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Quick Bulk Action Buttons */}
                          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 mt-4">
                            <button
                              type="button"
                              onClick={() => {
                                handleVerifyKyc(selectedKyc.id, 'passport', 'Approved');
                                handleVerifyKyc(selectedKyc.id, 'face', 'Approved');
                                handleVerifyKyc(selectedKyc.id, 'utility', 'Approved');
                              }}
                              className="py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-md shadow-emerald-600/10"
                            >
                              <CheckCircle className="w-3.5 h-3.5" /> Approve All
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                handleVerifyKyc(selectedKyc.id, 'passport', 'Rejected');
                                handleVerifyKyc(selectedKyc.id, 'face', 'Rejected');
                                handleVerifyKyc(selectedKyc.id, 'utility', 'Rejected');
                              }}
                              className="py-2 bg-rose-50 hover:bg-rose-200 text-rose-600 rounded text-xs font-bold border border-rose-200/40 transition-all flex items-center justify-center gap-1 shadow-md"
                            >
                              <XCircle className="w-3.5 h-3.5" /> Reject All
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                handleVerifyKyc(selectedKyc.id, 'passport', 'Pending');
                                handleVerifyKyc(selectedKyc.id, 'face', 'Pending');
                                handleVerifyKyc(selectedKyc.id, 'utility', 'Pending');
                              }}
                              className="py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded text-xs font-bold border border-amber-600/40 transition-all flex items-center justify-center gap-1 shadow-md"
                            >
                              <Clock className="w-3.5 h-3.5" /> Pending All
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Delete Operation Button */}
                      <div className="pt-4 border-t border-slate-100">
                        <button 
                          onClick={() => {
                            if (confirm(`Are you sure you want to permanently delete the KYC profile of ${selectedKyc.name}?`)) {
                              handleDeleteKyc(selectedKyc.id);
                            }
                          }}
                          className="w-full py-2 bg-rose-100 hover:bg-rose-200 text-rose-600 hover:text-slate-900 rounded text-xs font-bold transition-all border border-rose-200/30 flex items-center justify-center gap-1.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete KYC Submission
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 select-none py-12">
                      <FileCheck className="w-12 h-12 mb-3 text-slate-700" />
                      <p className="text-sm">Please select an active KYC applicant queue to review documents.</p>
                    </div>
                  )}
                </Card>
              </div>
            </div>
          )}

          {/* TAB CONTENT: SUPPORT HELPDESK TICKETS */}
          {activeTab === 'support' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* TICKET LIST */}
              <div className="lg:col-span-2">
                <Card className="p-6 bg-slate-50 border-slate-200">
                  <div className="mb-6 flex justify-between items-center">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">Unified Helpdesk Ticket Inbox</h2>
                      <p className="text-slate-500 text-xs">Answer inquiries, deploy answers, and assign operations groups.</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {tickets.map((t) => (
                      <div 
                        key={t.id} 
                        onClick={() => setSelectedTicket(t)}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedTicket?.id === t.id 
                            ? 'bg-white border-indigo-500' 
                            : 'bg-white/60 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="text-[10px] font-mono text-slate-500">ID: {t.id}</span>
                            <h4 className="text-sm font-bold text-slate-800 mt-0.5">{t.subject}</h4>
                            <div className="text-xs text-slate-500 mt-0.5">{t.name} ({t.email})</div>
                          </div>
                          
                          <span className={`px-2 py-0.5 text-[9px] font-bold rounded ${
                            t.priority === 'High' ? 'bg-rose-100 text-rose-600' : 'bg-slate-50 text-slate-500'
                          }`}>{t.priority} priority</span>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                          <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold font-mono ${
                            t.status === 'Open' ? 'text-amber-600' :
                            t.status === 'In Progress' ? 'text-cyan-400' : 'text-emerald-600'
                          }`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${
                              t.status === 'Open' ? 'bg-amber-400' :
                              t.status === 'In Progress' ? 'bg-cyan-400' : 'bg-emerald-400'
                            }`} />
                            {t.status}
                          </span>

                          <span className="text-[10px] text-slate-500 font-mono">Replies: {t.replies.length}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* REPLY CONSOLE */}
              <div>
                <Card className="p-6 bg-slate-50 border-slate-200 min-h-[480px] flex flex-col justify-between">
                  {selectedTicket ? (
                    <div className="flex flex-col h-full justify-between gap-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] font-mono text-slate-500">REF: {selectedTicket.id}</span>
                          <span className="text-[10px] text-slate-500 uppercase font-bold">{selectedTicket.category}</span>
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 leading-tight mb-2">{selectedTicket.subject}</h3>
                        
                        {/* Conversation Thread bubbles */}
                        <div className="space-y-3 bg-white border border-slate-200 rounded-xl p-4 max-h-72 overflow-y-auto mt-4 mb-4">
                          {selectedTicket.replies.map((rep, idx) => (
                            <div key={idx} className={`p-3 rounded text-xs leading-relaxed ${
                              rep.sender === 'user' 
                                ? 'bg-slate-50 border-l-2 border-indigo-500 text-slate-700' 
                                : 'bg-emerald-100/40 border-l-2 border-emerald-500 text-slate-800'
                            }`}>
                              <div className="font-semibold text-[10px] text-slate-500 mb-1">
                                {rep.sender === 'user' ? selectedTicket.name : 'Supervisor Support Counsel'} • {rep.timestamp}
                              </div>
                              <p>{rep.text}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {selectedTicket.status !== 'Resolved' ? (
                        <div className="space-y-3 pt-3 border-t border-slate-200">
                          <textarea 
                            rows={3} 
                            placeholder="Enter message dispatch advice..." 
                            value={ticketReplyText}
                            onChange={(e) => setTicketReplyText(e.target.value)}
                            className="w-full bg-slate-50 text-slate-900 rounded border border-slate-200 p-2.5 text-xs outline-none focus:ring focus:ring-indigo-500/50"
                          />
                          
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleResolveTicket(selectedTicket.id)}
                              className="px-3 h-9 rounded text-xs bg-emerald-100 border border-emerald-800 text-emerald-600 font-bold hover:bg-emerald-200 transition-colors"
                            >
                              Resolve
                            </button>
                            
                            <button 
                              onClick={() => handleSendTicketReply(selectedTicket.id)}
                              className="flex-1 h-9 rounded text-xs bg-indigo-650 hover:bg-indigo-750 text-slate-900 font-bold flex items-center justify-center gap-1.5"
                            >
                              <Send className="w-3.5 h-3.5" /> Direct Advisor Reply
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-emerald-100/20 border border-emerald-800/40 p-4 rounded-xl text-center text-xs text-emerald-600 mt-auto font-semibold">
                          Ticket RESOLVED. Thread sealed.
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 select-none my-auto">
                      <MessageSquare className="w-12 h-12 mb-3 text-slate-700" />
                      <p className="text-sm">Please select a customer service ticket history to open communications.</p>
                    </div>
                  )}
                </Card>
              </div>
            </div>
          )}

          {/* TAB CONTENT: NEWS BULLETIN CMS */}
          {activeTab === 'news' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* CMS CREATION MODULE */}
              <Card className="p-6 bg-slate-50 border-slate-200 h-fit">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-900">Notice CMS Publisher</h3>
                  <p className="text-slate-500 text-xs">Deploy security warnings, maintenance schedules, or products announcements.</p>
                </div>

                <form onSubmit={handleCreateAnnouncement} className="space-y-4">
                  <Input 
                    label="Notice Headline / Title" 
                    placeholder="Scheduled infrastructure upgrade..." 
                    value={newAnnTitle}
                    onChange={(e) => setNewAnnTitle(e.target.value)}
                    required
                    className="bg-white border-slate-200 text-slate-900 sm:text-xs"
                  />

                  <Select 
                    label="Bullet Category" 
                    options={[
                      { value: 'General', label: 'General Announcement' },
                      { value: 'Maintenance', label: 'Maintenance Window' },
                      { value: 'Security Alert', label: 'Security Emergency Alert' },
                      { value: 'Rate Update', label: 'Fed Interest Rate Update' }
                    ]}
                    value={newAnnCategory}
                    onChange={(e) => setNewAnnCategory(e.target.value as any)}
                    className="bg-white border-slate-200 text-slate-900 text-xs"
                  />

                  <Input 
                    label="Summary Abstract (Short description)" 
                    placeholder="Provide quick 1-sentence abstract summaries..." 
                    value={newAnnSummary}
                    onChange={(e) => setNewAnnSummary(e.target.value)}
                    className="bg-white border-slate-200 text-slate-900 sm:text-xs"
                  />

                  <div className="w-full">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Detailed HTML/Markdown Narrative content</label>
                    <textarea 
                      rows={5} 
                      placeholder="Narrate details completely..." 
                      value={newAnnContent}
                      onChange={(e) => setNewAnnContent(e.target.value)}
                      required
                      className="w-full bg-white border border-slate-200 rounded placeholder-slate-550 p-2.5 text-xs text-slate-900 outline-none focus:ring focus:ring-emerald-500/50"
                    />
                  </div>

                  <Button type="submit" variant="secondary" className="w-full h-10 bg-emerald-400 hover:bg-emerald-500 text-slate-900 font-bold py-2 text-xs">
                    Publish Bulletin Site-wide
                  </Button>
                </form>
              </Card>

              {/* CURRENT BULLETINS */}
              <div className="lg:col-span-2">
                <Card className="p-6 bg-slate-50 border-slate-200">
                  <div className="mb-6">
                    <h2 className="text-lg font-bold text-slate-900">Global Announcements Directory</h2>
                    <p className="text-slate-500 text-xs">Edit or remove public notice articles dynamically appearing on portal layouts.</p>
                  </div>

                  <div className="space-y-4">
                    {announcements.map((ann) => (
                      <div key={ann.id} className="p-5 bg-white border border-slate-200 rounded-lg flex flex-col justify-between hover:border-slate-300 transition-colors">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <span className={`px-2.5 py-0.5 rounded text-[9px] font-extrabold uppercase ${
                              ann.category === 'Security Alert' ? 'bg-rose-100 text-rose-600 border border-rose-800/40' :
                              ann.category === 'Maintenance' ? 'bg-amber-100 text-amber-600 border border-amber-300/40' : 'bg-slate-50 text-slate-500 border border-slate-200/40'
                            }`}>{ann.category}</span>
                            
                            <span className="text-[10px] text-slate-505 font-mono">{ann.date}</span>
                          </div>
                          
                          <h4 className="text-base font-bold text-slate-900 mb-1.5">{ann.title}</h4>
                          <p className="text-xs text-slate-500 font-semibold mb-3">Abstract: {ann.summary}</p>
                          <p className="text-xs text-slate-700 leading-relaxed bg-slate-50/55 p-3 rounded border border-slate-200 font-mono whitespace-pre-wrap">{ann.content}</p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-200 flex justify-between items-center">
                          <span className="text-[10px] text-slate-505 font-mono">ID: {ann.id}</span>
                          
                          <button 
                            onClick={() => handleDeleteAnnouncement(ann.id)}
                            className="bg-rose-50 hover:bg-rose-200 text-rose-600 border border-rose-200/40 px-2.5 py-1 text-[11px] font-bold rounded flex items-center gap-1 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Remove Post
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* TAB CONTENT: SYSTEM AUDIT TRAILS */}
          {activeTab === 'audit' && (
            <div className="space-y-6">
              <Card className="p-6 bg-slate-50 border-slate-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <Terminal className="w-5 h-5 text-emerald-500" />
                      Core System Audit Trail
                    </h2>
                    <p className="text-slate-500 text-xs mt-1">Immutable log of security transactions, admin role switches, balance mutations, and compliance actions.</p>
                  </div>
                  
                  <button
                    onClick={() => {
                      if (confirm("Are you sure you want to clear/refresh audit trails? This is logged as a security action.")) {
                        setAuditLogs([
                          {
                            id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
                            timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
                            operator: `${activeSupervisor.firstName} ${activeSupervisor.lastName}`,
                            role: activeSupervisor.role,
                            action: 'AUDIT_LOGS_REFRESH',
                            target: 'System Audit Db',
                            details: 'Synchronized and flushed local database cache logs. Hot state reload.',
                            ipAddress: '127.0.0.1'
                          }
                        ]);
                      }
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-slate-900 hover:bg-slate-100 text-xs font-semibold transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-emerald-600" />
                    Reset Audit Cache
                  </button>
                </div>

                {/* Audit Search Filters Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 bg-white/40 p-4 rounded-lg border border-slate-100">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                      <Search className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      placeholder="Search log narrative, operator..."
                      value={auditLogSearch}
                      onChange={(e) => setAuditLogSearch(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <select
                      value={auditLogCategory}
                      onChange={(e) => setAuditLogCategory(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
                    >
                      <option value="ALL">All Categories</option>
                      <option value="ROLE_SWITCH">Role Elevation Switches</option>
                      <option value="USER_MANAGEMENT">User Modifications</option>
                      <option value="CARD_MUTATE">Asset / Balance Mutations</option>
                      <option value="KYC">KYC & Compliance Logs</option>
                      <option value="SYSTEM">General System Operations</option>
                      <option value="SECURITY">Security / Firewall Alerts</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-end">
                    <span className="text-xs text-slate-500 font-mono">
                      Tracking: {auditLogs.length} total events
                    </span>
                  </div>
                </div>

                {/* Terminal Table View */}
                <div className="overflow-x-auto border border-slate-100 rounded-xl bg-slate-50">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 bg-white/60 font-medium text-[11px] uppercase tracking-wider font-sans">
                        <th className="py-3 px-4 font-bold">Log ID</th>
                        <th className="py-3 px-4">Timestamp</th>
                        <th className="py-3 px-4">Operator Info</th>
                        <th className="py-3 px-4">Action Token</th>
                        <th className="py-3 px-4">Narrative Details</th>
                        <th className="py-3 px-4">Target Entity</th>
                        <th className="py-3 px-4 text-right">IP Route</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-mono text-xs">
                      {auditLogs
                        .filter(log => {
                          const q = auditLogSearch.toLowerCase();
                          const matchesSearch = 
                            log.operator.toLowerCase().includes(q) ||
                            log.action.toLowerCase().includes(q) ||
                            log.details.toLowerCase().includes(q) ||
                            log.target.toLowerCase().includes(q);
                          
                          if (auditLogCategory === 'ALL') return matchesSearch;
                          return log.action.includes(auditLogCategory) && matchesSearch;
                        })
                        .map((log) => (
                          <tr key={log.id} className="hover:bg-white/60 transition-colors">
                            <td className="py-3 px-4 text-emerald-500 font-bold">{log.id}</td>
                            <td className="py-3 px-4 text-slate-500 whitespace-nowrap">{log.timestamp}</td>
                            <td className="py-3 px-4">
                              <span className="text-slate-800 font-sans font-semibold">{log.operator}</span>
                              <span className="text-[10px] ml-1 bg-white text-slate-500 px-1 rounded uppercase font-bold">{log.role}</span>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                log.action.includes('ALLOW') || log.action.includes('PASS') || log.action.includes('APPROVE')
                                  ? 'bg-emerald-100/40 text-emerald-600 border border-emerald-200/40'
                                  : log.action.includes('DENY') || log.action.includes('BAN') || log.action.includes('REJECT')
                                  ? 'bg-rose-50 text-rose-600 border border-rose-200/40'
                                  : 'bg-indigo-100/40 text-indigo-600 border border-indigo-200/40'
                              }`}>{log.action}</span>
                            </td>
                            <td className="py-3 px-4 text-slate-700 max-w-xs truncate">{log.details}</td>
                            <td className="py-3 px-4 text-blue-600 font-semibold">{log.target}</td>
                            <td className="py-3 px-4 text-right font-medium text-slate-500 whitespace-nowrap">{log.ipAddress}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  {auditLogs.length === 0 && (
                    <div className="text-center font-sans text-xs text-slate-500 py-10">No matching audit events observed in this session.</div>
                  )}
                </div>
              </Card>
            </div>
          )}

          {/* TAB CONTENT: BROADCASTER & ALERTS */}
          {activeTab === 'notifications' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* BROADCASTER FORM CENTER */}
              <Card className="p-6 bg-slate-50 border-slate-200 lg:col-span-2">
                <div className="mb-6 pb-4 border-b border-slate-200">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-amber-500 animate-pulse" />
                    Lumina Multi-Channel Broadcaster
                  </h2>
                  <p className="text-slate-500 text-xs mt-1">Disseminate critical alerts, service announcements, and feature banners directly to clients' portals instantly.</p>
                </div>

                <form onSubmit={handleBroadcastNotification} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">Alert Dispatch Type</label>
                      <select
                        value={notifFormType}
                        onChange={(e: any) => setNotifFormType(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-amber-500"
                      >
                        <option value="Info">General Info (Blue Banner)</option>
                        <option value="Warning">Warning (Amber Alert)</option>
                        <option value="Critical Alert">Critical Alert (Red Banner)</option>
                        <option value="System Update">System Update (Emerald Patch)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">Target Audience Segment</label>
                      <select
                        value={notifFormSegment}
                        onChange={(e: any) => setNotifFormSegment(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-amber-500"
                      >
                        <option value="All">All Bank Users (Broadcaster marquee)</option>
                        <option value="Personal">Personal Checking Accounts only</option>
                        <option value="Business">Business wire account profiles</option>
                        <option value="Admin Staff">Admin / Compliance Officers cohort</option>
                      </select>
                    </div>
                  </div>

                  <div>
                     <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">Notification Header Title</label>
                     <input
                       type="text"
                       required
                       placeholder="e.g. Core System Security Ledger Upgrade scheduled"
                       value={notifFormTitle}
                       onChange={(e) => setNotifFormTitle(e.target.value)}
                       className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-amber-500 font-medium"
                     />
                  </div>

                  <div>
                     <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">Narrative Body Copy</label>
                     <textarea
                       required
                       rows={4}
                       placeholder="Detailed message description that clients will observe on checking portals..."
                       value={notifFormBody}
                       onChange={(e) => setNotifFormBody(e.target.value)}
                       className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-amber-500 font-sans leading-relaxed"
                     />
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-400 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/10 hover:shadow-amber-500/25 transition-all"
                    >
                      <Send className="w-3.5 h-3.5" /> Dispatch Broadcast
                    </button>
                  </div>
                </form>
              </Card>

              {/* LIVE PHONE PREVIEW CRITICAL CAPABILITY */}
              <Card className="p-6 bg-slate-50 border-slate-200">
                <div className="mb-4 text-center">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">Mobile App Viewport Preview</h3>
                  <p className="text-[10px] text-slate-500 mt-1">Live customer terminal viewport</p>
                </div>

                {/* Simulated Device Container */}
                <div className="mx-auto w-full max-w-[240px] aspect-[9/18.5] bg-white rounded-[2rem] border-4 border-slate-200 p-2 relative shadow-2xl flex flex-col justify-between overflow-hidden">
                  
                  {/* Speaker notch */}
                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 h-4 w-16 bg-slate-100 rounded-full z-20 flex justify-center items-center">
                    <div className="w-1 h-1 bg-slate-300 rounded-full" />
                  </div>

                  {/* Top Bar Info */}
                  <div className="pt-3 px-3 flex justify-between items-center text-[8px] font-mono font-bold text-slate-500 z-10 select-none">
                    <span>9:41 AM</span>
                    <span className="text-emerald-500 flex items-center gap-0.5">● 5G</span>
                  </div>

                  {/* Main Screen */}
                  <div className="flex-1 mt-1.5 p-2 bg-slate-50 rounded-xl flex flex-col items-center justify-start overflow-y-auto relative text-slate-800">
                    
                    {/* Brand header */}
                    <div className="w-full flex items-center justify-between pb-1.5 mb-2 border-b border-slate-100">
                      <span className="text-[8px] font-black tracking-widest text-slate-500 uppercase">Lumina Digital</span>
                      <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-ping" />
                    </div>

                    {/* Alert banners list inside viewport */}
                    <div className="space-y-1.5 w-full">
                      {notifications.filter(n => n.status === 'Active' && (n.targetSegment === 'All' || n.targetSegment === 'Personal')).slice(0, 2).map(n => (
                        <div key={n.id} className="p-2 bg-white/90 border border-slate-200 rounded shadow-md relative overflow-hidden">
                          <div className="flex justify-between items-center mb-1">
                            <span className={`text-[6px] font-bold px-1 rounded-sm uppercase tracking-wide font-sans ${
                              n.type === 'Critical Alert' ? 'bg-rose-100 text-rose-500' :
                              n.type === 'System Update' ? 'bg-emerald-100 text-emerald-500' :
                              n.type === 'Warning' ? 'bg-amber-100 text-amber-500' : 'bg-blue-100 text-blue-500'
                            }`}>{n.type}</span>
                            <span className="text-[5px] text-slate-500">Now</span>
                          </div>
                          <div className="text-[8px] font-bold text-slate-900 truncate">{n.title}</div>
                          <p className="text-[6px] text-slate-500 leading-normal line-clamp-2 mt-0.5">{n.body}</p>
                        </div>
                      ))}

                      {notifications.filter(n => n.status === 'Active' && (n.targetSegment === 'All' || n.targetSegment === 'Personal')).length === 0 && (
                        <div className="text-center text-[8px] text-slate-600 italic py-8">No live customer announcements broadcasted. Try sending one!</div>
                      )}
                    </div>

                    {/* Dashboard balance card */}
                    <div className="mt-auto w-full p-2 bg-gradient-to-r from-emerald-950/20 to-slate-900 rounded border border-emerald-200/20 text-center">
                      <div className="text-[7px] font-bold text-slate-500 tracking-wider">Available Balance</div>
                      <div className="text-[12px] font-mono text-emerald-600 font-extrabold mt-0.5">$38,245.92</div>
                    </div>
                  </div>

                  {/* Device home navigation pill bar */}
                  <div className="h-1 w-20 bg-slate-200 rounded-full mx-auto my-1 select-none" />
                </div>
              </Card>

              {/* DISPATCHED ARCHIVE LISTINGS */}
              <Card className="p-6 bg-slate-50 border-slate-200 lg:col-span-3">
                <div className="mb-4 flex justify-between items-center">
                  <div>
                    <h3 className="text-base font-bold text-slate-800">Broadcast Dispatch Log Ledger</h3>
                    <p className="text-slate-500 text-xs">Full history of notifications, warning advisories and alerts generated in this session.</p>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">Dispatches active: {notifications.length}</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-[11px]">
                    <thead>
                      <tr className="border-b border-slate-200 bg-white/30 text-slate-500 font-bold uppercase font-sans text-[10px]">
                        <th className="py-2.5 px-3">Broadcast ref</th>
                        <th className="py-2.5 px-3">Sent Timestamp</th>
                        <th className="py-2.5 px-3">Alert Content Summary</th>
                        <th className="py-2.5 px-3 text-center">Segment Audience</th>
                        <th className="py-2.5 px-3">Alert Mode Pin</th>
                        <th className="py-2.5 px-3 text-center">Target Clicks</th>
                        <th className="py-2.5 px-3">Live State</th>
                        <th className="py-2.5 px-3 text-right">Admin Controls</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {notifications.map(n => (
                        <tr key={n.id} className="hover:bg-white/40 transition-all font-mono text-xs">
                          <td className="py-3 px-3 text-indigo-600 font-bold">{n.id}</td>
                          <td className="py-3 px-3 text-slate-500 whitespace-nowrap">{n.dispatchedAt}</td>
                          <td className="py-3 px-3 font-sans max-w-sm">
                            <div className="font-bold text-slate-800 leading-tight">{n.title}</div>
                            <div className="text-[10px] text-slate-500 truncate mt-0.5 leading-relaxed">{n.body}</div>
                          </td>
                          <td className="py-3 px-3 text-center">
                            <span className="px-2 py-0.5 rounded bg-white text-slate-700 text-[9px] font-semibold">{n.targetSegment}</span>
                          </td>
                          <td className="py-3 px-3">
                            <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                              n.type === 'Critical Alert' ? 'bg-rose-500/15 text-rose-600' :
                              n.type === 'System Update' ? 'bg-emerald-500/15 text-emerald-600' :
                              n.type === 'Warning' ? 'bg-amber-500/15 text-amber-600' : 'bg-blue-500/15 text-blue-600'
                            }`}>{n.type}</span>
                          </td>
                          <td className="py-3 px-3 font-bold text-center text-slate-700">
                            {n.clicksCount.toLocaleString()}
                          </td>
                          <td className="py-3 px-3">
                            <span className={`inline-flex items-center gap-1 font-sans text-[10px] font-bold uppercase ${
                              n.status === 'Active' ? 'text-emerald-600' : 'text-slate-500'
                            }`}>
                              <span className={`h-1 w-1 rounded-full ${n.status === 'Active' ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`} />
                              {n.status}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right whitespace-nowrap">
                            <div className="flex justify-end gap-2 text-xs">
                              <button
                                onClick={() => handleToggleNotifStatus(n.id)}
                                className={`font-sans font-bold px-2 py-0.5 rounded text-[10px] transition-colors ${
                                  n.status === 'Active' 
                                    ? 'bg-white hover:bg-slate-100 text-slate-500'
                                    : 'bg-emerald-100/40 text-emerald-600 border border-emerald-200/20 hover:bg-emerald-200/30'
                                }`}
                              >
                                {n.status === 'Active' ? 'Archive' : 'Relaunch'}
                              </button>
                              <button
                                onClick={() => handleDeleteNotification(n.id)}
                                className="p-1 rounded text-rose-600 hover:bg-rose-100/40 transition-colors"
                                title="Force Expunge Record"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {/* TAB CONTENT: GLOBAL SETTINGS & TOGGLES */}
          {activeTab === 'settings' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* SYSTEM PARAMETERS */}
              <Card className="p-6 bg-slate-50 border-slate-200 lg:col-span-2">
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-slate-900">Global Banking Software Settings</h2>
                  <p className="text-slate-500 text-xs">Synchronize baseline settings and manage dynamic parameters displayed in layouts.</p>
                </div>

                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input 
                      label="Application Title Name" 
                      value={system.appName || ''}
                      onChange={(e) => handleUpdateSystemSetting('appName', e.target.value)}
                      className="bg-white border-slate-200 text-slate-900"
                    />

                    <Select 
                      label="Base Operation Currency Flag" 
                      options={[
                        { value: 'USD', label: 'US Dollars ($)' },
                        { value: 'EUR', label: 'Euros (€)' },
                        { value: 'GBP', label: 'British Pounds (£)' }
                      ]}
                      value={system.baseCurrency || ''}
                      onChange={(e) => handleUpdateSystemSetting('baseCurrency', e.target.value)}
                      className="bg-white border-slate-200 text-slate-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Standard Deposit Yield API APY (%)</label>
                      <input 
                        type="number" 
                        step="0.05"
                        value={system.baseSavingsYield ?? 0}
                        onChange={(e) => handleUpdateSystemSetting('baseSavingsYield', parseFloat(e.target.value))}
                        className="bg-white text-slate-900 rounded border border-slate-200 px-3 py-2 text-xs w-full outline-none focus:ring focus:ring-emerald-500/50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Max Automatic Loan Limits ($)</label>
                      <input 
                        type="number" 
                        value={system.loanApprovalLimit ?? 0}
                        onChange={(e) => handleUpdateSystemSetting('loanApprovalLimit', parseInt(e.target.value))}
                        className="bg-white text-slate-900 rounded border border-slate-200 px-3 py-2 text-xs w-full outline-none focus:ring focus:ring-emerald-500/50"
                      />
                    </div>
                  </div>

                  {/* MAINTENANCE SHIELD */}
                  <div className="p-5 rounded-xl border border-rose-200/40 bg-rose-50 flex justify-between items-center gap-4 mt-6">
                    <div>
                      <div className="text-sm font-bold text-rose-500 flex items-center gap-1.5 mb-1 bg-transparent">
                        <AlertTriangle className="w-5 h-5" /> Urgent: Software Maintenance Switch
                      </div>
                      <p className="text-xs text-rose-600 leading-relaxed max-w-lg">
                        Toggling this puts the public bank front-end app into a "Dynamic Maintenance Mode" where checking deposits and account page layouts are disabled.
                      </p>
                    </div>

                    <button 
                      onClick={handleToggleMaintenanceMode}
                      className={`h-9 px-6 rounded text-xs font-bold shadow border transition-colors ${
                        system.maintenanceMode 
                          ? 'bg-emerald-650 hover:bg-emerald-750 text-slate-900 border-emerald-600' 
                          : 'bg-rose-500 hover:bg-rose-600 text-slate-950 border-rose-400'
                      }`}
                    >
                      {system.maintenanceMode ? 'Restore Live' : 'Lock Sandbox'}
                    </button>
                  </div>
                </div>
              </Card>

              {/* MODULE FEATURE TOGGLES */}
              <Card className="p-6 bg-slate-50 border-slate-200">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-900">Live Feature Gates</h3>
                  <p className="text-slate-500 text-xs">Instantly hide, show, or freeze complete application sections globally in real-time.</p>
                </div>

                <div className="space-y-4">
                  {[
                    { key: 'enableCryptoModule', label: 'Enable Custodian Crypto Module', desc: 'Allows instant coin swap and wallet mapping.' },
                    { key: 'activeRegistrations', label: 'Allow Online Account Openings', desc: 'Allow visitors to trigger open-account workflows.' },
                    { key: 'enableAiAssistant', label: 'AI Virtual Assistant Widget', desc: 'Enables or restricts the Gemini chatbot modal globally.' },
                    { key: 'enableSBALoans', label: 'Allow SBA Lending Eligibility', desc: 'Show SBA financial verification pages.' },
                    { key: 'force2FA', label: 'Require SMS Multifactor Verification', desc: 'Prompt for double secure verification checks before logins.' }
                  ].map((item) => {
                    const isSet = toggles[item.key as keyof FeatureToggles];
                    return (
                      <div key={item.key} className="p-3.5 bg-white rounded-lg flex justify-between items-start border border-slate-200 hover:border-slate-200 transition-colors">
                        <div className="max-w-[170px] md:max-w-xs pr-2">
                          <div className="text-xs font-bold text-slate-800">{item.label}</div>
                          <div className="text-[10px] text-slate-500 mt-1 leading-normal">{item.desc}</div>
                        </div>

                        <button 
                          onClick={() => handleToggleFeatureFlag(item.key as any)}
                          className={`ml-2 h-5 w-9 shrink-0 rounded-full p-0.5 transition-colors duration-200 focus:outline-none flex ${
                            isSet ? 'bg-emerald-600 justify-end' : 'bg-slate-200 justify-start'
                          }`}
                        >
                          <span className="h-4 w-4 rounded-full bg-slate-50 shadow" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

// ============================================================================
// DYNAMIC LIVE MARKET SURVEILLANCE & TICKER CHART COMPONENT
// ============================================================================

interface TickerData {
  time: string;
  price: number;
}

interface AssetConfig {
  key: string;
  name: string;
  basePrice: number;
  type: 'Stock' | 'Forex' | 'Crypto';
  decimals: number;
  symbol: string;
}

const ASSETS: AssetConfig[] = [
  { key: 'GOOG', name: 'Alphabet Inc. (GOOG)', basePrice: 178.50, type: 'Stock', decimals: 2, symbol: '$' },
  { key: 'AAPL', name: 'Apple Inc. (AAPL)', basePrice: 214.20, type: 'Stock', decimals: 2, symbol: '$' },
  { key: 'NVDA', name: 'NVIDIA Corp (NVDA)', basePrice: 122.30, type: 'Stock', decimals: 2, symbol: '$' },
  { key: 'EUR_USD', name: 'Euro / US Dollar (EUR/USD)', basePrice: 1.0854, type: 'Forex', decimals: 4, symbol: '$' },
  { key: 'GBP_USD', name: 'Pound / US Dollar (GBP/USD)', basePrice: 1.2682, type: 'Forex', decimals: 4, symbol: '$' },
  { key: 'BTC_USD', name: 'Bitcoin / US Dollar (BTC/USD)', basePrice: 64120.00, type: 'Crypto', decimals: 2, symbol: '$' },
];

export const LiveMarketTicker: React.FC = () => {
  const [selectedAssetKey, setSelectedAssetKey] = useState('GOOG');
  const [isLive, setIsLive] = useState(true);
  
  // Initialize each asset with 15 historic data points
  const [histories, setHistories] = useState<Record<string, TickerData[]>>(() => {
    const initHistories: Record<string, TickerData[]> = {};
    ASSETS.forEach(asset => {
      const arr: TickerData[] = [];
      let currentPrice = asset.basePrice;
      const now = Date.now();
      for (let i = 14; i >= 0; i--) {
        const timeStr = new Date(now - i * 15000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const changePercent = (Math.random() - 0.495) * 0.003; // -0.15% to +0.15%
        currentPrice = currentPrice * (1 + changePercent);
        arr.push({
          time: timeStr,
          price: Number(currentPrice.toFixed(asset.decimals))
        });
      }
      initHistories[asset.key] = arr;
    });
    return initHistories;
  });

  // Continuous background updates for simulation of active tickers
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setHistories(prev => {
        const nextHistories = { ...prev };
        ASSETS.forEach(asset => {
          const currentArr = prev[asset.key] || [];
          if (currentArr.length === 0) return;
          const lastItem = currentArr[currentArr.length - 1];
          const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
          
          // Moderate random movement
          const changePercent = (Math.random() - 0.485) * 0.0025; // slight positive structural bias
          const nextPrice = Number((lastItem.price * (1 + changePercent)).toFixed(asset.decimals));
          
          const nextArr = [...currentArr.slice(1), { time: timeStr, price: nextPrice }];
          nextHistories[asset.key] = nextArr;
        });
        return nextHistories;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [isLive]);

  const activeAsset = ASSETS.find(a => a.key === selectedAssetKey) || ASSETS[0];
  const historyData = histories[selectedAssetKey] || [];
  
  const currentPrice = historyData.length > 0 ? historyData[historyData.length - 1].price : activeAsset.basePrice;
  const initialPrice = historyData.length > 0 ? historyData[0].price : activeAsset.basePrice;
  const priceDiff = currentPrice - initialPrice;
  const percentDiff = (priceDiff / initialPrice) * 100;
  const isUp = priceDiff >= 0;

  return (
    <Card className="p-6 bg-slate-50 border-slate-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              {isLive && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              )}
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isLive ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
            </span>
            <span className="text-slate-500 text-[10px] uppercase font-mono tracking-widest font-semibold flex items-center gap-1.5">
              <span>TREASURY SECURITIES & LIQUID ASSETS SURVEY</span>
            </span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 mt-1">Real-time Currency & Stocks Feed</h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setIsLive(!isLive)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition flex items-center gap-1.5 border ${
              isLive 
                ? 'bg-emerald-100/40 text-emerald-600 border-emerald-200/40 hover:bg-emerald-200/30' 
                : 'bg-rose-100/40 text-rose-600 border-rose-200/40 hover:bg-rose-200/30'
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${isLive ? 'bg-emerald-400 animate-pulse' : 'bg-rose-450'}`} />
            {isLive ? 'LIVE FEED ON' : 'FEED PAUSED'}
          </button>
          
          <select
            value={selectedAssetKey}
            onChange={(e) => setSelectedAssetKey(e.target.value)}
            className="bg-white text-slate-900 rounded-lg px-3 py-1.5 text-xs font-semibold border border-slate-200 focus:outline-none focus:border-emerald-500"
          >
            {ASSETS.map(asset => (
              <option key={asset.key} value={asset.key}>{asset.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Core summary metrics display */}
        <div className="lg:col-span-1 p-5 bg-white/30 rounded-xl border border-slate-100/80 flex flex-col justify-between">
          <div>
            <span className="text-slate-500 text-[10px] uppercase font-mono tracking-widest font-bold">Execution Spot Price</span>
            <div className="text-3xl font-black text-slate-900 font-mono mt-2 tracking-tight select-all">
              {activeAsset.symbol === '$' ? '$' : ''}{currentPrice.toLocaleString(undefined, { minimumFractionDigits: activeAsset.decimals })}{activeAsset.symbol !== '$' ? ` ${activeAsset.symbol}` : ''}
            </div>
            <div className={`mt-2 flex items-center gap-1.5 text-xs font-extrabold ${isUp ? 'text-emerald-600' : 'text-rose-600'}`}>
              <span className="text-sm font-sans">{isUp ? '▲' : '▼'}</span>
              <span>
                {isUp ? '+' : ''}{priceDiff.toFixed(activeAsset.decimals)} ({isUp ? '+' : ''}{percentDiff.toFixed(3)}%)
              </span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Updated 2.5 seconds ago (Active)</p>
          </div>
          
          {/* List of collateral minor currencies/stocks */}
          <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
            <span className="text-slate-600 text-[9px] uppercase font-mono font-bold tracking-widest block mb-2">Cross Assets View</span>
            {ASSETS.filter(a => a.key !== selectedAssetKey).slice(0, 3).map(a => {
              const aHistory = histories[a.key] || [];
              const lastVal = aHistory.length > 0 ? aHistory[aHistory.length - 1].price : a.basePrice;
              const preVal = aHistory.length > 0 ? aHistory[0].price : a.basePrice;
              const sideDiff = lastVal - preVal;
              return (
                <div key={a.key} className="flex justify-between items-center text-[10px] cursor-pointer hover:bg-white/80 p-1.5 rounded transition" onClick={() => setSelectedAssetKey(a.key)}>
                  <span className="text-slate-500 font-bold font-mono">{a.key}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-800 font-mono select-none">{lastVal.toFixed(a.decimals)}</span>
                    <span className={`text-[8px] font-bold ${sideDiff >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {sideDiff >= 0 ? '▲' : '▼'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Interactive LineChart Canvas Area */}
        <div className="lg:col-span-3 min-h-[300px] h-full">
          <ResponsiveContainer width="100%" height="100%" minHeight={300}>
            <LineChart data={historyData} margin={{ top: 12, right: 12, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" vertical={false} />
              <XAxis 
                dataKey="time" 
                stroke="#475569" 
                fontSize={10}
                tickLine={false}
                dy={8}
                fontFamily="monospace"
              />
              <YAxis 
                stroke="#475569" 
                fontSize={10} 
                domain={['auto', 'auto']}
                tickLine={false}
                fontFamily="monospace"
                dx={-8}
                tickFormatter={(val) => `${activeAsset.symbol}${val.toLocaleString(undefined, { maximumFractionDigits: activeAsset.decimals })}`}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', color: '#f1f5f9', fontFamily: 'monospace', fontSize: '11px', borderRadius: '8px' }}
                labelStyle={{ fontSize: '10px', color: '#64748b', fontWeight: 'bold' }}
                itemStyle={{ color: isUp ? '#10b981' : '#f43f5e' }}
                formatter={(val: number) => [`${activeAsset.symbol}${val.toLocaleString(undefined, { minimumFractionDigits: activeAsset.decimals })}`, 'Spot Rate']}
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke={isUp ? '#10b981' : '#f43f5e'} 
                strokeWidth={3}
                dot={{ r: 0.5, strokeWidth: 0, fill: isUp ? '#10b981' : '#f43f5e' }}
                activeDot={{ r: 6, strokeWidth: 2, stroke: '#ffffff', fill: isUp ? '#10b981' : '#f43f5e' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};
