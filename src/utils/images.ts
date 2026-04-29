/**
 * Image utility functions with comprehensive error handling and fallbacks
 */

import { apiBaseUrl } from '@api/config';

// Get environment variables
const CDN_URL = import.meta.env.VITE_CDN_URL || import.meta.env.VITE_R2_PUBLIC_URL || '';
const API_URL = apiBaseUrl || 'http://localhost:8000/api/v1';

/**
 * Get the full image URL with comprehensive fallback handling
 * @param imageUrl - The image URL from the API (can be relative or absolute)
 * @param category - Optional category for better fallback selection
 * @returns Absolute image URL or fallback
 */
export const getImageUrl = (imageUrl?: string | null, _category?: string): string => {
  // Debug logging in development
  if (import.meta.env.DEV) {
    console.log('=ƒû+n+Å [getImageUrl] Processing:', {
      input: imageUrl,
      category: _category,
      CDN_URL,
      API_URL,
    });
  }

  // Case 1: No image URL provided - return empty string (no stock fallback)
  if (!imageUrl || imageUrl.trim() === '' || imageUrl === 'null' || imageUrl === 'undefined') {
    if (import.meta.env.DEV) {
      console.log('[getImageUrl] No URL provided, returning empty string');
    }
    return '';
  }

  // Case 2: Already a full URL (http/https)
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    if (import.meta.env.DEV) {
      console.log('G£à [getImageUrl] Full URL detected:', imageUrl);
    }
    return imageUrl;
  }

  // Case 3: Data URL (base64)
  if (imageUrl.startsWith('data:')) {
    if (import.meta.env.DEV) {
      console.log('G£à [getImageUrl] Data URL detected');
    }
    return imageUrl;
  }

  // Case 4: Construct full URL from relative path
  let fullUrl = '';
  
  // Clean the image URL (remove any leading/trailing whitespace)
  const cleanImageUrl = imageUrl.trim();
  
  // If we have a CDN URL, use it
  if (CDN_URL) {
    // Remove leading slash from image URL if present
    const imagePath = cleanImageUrl.startsWith('/') 
      ? cleanImageUrl.substring(1) 
      : cleanImageUrl;
    
    // Ensure CDN URL doesn't end with slash
    const baseUrl = CDN_URL.endsWith('/') 
      ? CDN_URL.slice(0, -1) 
      : CDN_URL;
    
    fullUrl = `${baseUrl}/${imagePath}`;
  } 
  // Otherwise, use API URL as fallback
  else {
    // If the path doesn't start with /, assume it needs /static/ prefix
    if (!cleanImageUrl.startsWith('/')) {
      fullUrl = `${API_URL}/static/${cleanImageUrl}`;
    } else {
      fullUrl = `${API_URL}${cleanImageUrl}`;
    }
  }

  if (import.meta.env.DEV) {
    console.log('G£à [getImageUrl] Constructed URL:', fullUrl);
  }

  return fullUrl;
};

/**
 * Handle image loading errors without substituting stock photos
 * @param event - React synthetic event from the img element
 * @param category - Optional category, kept for compatibility
 */
export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement, Event>,
  _category?: string
): void => {
  const target = event.currentTarget;
  console.error('? [handleImageError] Image failed to load:', target.src);
  target.onerror = null;
  target.src = '';
};

/**
 * Preload an image to check if it's valid
 * @param src - Image source URL
 * @returns Promise that resolves if image loads successfully
 */
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      console.log('G£à [preloadImage] Successfully loaded:', src);
      resolve();
    };
    
    img.onerror = () => {
      console.error('G¥î [preloadImage] Failed to load:', src);
      reject(new Error(`Failed to load image: ${src}`));
    };
    
    img.src = src;
  });
};

/**
 * Check if image URL is valid format
 * @param url - URL to check
 * @returns Boolean indicating if URL appears to be valid image
 */
export const isValidImageUrl = (url?: string | null): boolean => {
  if (!url || url.trim() === '') return false;
  
  // Check for common image extensions
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp', '.ico'];
  const hasImageExtension = imageExtensions.some(ext => 
    url.toLowerCase().includes(ext)
  );
  
  // Check for data URLs
  const isDataUrl = url.startsWith('data:image/');
  
  // Check for known image services
  const isImageService = 
    url.includes('unsplash.com') || 
    url.includes('placeholder.com') || 
    url.includes('cloudflarestorage.com') ||
    url.includes('r2.dev') ||
    url.includes('imagekit.io') ||
    url.includes('cloudinary.com');
  
  return hasImageExtension || isDataUrl || isImageService;
};

/**
 * Get optimized image URL with transformations (for Cloudflare Images)
 * @param imageUrl - Original image URL
 * @param options - Transformation options
 * @returns Optimized image URL
 */
export const getOptimizedImageUrl = (
  imageUrl: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    fit?: 'scale-down' | 'contain' | 'cover' | 'crop' | 'pad';
    format?: 'auto' | 'webp' | 'avif' | 'json';
  } = {}
): string => {
  // Get the base URL
  const baseUrl = getImageUrl(imageUrl);
  
  // If it's not a Cloudflare URL, return as-is
  if (!baseUrl.includes('cloudflarestorage.com') && !baseUrl.includes('imagedelivery.net')) {
    return baseUrl;
  }
  
  // Build transformation parameters for Cloudflare Images
  const params: string[] = [];
  
  if (options.width) params.push(`w=${options.width}`);
  if (options.height) params.push(`h=${options.height}`);
  if (options.quality) params.push(`q=${options.quality}`);
  if (options.fit) params.push(`fit=${options.fit}`);
  if (options.format) params.push(`f=${options.format}`);
  
  // If no transformations, return original
  if (params.length === 0) {
    return baseUrl;
  }
  
  // Check if URL already has query parameters
  const separator = baseUrl.includes('?') ? '&' : '?';
  
  return `${baseUrl}${separator}${params.join('&')}`;
};

/**
 * Get placeholder image for loading states
 * @returns Placeholder image URL
 */
export const getPlaceholderImage = (): string => '';

/**
 * Get error fallback image
 * @param category - Optional category for specific fallback
 * @returns Error fallback image URL
 */
export const getErrorFallbackImage = (_category?: string): string => '';

/**
 * Generate image srcset for responsive images
 * @param imageUrl - Base image URL
 * @param sizes - Array of widths to generate
 * @returns srcset string for img element
 */
export const generateSrcSet = (
  imageUrl: string,
  sizes: number[] = [320, 640, 960, 1280, 1920]
): string => {
  const baseUrl = getImageUrl(imageUrl);
  
  // If it's not a Cloudflare URL, return empty (no srcset)
  if (!baseUrl.includes('cloudflarestorage.com') && !baseUrl.includes('imagedelivery.net')) {
    return '';
  }
  
  return sizes
    .map(size => {
      const optimizedUrl = getOptimizedImageUrl(baseUrl, { width: size });
      return `${optimizedUrl} ${size}w`;
    })
    .join(', ');
};

// Export default for convenience
export default {
  getImageUrl,
  handleImageError,
  preloadImage,
  isValidImageUrl,
  getOptimizedImageUrl,
  getPlaceholderImage,
  getErrorFallbackImage,
  generateSrcSet,
};
