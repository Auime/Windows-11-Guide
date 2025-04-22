/**
 * Detects if the user is on a mobile device
 * @returns boolean indicating if the user is on a mobile device
 */
export function isMobile(): boolean {
  // Only run on client side
  if (typeof window === 'undefined') {
    return false;
  }

  const userAgent = window.navigator.userAgent;

  // Regular expression to detect mobile devices
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i;

  // Check if the device is mobile based on user agent
  return mobileRegex.test(userAgent);

  // Note: We're no longer checking viewport width, so this will block mobile devices
  // regardless of orientation or "Request Desktop Site" setting
}
