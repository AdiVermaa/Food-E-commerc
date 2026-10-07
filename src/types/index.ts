// TypeScript types for Archana's Zaika Tiffin Service

export type UserRole = 'user' | 'admin';

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';

export type PaymentMethod = 'cod' | 'online';

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export type PlanDuration = 'weekly' | 'monthly';

export type MealType = 'lunch' | 'dinner' | 'both';

export type SubscriptionStatus = 'active' | 'paused' | 'expired' | 'cancelled';

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

export interface DailyMealMenu {
  day: DayOfWeek;
  lunch: string;
  dinner: string;
  special?: string;
  isVeg: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  area: string;
  role: UserRole;
  photoURL?: string;
  createdAt: Date;
  isBlocked: boolean;
}

export interface TiffinPlan {
  id: string;
  name: string;
  description: string;
  duration: PlanDuration;
  mealType: MealType;
  price: number;
  originalPrice: number;
  weeklySchedule: DailyMealMenu[];
  features: string[];
  isPopular: boolean;
  isActive: boolean;
  createdAt: Date;
}

export interface Subscription {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  planId: string;
  planName: string;
  mealType: MealType;
  startDate: Date;
  endDate: Date;
  status: SubscriptionStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  amount: number;
  deliveryAddress: string;
  deliveryArea: string;
  deliveryCharge: number;
  instructions?: string;
  createdAt: Date;
}

export interface CartItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userPhoto?: string;
  rating: number;
  comment: string;
  planName?: string;
  isApproved: boolean;
  createdAt: Date;
}

export interface DeliveryArea {
  id: string;
  name: string;
  pincode: string;
  deliveryCharge: number;
  isServiceable: boolean;
  estimatedTime: string;
}

export interface DashboardStats {
  totalRevenue: number;
  todayRevenue: number;
  activeSubscriptions: number;
  totalUsers: number;
  pendingDeliveries: number;
}
