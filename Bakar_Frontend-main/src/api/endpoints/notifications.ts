import apiClient from '../client'
import { ApiResponse } from '@models/common.types'

export interface Notification {
  id: string
  user_id: string
  type: 'order_update' | 'promotion' | 'system'
  title: string
  message: string
  read: boolean
  created_at: string
}

export const notificationsAPI = {
  /**
   * Get user notifications
   */
  getNotifications: () => 
    apiClient.get<ApiResponse<Notification[]>>('/notifications'),

  /**
   * Mark notification as read
   */
  markAsRead: (notificationId: string) => 
    apiClient.put<ApiResponse<void>>(`/notifications/${notificationId}/read`),

  /**
   * Mark all notifications as read
   */
  markAllAsRead: () => 
    apiClient.put<ApiResponse<void>>('/notifications/read-all'),

  /**
   * Delete notification
   */
  deleteNotification: (notificationId: string) => 
    apiClient.delete<ApiResponse<void>>(`/notifications/${notificationId}`),
}
