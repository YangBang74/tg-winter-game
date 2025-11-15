export type Coin = {
  name: string
  amount: number
  usd: string
  icon: string
}

export interface BalanceTab {
  id: string
  label: string
  isActive: boolean
}

export interface PaymentMethod {
  id: string
  name: string
  icon: string
  minAmount: string
}

export interface Transaction {
  id: string
  type: 'deposit' | 'withdraw' | 'reward'
  title: string
  date: string
  amount: string
}

export interface TransactionStyle {
  iconColor: string
  iconBg: string
  iconName: string
}

export interface TransactionWithStyle extends Transaction {
  style: TransactionStyle
}
